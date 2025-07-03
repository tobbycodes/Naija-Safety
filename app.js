const form = document.getElementById("incidentForm");
const locationField = document.getElementById("location");
const incidentList = document.getElementById("incidentList");

// Store submitted incidents locally (simulates backend for now)
let incidents = [];

// Auto-detect location using Geolocation
function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude.toFixed(5);
      const lon = position.coords.longitude.toFixed(5);
      locationField.value = `Lat: ${lat}, Lon: ${lon}`;
    }, () => {
      locationField.value = "Location unavailable";
    });
  } else {
    locationField.value = "Geolocation not supported";
  }
}

// Show incidents on screen
function displayIncidents() {
  incidentList.innerHTML = "";
  incidents.forEach((incident, index) => {
    const div = document.createElement("div");
    div.className = "incident-card";
    div.innerHTML = `
      <strong>${incident.title}</strong><br>
      <em>${incident.category}</em><br>
      <p>${incident.description}</p>
      <small>${incident.location}</small>
    `;
    incidentList.prepend(div);
  });
}

// Submit incident
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const newIncident = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    location: locationField.value
  };

  incidents.push(newIncident);
  form.reset();
  detectLocation();
  displayIncidents();
});

// Start
detectLocation();
