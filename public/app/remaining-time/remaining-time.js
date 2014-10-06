wordWar.remainingTime = (function (wordWar) {
  var $remainingTimeContainer;

  function setRemainingTime(secondsRemaining) {
    $remainingTimeContainer = wordWar.layoutManager.$('#remaining-time');

    var templateContext = {
      secondsRemaining: secondsRemaining,
      critical: secondsRemaining <= 5
    };

    wordWar.layoutManager.insertHtml(
      $remainingTimeContainer,
      'remaining-time-tpl',
      templateContext);
  }

  var remainingTime = {};

  Object.defineProperty(remainingTime, '$secondsRemaining', {
    set: setRemainingTime
  });

  return remainingTime;
})(wordWar);