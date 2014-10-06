wordWar.console = (function (wordWar) {

  var $consoleContainer = wordWar.layoutManager.$('#app-console-list');

  function newEntry(context) {
    if (!context.type) {
      context.type = 'info';
    }

    var consoleEntryHtml =
      wordWar.layoutManager.template('console-entry-tpl', context);

    $consoleContainer.prepend(consoleEntryHtml);
  }

  return {
    newEntry: newEntry
  };
})(wordWar);