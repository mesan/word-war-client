wordWar.queryParser = (function (window) {
  return {
    getArgument: function get(name){
      if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(window.location.search)) {
        return decodeURIComponent(name[1]);
      }
    }
  };
})(window);