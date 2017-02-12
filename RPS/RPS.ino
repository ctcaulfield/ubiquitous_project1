const int buttonPin = 2;    // the number of the pushbutton pin
const int magneticPin = 1;    // the number of the magnetic pin
const int touchPin = 0;     // the number of the touch pin

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
  // read the state of the pushbutton value:
  int buttonState = digitalRead(buttonPin);
  if(buttonState == HIGH) {
    Bean.setLed(0,255,0);  //green
    Serial.println("Green");
  } else {
    Bean.setLed(0,0,0);    //off
  }

  //read the state of the touch value:
  int touchState = digitalRead(touchPin);
  if(touchState == 1) {
    Bean.setLed(255,0,0); //red
  } else {
    Bean.setLed(0,0,0);   //off
  }

  //read the state of the magnetic_switch value;
  int magneticState = digitalRead(magneticPin);
  if(magneticState == HIGH) { //if the sensor value is HIGH?
      Bean.setLed(0,0,255); //blue
  } else{
      Bean.setLed(0,0,0); //off
  } 
  
}






