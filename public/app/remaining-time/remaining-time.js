wordWar.remainingTime = (function (wordWar) {
  'use strict';

  var $remainingTimeContainer;

  function setSecondsRemaining(secondsRemaining) {
    getRemainingTimeContainer();

    var remainingTimeContext = {
      secondsRemaining: secondsRemaining,
      critical: secondsRemaining <= 5
    };

    wordWar.viewManager.insertHtml(
      $remainingTimeContainer,
      'remaining-time-tpl',
      remainingTimeContext);
  }

  function getRemainingTimeContainer() {
    if (!$remainingTimeContainer || $remainingTimeContainer.size() === 0) {
      $remainingTimeContainer = wordWar.viewManager.element('#remaining-time');
    }
  }

  var remainingTime = {};

  Object.defineProperty(remainingTime, '$secondsRemaining', {
    set: setSecondsRemaining
  });

  return remainingTime;
})(wordWar);