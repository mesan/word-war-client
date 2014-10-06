wordWar.layoutManager = (function (window, jQuery) {

  var templates = {};

  function manageLayout(appContainerId, highscoreContainerId) {

    var $app = jQuery('#' + appContainerId);
    var $window = jQuery(window);
    var $highscore = jQuery('#' + highscoreContainerId);

    $window.resize(adjustAppWidth);

    adjustAppWidth();

    function adjustAppWidth() {
      $app.width($window.width() - $highscore.width() - 1);
    }
  }

  function template(templateId, context) {
    if (!templates[templateId]) {
      var source = wordWar.layoutManager.$('#' + templateId).html();
      templates[templateId] = Handlebars.compile(source);
    }

    return templates[templateId](context);
  }

  return {
    manageLayout: manageLayout,
    $: jQuery,
    template: template
  };

})(window, jQuery);