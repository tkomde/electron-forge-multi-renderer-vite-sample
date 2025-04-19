export let settings = {};

export function initSettingsSync(settingsUpdateCallback, api = window.api) {
  // get initial settings
  api.invoke("get-settings").then((current) => {
    settings = current;
    settingsUpdateCallback(settings);
    window.settings = settings;
  });

  // notify updates from main process
  api.on("settings-channel", (_event, newSettings) => {
    settings = newSettings;
    settingsUpdateCallback(settings);
  });
}

// update settings from UI
export function setSettings(diff) {
  settings = { ...settings, ...diff };
  api.send("set-settings", diff);
}
