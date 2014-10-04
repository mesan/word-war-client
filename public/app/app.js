(function (window, io, jQuery, undefined) {
  var url = 'http://word-war-mesan.herokuapp.com:80';

  var socket = io(url, {
    transports: ['websocket']
  });

  socket.on('connected', function (data) {
    console.log(data);
  });

  var $app = jQuery('#app');
  var $window = jQuery(window);
  var $highscore = jQuery('#highscore');

  var $highscoreList = jQuery('#highscore-list');

  $window.resize(adjustAppWidth);

  adjustAppWidth();

  function adjustAppWidth() {
    $app.width($window.width() - $highscore.width() - 1);
  }
})(window, io, jQuery, undefined);