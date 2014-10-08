wordWar.console = function (viewManager) {

  var $consoleContainer = viewManager.element('#app-console-list');

  function addEntry(entry) {
    if (!entry.type) {
      entry.type = 'info';
    }

    viewManager.prependHtml($consoleContainer, 'console-entry-tpl', entry);
  }

  return {
    addEntry: addEntry
  };
};