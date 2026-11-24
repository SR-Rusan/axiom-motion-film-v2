"""Create a fresh, deterministic 15-second electronic bed for the V2 film."""

from math import exp, pi, sin
from pathlib import Path
import random
import struct
import wave


RATE = 44100
SECONDS = 15.0
TOTAL = int(RATE * SECONDS)
BEAT = 60.0 / 112.0
rng = random.Random(20261004)
mix = [0.0] * TOTAL


def tone(start: float, length: float, hz: float, level: float, release: float = 4.0) -> None:
    begin = int(start * RATE)
    end = min(TOTAL, int((start + length) * RATE))
    for index in range(max(0, begin), end):
        t = index / RATE - start
        envelope = min(1.0, t * 100.0) * exp(-release * t / max(length, 0.01))
        mix[index] += sin(2.0 * pi * hz * t) * level * envelope


def click(start: float, level: float = 0.045) -> None:
    begin = int(start * RATE)
    for offset in range(int(0.028 * RATE)):
        index = begin + offset
        if index >= TOTAL:
            break
        t = offset / RATE
        mix[index] += (rng.random() * 2.0 - 1.0) * level * exp(-135.0 * t)


def thump(start: float, level: float) -> None:
    begin = int(start * RATE)
    for offset in range(int(0.20 * RATE)):
        index = begin + offset
        if index >= TOTAL:
            break
        t = offset / RATE
        hz = 128.0 - 78.0 * min(1.0, t / 0.14)
        mix[index] += sin(2.0 * pi * hz * t) * level * exp(-21.0 * t)


# A restrained pulse: the first half is sparse, the system section gets denser.
for beat_index in range(int(SECONDS / BEAT) + 1):
    start = beat_index * BEAT
    thump(start, 0.46 if beat_index % 4 == 0 else 0.24)
    tone(start, BEAT * 0.72, 58.0, 0.09, 3.4)
    click(start + BEAT * 0.5, 0.04)
    if start > 4.5:
        click(start + BEAT * 0.25, 0.025)
        click(start + BEAT * 0.75, 0.025)

# Slow, clean harmonic movement underneath the editorial type.
for start, hz in [(0.0, 196.0), (3.8, 246.94), (6.8, 293.66), (10.4, 220.0), (13.0, 392.0)]:
    tone(start, 3.1, hz, 0.065, 1.9)
    tone(start, 3.1, hz * 2.0, 0.018, 2.3)

# One structural snap and three small system chimes.
for start, hz, level in [(4.55, 783.99, 0.16), (6.8, 987.77, 0.09), (9.1, 1174.66, 0.08), (13.05, 1567.98, 0.13), (13.55, 1975.53, 0.10), (14.15, 2349.32, 0.08)]:
    tone(start, 0.34, hz, level, 7.5)

peak = max(abs(value) for value in mix) or 1.0
gain = 0.74 / peak
output = Path(__file__).resolve().parents[1] / "public" / "axiom_v2_soundtrack.wav"
with wave.open(str(output), "wb") as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(RATE)
    wav_file.writeframes(b"".join(struct.pack("<h", int(max(-1.0, min(1.0, value * gain)) * 32767)) for value in mix))

print(f"Generated {output} at {SECONDS:.2f}s")
