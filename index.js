// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!

const input = document.getElementById("state-input");
const btn = document.getElementById("fetch-alerts");

btn.addEventListener("click", (event) => {
  fetchWeatherAlerts(input.value.toUpperCase());
  input.value = "";
});
async function fetchWeatherAlerts(state) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = "";
  errorDiv.style.display = "none";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
  try {
    if (!state.trim()) {
      throw new Error("Please enter a state abbreviation");
    }
    const response = await fetch(`${weatherApi}${state}`);
    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts");
    }
    const data = await response.json();
    console.log(data);
    displayAlerts(data);
  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("hidden");
    errorDiv.style.display = "block";
  }
}

function displayAlerts(data) {
  const container = document.getElementById("alerts-display");

  container.innerHTML = `${data.title}: ${data.features.length}`;

  data.features.forEach((alert) => {
    container.innerHTML += `<p>${alert.properties.headline}</p>`;
  });
}
