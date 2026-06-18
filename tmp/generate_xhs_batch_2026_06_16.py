from __future__ import annotations

import asyncio
import json
import re
import shutil
from pathlib import Path

import edge_tts
from mutagen.mp3 import MP3
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(r"C:\card\zyWeb\life-os-site")
BATCH_DIR = ROOT / "tmp" / "xhs-2026-06-16"
ARTICLE_DIR = BATCH_DIR / "articles"
OUT_DIR = Path(r"C:\card\zyWeb\mp3") / "人生操作系统播客"
COVER_DIR = OUT_DIR / "covers"
SAVED_SOURCE_BACKGROUND = COVER_DIR / "固定封面背景_原图.png"

VOICE = "zh-CN-XiaoxiaoNeural"
RATE = "-8%"
VOLUME = "+0%"
PITCH = "+0Hz"
TARGET_MIN_SECONDS = 10 * 60
TARGET_CHARS = 4400
CHUNK_CHARS = 1200


DATA_ROWS = [
    ("人生不是考试，是系统", 103, 14, 0),
    ("先搭建人生操作台", 77, 5, 0),
    ("成熟不是变强而是变稳", 55, 5, 0),
    ("为什么重要的选择，不能只看当下感受", 37, 2, 0),
    ("你到底在优化什么", 20, 3, 0),
    ("方向错了，越努力越负债", 19, 0, 0),
    ("人生问题是资源配置", 51, 3, 1),
    ("价值中心决定时间用法", 18, 5, 0),
    ("人生不是考试，而是持续运行的系统", 25, 1, 0),
    ("人生最怕的不是慢，而是不知道自己在优化什么", 22, 1, 0),
    ("普通人先搭建的不是目标表，而是人生操作台", 15, 0, 0),
    ("持续修正自己", 15, 0, 0),
    ("为什么成熟不是变强，而是变稳", 11, 0, 0),
    ("方向错了，努力越多，系统负债越大", 11, 1, 0),
    ("责任不是自责", 6, 1, 0),
]


