#include <WiFi.h>           // Library for Wi-Fi connectivity
#include <HTTPClient.h>     // Library for making HTTP requests
#include <DHT.h>            // Library for DHT temperature and humidity sensor
#include <LiquidCrystal_I2C.h> // Library for I2C LCD display

// Wi-Fi credentials
const char* ssid = "";      // Replace with your Wi-Fi SSID
const char* password = "";  // Replace with your Wi-Fi password

// Firebase credentials
const char* firebaseHost = ""; // Replace with your Firebase Realtime Database URL (e.g., "https://<project-id>.firebaseio.com/")
const char* apiKey = "";       // Replace with your Firebase API key

// Pin definitions for sensors
#define SOIL_PIN 34    // Analog pin for soil moisture sensor
#define DHT_PIN 13     // Digital pin for DHT11 sensor data
#define MQ3_PIN 35     // Analog pin for MQ3 gas sensor (e.g., alcohol detection)
#define MQ5_PIN 32     // Analog pin for MQ5 gas sensor (e.g., LPG detection)
#define DHT_TYPE DHT11 // Define DHT sensor type (DHT11 in this case)

// Initialize DHT sensor object
DHT dht(DHT_PIN, DHT_TYPE);

// Initialize LCD object (I2C address 0x27, 16 columns, 2 rows)
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  // Initialize serial communication at 115200 baud rate for debugging
  Serial.begin(115200);

  // Initialize LCD and turn on backlight
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);       // Set cursor to top-left corner
  lcd.print("IoT Project");  // Display project title
  delay(2000);               // Wait 2 seconds for visibility

  // Start DHT sensor
  dht.begin();

  // Connect to Wi-Fi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { // Wait until connection is established
    delay(500);
    Serial.print(".");                    // Print dots to indicate connection attempt
  }
  Serial.println("\nConnected to WiFi");  // Confirm successful connection
  lcd.clear();                            // Clear LCD screen
  lcd.print("WiFi Connected");            // Display connection status
  delay(2000);                            // Wait 2 seconds
}

void loop() {
  // Read sensor values
  float soilMoisture = analogRead(SOIL_PIN) / 4095.0 * 100; // Convert soil moisture ADC value (0-4095) to percentage
  float humidity = dht.readHumidity();                      // Read humidity from DHT11 sensor
  float temperature = dht.readTemperature();                // Read temperature from DHT11 sensor
  float mq3Value = analogRead(MQ3_PIN) / 4095.0 * 100;      // Normalize MQ3 gas sensor value to percentage
  float mq5Value = analogRead(MQ5_PIN) / 4095.0 * 100;      // Normalize MQ5 gas sensor value to percentage

  // Validate DHT sensor readings
  if (isnan(humidity) || isnan(temperature)) {  // Check if readings are invalid (NaN)
    Serial.println("Failed to read from DHT sensor!");
    lcd.clear();
    lcd.print("DHT Error");                    // Display error message on LCD
    delay(2000);                               // Wait 2 seconds before retrying
    return;                                    // Skip this loop iteration
  }

  // Display sensor data on LCD
  lcd.clear();                                 // Clear previous display
  lcd.setCursor(0, 0);                         // Set cursor to first row
  lcd.print("T:");                             // Temperature label
  lcd.print(temperature);                      // Display temperature value
  lcd.print("C H:");                           // Humidity label
  lcd.print(humidity);                         // Display humidity value
  lcd.print("%");                              // Percentage symbol
  lcd.setCursor(0, 1);                         // Set cursor to second row
  lcd.print("S:");                             // Soil moisture label
  lcd.print(soilMoisture);                     // Display soil moisture value
  lcd.print("% G:");                           // Gas sensor label
  lcd.print(mq3Value);                         // Display MQ3 value

  // Print sensor data to Serial Monitor for debugging
  Serial.printf("Soil: %.2f%%, Temp: %.2fC, Hum: %.2f%%, MQ3: %.2f, MQ5: %.2f\n",
                soilMoisture, temperature, humidity, mq3Value, mq5Value);

  // Send data to Firebase if Wi-Fi is connected
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;                           // Create HTTP client object

    // Construct Firebase Realtime Database URL with authentication
    String url = String(firebaseHost) + "sensor_data.json?auth=" + apiKey;
    http.begin(url);                           // Initialize HTTP connection
    http.addHeader("Content-Type", "application/json"); // Set JSON content type

    // Create JSON payload with timestamp as the key
    String timestamp = String(millis());       // Use milliseconds since boot as unique key
    String jsonPayload = "{\"" + timestamp + "\": {";
    jsonPayload += "\"soilMoisture\":" + String(soilMoisture) + ",";
    jsonPayload += "\"temperature\":" + String(temperature) + ",";
    jsonPayload += "\"humidity\":" + String(humidity) + ",";
    jsonPayload += "\"mq3\":" + String(mq3Value) + ",";
    jsonPayload += "\"mq5\":" + String(mq5Value) + "}}";

    // Send HTTP PATCH request to append data to Firebase
    int httpResponseCode = http.PATCH(jsonPayload);
    if (httpResponseCode > 0) {                // Check if request was successful
      Serial.println("Data sent to Firebase: HTTP " + String(httpResponseCode));
    } else {                                   // Handle errors
      Serial.println("Error sending data: " + String(httpResponseCode));
      Serial.println(http.errorToString(httpResponseCode)); // Print detailed error
    }
    http.end();                                // Close HTTP connection
  } else {
    Serial.println("WiFi not connected");      // Log Wi-Fi disconnection
  }

  delay(1000);                                 // Wait 1 second before next reading
}