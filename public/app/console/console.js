wordWar.console = (function (wordWar) {

  var $consoleContainer = wordWar.layoutManager.$('#app-console-list');

  function newEntry(entry) {
    if (!entry.type) {
      entry.type = 'info';
    }

    wordWar.layoutManager.prependHtml($consoleContainer, 'console-entry-tpl', entry);
  }

  return {
    newEntry: newEntry
  };
})(wordWar);