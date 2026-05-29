import { MODULE_ID, TEMPLATES } from './constants.mjs';
import { TransitionRenderer } from './TransitionRenderer.mjs';

let _instance = null;

export default class NRSceneFade {
  #overlay;
  #renderer;
  #isActive = false;
  #resolveCurrent = null;
  #currentOptions = null;

  constructor() {
    if (_instance) return _instance;
    _instance = this;
  }

  static get instance() {
    if (!_instance) new NRSceneFade();
    return _instance;
  }

  get isActive() {
    return this.#isActive;
  }

  async play(options = {}) {
    if (this.#isActive) await this.stop(true);
    this.#isActive = true;
    this.#currentOptions = options;

    const merged = foundry.utils.mergeObject(
      game.settings.get(MODULE_ID, 'default-options') || {},
      options
    );

    await this.#createOverlay(merged);
    await this.#fadeIn(merged);

    this.#renderer = new TransitionRenderer(merged);
    await this.#renderer.play();

    return new Promise((resolve) => {
      this.#resolveCurrent = resolve;
    });
  }

  async stop(force = false) {
    if (!this.#isActive) return;

    if (force) {
      this.#cleanup();
      if (this.#resolveCurrent) {
        this.#resolveCurrent({ forced: true });
        this.#resolveCurrent = null;
      }
      return;
    }

    if (this.#renderer) {
      await this.#renderer.outro();
    }

    this.#cleanup();
    if (this.#resolveCurrent) {
      this.#resolveCurrent({ forced: false });
      this.#resolveCurrent = null;
    }
  }

  async #createOverlay(options) {
    const data = {
      style: options.style || '',
      content: options.content || '',
      bgImg: options.bgImg || null,
      bgColor: options.bgColor || '#000000',
      accentColor: options.accentColor || '#00ff41',
      duration: options.duration || 4000,
      overlayClass: options.overlayClass || '',
      fontColor: options.fontColor || '#f0d000',
      fontSize: options.fontSize || 28
    };

    const wrapper = document.createElement('div');
    wrapper.id = 'nr-scene-fade-overlay';
    document.body.appendChild(wrapper);

    const html = await renderTemplate(TEMPLATES.OVERLAY, data);
    wrapper.innerHTML = html;

    this.#overlay = wrapper;
  }

  async #fadeIn(options) {
    const overlay = this.#overlay;
    if (!overlay) return;
    const fadeIn = options.fadeIn || 800;
    overlay.style.transition = `opacity ${fadeIn}ms ease`;
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
    await new Promise((r) => setTimeout(r, fadeIn));
  }

  async #render(options) {
    this.#renderer = new TransitionRenderer(options);
    return this.#renderer.play();
  }

  #cleanup() {
    if (this.#renderer) {
      this.#renderer.destroy();
      this.#renderer = null;
    }

    const overlay = document.getElementById('nr-scene-fade-overlay');
    if (overlay) overlay.remove();
    this.#overlay = null;
    this.#isActive = false;
    this.#currentOptions = null;
  }

  async executeAction(options) {
    if (options?.action === 'stop') {
      await this.stop(true);
      return;
    }

    await this.stop(true);
    return this.play(options);
  }
}
