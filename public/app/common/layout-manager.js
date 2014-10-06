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

  function template(templateId, templateContext) {
    if (!templates[templateId]) {
      var source = wordWar.layoutManager.$('#' + templateId).html();
      templates[templateId] = Handlebars.compile(source);
    }

    return templates[templateId](templateContext);
  }

  function insertHtml($container, templateId, templateContext) {
    $container.html(template(templateId, templateContext));
  }

  function prependHtml($container, templateId, templateContext) {
    $container.prepend(template(templateId, templateContext));
  }

  function appendHtml($container, templateId, templateContext) {
    $container.append(template(templateId, templateContext));
  }

  return {
    $: jQuery,
    manageLayout: manageLayout,
    insertHtml: insertHtml,
    prependHtml: prependHtml,
    appendHtml: appendHtml
  };

})(window, jQuery);