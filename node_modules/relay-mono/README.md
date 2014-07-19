#Relay
Driver for the relay-mono Tessel relay module ([IM48GDR]()).

##Installation
```sh
npm install relay-mono
```

##Example
```.js
/*********************************************
This relay module demo toggles both relay
channels every two seconds, logging the new
values to the console upon latching.
*********************************************/

// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

var tessel = require('tessel');
var relay = require('../').use(tessel.port['A']);

relay.on('ready', function relayReady () {
  console.log('Ready! Toggling relays...');
  setInterval(function toggle() {
    // Toggle relay channel 1
    relay.toggle(1, function toggleOneResult(err) {
      if (err) console.log("Err toggling 1", err);
    });
    // Toggle relay channel 2
    relay.toggle(2, function toggleTwoResult(err) {
      if (err) console.log("Err toggling 2", err);
    });
  }, 2000); // Every 2 seconds (2000ms)
});

// When a relay channel is set, it emits the 'latch' event
relay.on('latch', function(channel, value) {
  console.log('latch on relay channel ' + channel + ' switched to', value);
});
```

##Methods

##### * `relay.getState(relayChannel, callback(err, state))` Gets the state of the specified relay channel: "true" for on and "false" for off.

##### * `relay.toggle(relayChannel, callback(err))` Switches the state of the specified relay channel: on if it's off; off if it's on.

##### * `relay.turnOff(relayChannel, callback(err))` Switches off the specified relay channel.

##### * `relay.turnOn(relayChannel, callback(err))` Switches on the specified relay channel.

###Events

##### * `relay.on('error', callback(err))` Emitted upon error.

##### * `relay.on('latch', callback(channel, state))` Emitted when the latch state (boolean on or off) is changed for a channel.

##### * `relay.on('ready', callback())` Emitted upon first successful communication between the Tessel and the module.

## License
MIT
APACHE
