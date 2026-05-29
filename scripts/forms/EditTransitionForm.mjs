import { MODULE_ID, DEFAULT_SETTING, SETTINGS, TEMPLATES, EFFECTS_DOM, EFFECTS_CANVAS } from '../constants.mjs';
import DefaultOptionsForm from './DefaultOptionsForm.mjs';
import { getPresets } from '../presets/Registry.mjs';

export default class EditTransitionForm extends DefaultOptionsForm {
  constructor(sceneID, options = {}) {
    super(options);
    this.sceneID = sceneID;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${MODULE_ID}-edit-form`,
      title: game.i18n.localize(`${MODULE_ID}.editTransition`),
      template: TEMPLATES.EDIT_FORM
    });
  }

  async getData() {
    const defaults = game.settings.get(MODULE_ID, SETTINGS.DEFAULT_OPTIONS) ?? DEFAULT_SETTING;
    const data = { ...defaults, ...this.object };
    const rawPresets = getPresets();
    const presets = Array.from(rawPresets.values()).map((p) => ({
      ...p,
      label: game.i18n.localize(p.label),
      description: game.i18n.localize(p.description)
    }));

    return {
      ...data,
      isEdit: true,
      isPreset: true,
      presets,
      domEffects: EFFECTS_DOM,
      canvasEffects: EFFECTS_CANVAS,
      selectedDomEffects: data.domEffects || [],
      selectedCanvasEffects: data.canvasEffects || [],
      content: await TextEditor.enrichHTML(data.content || '', {
        secrets: true,
        async: true
      })
    };
  }

  async _updateObject(event, formData) {
    const expanded = foundry.utils.expandObject(formData);
    expanded.domEffects = expanded.domEffects || [];
    expanded.canvasEffects = expanded.canvasEffects || [];
    const scene = game.scenes?.get(this.sceneID);
    if (scene) {
      await scene.setFlag(MODULE_ID, 'transition', { options: expanded });
    }
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.on('change', 'select[name="presetId"]', async (event) => {
      const presetId = event.target.value;
      const presets = getPresets();
      const preset = presets.get(presetId);
      if (!preset) return;

      const theme = preset.theme || {};
      const target = event.currentTarget.closest('.nr-edit-form');
      Object.entries(theme).forEach(([key, value]) => {
        const input = target.querySelector(`[name="${key}"]`);
        if (input) {
          input.value = value;
          if (input.type === 'checkbox') input.checked = !!value;
        }
      });

      const domChecks = target.querySelectorAll('[name="domEffects"]');
      domChecks.forEach((cb) => {
        cb.checked = preset.effects?.dom?.includes(cb.value) || false;
      });

      const canvasChecks = target.querySelectorAll('[name="canvasEffects"]');
      canvasChecks.forEach((cb) => {
        cb.checked = preset.effects?.canvas?.includes(cb.value) || false;
      });
    });
  }
}
