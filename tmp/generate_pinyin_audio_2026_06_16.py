from __future__ import annotations

import asyncio
import json
import re
import shutil
from pathlib import Path

import edge_tts
from mutagen.mp3 import MP3


ROOT = Path(r"C:\card\zyWeb\life-os-site")
BATCH_DIR = ROOT / "tmp" / "pinyin-audio-2026-06-16"
OUT_DIR = Path(r"C:\card\zyWeb\mp3") / "人生操作系统播客" / "pinyin-2026-06-16"

VOICE = "zh-CN-XiaoxiaoNeural"
RATE = "-8%"
VOLUME = "+0%"
PITCH = "+0Hz"
TARGET_MIN_SECONDS = 10 * 60
MIN_CHARS = 3300
MAX_CHARS = 4700
CHUNK_CHARS = 1200


SOURCE_ITEMS = [
    {
        "index": 11,
        "filename": "11_nu_li_hen_chang_jian_xi_tong_hen_xi_que",
        "source": "life-operating-system-preview.json",
        "slug": "chapter-1",
        "title": "努力很常见，系统很稀缺",
        "lead": "这一期从人生操作系统的总入口开始，讨论为什么目标很多、行动很多，并不自动等于人生变好。",
        "outro": "听完这一期，可以先不急着增加新目标，而是回头看一眼：你现在最重要的目标，有没有配套的行动流程、反馈机制和资源安排。",
    },
    {
        "index": 12,
        "filename": "12_ren_sheng_shou_xian_shi_zi_wo_zu_zhi_gong_cheng",
        "source": "life-operating-system-preview.json",
        "slug": "chapter-2",
        "title": "人生首先是一项自我组织工程",
        "lead": "这一期继续沿着人生操作系统的主线，谈一个更底层的判断：人生不是等来的，而是组织出来的。",
        "outro": "如果只做一个练习，就写下你本周最需要主动组织的三件事：一个时间安排，一个资源配置，一个反馈动作。",
    },
    {
        "index": 13,
        "filename": "13_cheng_dan_bu_shi_zi_ze",
        "source": "life-operating-system-preview.json",
        "slug": "chapter-3",
        "title": "承担不是自责，而是拿回主动权",
        "lead": "这一期谈责任。责任不是把自己压垮，而是在复杂现实里重新拿回可以行动的部分。",
        "outro": "真正有用的责任感，是问清楚下一步还能改变什么，而不是反复证明自己哪里不够好。",
    },
    {
        "index": 14,
        "filename": "14_jia_zhi_zhong_xin_jue_ding_qu_she",
        "source": "life-operating-system-preview.json",
        "slug": "chapter-6",
        "title": "价值中心决定人生取舍",
        "lead": "这一期聊价值中心。价值不是漂亮口号，而是每一次取舍背后的真实排序。",
        "outro": "你可以观察过去七天的时间流向。时间流向哪里，真实价值排序往往就在哪里。",
    },
    {
        "index": 15,
        "filename": "15_yang_chang_bi_duan_zi_yuan_pei_zhi",
        "source": "life-operating-system-preview.json",
        "slug": "chapter-7",
        "title": "扬长避短：资源配置高于平均用力",
        "lead": "这一期谈优势和资源配置。人生不是把所有短板补齐，而是把有限资源放到更能产生长期价值的地方。",
        "outro": "如果你正在平均用力，可以先选一个关键优势，把下周最好的时间留给它。",
    },
    {
        "index": 16,
        "filename": "16_gong_ju_bu_shi_da_an_er_shi_gang_gan",
        "source": "productivity-tools-preview.json",
        "slug": "chapter-1",
        "title": "工具不是答案，而是杠杆",
        "lead": "这一期切到效率工具。工具越来越强，但真正决定效率的，仍然是问题、流程和判断。",
        "outro": "工具不是越多越好。先保留能服务核心流程的工具，再删除那些只制造切换成本的工具。",
    },
    {
        "index": 17,
        "filename": "17_gong_ju_liu_cheng_ai_xiao_lv_xi_tong",
        "source": "productivity-tools-preview.json",
        "slug": "chapter-2",
        "title": "效率系统的核心，是目标、流程和工具",
        "lead": "这一期继续讲效率系统。真正高效的人，不是工具收藏多，而是目标、流程和工具能形成闭环。",
        "outro": "你可以检查一个正在推进的任务：目标是否清楚，流程是否稳定，工具是否真的在服务流程。",
    },
    {
        "index": 18,
        "filename": "18_wen_ti_bu_shi_yong_lai_ding_zhu_de",
        "source": "breakthrough-methods-preview.json",
        "slug": "chapter-1",
        "title": "问题不是用来顶住的，而是用来拆开的",
        "lead": "这一期进入破局方法。复杂问题最怕硬扛，真正的第一步，是把一团乱麻拆成可处理的小块。",
        "outro": "下次遇到让你慌的问题，先写下事实、情绪、变量和下一步动作。拆开之后，问题就不再是一团雾。",
    },
    {
        "index": 19,
        "filename": "19_wen_ti_ding_yi_cuo_le_hou_mian_quan_cuo",
        "source": "breakthrough-methods-preview.json",
        "slug": "chapter-2",
        "title": "问题定义错了，后面全错",
        "lead": "这一期谈问题定义。很多努力没有结果，不是执行不够，而是一开始处理的就不是那个真正的问题。",
        "outro": "行动之前，先把问题说对。一个被准确定义的问题，已经解决了一半。",
    },
    {
        "index": 20,
        "filename": "20_xin_xi_jie_zhi_bao_hu_pan_duan_li",
        "source": "productivity-tools-preview.json",
        "slug": "chapter-9",
        "title": "信息节制，是保护判断力的重要方式",
        "lead": "这一期谈信息管理。信息越多不等于判断越准，很多时候，减少噪音比增加输入更重要。",
        "outro": "今天可以先做一个小动作：关闭一个低价值信息源，把省下来的注意力留给一件真正重要的事。",
    },
]


