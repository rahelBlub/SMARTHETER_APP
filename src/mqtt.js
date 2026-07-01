const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://grayroomers.local:1883", options);

const options = {
  clientId: "mqttjs_smartheter",
  username: "gray",
  password: "admin"
};

const WIFI_SSID_2 = "Pixel_9534";
const WIFI_SSID = "inno.space";
const WIFI_PASSWORD = "!nn0.Spac3";

// MQTT-Broker-Daten
//const char MQTT_BROKER_ADRRESS[] = "192.168.2.124";
const MQTT_BROKER_ADRRESS = "10.239.152.151"; 
const MQTT_BROKER_HOSTNAME = "grayroomers.local";
const MQTT_PORT = 1883;
const MQTT_USERNAME = "gray"; 
const MQTT_PASSWORD = "admin";

const PUBLISH_TOPIC = "status/infection";
const SUBSCRIBE_TOPIC = "subscription/infection";

client.on("connect", () => {
 client.subscribe("presence", (err) => {
   if (!err) {
     client.publish("presence", "Hello mqtt");
   }
 });
});
client.on("message", (topic, message) => {
 console.log(message.toString());
 client.end();
});