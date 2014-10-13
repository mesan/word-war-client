wordWar.inputManager = function (viewManager) {

  var ENTER_KEY = 13;

  function onEnterPressed(elementId, eventHandler) {
    var inputElement = viewManager.element('#' + elementId);

    if (inputElement) {
      inputElement.onkeypress = function (event) {
        if (event.which === ENTER_KEY) {
          eventHandler(event);
        }
      };
    }
  }

  return {
    onEnterPressed: onEnterPressed
  };
};