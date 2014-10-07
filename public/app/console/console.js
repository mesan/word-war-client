wordWar.console = (function (wordWar) {

  var $consoleContainer = wordWar.viewManager.element('#app-console-list');

  function addEntry(entry) {
    if (!entry.type) {
      entry.type = 'info';
    }

    wordWar.viewManager.prependHtml($consoleContainer, 'console-entry-tpl', entry);
  }

  return {
    addEntry: addEntry
  };
})(wordWar);