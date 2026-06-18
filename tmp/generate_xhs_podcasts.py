from __future__ import annotations

import asyncio
import json
import re
import shutil
from pathlib import Path

import edge_tts
from mutagen.mp3 import MP3


ROOT = Path(r"C:\card\zyWeb\life-os-site")
SOURCE_DIR = ROOT / "content" / "articles" / "zh"
OUT_DIR = Path(r"C:\card\zyWeb\mp3") / "人生操作系统播客"

VOICE = "zh-CN-XiaoxiaoNeural"
RATE = "-8%"
VOLUME = "+0%"
PITCH = "+0Hz"
TARGET_MIN_SECONDS = 10 * 60
TARGET_CHARS = 4200
CHUNK_CHARS = 1200

ARTICLES = [
    "why-life-is-not-an-exam.md",
    "build-life-dashboard-before-goals.md",
    "wrong-direction-creates-system-debt.md",
    "know-what-your-life-system-optimizes.md",
    "maturity-means-stability.md",
]

MAX_ARTICLES = 0


TAG_MAP = {
    "Life OS": "人生操作系统",
    "Systems Thinking": "系统思维",
    "Long-Termism": "长期主义",
    "Decision Making": "决策思维",
    "Life Strategy": "人生规划",
    "Operating System": "个人系统",
    "Habits": "习惯养成",
    "Review": "复盘",
    "Long-Term Strategy": "长期策略",
    "Trade-Offs": "取舍",
    "First-Principles Thinking": "第一性原理",
    "Focus": "专注",
    "Self Awareness": "自我认知",
    "Growth": "个人成长",
    "Responsibility": "责任感",
    "Psychological Resilience": "心理韧性",
}


def parse_frontmatter(source: str) -> tuple[dict[str, object], str]:
    match = re.match(r"^---\n(.*?)\n---\n(.*)$", source, flags=re.S)
    if not match:
        return {}, source

    data: dict[str, object] = {}
    current_key: str | None = None
    for raw_line in match.group(1).splitlines():
        line = raw_line.rstrip()
        if not line:
            continue
        if line.startswith("  - ") and current_key:
            value = line[4:].strip().strip('"')
            data.setdefault(current_key, [])
            if isinstance(data[current_key], list):
                data[current_key].append(value)
            continue
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            current_key = key
            if value:
                data[key] = value.strip('"')
            else:
                data[key] = []

    return data, match.group(2)


def clean_markdown(markdown: str) -> list[str]:
    text = markdown.replace("\r\n", "\n")
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"^> ?", "", text, flags=re.M)
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.M)
    paragraphs = [p.strip() for p in re.split(r"\n{2,}", text) if p.strip()]
    return [p for p in paragraphs if p not in {"总结", "金句"}]


def safe_filename(name: str, index: int) -> str:
    cleaned = re.sub(r'[<>:"/\\|?*\s]+', "_", name).strip("_")
    return f"{index:02d}_{cleaned[:36]}"


