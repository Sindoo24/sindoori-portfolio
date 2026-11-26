const RING_DOTS = Array.from({ length: 96 }, (_, i) => {
  const angle = (i / 96) * Math.PI * 2 - Math.PI / 2;
  return {
    i,
    cx: Number((92 * Math.cos(angle)).toFixed(2)),
    cy: Number((92 * Math.sin(angle)).toFixed(2)),
  };
});

export default function App() {
  return (
    <main className="page" data-phase="loading">
      <div className="stage" aria-hidden="true" />

      <div
        className="loader"
        role="progressbar"
        aria-label="Loading the dots"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <svg className="ring" viewBox="-110 -110 220 220" aria-hidden="true">
          {RING_DOTS.map(({ i, cx, cy }) => (
            <circle key={i} cx={cx} cy={cy} r={1.6} />
          ))}
        </svg>
        <span className="counter">000</span>
        <span className="label">66,000 dots</span>
      </div>

      <a className="logo" href="./">
        Sindoori.
      </a>
      <h1 className="name">Sindoori keshamoni</h1>
      <p className="tagline">Grows quiet things with AI</p>
      <p className="hint">Move the light</p>
      <a className="pill" href="./">
        How this page was made →
      </a>
    </main>
  );
}
