// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic climate example logs a stream
of temperature and humidity to the console.
*********************************************/

var tessel = require('tessel');
var climatelib = require('climate-si7020');
var relaylib = require('relay-mono');

var climate = climatelib.use(tessel.port['A']);
var relay = relaylib.use(tessel.port['D']);

var climateOn = false;
var relayOn = false;
var fanOn = false;

var humidThreshold = 55;

// when the climate module is ready
climate.on('ready', function () {
  console.log('Connected to si7005');
  climateOn = true;

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        if (relayOn) {
          if (humid >= humidThreshold) {
            if (!fanOn) {
              console.log('Turning fan on. Humidity:', Math.floor(humid) + '&');
              relay.turnOn(2, function toggleTwo(err) {
                if (err) console.log("Err toggling 2", err);
              });
              fanOn = true;
            }
          } else {
            if (fanOn) {
              console.log('Turning fan off. Humidity:', Math.floor(humid) + '&');
              relay.turnOff(2, function toggleTwo(err) {
                if (err) console.log("Err toggling 2", err);
              });
              fanOn = false;
            }
          }
        }
        setTimeout(loop, 3000);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});

// Wait for the relay module to connect
relay.on('ready', function relayReady () {
  console.log('Ready! Toggling relays...');
  relayOn = true;
  relay.turnOn(1, function toggleTwo(err) {
    if (err) console.log("Err toggling 2", err);
  });
});

// When a relay channel is set, it emits the 'latch' event
relay.on('latch', function(channel, value) {
  console.log('latch on relay channel ' + channel + ' switched to', value);
});