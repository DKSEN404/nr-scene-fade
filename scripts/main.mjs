import { MODULE_ID, SETTINGS, DEFAULT_SETTING } from './constants.mjs';
import NRSceneFade from './NRSceneFade.mjs';
import * as SocketManager from './SocketManager.mjs';
import { registerHooks } from './ContextMenu.mjs';
import DefaultOptionsForm from './forms/DefaultOptionsForm.mjs';
import { initDefaultPresets } from './presets/Registry.mjs';

let nrFade = null;

Hooks.once('init', function () {
  nrFade = new NRSceneFade();
  initDefaultPresets();

  game.settings.register(MODULE_ID, SETTINGS.DEFAULT_OPTIONS, {
    name: `${MODULE_ID}.settings.defaultOptions.name`,
    hint: `${MODULE_ID}.settings.defaultOptions.hint`,
    scope: 'world',
    config: true,
    type: Object,
    default: DEFAULT_SETTING,
    onChange: () => {}
  });

  game.settings.registerMenu(MODULE_ID, SETTINGS.DEFAULT_OPTIONS_MENU_KEY, {
    name: `${MODULE_ID}.settings.defaultOptions.name`,
    label: `${MODULE_ID}.settings.defaultOptions.label`,
    hint: `${MODULE_ID}.settings.defaultOptions.hint`,
    icon: 'fas fa-sliders-h',
    type: DefaultOptionsForm,
    restricted: true
  });

  game.settings.register(MODULE_ID, 'show-journal-header-transition', {
    name: `${MODULE_ID}.settings.showJournalHeader.name`,
    hint: `${MODULE_ID}.settings.showJournalHeader.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });
});

Hooks.once('ready', function () {
  SocketManager.registerSocket();
  registerHooks();

  game.modules.get(MODULE_ID).api = {
    play: (options) => nrFade.play(options),
    stop: (force) => nrFade.stop(force),
    isActive: () => nrFade.isActive,
    executeAction: (options) => nrFade.executeAction(options)
  };
});

Hooks.once('setup', function () {
  const socketlibMod = game.modules.get('socketlib');
  if (!socketlibMod?.active) {
    console.error(`${MODULE_ID} | socketlib is required but not active.`);
  }
});