def normalize(text: str) -> str:
    return re.sub(r"\s+", "", text)


def load_source_items(item: dict[str, object]) -> tuple[list[dict[str, object]], int]:
    source_path = ROOT / "content" / "books" / str(item["source"])
    chapters = json.loads(source_path.read_text(encoding="utf-8"))
    for index, chapter in enumerate(chapters):
        if chapter.get("slug") == item["slug"]:
            return chapters, index
    raise ValueError(f"missing slug {item['slug']} in {item['source']}")


def clean_paragraphs(chapter: dict[str, object], title: str) -> list[str]:
    paragraphs = [str(paragraph).strip() for paragraph in chapter["paragraphs"]]  # type: ignore[index]
    blocked = {normalize(title), normalize(str(chapter.get("title", ""))), normalize(str(chapter.get("section", "")))}
    result: list[str] = []
    seen: set[str] = set()
    for paragraph in paragraphs:
        key = normalize(paragraph)
        if not paragraph or key in blocked or key in seen:
            continue
        if len(key) < 18:
            continue
        result.append(paragraph)
        seen.add(key)
    return result


def collect_paragraphs(item: dict[str, object]) -> list[str]:
    chapters, start_index = load_source_items(item)
    ordered = chapters[start_index:] + chapters[:start_index]

    selected: list[str] = []
    total = 0
    seen: set[str] = set()
    for chapter_index, chapter in enumerate(ordered):
        raw_title = str(chapter.get("title", ""))
        chapter_title = raw_title.split("｜", 1)[-1] if "｜" in raw_title else raw_title
        if chapter_index > 0:
            transition = f"为了把这个主题放回更完整的系统里，我们再看同一套内容中的另一个相邻问题：{chapter_title}。"
            key = normalize(transition)
            selected.append(transition)
            seen.add(key)
            total += len(transition)

        for paragraph in clean_paragraphs(chapter, str(item["title"])):
            key = normalize(paragraph)
            if key in seen:
                continue
            if total + len(paragraph) > MAX_CHARS and total >= MIN_CHARS:
                return selected
            selected.append(paragraph)
            seen.add(key)
            total += len(paragraph)
            if total >= MIN_CHARS:
                return selected

    if total < MIN_CHARS:
        raise ValueError(f"source too short: {total} chars")
    return selected


