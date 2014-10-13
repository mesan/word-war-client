wordWar.viewManager = function (window) {

  var document = window.document;

  var templates = {};

  function template(templateId, templateContext) {
    if (!templates[templateId]) {
      var source = document.querySelector('#' + templateId).innerHTML;
      templates[templateId] = Handlebars.compile(source);
    }

    return templates[templateId](templateContext);
  }

  function insertHtml($container, templateId, templateContext) {
    $container.innerHTML = template(templateId, templateContext);
  }

  function prependHtml($container, templateId, templateContext) {
    $container.innerHTML = template(templateId, templateContext) + $container.innerHTML;
  }

  function appendHtml($container, templateId, templateContext) {
    $container.innerHTML += template(templateId, templateContext);
  }

  function clearHtml($container) {
    $container.innerHTML = '';
  }

  function createElement(elementName) {
    return document.createElement(elementName);
  }

  var viewManager = {
    element: function (selector) { return document.querySelector(selector); },
    insertHtml: insertHtml,
    prependHtml: prependHtml,
    appendHtml: appendHtml,
    clearHtml: clearHtml,
    createElement: createElement
  };

  return viewManager;
};