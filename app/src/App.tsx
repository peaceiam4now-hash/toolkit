import './App.css'

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Web DAW Toolkit</h1>
        <p>Browser-based audio playground built on GH Pages.</p>
      </header>

      <main className="app-main">
        <section className="app-card">
          <h2>Phase 1: Playground Shell</h2>
          <p>
            This is the base React + Vite shell we&apos;ll use to assemble a
            modern Web Audio workstation. No server, fully static.
          </p>
          <ul>
            <li>React + Vite (GH Pages friendly)</li>
            <li>Web Audio API under the hood</li>
            <li>Reference engines from upstream DAWs</li>
          </ul>
        </section>

        <section className="app-card">
          <h2>Upstream Engines (read-only)</h2>
          <p>
            We keep reference implementations in <code>/upstreams</code>:
          </p>
          <ul>
            <li><code>opendaw</code> – modular Web Audio engine</li>
            <li><code>daw</code> – GridSound timeline &amp; UI</li>
            <li><code>webdaw-gh</code> – simple browser DAW concepts</li>
          </ul>
          <p>
            We&apos;ll pull concepts from these, not copy their UI verbatim.
          </p>
        </section>

        <section className="app-card">
          <h2>Status</h2>
          <p>Core scaffold is live. Next up: audio engine bootstrap.</p>
        </section>
      </main>
    </div>
  )
}

export default App
