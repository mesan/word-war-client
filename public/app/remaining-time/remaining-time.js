wordWar.remainingTime = (function (wordWar) {
  var $remainingTimeContainer;

  function updateRemainingTime(secondsRemaining) {
    $remainingTimeContainer = wordWar.layoutManager.$('#remaining-time');

    var remainingTimeHtml =
      wordWar.layoutManager.template('remaining-time-tpl', {
        secondsRemaining: secondsRemaining,
        danger: secondsRemaining <= 5
      });
    $remainingTimeContainer.html(remainingTimeHtml);
  }

  return {
    updateRemainingTime: updateRemainingTime
  };
})(wordWar);