def build_script(item: dict[str, object]) -> str:
    paragraphs = collect_paragraphs(item)
    lines = [
        f"你好，欢迎来到《人生操作系统播客》。本期主题：{item['title']}。",
        "",
        str(item["lead"]),
        "",
    ]
    for paragraph in paragraphs:
        lines.append(paragraph)
        lines.append("")
    lines.extend(
        [
            "最后，把这一期收束成一个行动提醒。",
            "",
            str(item["outro"]),
            "",
            "人生操作系统不是一套空洞概念，而是一种把判断、行动和反馈连接起来的长期实践。我们下一期继续。",
        ]
    )
    return "\n".join(lines).strip() + "\n"


def validate_script(item: dict[str, object], script: str) -> None:
    if len(script) < MIN_CHARS:
        raise ValueError(f"{item['filename']} script too short: {len(script)} chars")

    paragraphs = [normalize(paragraph) for paragraph in script.split("\n\n") if len(normalize(paragraph)) > 24]
    if len(paragraphs) != len(set(paragraphs)):
        raise ValueError(f"duplicate paragraph in {item['filename']}")

    seen_sentences: set[str] = set()
    for sentence in re.split(r"[。！？\n]", script):
        normalized_sentence = normalize(sentence)
        if len(normalized_sentence) < 28:
            continue
        if normalized_sentence in seen_sentences:
            raise ValueError(f"duplicate sentence in {item['filename']}: {sentence}")
        seen_sentences.add(normalized_sentence)


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
        chunk_text = chunk_dir / f"chunk_{chunk_index:03d}.txt"
        chunk_path = chunk_dir / f"chunk_{chunk_index:03d}.mp3"
        chunk_text.write_text(chunk, encoding="utf-8")
        await synthesize(chunk_text, chunk_path)
        chunk_paths.append(chunk_path)
        print(json.dumps({"file": mp3_path.name, "chunk": chunk_index, "bytes": chunk_path.stat().st_size}, ensure_ascii=False), flush=True)

    with mp3_path.open("wb") as output:
        for index, chunk_path in enumerate(chunk_paths):
            data = chunk_path.read_bytes()
            output.write(data if index == 0 else strip_id3v2(data))

    return float(MP3(str(mp3_path)).info.length)


async def main() -> None:
    BATCH_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    manifest = []
    preview_parts: list[str] = []
    for item in SOURCE_ITEMS:
        script = build_script(item)
        validate_script(item, script)
        filename = str(item["filename"])
        script_path = OUT_DIR / f"{filename}.txt"
        mp3_path = OUT_DIR / f"{filename}.mp3"
        script_path.write_text(script, encoding="utf-8")

        duration = await synthesize_chunked(script_path, mp3_path)
        if duration < TARGET_MIN_SECONDS:
            raise ValueError(f"{filename} duration too short: {duration:.1f}s")

        entry = {
            "index": item["index"],
            "title": item["title"],
            "filename": filename,
            "voice": VOICE,
            "rate": RATE,
            "volume": VOLUME,
            "pitch": PITCH,
            "chars": len(script),
            "durationSeconds": round(duration, 1),
            "meetsMinimumDuration": True,
            "script": str(script_path),
            "mp3": str(mp3_path),
            "bytes": mp3_path.stat().st_size,
            "source": item["source"],
            "slug": item["slug"],
        }
        manifest.append(entry)
        preview_parts.append(f"# {item['index']}. {item['title']}\n\n{script}")
        print(json.dumps(entry, ensure_ascii=False), flush=True)

    (OUT_DIR / "manifest-2026-06-16-pinyin.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (BATCH_DIR / "manifest-2026-06-16-pinyin.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (BATCH_DIR / "scripts-preview.md").write_text("\n\n---\n\n".join(preview_parts), encoding="utf-8")
    print(json.dumps({"status": "done", "outDir": str(OUT_DIR), "batchDir": str(BATCH_DIR)}, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    asyncio.run(main())
