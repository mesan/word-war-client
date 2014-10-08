describe('highscore', function () {

  var HandlebarsStub = sinon.stub(Handlebars, 'compile', function () {
    return function () {};
  });

  var viewManagerStub = sinon.stub(wordWar.viewManager, 'element', function () {
    return {
      html: function () {},
      empty: function() {}
    };
  });

  it('dummy test', function () {
    /*
    wordWar.highscore.$users = [{
      id: 1,
      name: 'arildt',
      score: 0,
      avatar: '',
      connected: true
    }];

    expect(viewManagerStub.called).toBe(true);*/
    expect(true).toBe(true);
  });

});