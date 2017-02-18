const int buttonPin = 2;    // the number of the pushbutton pin
const int magneticPin = 1;    // the number of the magnetic pin
const int touchPin = 0;     // the number of the touch pin
int currentState = 4;



String getCommand(){
  ScratchData scratchCommand = Bean.readScratchData(1);
  String strCmd;
  for(int i=0;i<scratchCommand.length;i++){
    strCmd +=(String)(char) scratchCommand.data[i];
  } 
  return strCmd;
}

void setup() {
  Serial.begin(9600);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  // initialize the touch pin as an input:
  pinMode(touchPin, INPUT);
  // initialize the magnetic pin as an input;
  pinMode(magneticPin,INPUT);
}

void loop() {
  bool connected = Bean.getConnectionState();
  if(connected){
    
    String strCmd = getCommand();
 
    if(strCmd == "DUEL"){
      //sending the message over to server.js
      char buffer[4]; //maximum size 4
      sprintf(buffer,"%d",currentState);
      Bean.setScratchData(1,(uint8_t*)&buffer,sizeof(buffer)+1);
      //Bean.sleep(2000);
    }
    
    // read the state of the pushbutton value:
    int buttonState = digitalRead(buttonPin);
    if(buttonState == HIGH) {
      Bean.setLed(0,255,0);  //green
      Serial.println("Green");
      currentState = 1;
    } else {
      Bean.setLed(0,0,0);    //off
    }
  
    //read the state of the touch value:
    int touchState = digitalRead(touchPin);
    if(touchState == 1) {
      Bean.setLed(255,0,0); //red
      currentState = 2;
    } else {
      Bean.setLed(0,0,0);   //off
    }
  
    //read the state of the magnetic_switch value;
    int magneticState = digitalRead(magneticPin);
    if(magneticState == HIGH) { //if the sensor value is HIGH?
        Bean.setLed(0,0,255); //blue
        currentState = 3;
    } else{
        Bean.setLed(0,0,0); //off
    }

  } //connected
}






