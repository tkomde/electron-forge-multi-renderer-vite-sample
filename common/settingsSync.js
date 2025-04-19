export let settings = {};

export function initSettingsSync(settingsUpdateCallback, api = window.api) {
  // get initial settings
  api.invoke('get-settings').then(current => {
    settings = current;
    settingsUpdateCallback(settings);
  });

  // update settings from UI
  window.setSetting = function(diff) {
    settings = { ...settings, ...diff };
    api.send('set-settings', diff);
  };

  // notify updates from main process
  api.on('settings-channel', (_event, newSettings) => {
    settings = newSettings;
    settingsUpdateCallback(settings);
  });
}