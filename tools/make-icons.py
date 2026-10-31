#!/usr/bin/env python3
"""Generates the favicon, Apple touch icon and PWA icons from the round logo.
Usage (from the repository root):   python3 tools/make-icons.py
Needs Pillow:                        pip install pillow
Input : ui/skin/logo-round.png (or .webp) with a transparent background.
Output: favicon.ico, icons/*.png
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
src = next((p for p in (ROOT / "ui/skin/logo-round.png", ROOT / "ui/skin/logo-round.webp") if p.exists()), None)
if not src: raise SystemExit("logo-round.png / .webp not found in ui/skin/")
logo = Image.open(src).convert("RGBA")
BG = (11, 12, 14, 255)   # same dark as the game

def square(size, pad, opaque=True):
    """Logo centered in a size x size square. pad = fraction of the side kept free on each side."""
    canvas = Image.new("RGBA", (size, size), BG if opaque else (0, 0, 0, 0))
    box = size * (1 - 2 * pad)
    s = min(box / logo.width, box / logo.height)
    l = logo.resize((max(1, round(logo.width * s)), max(1, round(logo.height * s))), Image.LANCZOS)
    canvas.alpha_composite(l, ((size - l.width) // 2, (size - l.height) // 2))
    return canvas

out = ROOT / "icons"; out.mkdir(exist_ok=True)
square(180, .10).convert("RGB").save(out / "apple-touch-icon.png")                 # iOS: opaque square, no transparency
square(192, .08).save(out / "icon-192.png"); square(512, .08).save(out / "icon-512.png")   # PWA "any"
square(192, .20).save(out / "icon-maskable-192.png"); square(512, .20).save(out / "icon-maskable-512.png")   # PWA maskable (safe zone 80 %)
for n in (16, 32, 48): square(n, .02, opaque=False).save(out / f"favicon-{n}.png")
square(48, .02, opaque=False).save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("done:", sorted(p.name for p in out.iterdir()))
