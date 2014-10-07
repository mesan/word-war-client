wordWar.inputManager = (function (wordWar) {

  var ENTER_KEY = 13;

  function onEnterPressed(elementId, eventHandler) {
    wordWar.viewManager.element('body').on('keypress', '#' + elementId, function (event) {
      if (event.which === ENTER_KEY) {
        eventHandler(event);
      }
    });
  }

  return {
    onEnterPressed: onEnterPressed
  };
})(wordWar);