def expand_point(paragraph: str, point_index: int) -> str:
    prompts = [
        "我们先把这句话放到日常生活里看。",
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
    prompt = prompts[(point_index - 1) % len(prompts)]
    followup = followups[(point_index - 1) % len(followups)]
    return f"{prompt}\n\n{paragraph}\n\n{followup}"


def build_script(index: int, article_file: str) -> dict[str, str | int]:
    source = (SOURCE_DIR / article_file).read_text(encoding="utf-8")
    meta, markdown = parse_frontmatter(source)
    paragraphs = clean_markdown(markdown)
    title = str(meta.get("title", article_file.removesuffix(".md")))
    summary = str(meta.get("summary", ""))
    tags = meta.get("tags", [])
    if not isinstance(tags, list):
        tags = []
    zh_tags = [TAG_MAP.get(str(tag), str(tag).replace(" ", "")) for tag in tags[:5]]

    core = paragraphs[:5] if len(paragraphs) >= 5 else paragraphs
    sections: list[str] = []
    sections.append(
        f"你好，欢迎来到《人生操作系统播客》。\n\n"
        f"这一期我们聊：{title}。\n\n"
        f"先说一句核心结论：{summary}\n\n"
        f"这期不讲大道理，我们把它拆成几个普通人真的能用的判断和行动。"
    )

    for i, paragraph in enumerate(core, 1):
        sections.append(f"第{i}部分。\n\n{expand_point(paragraph, i)}")

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
        f"这一期的关键词是：{'，'.join(zh_tags)}。\n\n"
        "如果你愿意，可以把这期当成一次安静的复盘。听完之后，不用立刻改变很多事。"
        "先选一个最小动作，让今天的系统，比昨天更清楚一点。\n\n"
        "这里是《人生操作系统播客》，我们下一期继续。"
    )

    base = "\n\n".join(sections)
    # Edge TTS Mandarin at this voice/rate is roughly 2300 Chinese chars/minute.
    # Keep a generous script so the final MP3 stays over Xiaohongshu's 10-minute minimum.
    reflections = [
        "如果你正在通勤、散步，或者睡前听这一段，可以先不用急着做笔记。你只需要把一个问题留在心里：我现在的系统，是在帮助我，还是在消耗我？很多时候，改变不是从更用力开始，而是从看见真实结构开始。",
        "再往深处看，很多所谓的人生困境，并不是没有答案，而是答案没有落到稳定流程里。我们知道要学习，知道要健康，知道要长期主义，但如果没有具体的时间、场景、反馈和复盘，这些好想法就会停在口号里。",
        "所以我更建议你把这期内容当成一个小工具。不是听完就热血，而是听完之后能多一个判断：这件事是在增加我的选择权，还是在减少我的选择权？是在建设长期资产，还是在制造系统负债？",
        "真正适合长期使用的方法，通常不会太刺激。它可能就是每周固定复盘一次，每天留出一段不被打扰的深度时间，或者在重要选择前写下自己的判断依据。动作很小，但只要持续，系统就会慢慢变得不一样。",
        "如果把人生看成一个长期系统，我们就会少一点自我攻击，多一点结构调整。问题出现时，不急着证明自己不行，也不急着证明别人错了，而是先看变量在哪里、反馈在哪里、下一步最小动作在哪里。",
        "对普通人来说，最珍贵的不是拥有完美计划，而是有一套能让自己不断回到正轨的机制。计划会变，环境会变，情绪也会变，但只要机制还在，人就不会轻易被一次波动带走。",
        "你也可以把今天的内容放进一个很小的练习里。晚上花五分钟写下三件事：今天我把注意力给了什么，哪个动作在建设长期价值，哪个动作只是在缓解焦虑。写得越具体，系统越容易被看见。",
        "很多长期变化，刚开始都不明显。就像存钱、锻炼、阅读、写作和关系维护，前几天看不出差别，前几周也不一定有反馈。但这些动作如果进入稳定节奏，就会慢慢改变一个人的底层状态。",
    ]
    script = base
    reflection_index = 0
    while len(script) < TARGET_CHARS:
        round_no = reflection_index // len(reflections) + 1
        script += "\n\n" + f"我们再从第{round_no}个角度把这个问题想深一点。\n\n"
        script += reflections[reflection_index % len(reflections)]
        reflection_index += 1

    return {
        "index": index,
        "title": title,
        "script": script,
        "chars": len(script),
        "filename": safe_filename(title, index),
    }


async def synthesize(script_path: Path, mp3_path: Path) -> None:
    communicate = edge_tts.Communicate(
        text=script_path.read_text(encoding="utf-8"),
        voice=VOICE,
        rate=RATE,
        volume=VOLUME,
        pitch=PITCH,
    )
    await communicate.save(str(mp3_path))


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
        print(json.dumps({"chunk": chunk_index, "path": str(chunk_path), "bytes": chunk_path.stat().st_size}, ensure_ascii=False))

    with mp3_path.open("wb") as output:
        for chunk_index, chunk_path in enumerate(chunk_paths):
            data = chunk_path.read_bytes()
            output.write(data if chunk_index == 0 else strip_id3v2(data))

    try:
        duration = float(MP3(str(mp3_path)).info.length)
    except Exception:
        duration = 0.0
    return duration


async def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    target_articles = ARTICLES[:MAX_ARTICLES] if MAX_ARTICLES else ARTICLES
    for index, article in enumerate(target_articles, 1):
        item = build_script(index, article)
        text_path = OUT_DIR / f"{item['filename']}.txt"
        mp3_path = OUT_DIR / f"{item['filename']}.mp3"
        text_path.write_text(str(item["script"]), encoding="utf-8")
        duration = await synthesize_chunked(text_path, mp3_path)
        manifest.append(
            {
                "index": index,
                "title": item["title"],
                "voice": VOICE,
                "rate": RATE,
                "chars": item["chars"],
                "durationSeconds": round(duration, 1),
                "meetsMinimumDuration": duration >= TARGET_MIN_SECONDS,
                "script": str(text_path),
                "mp3": str(mp3_path),
                "bytes": mp3_path.stat().st_size,
            }
        )
        print(json.dumps(manifest[-1], ensure_ascii=False))

    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    asyncio.run(main())
