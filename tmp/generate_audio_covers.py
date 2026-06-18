from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


WIDTH = HEIGHT = 1080
OUT_DIR = Path("C:/card/zyWeb/mp3/\u4eba\u751f\u64cd\u4f5c\u7cfb\u7edf\u64ad\u5ba2/covers")
TEMP_SOURCE_BACKGROUND = Path(
    "C:/Users/chenping/AppData/Local/Temp/codex-clipboard-f430e2c0-811b-47d4-93eb-7fff23dce78c.png"
)
SAVED_SOURCE_BACKGROUND = OUT_DIR / "\u56fa\u5b9a\u5c01\u9762\u80cc\u666f_\u539f\u56fe.png"

BRAND_TEXT = "\u4eba\u751f\u64cd\u4f5c\u7cfb\u7edf\u535a\u5ba2"
TITLES = [
    "\u4e3a\u4ec0\u4e48\u4eba\u751f\u4e0d\u662f\u4e00\u573a\u8003\u8bd5\uff0c\u800c\u662f\u4e00\u5957\u6301\u7eed\u8fd0\u884c\u7684\u7cfb\u7edf",
    "\u666e\u901a\u4eba\u6700\u8be5\u5148\u642d\u5efa\u7684\u4e0d\u662f\u76ee\u6807\u8868\uff0c\u800c\u662f\u4eba\u751f\u64cd\u4f5c\u53f0",
    "\u65b9\u5411\u9519\u4e86\uff0c\u52aa\u529b\u8d8a\u591a\uff0c\u7cfb\u7edf\u8d1f\u503a\u8d8a\u5927",
    "\u4eba\u751f\u7cfb\u7edf\u6700\u6015\u7684\u4e0d\u662f\u6162\uff0c\u800c\u662f\u4e0d\u77e5\u9053\u81ea\u5df1\u5728\u4f18\u5316\u4ec0\u4e48",
    "\u4e3a\u4ec0\u4e48\u6210\u719f\u4e0d\u662f\u53d8\u5f3a\uff0c\u800c\u662f\u53d8\u7a33",
]

FONT_CANDIDATES = [
    Path("C:/Windows/Fonts/NotoSansSC-VF.ttf"),
    Path("C:/Windows/Fonts/msyhbd.ttc"),
    Path("C:/Windows/Fonts/msyh.ttc"),
    Path("C:/Windows/Fonts/simhei.ttf"),
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    preferred = [Path("C:/Windows/Fonts/msyhbd.ttc")] if bold else []
    for path in preferred + FONT_CANDIDATES:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def wrap_title(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for ch in text:
        candidate = current + ch
        if text_size(draw, candidate, fnt)[0] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = ch
    if current:
        lines.append(current)
    return lines


def make_background() -> Image.Image:
    source = SAVED_SOURCE_BACKGROUND if SAVED_SOURCE_BACKGROUND.exists() else TEMP_SOURCE_BACKGROUND
    src = Image.open(source).convert("RGB")
    sw, sh = src.size
    scale = max(WIDTH / sw, HEIGHT / sh)
    resized = src.resize((round(sw * scale), round(sh * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - WIDTH) // 2
    top = (resized.height - HEIGHT) // 2
    bg = resized.crop((left, top, left + WIDTH, top + HEIGHT))

    bg = ImageEnhance.Contrast(bg).enhance(1.05)
    bg = ImageEnhance.Brightness(bg).enhance(0.88)

    shade = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(shade)
    draw.rectangle((0, 0, WIDTH, 210), fill=(0, 0, 0, 70))
    draw.rectangle((0, 685, WIDTH, HEIGHT), fill=(0, 0, 0, 96))
    shade = shade.filter(ImageFilter.GaussianBlur(28))
    return Image.alpha_composite(bg.convert("RGBA"), shade).convert("RGB")


def draw_cover(background: Image.Image, index: int, title: str) -> Image.Image:
    img = background.copy().convert("RGBA")
    draw = ImageDraw.Draw(img)

    top_font = font(34, bold=True)
    title_font_size = 58
    small_font = font(30)

    margin = 58
    label_w, label_h = text_size(draw, BRAND_TEXT, top_font)
    label_box = (margin, 52, margin + label_w + 48, 52 + label_h + 28)
    draw.rounded_rectangle(label_box, radius=18, fill=(235, 37, 58, 238))
    draw.text((margin + 24, 62), BRAND_TEXT, font=top_font, fill=(255, 255, 255, 255))
    draw.rounded_rectangle((margin, 148, margin + 165, 156), radius=4, fill=(235, 37, 58, 215))

    panel_x = margin
    panel_w = WIDTH - margin * 2
    max_text_width = panel_w - 72
    while True:
        title_font = font(title_font_size, bold=True)
        lines = wrap_title(draw, title, title_font, max_text_width)
        line_height = title_font_size + 16
        if len(lines) <= 3 or title_font_size <= 46:
            break
        title_font_size -= 4

    total_title_h = len(lines) * line_height
    panel_h = max(230, total_title_h + 126)
    panel_y = HEIGHT - margin - panel_h

    panel = Image.new("RGBA", (panel_w, panel_h), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(panel)
    pdraw.rounded_rectangle((0, 0, panel_w, panel_h), radius=20, fill=(5, 8, 10, 186))
    pdraw.rounded_rectangle((0, 0, 12, panel_h), radius=6, fill=(235, 37, 58, 255))
    img.alpha_composite(panel, (panel_x, panel_y))

    ep = f"EP.{index:02d}"
    draw.text((panel_x + 40, panel_y + 28), ep, font=small_font, fill=(244, 194, 111, 245))

    y = panel_y + 78
    for line in lines:
        draw.text((panel_x + 40, y), line, font=title_font, fill=(255, 255, 255, 255))
        y += line_height

    footer = "Life OS Podcast"
    fw, _ = text_size(draw, footer, small_font)
    draw.text((WIDTH - margin - fw, HEIGHT - 46), footer, font=small_font, fill=(255, 255, 255, 135))
    return img.convert("RGB")


def safe_filename(text: str) -> str:
    blocked = '<>:"/\\|?*'
    return "".join("_" if ch in blocked else ch for ch in text)


def make_contact_sheet(paths: list[Path]) -> None:
    thumb_w = 360
    thumb_h = 360
    gap = 20
    sheet = Image.new("RGB", (thumb_w * 3 + gap * 4, thumb_h * 2 + gap * 3), "#121416")
    for i, path in enumerate(paths):
        im = Image.open(path).resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        x = gap + (i % 3) * (thumb_w + gap)
        y = gap + (i // 3) * (thumb_h + gap)
        sheet.paste(im, (x, y))
    sheet.save(OUT_DIR / "5\u5f20\u5c01\u9762\u603b\u89c8.jpg", quality=95, subsampling=0)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    background = make_background()
    background.save(OUT_DIR / "\u7edf\u4e00\u80cc\u666f.jpg", quality=95, subsampling=0)

    generated = []
    for idx, title in enumerate(TITLES, 1):
        cover = draw_cover(background, idx, title)
        out = OUT_DIR / f"{idx:02d}_{safe_filename(title)}_\u5c01\u9762.jpg"
        cover.save(out, quality=95, subsampling=0)
        generated.append(out)
        print(out)

    make_contact_sheet(generated)


if __name__ == "__main__":
    main()
