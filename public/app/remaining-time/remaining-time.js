wordWar.remainingTime = function (viewManager) {
  'use strict';

  var $remainingTimeContainer;

  function setSecondsRemaining(secondsRemaining) {
    getRemainingTimeContainer();

    var remainingTimeContext = {
      secondsRemaining: secondsRemaining,
      critical: secondsRemaining <= 5
    };

    viewManager.insertHtml(
      $remainingTimeContainer,
      'remaining-time-tpl',
      remainingTimeContext);
  }

  function getRemainingTimeContainer() {
    if (!$remainingTimeContainer || $remainingTimeContainer.size() === 0) {
      $remainingTimeContainer = viewManager.element('#remaining-time');
    }
  }

  var remainingTime = {};

  Object.defineProperty(remainingTime, 'secondsRemaining', {
    set: setSecondsRemaining,
    configurable: true
  });

  return remainingTime;
};