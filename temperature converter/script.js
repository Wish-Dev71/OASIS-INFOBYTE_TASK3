/* ====================================
   TEMPORA — TEMPERATURE CONVERTER
==================================== */

const form = document.getElementById("converter-form");
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const resetButton = document.getElementById("reset-btn");
const errorMessage = document.getElementById("error-message");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

function formatTemperature(value) {
  // Avoid displaying negative zero due to floating-point rounding.
  const rounded = Math.abs(value) < 0.005 ? 0 : value;
  return `${rounded.toFixed(2)}`;
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearResults() {
  celsiusResult.textContent = "-- °C";
  fahrenheitResult.textContent = "-- °F";
  kelvinResult.textContent = "-- K";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const rawValue = temperatureInput.value.trim();
  const temperature = Number(rawValue);
  const unit = unitSelect.value;

  showError("");

  if (rawValue === "" || !Number.isFinite(temperature)) {
    showError("Please enter a valid temperature.");
    clearResults();
    return;
  }

  let celsius;

  // Convert the entered temperature into Celsius first.
  if (unit === "C") {
    celsius = temperature;
  } else if (unit === "F") {
    celsius = (temperature - 32) * 5 / 9;
  } else if (unit === "K") {
    celsius = temperature - 273.15;
  } else {
    showError("Please select a valid temperature unit.");
    clearResults();
    return;
  }

  // Temperatures below absolute zero are not physically valid.
  if (celsius < -273.15 - 1e-9) {
    showError("Temperature cannot be below absolute zero.");
    clearResults();
    return;
  }

  // Calculate all three units.
  const fahrenheit = (celsius * 9 / 5) + 32;
  const kelvin = celsius + 273.15;

  // Display the results.
  celsiusResult.textContent = `${formatTemperature(celsius)} °C`;
  fahrenheitResult.textContent = `${formatTemperature(fahrenheit)} °F`;
  kelvinResult.textContent = `${formatTemperature(kelvin)} K`;
});

resetButton.addEventListener("click", function () {
  form.reset();
  showError("");
  clearResults();
  temperatureInput.focus();
});