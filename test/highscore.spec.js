describe('highscore', function () {

  // Module to be tested.
  var highscore;

  // Stubs.
  var viewManager;
  var $highscoreList;

  beforeEach(function () {

    viewManager = {
      element: function () {},
      appendHtml: function () {}
    };

    $highscoreList = {
      empty: function () {}
    };

    // Stub empty method.
    sinon.stub($highscoreList, 'empty');

    // Stub element method and make it return our highscore list element stub.
    sinon.stub(viewManager, 'element', function () {
      return $highscoreList;
    });

    // Stub appendHtml method.
    sinon.stub(viewManager, 'appendHtml');

    // Initialize highscore module.
    highscore = wordWar.highscore(viewManager);
  });

  it('clears the highscore list', function () {
    highscore.users = { 'arildt': { name: 'arildt', score: 1 }};
    expect($highscoreList.empty.called).toBe(true);
  });

  it('appends a highscore list item per user', function () {
    highscore.users = {
      'arildt': { name: 'arildt', score: 1 },
      'mikkels': { name: 'mikkels', score: 2 }
    };

    expect(viewManager.appendHtml.calledTwice).toBe(true);
  });

  it('sets host for each highscore list item', function () {
    highscore.avatarHost = 'avatarHost';
    highscore.users = { 'arildt': { name: 'arildt', score: 1 }};

    expect(viewManager.appendHtml.calledWith(
      $highscoreList,
      'highscore-list-item-tpl',
      { name: 'arildt', score: 1, host: 'avatarHost', index: 1 }
    )).toBe(true);
  });

  it('sets current property to true on highscore list item displaying the current user', function () {
    highscore.username = 'arildt';
    highscore.users = { 'arildt': { name: 'arildt', score: 1 }};

    expect(viewManager.appendHtml.calledWith(
      $highscoreList,
      'highscore-list-item-tpl',
      { name: 'arildt', score: 1, index: 1, current: true, host: '' }
    )).toBe(true);
  });
});