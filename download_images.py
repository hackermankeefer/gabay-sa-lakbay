#!/usr/bin/env python3
"""Download verified local image assets from images.csv and build credits rows."""

from __future__ import annotations

import csv
import html
import io
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parent
CSV_PATH = ROOT / "images.csv"
IMAGES_DIR = ROOT / "public" / "images"
CREDITS_PATH = ROOT / "credits-rows.txt"
MAX_WIDTH = 1600
MAX_BYTES = 400 * 1024


def make_credit_rows(rows: list[dict[str, str]]) -> str:
    result = []
    for row in rows:
        keys = ("filename", "destination", "photographer", "source", "license")
        vals = [row.get(k, "") or "To be filled" for k in keys]
        page_url = (row.get("page_url") or "").strip()
        link_cell = (f'<a href="{html.escape(page_url, quote=True)}" target="_blank" rel="noopener noreferrer">Image page</a>'
                     if page_url and page_url.upper() != "NOT FOUND" else "To be filled")
        result.append("<tr>" + "".join(f"<td>{html.escape(v)}</td>" for v in vals) + f"<td>{link_cell}</td></tr>")
    return "\n".join(result) + "\n"


def optimize(data: bytes, filename: str) -> bytes:
    try:
        from PIL import Image
    except ImportError:
        print("Pillow is not installed; keeping downloaded image dimensions and encoding.")
        return data

    try:
        with Image.open(io.BytesIO(data)) as im:
            im.load()
            if im.width > MAX_WIDTH:
                height = round(im.height * MAX_WIDTH / im.width)
                im = im.resize((MAX_WIDTH, height), Image.Resampling.LANCZOS)
            output = io.BytesIO()
            if filename.lower().endswith(".png"):
                im.convert("RGBA" if "A" in im.getbands() else "RGB").save(output, "PNG", optimize=True)
            else:
                rgb = im.convert("RGB")
                for quality in (88, 82, 76, 70, 64, 58, 52):
                    output = io.BytesIO()
                    rgb.save(output, "JPEG", quality=quality, optimize=True)
                    if output.tell() <= MAX_BYTES:
                        break
            return output.getvalue()
    except Exception as exc:
        print(f"Could not optimize {filename}: {exc}; keeping original download.")
        return data


def thumbnail_url(url: str) -> str:
    parsed = urlsplit(url)
    marker = "/wikipedia/commons/"
    if parsed.netloc != "upload.wikimedia.org" or marker not in parsed.path:
        return url
    parts = parsed.path.split(marker, 1)[1].split("/", 2)
    if len(parts) != 3:
        return url
    first, second, filename = parts
    path = f"/wikipedia/commons/thumb/{first}/{second}/{filename}/1280px-{filename}"
    return urlunsplit(parsed._replace(path=path, query="", fragment=""))


def main() -> int:
    if not CSV_PATH.exists():
        print(f"Missing CSV: {CSV_PATH}", file=sys.stderr)
        return 2

    with CSV_PATH.open(newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    failures = 0
    for row in rows:
        filename = (row.get("filename") or "").strip()
        url = (row.get("url") or "").strip()
        if not filename or not url or url.upper() == "NOT FOUND":
            print(f"Skipped: {filename or '(missing filename)'} (empty or NOT FOUND URL)")
            continue
        if Path(filename).name != filename or not filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
            print(f"Failed: unsafe or unsupported filename {filename!r}")
            failures += 1
            continue
        target = IMAGES_DIR / filename
        if target.exists():
            print(f"Already present: {filename}")
            continue
        request = urllib.request.Request(thumbnail_url(url), headers={"User-Agent": "GabaySaLakbayStudentProject/1.0"})
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                raw = response.read()
            content = optimize(raw, filename)
            target.write_bytes(content)
            print(f"Saved: {filename} ({len(content) / 1024:.0f} KB)")
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            print(f"Failed: {filename}: {exc}")
            failures += 1
        time.sleep(2)

    CREDITS_PATH.write_text(make_credit_rows(rows), encoding="utf-8")
    print(f"Wrote {CREDITS_PATH.name} with {len(rows)} rows.")
    print(f"Download failures: {failures}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
