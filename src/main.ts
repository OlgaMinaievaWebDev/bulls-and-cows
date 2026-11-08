import { renderSettings } from './ui/renderSettings';

const settingsSummary = document.createElement('p');
settingsSummary.setAttribute('role', 'status');

const settingsScreen = renderSettings((settings) => {
  settingsSummary.textContent = `Selected settings: ${settings.length} digits, base ${settings.base}.`;
});

document.body.append(settingsScreen, settingsSummary);