ARTICLES = [
    {
        "index": 6,
        "scheduleTime": "2026-06-16 08:10",
        "slug": "system-drains-your-energy",
        "sourceTitle": "为什么你不是不努力，而是系统太耗能",
        "xhsTitle": "你不是懒，是系统太耗你",
        "summary": "很多人不是缺自律，而是生活系统处处漏电：睡眠、关系、信息流和环境每天都在消耗你。先修系统，再谈努力。",
        "conclusion": "人真正需要的，不是更用力地硬扛，而是把消耗自己的系统先修好。",
        "tags": ["人生操作系统", "系统思维", "个人成长", "精力管理", "长期主义"],
        "paragraphs": [
            "很多人一边责怪自己懒，一边把自己放在一个高消耗系统里。睡得晚、信息流太碎、关系长期内耗、工作没有边界、家里没有安静空间，然后再要求自己每天高效、自律、稳定输出。这不是成长，这是让一台机器在漏电状态下全速运转。",
            "真正的问题不一定是意志力差，而是系统设计太差。一个人的精力不是凭空来的，它来自睡眠、饮食、运动、环境、关系和注意力秩序。只要这些底层变量长期混乱，再多鸡血也只能撑一阵子。",
            "所以复盘时不要只问：我今天为什么没做到？更好的问法是：是什么让我更容易失控？是什么在偷偷消耗我的注意力？是什么让我每次都靠临时硬撑？当你开始这样问，问题就从自责变成了系统优化。",
            "普通人改变状态，可以先做三个小动作：固定一个睡觉前的关机时间；把最耗注意力的应用移出首页；把每天最重要的一件事安排在精力最好的时段。不要小看这些动作，它们是在修补系统漏电点。",
        ],
    },
    {
        "index": 7,
        "scheduleTime": "2026-06-16 10:40",
        "slug": "change-default-settings-first",
        "sourceTitle": "普通人改变自己，先改系统默认设置",
        "xhsTitle": "别急着定目标，先改默认设置",
        "summary": "目标靠意志启动，默认设置靠环境自动运行。真正稳定的改变，是让好动作更容易发生，让坏动作更难发生。",
        "conclusion": "改变不是每天重新发誓，而是把默认路径改到更接近长期价值。",
        "tags": ["人生操作系统", "习惯养成", "系统思维", "复盘", "长期策略"],
        "paragraphs": [
            "很多目标失败，不是因为目标不重要，而是默认设置没变。你说要早睡，但手机默认放在枕边；你说要读书，但桌面默认打开短视频；你说要写作，但每天默认被消息打断。目标写得再漂亮，也会被旧系统一点点拉回去。",
            "所谓默认设置，就是不需要思考也会发生的路径。回家先躺沙发，焦虑先刷信息，空闲先看消息，遇到压力先拖延，这些都不是单次选择，而是被重复训练出来的系统反应。",
            "真正有效的改变，是降低好行为的启动成本，提高坏行为的发生成本。想阅读，就把书放到最顺手的位置；想运动，就提前准备衣服；想少刷手机，就把入口藏起来；想复盘，就固定一个很短的时间窗口。",
            "人不可能每天都靠意志力战胜环境。更聪明的做法，是让环境替你做一部分选择。当默认路径变了，你不需要每次都赢一场心理战争，生活会慢慢进入新的轨道。",
        ],
    },
    {
        "index": 8,
        "scheduleTime": "2026-06-16 13:20",
        "slug": "shorten-feedback-loop",
        "sourceTitle": "为什么反馈太慢，会让人长期原地打转",
        "xhsTitle": "反馈太慢，人生就会卡住",
        "summary": "没有反馈，人会把坚持误认成进步；把反馈周期缩短，才知道哪里该继续、哪里该修正。",
        "conclusion": "持续成长的关键，不是一直做，而是更快看见现实怎么回应你。",
        "tags": ["反馈", "复盘", "人生操作系统", "决策思维", "个人成长"],
        "paragraphs": [
            "很多人不是不努力，而是努力很久都没有真实反馈。学了很多课，不知道能力有没有变强；做了很多事，不知道结果为什么没起色；坚持一个方向很久，却分不清这是长期积累，还是低效重复。",
            "反馈太慢，人就容易陷入两种误区。第一，把忙碌当成进步。第二，把没有结果解释成自己还不够努力。于是继续加码，继续消耗，却没有真正修正方法。",
            "一个健康的人生系统，需要更短的反馈回路。写作不能只看一年后有没有爆款，而要看每周选题、表达、评论和转化；学习不能只看收藏多少资料，而要看能不能讲清楚、用出来、解决问题；健康不能只看体重，而要看睡眠、精力和运动记录。",
            "普通人可以从一个小练习开始：每周只复盘一个问题。这件事带来了什么结果？结果和预期哪里不同？下周我只改哪一个变量？反馈越具体，系统越容易进化。",
        ],
    },
    {
        "index": 9,
        "scheduleTime": "2026-06-16 16:30",
        "slug": "time-reveals-value-order",
        "sourceTitle": "一个人的时间流向，暴露了真实价值排序",
        "xhsTitle": "时间流向哪里，人生就变成哪里",
        "summary": "时间管理的底层不是技巧，而是价值排序。你把最好的时间交给什么，人生就会慢慢长成什么。",
        "conclusion": "嘴上说重视什么不重要，时间最终会替你投票。",
        "tags": ["价值观", "专注", "自我认知", "人生规划", "长期策略"],
        "paragraphs": [
            "很多人以为自己缺时间管理方法，其实缺的是价值排序。一个人可以学很多效率工具，但如果最好的时间总是给了碎片信息、无效社交和临时情绪，真正重要的事情就永远排不到前面。",
            "时间是最诚实的账本。你说重视健康，但长期熬夜；你说重视成长，但每天最清醒的时间都在刷信息；你说重视家人，但总把陪伴放到精疲力尽之后。系统不会听宣言，它只记录真实分配。",
            "价值排序不是喊口号，而是在冲突里做选择。当短期舒服和长期能力冲突时，你选什么；当面子和真实成长冲突时，你选什么；当即时回复和深度工作冲突时，你选什么。这些选择，才是一个人的真实价值观。",
            "可以做一个很简单的检查：过去七天，你最好的三个小时分别给了什么？它们是否支持你真正想要的人生？如果答案不一致，不必自责，先把一小段高质量时间重新分配给长期价值。",
        ],
    },
    {
        "index": 10,
        "scheduleTime": "2026-06-16 20:40",
        "slug": "local-win-system-loss",
        "sourceTitle": "为什么很多人赢了局部，却输了整个人生系统",
        "xhsTitle": "别赢了局部，输了整个人生",
        "summary": "很多选择单独看都合理，放进整个人生系统却会互相伤害。做选择时，要看它是否挤占健康、关系、能力和长期选择权。",
        "conclusion": "局部最优最危险的地方，是它看起来很对，却慢慢伤害整体结构。",
        "tags": ["系统思维", "取舍", "人生规划", "决策思维", "长期主义"],
        "paragraphs": [
            "现实里很多错误选择，并不是一开始看起来很蠢。为了多赚一点钱牺牲睡眠，为了减少冲突长期讨好，为了显得努力接下所有任务，为了短期安全放弃成长机会，每个选择单独看都有理由。",
            "问题在于，人生不是一个单项指标。收入、健康、关系、能力、现金流、注意力和选择权会互相影响。一个局部指标变好，可能正在挤占另一个更重要的底层资源。最麻烦的是，这种损伤通常不是立刻发生，而是慢慢累积。",
            "所以做重要选择时，不要只问：这件事现在划不划算？还要问：它会不会减少我未来的选择？会不会降低我的身体和情绪稳定性？会不会让我离长期能力更远？会不会让一个局部指标好看，却让整体系统更脆弱？",
            "真正成熟的决策，不是每个局部都赢，而是让整体结构更稳。人生操作系统的目标，不是把所有指标都拉满，而是在有限资源里保护最重要的底层变量。",
        ],
    },
]


