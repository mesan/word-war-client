wordWar.socketUrlResolver = (function (window) {

  var socketUrlLocal  = 'http://localhost:5000';
  var socketUrl       = 'http://word-war-mesan.herokuapp.com:80';

  function _getQueryArg(name){
    if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(window.location.search)) {
      return decodeURIComponent(name[1]);
    }
  }

  function resolve() {
    return _getQueryArg('host') === 'local' ? socketUrlLocal : socketUrl;
  }

  return {
    resolve: resolve
  };
})(window);