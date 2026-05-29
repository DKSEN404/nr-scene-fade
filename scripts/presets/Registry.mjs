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
    effects: { dom: ['scanlines', 'glitch-line'], canvas: [] }
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
