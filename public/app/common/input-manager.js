wordWar.inputManager = (function (wordWar) {

  var ENTER_KEY = 13;

  function onEnterPressed(elementId, eventHandler) {
    wordWar.viewManager.element('body').on('keypress', '#' + elementId, function (event) {
      if (event.which === ENTER_KEY) {
        eventHandler(event);
      }
    });
  }

  function onWordEntered(handler) {
    wordWar.inputManager.onEnterPressed('word-input', function (event) {
      handler(event);
    });
  }

  function onUsernameEntered(handler) {
    wordWar.inputManager.onEnterPressed('user-login', function (event) {
      handler(event);
    });
  }

  return {
    onEnterPressed: onEnterPressed,
    onWordEntered: onWordEntered,
    onUsernameEntered: onUsernameEntered
  };
})(wordWar);