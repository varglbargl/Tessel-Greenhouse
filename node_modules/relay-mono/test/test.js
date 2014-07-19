var tessel = require('tessel');
var relayDriver = require('../');
var port = tessel.port['GPIO'];

var pinout = port.digital[3].output().low();
var pinin = port.digital[4].input();

var relay = relayDriver.use(port);

console.log('1..5');

relay.on('ready', function () {
  console.log('# ready');
  console.log('ok');

  var channel = 1;
  var timeout = 1000;

  pinout.low();
  relay.turnOff(channel, timeout, function (err) {
    console.log('# in', pinin.read());
    console.log(pinin.read() == 1 ? 'ok' : 'not ok');

    relay.turnOn(channel, timeout, function (err) {
      console.log('# in', pinin.read());
      console.log(pinin.read() == 0 ? 'ok' : 'not ok');

      relay.turnOff(channel, timeout, function (err) {
        pinout.high();
        console.log('# in', pinin.read());
        console.log(pinin.read() == 1 ? 'ok' : 'not ok');

        relay.turnOn(channel, timeout, function (err) {
          console.log('# in', pinin.read());
          console.log(pinin.read() == 1 ? 'ok' : 'not ok');
        });
      });
    });
  });
});

relay.on('latch', function(channel, value) {
  console.log('# latch on channel ' + channel + ' switched to', value);
});