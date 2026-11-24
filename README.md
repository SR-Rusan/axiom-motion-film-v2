# Axiom by Rusan — V2 Motion Identity Film

This is a new, independent 15-second vertical motion-design film built from a fresh composition and a fresh soundtrack. The live Axiom site was used as the creative source of truth:

<https://axiombyrusan.vercel.app/>

## Final master

`deliverables/axiom_by_rusan_v2_vertical.mp4`

- 1080 × 1920
- 9:16 vertical
- 30 FPS / 450 frames
- Exact 15.000-second container duration
- H.264 video / AAC audio

## Creative direction

The film’s single idea is **make the invisible operating layer legible**. It moves from the website’s founder-led operational diagnosis into a visible workflow trace:

1. The work behind the work
2. The drag layer
3. Make it legible
4. Axiom Core
5. From Bottleneck to System
6. AXIOM by Rusan

The detailed shot list, copy, visual system, and live-site analysis are in [`CREATIVE_DIRECTION.md`](./CREATIVE_DIRECTION.md).

## Run locally

```bash
npm install
npm run typecheck
npm run studio
```

Render the master again with:

```bash
npm run render
```

Open the showcase with:

```bash
python3 -m http.server 4173
```

Then visit <http://localhost:4173/>.
