wordWar.socketConnector = function () {

  function connect(url) {
    return io(url, {
      transports: ['websocket']
    });
  }

  return {
    connect: connect
  };
};