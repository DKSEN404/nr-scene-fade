import { MODULE_ID, DEFAULT_SETTING, SETTINGS, TEMPLATES, EFFECTS_DOM, EFFECTS_CANVAS } from '../constants.mjs';

export default class DefaultOptionsForm extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${MODULE_ID}-default-options`,
      template: TEMPLATES.EDIT_FORM,
      title: game.i18n.localize(`${MODULE_ID}.settings.defaultOptions.title`),
      width: 500,
      height: 680,
      closeOnSubmit: true,
      resizable: true
    });
  }

  async getData() {
    const data = game.settings.get(MODULE_ID, SETTINGS.DEFAULT_OPTIONS) ?? DEFAULT_SETTING;
    return {
      ...data,
      isEdit: false,
      isPreset: false,
      presets: [],
      domEffects: EFFECTS_DOM,
      canvasEffects: EFFECTS_CANVAS,
      selectedDomEffects: data.domEffects || [],
      selectedCanvasEffects: data.canvasEffects || []
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    const form = html[0];
    if (form) {
      const nav = form.querySelector('.tabs');
      const tabbed = form.querySelector('.tabbed-content');
      if (nav && tabbed) {
        try {
          new Tabs({ nav, content: tabbed });
        } catch {
          this.#initTabsFallback(nav, tabbed);
        }
      }
    }

    html.on('click', '[data-action="reset"]', async () => {
      await game.settings.set(MODULE_ID, SETTINGS.DEFAULT_OPTIONS, DEFAULT_SETTING);
      this.render(true);
    });
  }

  #initTabsFallback(nav, tabbed) {
    const items = nav.querySelectorAll('.item');
    const panels = tabbed.querySelectorAll('.tab');
    if (!items.length || !panels.length) return;

    items.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const tabId = item.dataset.tab;

        items.forEach((i) => i.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));

        item.classList.add('active');
        const panel = tabbed.querySelector(`.tab[data-tab="${tabId}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  async _updateObject(event, formData) {
    const expanded = foundry.utils.expandObject(formData);
    expanded.domEffects = expanded.domEffects || [];
    expanded.canvasEffects = expanded.canvasEffects || [];
    await game.settings.set(MODULE_ID, SETTINGS.DEFAULT_OPTIONS, expanded);
  }
}
