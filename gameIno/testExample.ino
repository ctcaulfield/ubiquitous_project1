void setup() {
  Bean.enableWakeOnConnect(true);
  Bean.setAccelerationRange(2);
  Bean.setAccelerometerPowerMode(VALUE_LOW_POWER_10MS);
}

void loop() {
  bool connected = Bean.getConnectionState();
  if(connected){
//    int8_t temperature = Bean.getTemperature();
//    Bean.setScratchNumber(1,temperature);
//    Bean.sleep(2000);
    AccelerationReading reading = Bean.getAcceleration();
    int16_t x = reading.xAxis;
    int16_t y = reading.yAxis;
    int16_t z = reading.zAxis;
    char buffer[17]; //maximum size 16: |-xxx|-yyy|-zzz|\0f
    sprintf(buffer,"|%d|%d|%d|\0",x,y,z);
    Bean.setScratchData(1,(uint8_t*)&buffer,sizeof(buffer)+1);
    Bean.sleep(100);
  }

}