REFLECTIONS = [
    "如果你正在通勤、散步，或者睡前听这一段，可以先不用急着做笔记。你只需要把一个问题留在心里：我现在的系统，是在帮助我，还是在消耗我？很多时候，改变不是从更用力开始，而是从看见真实结构开始。",
    "再往深处看，很多所谓的人生困境，并不是没有答案，而是答案没有落到稳定流程里。我们知道要学习，知道要健康，知道要长期主义，但如果没有具体的时间、场景、反馈和复盘，这些好想法就会停在口号里。",
    "所以我更建议你把这期内容当成一个小工具。不是听完就热血，而是听完之后能多一个判断：这件事是在增加我的选择权，还是在减少我的选择权？是在建设长期资产，还是在制造系统负债？",
    "真正适合长期使用的方法，通常不会太刺激。它可能就是每周固定复盘一次，每天留出一段不被打扰的深度时间，或者在重要选择前写下自己的判断依据。动作很小，但只要持续，系统就会慢慢变得不一样。",
    "如果把人生看成一个长期系统，我们就会少一点自我攻击，多一点结构调整。问题出现时，不急着证明自己不行，也不急着证明别人错了，而是先看变量在哪里、反馈在哪里、下一步最小动作在哪里。",
    "对普通人来说，最珍贵的不是拥有完美计划，而是有一套能让自己不断回到正轨的机制。计划会变，环境会变，情绪也会变，但只要机制还在，人就不会轻易被一次波动带走。",
    "你也可以把今天的内容放进一个很小的练习里。晚上花五分钟写下三件事：今天我把注意力给了什么，哪个动作在建设长期价值，哪个动作只是在缓解焦虑。写得越具体，系统越容易被看见。",
    "很多长期变化，刚开始都不明显。就像存钱、锻炼、阅读、写作和关系维护，前几天看不出差别，前几周也不一定有反馈。但这些动作如果进入稳定节奏，就会慢慢改变一个人的底层状态。",
]


