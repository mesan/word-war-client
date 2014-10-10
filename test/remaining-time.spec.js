describe('remainingTime', function () {

  // Module to be tested.
  var remainingTime;

  // Stubs.
  var viewManager;
  var $remainingTimeContainer;


  beforeEach(function () {
    viewManager = {
      element: function () {
      },
      insertHtml: function () {
      }
    };

    $remainingTimeContainer = {
      size: function () {
      }
    };

    sinon.stub(viewManager, 'element', function () {
      return $remainingTimeContainer;
    });

    sinon.stub(viewManager, 'insertHtml');

    remainingTime = wordWar.remainingTime(viewManager);
  });

  it('sets critical property to true if five seconds remaining', function () {
    remainingTime.secondsRemaining = 5;

    expect(viewManager.insertHtml.calledWith(
      $remainingTimeContainer,
      'remaining-time-tpl',
      { secondsRemaining: 5, critical: true }
    )).toBeTruthy();
  });

  it('sets critical property to true if less than five seconds remaining', function () {
    remainingTime.secondsRemaining = 4;

    expect(viewManager.insertHtml.calledWith(
      $remainingTimeContainer,
      'remaining-time-tpl',
      { secondsRemaining: 4, critical: true }
    )).toBeTruthy();
  });

  it('sets critical property to false if over five seconds remaining', function () {
    remainingTime.secondsRemaining = 6;

    expect(viewManager.insertHtml.calledWith(
      $remainingTimeContainer,
      'remaining-time-tpl',
      { secondsRemaining: 6, critical: false }
    )).toBeTruthy();
  });
});