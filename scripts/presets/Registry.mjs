import { MODULE_ID } from '../constants.mjs';

const _presets = new Map();

export function getPresets() {
  return _presets;
}

export function getPreset(id) {
  return _presets.get(id);
}

export function registerPreset(id, config) {
  if (_presets.has(id)) {
    console.warn(`${MODULE_ID} | Preset "${id}" already registered. Overwriting.`);
  }
  _presets.set(id, config);
}

export function initDefaultPresets() {
  registerPreset('amber-terminal', {
    id: 'amber-terminal',
    label: `${MODULE_ID}.presets.amber-terminal.label`,
    description: `${MODULE_ID}.presets.amber-terminal.description`,
    theme: {
      fontColor: '#f0d000',
      fontSize: 28,
      fontFamily: "'Share Tech Mono', 'Courier New', monospace",
      bgColor: '#0a0800',
      accentColor: '#ffaa00',
      bgOpacity: 0.95
    },
    effects: { dom: ['scanlines', 'glitch-line'], canvas: [] },
    fullscreen: true,
    customCSS: [
      '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}',
      '@keyframes gs{0%{top:0;opacity:0}3%{opacity:.8}6%{opacity:0}25%{top:25%;opacity:0}28%{opacity:.9}31%{opacity:0}55%{top:55%;opacity:0}58%{opacity:.6}61%{opacity:0}80%{top:80%;opacity:0}83%{opacity:1}86%{opacity:0}100%{top:100%;opacity:0}}',
      '@keyframes pf{0%{width:0}30%{width:35%}60%{width:68%}85%{width:88%}100%{width:100%}}',
      '@keyframes lp{0%,100%{box-shadow:0 0 15px rgba(218,41,28,.06),inset 0 0 15px rgba(218,41,28,.04)}50%{box-shadow:0 0 30px rgba(218,41,28,.12),inset 0 0 25px rgba(218,41,28,.08)}}',
      '@keyframes sw{0%{left:-100%}100%{left:100%}}',
      '.gl{position:fixed;left:0;width:100%;height:2px;background:#f0d000;z-index:99;box-shadow:0 0 10px #f0d000,0 0 30px #f0d000;opacity:0;animation:gs 6s linear infinite}',
      '.pt{width:100%;height:10px;background:rgba(240,208,0,.08);border:1px solid rgba(240,208,0,.2);overflow:hidden}',
      '.pf{height:100%;width:0;background:linear-gradient(90deg,#da291c,#f0d000);box-shadow:0 0 15px rgba(240,208,0,.3);animation:pf 3.5s ease-out .8s forwards}',
      '.lb{width:200px;height:3px;background:rgba(240,208,0,.06);position:relative;overflow:hidden;margin:8px auto 0}',
      '.lb:before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,#f0d000,transparent);animation:sw 2.5s ease-in-out infinite}'
    ].join(' '),
    rawContent: [
      '<div style="font-family:Share Tech Mono,monospace;text-align:center;padding:40px;width:100%;height:100vh;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#0a0a0a">',
      '<div class="gl"></div>',
      '<div style="max-width:780px;width:90%;padding:40px 50px;border:1px solid rgba(240,208,0,.25);box-shadow:0 0 20px rgba(240,208,0,.08),inset 0 0 20px rgba(240,208,0,.04);background:rgba(10,10,10,.92)">',
      '<div style="display:flex;justify-content:space-between;font-size:.6em;color:rgba(240,208,0,.4);letter-spacing:2px;margin-bottom:30px;text-transform:uppercase"><span>NOVA-RED NET v4.2</span><span style="animation:blink 1.2s step-end infinite">&#9679; EN LINEA</span><span>2045 d.C.</span></div>',
      '<div style="text-align:center;margin:20px 0 25px;padding:15px;border:1px solid rgba(218,41,28,.2);animation:lp 3s ease-in-out infinite"><pre style="color:#da291c;font-size:.7em;line-height:1.15;text-shadow:0 0 8px rgba(218,41,28,.4)">    \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n    \u2551  \u2588\u2580\u2580 \u2588 \u2588 \u2588\u2580\u2580 \u2588\u2580\u2580\u2588       \u2551\n    \u2551  \u2588\u2580\u2580 \u2580\u2534\u2580\u2534\u2580 \u2588\u2584\u2584 \u2588\u2584\u2584\u2588     \u2551\n    \u2551  \u2580\u2580\u2580  \u2580 \u2580  \u2580\u2580\u2580 \u2580  \u2580     \u2551\n    \u2551                          \u2551\n    \u2551   \u2588\u2580\u2580\u2588 \u2588 \u2588 \u2588\u2580\u2580\u2588 \u2588\u2580\u2580     \u2551\n    \u2551   \u2588\u2584\u2584\u2580 \u2588\u2584\u2588 \u2588\u2584\u2584\u2588 \u2588\u2584\u2584     \u2551\n    \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d</pre></div>',
      '<h1 style="font-size:2.2em;letter-spacing:8px;text-transform:uppercase;color:#f0d000;text-align:center;text-shadow:0 0 7px #f0d000,0 0 15px #f0d000,0 0 30px rgba(240,208,0,.4)">NOVA-RED HUB</h1>',
      '<p style="text-align:center;font-size:.75em;color:rgba(240,208,0,.35);letter-spacing:6px;margin-top:6px;text-transform:uppercase">Servidor Westmarch &#183; Cyberpunk Red</p>',
      '<p style="text-align:center;font-size:.75em;color:rgba(240,208,0,.5);letter-spacing:4px;margin:15px 0 25px"><span style="color:rgba(218,41,28,.5)">&#10022;</span> PRIM, NEVADA &#8212; INTERSTATE 15 <span style="color:rgba(218,41,28,.5)">&#10022;</span></p>',
      '<div style="font-size:.78em;line-height:2;color:#888;margin-bottom:20px"><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Inicializando modulos de juego...</div><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Handshake con <span style="color:#0fa">Nova-Red Hub</span> establecido</div><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Sincronizando datos del mundo: <span style="color:#0fa">OK</span></div><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Enlace biometrico: <span style="color:#0fa">verificado</span></div><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Conexion de red: <span style="color:#f0d000">cifrado AES-256</span></div></div>',
      '<div style="margin:10px 0 20px"><p style="font-size:.7em;color:rgba(240,208,0,.6);letter-spacing:3px;margin-bottom:6px">SINCRONIZANDO LOBBY</p><div class="pt"><div class="pf"></div></div><p style="font-size:.6em;color:rgba(240,208,0,.4);text-align:right;margin-top:4px;letter-spacing:2px">100%</p></div>',
      '<div style="margin:25px 0 20px;padding:15px 20px;border-left:2px solid rgba(240,208,0,.15);background:rgba(240,208,0,.02)"><p style="font-size:.85em;font-style:italic;color:#aaa;line-height:1.6">"Alla afuera la ley la escribis con el humo de tu arma y el polvo de la interestatal. Acordate: en el yermo no hay segundas oportunidades. Solo vos, tu vehiculo y lo que quede de tu suerte."</p><p style="font-size:.65em;color:rgba(240,208,0,.4);text-align:right;margin-top:8px">&#8212; Runner, lideresa de los Aldecaldos</p></div>',
      '<div style="text-align:center;margin-top:25px;padding-top:15px;border-top:1px solid rgba(240,208,0,.08)"><p style="font-size:.7em;color:rgba(240,208,0,.35);letter-spacing:5px">CARGANDO LOBBY</p><div class="lb"></div><p style="font-size:.7em;color:rgba(240,208,0,.2);margin-top:12px"><span style="color:rgba(240,208,0,.4)">root@nova-red</span><span style="color:#666">:</span><span style="color:#0fa">~</span>$<span style="animation:blink 1s step-end infinite">_</span></p></div>',
      '</div></div>'
    ].join('\n')
  });

  registerPreset('netrunner', {
    id: 'netrunner',
    label: `${MODULE_ID}.presets.netrunner.label`,
    description: `${MODULE_ID}.presets.netrunner.description`,
    theme: {
      fontColor: '#00ff41',
      fontSize: 24,
      fontFamily: "'Share Tech Mono', 'Courier New', monospace",
      bgColor: '#000a00',
      accentColor: '#00ff41',
      bgOpacity: 0.92
    },
    effects: { dom: ['scanlines', 'glitch-text'], canvas: ['digital-rain'] }
  });

  registerPreset('combat', {
    id: 'combat',
    label: `${MODULE_ID}.presets.combat.label`,
    description: `${MODULE_ID}.presets.combat.description`,
    theme: {
      fontColor: '#ff2020',
      fontSize: 32,
      fontFamily: "'Orbitron', 'Share Tech Mono', sans-serif",
      bgColor: '#0a0000',
      accentColor: '#ff2020',
      bgOpacity: 0.9
    },
    effects: { dom: ['glitch-line', 'chromatic-aberration'], canvas: ['particles', 'static-noise'] }
  });

  registerPreset('mystery', {
    id: 'mystery',
    label: `${MODULE_ID}.presets.mystery.label`,
    description: `${MODULE_ID}.presets.mystery.description`,
    theme: {
      fontColor: '#b080ff',
      fontSize: 26,
      fontFamily: "'Courier New', monospace",
      bgColor: '#050008',
      accentColor: '#b080ff',
      bgOpacity: 0.93
    },
    effects: { dom: ['glitch-text', 'chromatic-aberration'], canvas: ['digital-rain', 'cyber-grid'] }
  });

  registerPreset('road', {
    id: 'road',
    label: `${MODULE_ID}.presets.road.label`,
    description: `${MODULE_ID}.presets.road.description`,
    theme: {
      fontColor: '#ffaa00',
      fontSize: 30,
      fontFamily: "'Share Tech Mono', 'Courier New', monospace",
      bgColor: '#0a0500',
      accentColor: '#ff6600',
      bgOpacity: 0.88
    },
    effects: { dom: ['scanlines', 'neon-border'], canvas: ['cyber-grid'] }
  });

  registerPreset('afterlife', {
    id: 'afterlife',
    label: `${MODULE_ID}.presets.afterlife.label`,
    description: `${MODULE_ID}.presets.afterlife.description`,
    theme: {
      fontColor: '#ff00ff',
      fontSize: 34,
      fontFamily: "'Orbitron', 'Share Tech Mono', sans-serif",
      bgColor: '#050005',
      accentColor: '#ff00ff',
      bgOpacity: 0.9
    },
    effects: { dom: ['scanlines', 'glitch-text', 'neon-border'], canvas: ['particles', 'digital-rain'] }
  });
}