def tag_line(tags: list[str]) -> str:
    return " ".join(f"#{tag}" for tag in tags)


def safe_filename(name: str, index: int) -> str:
    cleaned = re.sub(r'[<>:"/\\|?*\s]+', "_", name).strip("_")
    return f"{index:02d}_{cleaned[:36]}"


def build_xhs_body(item: dict[str, object]) -> str:
    paragraphs = item["paragraphs"]
    assert isinstance(paragraphs, list)
    body_parts = [
        f"原文标题：{item['sourceTitle']}",
        "",
        str(item["summary"]),
        "",
        f"一句话结论：{item['conclusion']}",
        "",
        *[str(paragraph) for paragraph in paragraphs],
        "",
        tag_line(item["tags"]),  # type: ignore[arg-type]
    ]
    return "\n\n".join(body_parts)


def build_audio_script(item: dict[str, object]) -> str:
    paragraphs = item["paragraphs"]
    tags = item["tags"]
    assert isinstance(paragraphs, list)
    assert isinstance(tags, list)

    sections: list[str] = [
        "你好，欢迎来到《人生操作系统播客》。\n\n"
        f"这一期我们聊：{item['sourceTitle']}。\n\n"
        f"先说一句核心结论：{item['summary']}\n\n"
        "这期不讲空泛的大道理，我们把它拆成几个普通人真的能用的判断和行动。",
    ]

    prompts = [
        "我们先把这个判断放到日常生活里看。",
        "这里最容易被忽略的，是它背后的系统含义。",
        "如果换成一个普通人的真实处境，它会变得更具体。",
        "这一点听起来简单，但真正执行时，很多人会卡住。",
    ]
    followups = [
        "它提醒我们，不要只盯着某一次结果，而要看这个选择会不会改变长期结构。",
        "当你开始这样看问题，情绪会少一点，动作会清楚一点，很多纠结也会慢慢变成可处理的任务。",
        "所以关键不是立刻做一个很大的改变，而是先找到一个能稳定重复的小动作。",
        "这也是人生操作系统的核心：把抽象道理变成可以观察、可以复盘、可以持续修正的流程。",
    ]
    for i, paragraph in enumerate(paragraphs, 1):
        prompt = prompts[(i - 1) % len(prompts)]
        followup = followups[(i - 1) % len(followups)]
        sections.append(f"第{i}部分。\n\n{prompt}\n\n{paragraph}\n\n{followup}")

    sections.append(
        "接下来，我们把这期内容放回自己的生活里。\n\n"
        "你可以问自己三个问题。第一，我现在最在意的结果，是短期感受，还是长期结构？"
        "第二，我每天重复的动作，正在强化什么样的系统？第三，如果这周只修正一个地方，哪个地方最值得先改？\n\n"
        "不要急着回答得很漂亮。真正有用的答案，往往很朴素。"
        "比如少一点无效比较，多一点复盘；少一点情绪化决定，多一点提前设计；少一点一次性冲刺，多一点稳定节奏。"
    )
    sections.append(
        "最后做一个简单总结。\n\n"
        "人生不是靠某一次爆发解决所有问题，而是靠长期运行的系统慢慢积累优势。"
        "我们真正要训练的，不是永远正确，而是在现实反馈面前，仍然愿意调整方向、修正动作、保护自己的长期价值。\n\n"
        f"这一期的关键词是：{'，'.join(str(tag) for tag in tags)}。\n\n"
        "如果你愿意，可以把这期当成一次安静的复盘。听完之后，不用立刻改变很多事。"
        "先选一个最小动作，让今天的系统，比昨天更清楚一点。\n\n"
        "这里是《人生操作系统播客》，我们下一期继续。"
    )

    script = "\n\n".join(sections)
    reflection_index = 0
    while len(script) < TARGET_CHARS:
        round_no = reflection_index // len(REFLECTIONS) + 1
        script += "\n\n" + f"我们再从第{round_no}个角度把这个问题想深一点。\n\n"
        script += REFLECTIONS[reflection_index % len(REFLECTIONS)]
        reflection_index += 1
    return script


