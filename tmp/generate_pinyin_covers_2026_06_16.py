from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


WIDTH = HEIGHT = 1080
ROOT = Path(r"C:\card\zyWeb\life-os-site")
MANIFEST_PATHS = [
    ROOT / "tmp" / "pinyin-audio-2026-06-16" / "manifest-2026-06-16-pinyin.json",
    Path(r"C:\card\zyWeb\mp3\人生操作系统播客\pinyin-2026-06-16\manifest-2026-06-16-pinyin.json"),
]
OUT_DIR = Path(r"C:\card\zyWeb\mp3\人生操作系统播客\covers")
SAVED_SOURCE_BACKGROUND = OUT_DIR / "固定封面背景_原图.png"
BRAND_TEXT = "人生操作系统播客"

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
    src = Image.open(SAVED_SOURCE_BACKGROUND).convert("RGB")
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
        if len(lines) <= 3 or title_font_size <= 42:
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

    draw.text((panel_x + 40, panel_y + 28), f"EP.{index:02d}", font=small_font, fill=(244, 194, 111, 245))
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


def make_contact_sheet(paths: list[Path]) -> Path:
    thumb_w = thumb_h = 300
    gap = 18
    cols = 5
    rows = 2
    sheet = Image.new("RGB", (thumb_w * cols + gap * (cols + 1), thumb_h * rows + gap * (rows + 1)), "#121416")
    for i, path in enumerate(paths):
        im = Image.open(path).resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        x = gap + (i % cols) * (thumb_w + gap)
        y = gap + (i // cols) * (thumb_h + gap)
        sheet.paste(im, (x, y))
    out = OUT_DIR / "11-20封面总览.jpg"
    sheet.save(out, quality=95, subsampling=0)
    return out


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(MANIFEST_PATHS[0].read_text(encoding="utf-8"))
    background = make_background()
    generated: list[Path] = []

    for item in manifest:
        index = int(item["index"])
        title = str(item["title"])
        out = OUT_DIR / f"{index:02d}_{safe_filename(title)}_封面.jpg"
        cover = draw_cover(background, index, title)
        cover.save(out, quality=95, subsampling=0)
        item["cover"] = str(out)
        generated.append(out)
        print(out)

    contact_sheet = make_contact_sheet(generated)
    for path in MANIFEST_PATHS:
        path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(contact_sheet)


if __name__ == "__main__":
    main()
