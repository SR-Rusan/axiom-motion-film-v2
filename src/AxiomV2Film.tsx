import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type CSS = React.CSSProperties;

const C = {
  paper: '#FFFFFF',
  panel: '#FBFBFC',
  ink: '#25292D',
  muted: '#8C9697',
  faint: '#EEF0F1',
  border: '#E2E5E6',
  indigo: '#635BFF',
  indigoPale: '#ECEBFF',
  emerald: '#10B981',
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeOut = (frame: number, start: number, length: number) => interpolate(frame, [start, start + length], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
const fadeScene = (frame: number, duration: number) => interpolate(frame, [0, 10, duration - 10, duration], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const mono: CSS = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

const serif: CSS = {
  fontFamily: '"AXIOM Instrument", Georgia, serif',
  fontStyle: 'italic',
  fontWeight: 400,
};

function SiteChrome({ chapter }: { chapter: string }) {
  return (
    <div style={{ position: 'absolute', top: '3.6%', left: '8%', right: '8%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: C.muted, ...mono, fontSize: '1.72vw', whiteSpace: 'nowrap' }}>
      <span style={{ color: C.ink, fontWeight: 700 }}>✦ AXIOM / RUSAN</span>
      <span>{chapter}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.55em' }}><i style={{ width: '0.52em', height: '0.52em', borderRadius: '50%', background: C.emerald }} /> SYSTEMS OPERATIONAL</span>
    </div>
  );
}

function Grid() {
  return <AbsoluteFill style={{ backgroundColor: C.paper, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px), radial-gradient(circle at 50% 46%, ${C.indigoPale}, transparent 35%)`, backgroundSize: '42px 42px, 42px 42px, 100% 100%', opacity: 0.72 }} />;
}

function Trace({ progress, top = '40%', vertical = false, width = '75%' }: { progress: number; top?: string; vertical?: boolean; width?: string }) {
  return vertical ? (
    <div style={{ position: 'absolute', top: '14%', bottom: '9%', left: '10.5%', width: '1px', background: C.border }}>
      <div style={{ position: 'absolute', top: `${interpolate(progress, [0, 1], [0, 100])}%`, left: '-3px', width: '7px', height: '7px', borderRadius: '50%', background: C.indigo, boxShadow: `0 0 0 5px ${C.indigoPale}` }} />
    </div>
  ) : (
    <div style={{ position: 'absolute', top, left: '12%', width, height: 1, background: C.border }}>
      <div style={{ position: 'absolute', left: `${interpolate(progress, [0, 1], [0, 100])}%`, top: '-3px', width: '7px', height: '7px', borderRadius: '50%', background: C.indigo, boxShadow: `0 0 0 5px ${C.indigoPale}` }} />
    </div>
  );
}

function Scene({ children, opacity }: { children: React.ReactNode; opacity: number }) {
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}

function HiddenLayer() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const first = spring({ frame, fps, config: { damping: 17, stiffness: 115, mass: 0.7 } });
  const second = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 17, stiffness: 120, mass: 0.7 } });
  const third = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 16, stiffness: 125, mass: 0.65 } });
  const trace = easeOut(frame, 7, 47);
  return <Scene opacity={fadeScene(frame, 66)}>
    <SiteChrome chapter="01 / THE INVISIBLE LAYER" />
    <Trace progress={trace} vertical />
    <div style={{ position: 'absolute', left: '15%', top: '20%', width: '76%' }}>
      <div style={{ ...mono, color: C.indigo, fontSize: '1.9vw', fontWeight: 700, marginBottom: '4.2vh' }}>FIELD NOTE / 001</div>
      <div style={{ overflow: 'hidden' }}><div style={{ color: C.ink, fontSize: '12.7vw', letterSpacing: '-0.095em', lineHeight: 0.82, fontWeight: 850, transform: `translateX(${interpolate(first, [0, 1], [-16, 0])}%)` }}>THE WORK</div></div>
      <div style={{ overflow: 'hidden', marginTop: '1.3vh' }}><div style={{ ...serif, color: C.indigo, fontSize: '14.7vw', letterSpacing: '-0.065em', lineHeight: 0.82, transform: `translateX(${interpolate(second, [0, 1], [18, 0])}%)` }}>behind</div></div>
      <div style={{ overflow: 'hidden', marginTop: '1.6vh' }}><div style={{ color: C.ink, fontSize: '12.7vw', letterSpacing: '-0.095em', lineHeight: 0.82, fontWeight: 850, transform: `translateX(${interpolate(third, [0, 1], [-14, 0])}%)` }}>THE WORK.</div></div>
    </div>
    <div style={{ position: 'absolute', left: '15%', bottom: '11%', display: 'flex', gap: '1em', alignItems: 'center', color: C.muted, ...mono, fontSize: '1.7vw' }}><span style={{ color: C.indigo }}>hidden friction</span><span>/</span><span>visible signal</span></div>
    <div style={{ position: 'absolute', left: '8%', right: '8%', bottom: '8%', height: 1, background: C.border }} />
  </Scene>;
}

type Fragment = { label: string; title: string; detail: string; x: number; y: number; rotate: number };
const fragments: Fragment[] = [
  { label: 'WEB FORM', title: 'NEW INQUIRY', detail: 'waiting for a reply', x: 9, y: 37, rotate: -5 },
  { label: 'GMAIL', title: 'FOLLOW-UP', detail: 'draft not sent', x: 53, y: 28, rotate: 6 },
  { label: 'CRM / SHEETS', title: 'LEAD RECORD', detail: 'context missing', x: 17, y: 59, rotate: 4 },
  { label: 'AIRTABLE / HUBSPOT', title: 'PIPELINE', detail: 'manual update', x: 57, y: 61, rotate: -7 },
];

function FragmentTile({ item, index }: { item: Fragment; index: number }) {
  const frame = useCurrentFrame();
  const entry = easeOut(frame, index * 5, 20);
  const drift = Math.sin((frame + index * 12) / 10) * 1.2;
  return <div style={{ position: 'absolute', left: `${item.x}%`, top: `${item.y}%`, width: '34%', padding: '3.1vw 2.8vw', background: 'rgba(255,255,255,0.92)', border: `1px solid ${C.border}`, borderRadius: '0.7vw', boxShadow: '0 18px 44px rgba(37,41,45,0.08)', transform: `translate(${interpolate(entry, [0, 1], [index % 2 ? 18 : -18, 0])}%, ${interpolate(entry, [0, 1], [index * 8, 0])}%) rotate(${item.rotate + drift}deg)`, opacity: entry }}>
    <div style={{ ...mono, color: C.muted, fontSize: '1.28vw', whiteSpace: 'nowrap' }}>{item.label}</div>
    <div style={{ color: C.ink, fontSize: '2.75vw', fontWeight: 800, letterSpacing: '-0.055em', marginTop: '1.2em' }}>{item.title}</div>
    <div style={{ color: C.muted, fontSize: '1.55vw', marginTop: '0.65em' }}>{item.detail}</div>
    <div style={{ display: 'flex', gap: '0.45em', marginTop: '1.3em' }}>{[0, 1, 2, 3, 4].map((dot) => <i key={dot} style={{ width: '0.75vw', height: '0.75vw', background: index % 2 ? '#D8D4FF' : C.border, borderRadius: '50%' }} />)}</div>
  </div>;
}

function Bottleneck() {
  const frame = useCurrentFrame();
  const trace = easeOut(frame, 8, 55);
  return <Scene opacity={fadeScene(frame, 83)}>
    <SiteChrome chapter="02 / THE DRAG LAYER" />
    <Trace progress={trace} top="50%" width="76%" />
    <div style={{ position: 'absolute', left: '9%', top: '13%', width: '82%' }}>
      <div style={{ ...mono, color: C.muted, fontSize: '1.8vw' }}>OPERATIONAL AUDIT / 002</div>
      <div style={{ color: C.ink, fontSize: '8.8vw', lineHeight: 0.9, fontWeight: 850, letterSpacing: '-0.09em', marginTop: '2.5vh' }}>EVERY DAY HAS</div>
      <div style={{ ...serif, color: C.indigo, fontSize: '10.2vw', lineHeight: 0.88, letterSpacing: '-0.06em', marginTop: '1.5vh' }}>a drag layer.</div>
    </div>
    <div style={{ position: 'absolute', inset: 0 }}>{fragments.map((item, index) => <FragmentTile key={item.label} item={item} index={index} />)}</div>
    <div style={{ position: 'absolute', left: '9%', bottom: '7.5%', color: C.muted, ...mono, fontSize: '1.55vw' }}>REQUEST <span style={{ color: C.indigo }}>↗</span> REPEAT <span style={{ color: C.indigo }}>↗</span> REPLY</div>
  </Scene>;
}

function Intelligence() {
  const frame = useCurrentFrame();
  const network = easeOut(frame, 5, 65);
  const lineOffset = interpolate(network, [0, 1], [1000, 0]);
  const scan = interpolate(network, [0, 1], [-12, 112]);
  return <Scene opacity={fadeScene(frame, 83)}>
    <SiteChrome chapter="03 / STRUCTURED INTELLIGENCE" />
    <Trace progress={network} vertical />
    <div style={{ position: 'absolute', top: '13%', width: '100%', textAlign: 'center' }}>
      <div style={{ ...mono, color: C.indigo, fontSize: '1.85vw', fontWeight: 700 }}>TURN SIGNAL INTO STRUCTURE</div>
      <div style={{ color: C.ink, fontSize: '11vw', lineHeight: 0.86, letterSpacing: '-0.10em', fontWeight: 900, marginTop: '2vh' }}>MAKE IT</div>
      <div style={{ ...serif, color: C.indigo, fontSize: '13vw', lineHeight: 0.86, letterSpacing: '-0.07em' }}>legible.</div>
    </div>
    <div style={{ position: 'absolute', left: '10%', right: '8%', top: '49%', height: '23%' }}>
      <svg viewBox="0 0 900 220" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <path d="M20 110 C160 110 180 36 310 36 S435 184 555 184 S700 50 880 50" fill="none" stroke={C.border} strokeWidth="2" />
        <path d="M20 110 C160 110 180 36 310 36 S435 184 555 184 S700 50 880 50" fill="none" stroke={C.indigo} strokeWidth="3" strokeDasharray="1000" strokeDashoffset={lineOffset} />
        <circle cx={interpolate(network, [0, 1], [20, 880])} cy={interpolate(network, [0, 1], [110, 50])} r="8" fill={C.indigo} />
      </svg>
      <div style={{ position: 'absolute', top: `${scan}%`, left: '0%', height: '100%', width: '1px', background: C.indigo, boxShadow: `0 0 20px ${C.indigo}` }} />
      {[
        ['INPUT', 'inquiry'],
        ['CONTEXT', 'structured'],
        ['ACTION', 'handoff'],
      ].map(([label, detail], index) => {
        const p = easeOut(frame, 14 + index * 8, 23);
        return <div key={label} style={{ position: 'absolute', left: `${index * 37 + 2}%`, top: `${index % 2 ? 55 : 9}%`, opacity: p, transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)` }}><div style={{ ...mono, color: C.indigo, fontSize: '1.35vw' }}>{label}</div><div style={{ color: C.ink, fontSize: '2.1vw', fontWeight: 750, marginTop: '0.5em' }}>{detail}</div></div>;
      })}
    </div>
    <div style={{ position: 'absolute', left: '12%', right: '12%', bottom: '10%', display: 'flex', justifyContent: 'space-between', ...mono, color: C.muted, fontSize: '1.45vw' }}><span>PRIVATE API ENDPOINTS</span><span>STRUCTURED OUTPUT</span><span style={{ color: C.emerald }}>✓ READY</span></div>
  </Scene>;
}

function Core() {
  const frame = useCurrentFrame();
  const progress = easeOut(frame, 3, 98);
  const packet = interpolate(progress, [0, 1], [4, 96]);
  const graph = interpolate(progress, [0, 1], [730, 0]);
  const status = easeOut(frame, 48, 14);
  return <Scene opacity={fadeScene(frame, 113)}>
    <SiteChrome chapter="04 / AXIOM CORE" />
    <div style={{ position: 'absolute', left: '7%', top: '11%', width: '86%', height: '73%', background: 'rgba(255,255,255,0.95)', border: `1px solid ${C.border}`, borderRadius: '1vw', boxShadow: '0 24px 70px rgba(37,41,45,0.10)', overflow: 'hidden' }}>
      <div style={{ height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 3.5vw', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65em', fontSize: '2.7vw', fontWeight: 750, letterSpacing: '-0.06em' }}><span style={{ color: C.indigo }}>✦</span> Axiom Core</div>
        <div style={{ ...mono, color: C.muted, fontSize: '1.1vw' }}>AUTOMATION OVERVIEW &nbsp; / &nbsp; RUSAN</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '35% 65%', height: '90%' }}>
        <div style={{ padding: '3.3vw 2.8vw', borderRight: `1px solid ${C.border}`, background: C.panel }}>
          <div style={{ ...mono, color: C.muted, fontSize: '1.3vw' }}>ACTIVE RUN / 01</div>
          <div style={{ color: C.ink, fontSize: '3.25vw', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.065em', marginTop: '1.1em' }}>Inquiry<br />to CRM</div>
          <div style={{ marginTop: '3.5vw', display: 'grid', gap: '1vw' }}>{['Website form', 'AI context', 'CRM / Sheets'].map((item, index) => <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.7em', color: index === 2 ? C.emerald : C.muted, fontSize: '1.45vw' }}><span style={{ width: '0.65em', height: '0.65em', borderRadius: '50%', border: `1px solid ${index === 2 ? C.emerald : C.border}`, background: index === 2 ? C.emerald : C.paper }} />{item}</div>)}</div>
          <div style={{ position: 'absolute', left: '10%', bottom: '9%', ...mono, color: C.indigo, fontSize: '1.2vw' }}>DIRECT ENGINEERING</div>
        </div>
        <div style={{ padding: '3.3vw 2.8vw', position: 'relative' }}>
          <div style={{ color: C.ink, fontSize: '2vw', fontWeight: 750, letterSpacing: '-0.04em' }}>New inquiry submitted on website form</div>
          <div style={{ color: C.muted, fontSize: '1.45vw', marginTop: '0.8em' }}>Axiom is sorting signal from the incoming noise.</div>
          <div style={{ marginTop: '3vw', border: `1px solid ${C.border}`, borderRadius: '0.7vw', padding: '1.8vw 2vw' }}>
            <div style={{ ...mono, color: C.indigo, fontSize: '1.2vw' }}>AUTONOMOUS LEAD QUALIFICATION &amp; CRM SYNC</div>
            <div style={{ height: '1px', background: C.border, margin: '2vw 0 1.4vw' }}>
              <div style={{ position: 'relative', left: `${packet}%`, top: '-4px', width: '9px', height: '9px', borderRadius: '50%', background: C.indigo, boxShadow: `0 0 0 6px ${C.indigoPale}` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: C.muted, ...mono, fontSize: '1vw' }}><span>PARSED</span><span>ENRICHED</span><span style={{ color: C.emerald }}>DISPATCHED</span></div>
          </div>
          <div style={{ marginTop: '1.3vw', border: `1px solid ${C.border}`, padding: '1.3vw 1.7vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: C.ink, fontSize: '1.4vw' }}>Automated CRM Lead Enrichment &amp; Tagging</span><span style={{ color: status > 0.5 ? C.emerald : C.muted, ...mono, fontSize: '1vw' }}>{status > 0.5 ? '✓ COMPLETE' : 'RUNNING'}</span></div>
          <svg viewBox="0 0 700 120" style={{ width: '100%', height: '8vw', marginTop: '2.1vw', overflow: 'visible' }}><path d="M0 92 C85 86 100 28 180 55 S300 104 390 40 S510 18 700 64" fill="none" stroke={C.indigoPale} strokeWidth="18" /><path d="M0 92 C85 86 100 28 180 55 S300 104 390 40 S510 18 700 64" fill="none" stroke={C.indigo} strokeWidth="3" strokeDasharray="730" strokeDashoffset={graph} /></svg>
          <div style={{ position: 'absolute', right: '3.5vw', bottom: '3.1vw', color: C.emerald, ...mono, fontSize: '1.1vw' }}>● SYSTEMS OPERATIONAL</div>
        </div>
      </div>
    </div>
  </Scene>;
}

function Transformation() {
  const frame = useCurrentFrame();
  const p = easeOut(frame, 6, 65);
  const arrow = easeOut(frame, 18, 34);
  return <Scene opacity={fadeScene(frame, 83)}>
    <SiteChrome chapter="05 / THE HANDOFF" />
    <div style={{ position: 'absolute', left: '9%', top: '15%', width: '82%' }}>
      <div style={{ ...mono, color: C.muted, fontSize: '1.75vw' }}>A MEASURABLE CHANGE OF STATE</div>
      <div style={{ color: C.ink, fontSize: '8.9vw', fontWeight: 850, lineHeight: 0.88, letterSpacing: '-0.09em', marginTop: '2.3vh' }}>FROM</div>
      <div style={{ ...serif, color: C.indigo, fontSize: '11vw', lineHeight: 0.82, letterSpacing: '-0.07em' }}>bottleneck</div>
    </div>
    <div style={{ position: 'absolute', left: '9%', right: '9%', top: '51%', height: '1px', background: C.border }}>
      <div style={{ position: 'absolute', left: `${interpolate(arrow, [0, 1], [0, 100])}%`, top: '-4px', width: '9px', height: '9px', background: C.indigo, borderRadius: '50%', boxShadow: `0 0 0 7px ${C.indigoPale}` }} />
      <div style={{ position: 'absolute', left: `${interpolate(arrow, [0, 1], [18, 78])}%`, top: '-0.9vw', color: C.indigo, fontSize: '2.8vw', opacity: arrow }}>→</div>
    </div>
    <div style={{ position: 'absolute', left: '9%', top: '57%', color: C.ink, fontSize: '9.2vw', fontWeight: 850, lineHeight: 0.85, letterSpacing: '-0.09em', opacity: p, transform: `translateY(${interpolate(p, [0, 1], [26, 0])}px)` }}>TO SYSTEM</div>
    <div style={{ position: 'absolute', left: '9%', right: '9%', bottom: '9%', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}><div style={{ color: C.muted, fontSize: '1.7vw', maxWidth: '55%' }}>Custom automations delivered in <span style={{ color: C.ink }}>7–14 days.</span></div><div style={{ ...mono, color: C.indigo, fontSize: '1.35vw', textAlign: 'right' }}>DIRECT ADVISORY<br />WITH RUSAN</div></div>
  </Scene>;
}

function Reveal() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inFrame = spring({ frame, fps, config: { damping: 13, stiffness: 90, mass: 0.58 } });
  const pulse = 1 + Math.sin(frame / 8) * 0.028;
  return <Scene opacity={fadeScene(frame, 66)}>
    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 38%, ${C.indigoPale}, transparent 32%)` }} />
    <SiteChrome chapter="06 / AXIOM" />
    <div style={{ position: 'absolute', top: '20%', width: '100%', textAlign: 'center', ...mono, color: C.indigo, fontSize: '1.8vw' }}>✦ RUSAN / AI AUTOMATION STUDIO</div>
    <div style={{ position: 'absolute', top: '29%', width: '100%', textAlign: 'center', transform: `scale(${interpolate(inFrame, [0, 1], [0.6, 1]) * pulse})`, opacity: inFrame }}><div style={{ color: C.indigo, fontSize: '20vw', lineHeight: 0.65, filter: `drop-shadow(0 0 4vw rgba(99,91,255,0.25))` }}>✦</div></div>
    <div style={{ position: 'absolute', top: '45%', width: '100%', textAlign: 'center', opacity: inFrame }}>
      <div style={{ color: C.ink, fontSize: '18vw', lineHeight: 0.72, fontWeight: 900, letterSpacing: '-0.12em' }}>AXIOM</div>
      <div style={{ ...serif, color: C.muted, fontSize: '5.3vw', marginTop: '1.1em' }}>by Rusan</div>
      <div style={{ ...mono, color: C.indigo, fontSize: '1.55vw', marginTop: '3.2vw' }}>AI AUTOMATION FOR GROWING BUSINESSES</div>
    </div>
    <div style={{ position: 'absolute', top: '75%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.4vw', opacity: inFrame }}><div style={{ background: C.ink, color: C.paper, padding: '2.2vw 4vw', fontSize: '2.2vw', fontWeight: 700 }}>Request 20-Min Discovery Session <span style={{ color: '#BDB8FF' }}>→</span></div><div style={{ color: C.emerald, ...mono, fontSize: '1.45vw' }}>● SYSTEMS OPERATIONAL</div></div>
  </Scene>;
}

export const AxiomV2Film: React.FC = () => (
  <AbsoluteFill style={{ background: C.paper, color: C.ink, overflow: 'hidden', fontFamily: '"AXIOM Inter", Inter, Arial, sans-serif' }}>
    <style>{`
      @font-face { font-family: "AXIOM Instrument"; font-style: italic; font-weight: 400; src: url(${staticFile('InstrumentSerif-Italic.woff2')}) format("woff2"); }
      @font-face { font-family: "AXIOM Inter"; font-style: normal; font-weight: 100 900; src: url(${staticFile('Inter-Variable.woff2')}) format("woff2"); }
    `}</style>
    <Grid />
    <Sequence from={0} durationInFrames={66}><HiddenLayer /></Sequence>
    <Sequence from={58} durationInFrames={83}><Bottleneck /></Sequence>
    <Sequence from={132} durationInFrames={83}><Intelligence /></Sequence>
    <Sequence from={207} durationInFrames={113}><Core /></Sequence>
    <Sequence from={309} durationInFrames={83}><Transformation /></Sequence>
    <Sequence from={384} durationInFrames={66}><Reveal /></Sequence>
    <Audio src={staticFile('axiom_v2_soundtrack.wav')} volume={0.6} />
  </AbsoluteFill>
);