def split_script(text: str) -> list[str]:
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks: list[str] = []
    current: list[str] = []
    current_len = 0
    for paragraph in paragraphs:
        addition = len(paragraph) + 2
        if current and current_len + addition > CHUNK_CHARS:
            chunks.append("\n\n".join(current))
            current = []
            current_len = 0
        current.append(paragraph)
        current_len += addition
    if current:
        chunks.append("\n\n".join(current))
    return chunks


def strip_id3v2(data: bytes) -> bytes:
    if not data.startswith(b"ID3") or len(data) < 10:
        return data
    size = 0
    for byte in data[6:10]:
        size = (size << 7) | (byte & 0x7F)
    return data[10 + size :]


async def synthesize(script_path: Path, mp3_path: Path) -> None:
    communicate = edge_tts.Communicate(
        text=script_path.read_text(encoding="utf-8"),
        voice=VOICE,
        rate=RATE,
        volume=VOLUME,
        pitch=PITCH,
    )
    await communicate.save(str(mp3_path))


async def synthesize_chunked(script_path: Path, mp3_path: Path) -> float:
    text = script_path.read_text(encoding="utf-8")
    chunks = split_script(text)
    chunk_dir = mp3_path.with_suffix("")
    if chunk_dir.exists():
        shutil.rmtree(chunk_dir)
    chunk_dir.mkdir(parents=True, exist_ok=True)

    chunk_paths: list[Path] = []
    for chunk_index, chunk in enumerate(chunks, 1):
        chunk_path = chunk_dir / f"chunk_{chunk_index:03d}.mp3"
        chunk_text = chunk_dir / f"chunk_{chunk_index:03d}.txt"
        chunk_text.write_text(chunk, encoding="utf-8")
        await synthesize(chunk_text, chunk_path)
        chunk_paths.append(chunk_path)
        print(json.dumps({"chunk": chunk_index, "path": str(chunk_path), "bytes": chunk_path.stat().st_size}, ensure_ascii=False), flush=True)

    with mp3_path.open("wb") as output:
        for chunk_index, chunk_path in enumerate(chunk_paths):
            data = chunk_path.read_bytes()
            output.write(data if chunk_index == 0 else strip_id3v2(data))

    try:
        return float(MP3(str(mp3_path)).info.length)
    except Exception:
        return 0.0


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


def make_background(width: int = 1080, height: int = 1080) -> Image.Image:
    if SAVED_SOURCE_BACKGROUND.exists():
        src = Image.open(SAVED_SOURCE_BACKGROUND).convert("RGB")
        sw, sh = src.size
        scale = max(width / sw, height / sh)
        resized = src.resize((round(sw * scale), round(sh * scale)), Image.Resampling.LANCZOS)
        left = (resized.width - width) // 2
        top = (resized.height - height) // 2
        bg = resized.crop((left, top, left + width, top + height))
        bg = ImageEnhance.Contrast(bg).enhance(1.05)
        bg = ImageEnhance.Brightness(bg).enhance(0.88)
    else:
        bg = Image.new("RGB", (width, height), "#111827")
        draw = ImageDraw.Draw(bg)
        for y in range(height):
            tone = int(18 + 40 * y / height)
            draw.line((0, y, width, y), fill=(tone, tone + 8, tone + 18))

    shade = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(shade)
    draw.rectangle((0, 0, width, 210), fill=(0, 0, 0, 70))
    draw.rectangle((0, 685, width, height), fill=(0, 0, 0, 96))
    shade = shade.filter(ImageFilter.GaussianBlur(28))
    return Image.alpha_composite(bg.convert("RGBA"), shade).convert("RGB")


