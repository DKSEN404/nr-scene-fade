import { MODULE_ID, TEMPLATES } from './constants.mjs';
import { TransitionRenderer } from './TransitionRenderer.mjs';
import * as Socket from './SocketManager.mjs';

let _instance = null;

export default class NRSceneFade {
  #overlay;
  #renderer;
  #isActive = false;
  #resolveCurrent = null;
  #currentOptions = null;
  #audio = null;

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

    const defaults = game.settings.get(MODULE_ID, 'default-options') || {};
    const merged = foundry.utils.mergeObject(foundry.utils.mergeObject({}, defaults), options);

    if (typeof merged.bgImg !== 'string') merged.bgImg = '';
    if (typeof merged.audio !== 'string') merged.audio = '';
    if (typeof merged.content !== 'string') merged.content = '';

    await this.#createOverlay(merged);
    await this.#fadeIn(merged);

    if (merged.audio) {
      this.#playAudio(merged);
    }

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

    this.#stopAudio();

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
    const isVideo = this.#isVideo(options.bgImg || '');
    const sourceType = this.#getVideoType(options.bgImg || '');
    const showCloseButton = game.user?.isGM || options.allowPlayersToEnd;
    const zIndex = game.user?.isGM || options.showUI ? 5000 : 1;

    const data = {
      style: options.style || '',
      content: options.content || '',
      bgImg: options.bgImg || null,
      bgColor: options.bgColor || '#0a0a0a',
      accentColor: options.accentColor || '#00ff41',
      fontColor: options.fontColor || '#f0d000',
      fontSize: options.fontSize || 28,
      isVideo,
      sourceType,
      bgLoop: options.bgLoop ?? true,
      bgMuted: options.bgMuted ?? true,
      bgSize: options.bgSize || 'cover',
      bgPos: options.bgPos || 'center center',
      bgOpacity: options.bgOpacity ?? 0.95,
      showCloseButton,
      zIndex,
      fontFamily: options.fontFamily || "'Share Tech Mono', 'Courier New', monospace"
    };

    const html = await renderTemplate(TEMPLATES.OVERLAY, data);
    document.body.insertAdjacentHTML('beforeend', html);
    const wrapper = document.getElementById('nr-scene-fade-overlay');

    const closeBtn = wrapper.querySelector('#nr-scene-fade-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.#onCloseClick(options));
    }

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
    this.#stopAudio();

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

  #isVideo(src) {
    if (!src || typeof src !== 'string') return false;
    const ext = src.split('.').pop()?.split('?')[0]?.toLowerCase();
    return ext === 'webm' || ext === 'mp4';
  }

  #getVideoType(src) {
    if (!src || typeof src !== 'string') return 'video/mp4';
    if (src.toLowerCase().endsWith('webm')) return 'video/webm';
    return 'video/mp4';
  }

  #playAudio(options) {
    const src = options.audio;
    if (!src) return;
    if (game.audio.locked) {
      console.log(`${MODULE_ID} | Audio playback locked`);
      return;
    }
    const volume = options.volume ?? 0.7;
    const loop = options.audioLoop ?? false;
    AudioHelper.play({ src, volume, loop }, false).then((audio) => {
      this.#audio = audio;
    }).catch(() => {});
  }

  #stopAudio() {
    if (this.#audio?.playing) {
      this.#audio.stop();
    }
    this.#audio = null;
  }

  #onCloseClick(options) {
    if (game.user?.isGM && options.gmEndAll) {
      Socket.executeForEveryone({ action: 'stop' });
    }
    this.stop(false);
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
