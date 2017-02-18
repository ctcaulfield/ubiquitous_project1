var noble = require('noble');

var isUp = false;
var isDown = false;
var startTime;
var endTime;
var exitHandlerBound = false;
var maxPeripherals = 3;
var peripherals = [];
var beanNames = [];
var count = 0;

var http = require('http'); 
var server = http.createServer(function(request, response) {
}); 

server.listen(1234, function() {     
    console.log((new Date()) + ' Server is listening on port 1234'); 
}); 

var WebSocketServer = require('websocket').server; 
var utf8 = require('utf8');

wsServer = new WebSocketServer({    
     httpServer: server 
}); 

var client; 

wsServer.on('request', function(request){     
    // Code here to run on connection and store it
    client = request.accept(null, request.origin);
    
    console.log((new Date()) + ' Connection accepted!'); 
    
     // Create event listener 
     client.on('message', function(message) {      
     var msgString = message.utf8Data; 
     console.log("Message received: "+msgString);     
      //set scratch 1 to command
     if (peripherals.length >= 1) { 
    /*    withoutResponse:
        false: send a write request, used with "write" characteristic property
        true: send a write command, used with "write without response" characteristic property
    */
        // buffer, withoutResponse is true|false

      for(i=0;i>count;i++){
        peripherals[i]['characteristics'][0].write(new Buffer(msgString, "binary"), true, function(error) {
              console.log("sent message: "+msgString);
        }); 
      }
    }
      
      }); 
      
    //user disconnected
  client.on('close', function(reasonCode, description) {     
      delete client;     
      console.log((new Date()) + '  ' + client.remoteAddress + ' disconnected.'); 
   }); 
});


noble.on('stateChange', function(state) {
  // possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
  if (state === 'poweredOn') {
    console.log('Powered On!');
  //false = do not allow multiple - devices differentiated by peripheral UUID
  //limit to devices having the service UUID below - which all Beans have
  noble.startScanning(['a495ff10c5b14b44b5121370f02d74de'], false);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  //if want to check the name two see if it's one we want or not:
  var desiredDevices = ["Sonic Boom", "Mary Rose's Bean"];   
  //alternative if naming desired devices like Bryan1, Bryan2, etc: 
  //peripheral.advertisement.localName.indexOf('Bryan') > -1
  if (peripheral.advertisement.localName && 
      desiredDevices.indexOf(peripheral.advertisement.localName) > -1) {
      console.log('Found device with local name: ' + peripheral.advertisement.localName);
      beanNames.push(peripheral.advertisement.localName);
      name = peripheral.advertisement.localName;
      console.log('Device UUID: ' + peripheral.uuid);
      console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
      console.log();
      peripheral.connect(connect.bind({peripheral:peripheral}));
    } 
});

var connect = function(err){
  if (err) throw err;
  console.log("Connection to " + this.peripheral.uuid)
  peripherals[count] = {};
  peripherals[count]['peripheral'] = this.peripheral;

  //stop discovering
  //noble.stopScanning();  
  if (peripherals.length >= maxPeripherals)
  {
    console.log("Stopping BLE scan. Reached " + maxPeripherals + " peripherals");
    noble.stopScanning();  
  }

  if (!exitHandlerBound)
  {
    exitHandlerBound = true;
    process.on('SIGINT', exitHandler);
  }
  //*** end Part 3
  
  this.peripheral.discoverServices([], setupService);
};

//set up the notifications, which begines with discovering the devices 
//services, finding the right one, then looking for the characteristic 
//we’re interested in.
var setupService = function(err,services) {
  if (err) throw err;
  console.log("services");
  services.forEach(function(service){
  if(service.uuid === 'a495ff20c5b14b44b5121370f02d74de'){
      console.log("found Bean scratch UUID");
//*** Part 2 changes - 1 for each scratch
      var characteristicUUIDs = ["a495ff21c5b14b44b5121370f02d74de",
                          "a495ff22c5b14b44b5121370f02d74de",
                          "a495ff23c5b14b44b5121370f02d74de",
                          "a495ff24c5b14b44b5121370f02d74de",
                          "a495ff25c5b14b44b5121370f02d74de"];


      
      service.discoverCharacteristics(characteristicUUIDs, function(error, characteristics) {
      console.log("got characteristics");
      console.log(count);
      peripherals[count]['characteristics'] = characteristics;
      requestNotify(characteristics[0],count); //this is the first scratch characteristic: 0 to 3. 
      count++;
    }); //discover characteristics
   }
  });
};

var requestNotify = function(characteristic,count)
{
  //bound a read handler for updates. So whenever “data” is popping out of our characteristic updates,
  // we get a callback.
  characteristic.on('read', function(data, isNotification) {
      var dataString = data.toString('ascii').trim();
      console.log(dataString);
      if (client) {
        client.sendUTF(utf8.encode(beanNames[count]+":"+dataString));
      }

  }); //callback
 
 //turn on notifications. This means we register to get updates when values change for this characteristic.
  characteristic.notify(true, function(error) {
    console.log('turned on notifications ' + (error ? ' with error' : 'without error'));    
  }); 
}

//*** Part 3
var exitHandler = function exitHandler() {
  peripherals.forEach(function(peripheral) {
    console.log('Disconnecting from ' + peripheral['peripheral'].uuid + '...');
    peripheral['peripheral'].disconnect( function(){
          console.log('disconnected');
    });
  });
 
  //end process after 2 more seconds
  setTimeout(function(){
    process.exit();
  }, 2000);
}
 
process.stdin.resume();//so the program will not close instantly

//*** end Part 3