def draw_cover(background: Image.Image, item: dict[str, object]) -> Image.Image:
    width = height = 1080
    img = background.copy().convert("RGBA")
    draw = ImageDraw.Draw(img)
    margin = 58
    brand_text = "人生操作系统播客"

    top_font = font(34, bold=True)
    label_w, label_h = text_size(draw, brand_text, top_font)
    label_box = (margin, 52, margin + label_w + 48, 52 + label_h + 28)
    draw.rounded_rectangle(label_box, radius=18, fill=(235, 37, 58, 238))
    draw.text((margin + 24, 62), brand_text, font=top_font, fill=(255, 255, 255, 255))
    draw.rounded_rectangle((margin, 148, margin + 165, 156), radius=4, fill=(235, 37, 58, 215))

    title = str(item["sourceTitle"])
    title_font_size = 58
    panel_w = width - margin * 2
    max_text_width = panel_w - 72
    while True:
        title_font = font(title_font_size, bold=True)
        lines = wrap_title(draw, title, title_font, max_text_width)
        line_height = title_font_size + 16
        if len(lines) <= 3 or title_font_size <= 44:
            break
        title_font_size -= 4

    total_title_h = len(lines) * line_height
    panel_h = max(230, total_title_h + 126)
    panel_y = height - margin - panel_h
    panel = Image.new("RGBA", (panel_w, panel_h), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(panel)
    pdraw.rounded_rectangle((0, 0, panel_w, panel_h), radius=20, fill=(5, 8, 10, 186))
    pdraw.rounded_rectangle((0, 0, 12, panel_h), radius=6, fill=(235, 37, 58, 255))
    img.alpha_composite(panel, (margin, panel_y))

    small_font = font(30)
    draw.text((margin + 40, panel_y + 28), f"EP.{int(item['index']):02d}", font=small_font, fill=(244, 194, 111, 245))
    y = panel_y + 78
    for line in lines:
        draw.text((margin + 40, y), line, font=title_font, fill=(255, 255, 255, 255))
        y += line_height

    footer = "Life OS Podcast"
    fw, _ = text_size(draw, footer, small_font)
    draw.text((width - margin - fw, height - 46), footer, font=small_font, fill=(255, 255, 255, 135))
    return img.convert("RGB")


def write_text_assets() -> list[dict[str, object]]:
    BATCH_DIR.mkdir(parents=True, exist_ok=True)
    ARTICLE_DIR.mkdir(parents=True, exist_ok=True)
    prepared: list[dict[str, object]] = []

    for item in ARTICLES:
        current = dict(item)
        current["file"] = f"{current['slug']}.md"
        current["tagLine"] = tag_line(current["tags"])  # type: ignore[arg-type]
        current["body"] = build_xhs_body(current)
        current["bodyLength"] = len(str(current["body"]))
        prepared.append(current)

        article_path = ARTICLE_DIR / f"{int(current['index']):02d}_{current['slug']}.md"
        article_path.write_text(
            f"# {current['xhsTitle']}\n\n{current['body']}\n",
            encoding="utf-8",
        )

    (BATCH_DIR / "xhs-batch-2026-06-16.json").write_text(
        json.dumps(prepared, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    md_parts = ["# 小红书发布文案 2026-06-16", ""]
    for item in prepared:
        md_parts.extend(
            [
                f"## {item['index']}. {item['xhsTitle']}",
                "",
                f"- 建议发布时间：{item['scheduleTime']}",
                f"- 标签：{item['tagLine']}",
                "",
                str(item["body"]),
                "",
                "---",
                "",
            ]
        )
    (BATCH_DIR / "xhs-batch-2026-06-16.md").write_text("\n".join(md_parts), encoding="utf-8")
    return prepared


def write_analysis() -> None:
    rows = []
    for title, views, likes, comments in DATA_ROWS:
        rate = likes / views if views else 0
        rows.append((title, views, likes, comments, rate))
    rows_sorted = sorted(rows, key=lambda row: (row[2], row[1]), reverse=True)

    table_lines = [
        "| 笔记 | 浏览 | 点赞 | 评论 | 点赞率 |",
        "| --- | ---: | ---: | ---: | ---: |",
    ]
    for title, views, likes, comments, rate in rows:
        table_lines.append(f"| {title} | {views} | {likes} | {comments} | {rate:.1%} |")

    top_like_lines = "\n".join(
        f"- {title}：{views} 浏览 / {likes} 赞 / 点赞率 {rate:.1%}"
        for title, views, likes, comments, rate in rows_sorted[:5]
    )

    analysis = f"""# 小红书数据分析 2026-06-16

> 口径：根据这次提供的 3 张截图手动录入，只能作为小样本方向判断；部分 06-15 笔记发布时间更近，曝光还没完全跑完。

{chr(10).join(table_lines)}

## 主要结论

1. 曝光最高的是“人生不是考试，是系统”“先搭建人生操作台”“成熟不是变强而是变稳”。共同点是标题短、反差清楚、和普通人的长期焦虑强相关。
2. 点赞弹性最好的是“价值中心决定时间用法”，18 浏览拿到 5 赞，说明“时间怎么花=价值排序”这个角度值得继续扩写。
3. “人生问题是资源配置”有 51 浏览、3 赞、1 评论，是少数带评论的主题，说明资源配置/取舍类内容更容易引发讨论。
4. 深色光束封面这一批整体曝光偏低，可能和封面重复度高、标题过长、缩略图信息不够直接有关。后续小红书封面建议用更短标题，第一屏只放一个判断。
5. 不建议在小红书标题前加“01_”这类编号。系列感可以放在合集或正文里，标题位置优先给用户痛点和反差。

## 点赞排序参考

{top_like_lines}

## 本批选题策略

- 继续沿用“人生操作系统”的主线，但把标题写得更像用户正在遇到的问题。
- 放大“时间/价值排序”“资源配置”“反馈系统”“默认设置”这些已有正反馈主题。
- 每篇都保留一个可执行动作，降低纯鸡汤感。
- 小红书标题控制在 10-16 个汉字左右，封面只放短标题，不放完整长标题。
"""
    (BATCH_DIR / "analysis.md").write_text(analysis, encoding="utf-8")


async def write_audio_assets(prepared: list[dict[str, object]]) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    COVER_DIR.mkdir(parents=True, exist_ok=True)
    background = make_background()

    manifest = []
    for item in prepared:
        filename = safe_filename(str(item["sourceTitle"]), int(item["index"]))
        text_path = OUT_DIR / f"{filename}.txt"
        mp3_path = OUT_DIR / f"{filename}.mp3"
        cover_path = COVER_DIR / f"{filename}_封面.jpg"

        script = build_audio_script(item)
        text_path.write_text(script, encoding="utf-8")
        duration = await synthesize_chunked(text_path, mp3_path)
        cover = draw_cover(background, item)
        cover.save(cover_path, quality=95, subsampling=0)

        entry = {
            "index": item["index"],
            "title": item["sourceTitle"],
            "xhsTitle": item["xhsTitle"],
            "voice": VOICE,
            "rate": RATE,
            "volume": VOLUME,
            "pitch": PITCH,
            "chars": len(script),
            "durationSeconds": round(duration, 1),
            "meetsMinimumDuration": duration >= TARGET_MIN_SECONDS,
            "script": str(text_path),
            "mp3": str(mp3_path),
            "cover": str(cover_path),
            "bytes": mp3_path.stat().st_size,
        }
        manifest.append(entry)
        print(json.dumps(entry, ensure_ascii=False), flush=True)

    (OUT_DIR / "manifest-2026-06-16.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (BATCH_DIR / "audio-manifest-2026-06-16.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


async def main() -> None:
    prepared = write_text_assets()
    write_analysis()
    await write_audio_assets(prepared)
    print(json.dumps({"status": "done", "batchDir": str(BATCH_DIR), "audioDir": str(OUT_DIR)}, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    asyncio.run(main())
