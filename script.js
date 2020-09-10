// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/




window.addEventListener('load', function() {

  fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
    response.json().then(function(json) {
      let missionTarget = document.getElementById("missionTarget");
      let randomPlanet = Math.floor(Math.random() * json.length);
      let planet = json[randomPlanet];
      let newHTML = `
        <h2>Mission Destination</h2>
        <ol>
          <li>Name: ${planet.name}</li>
          <li>Diameter: ${planet.diameter}</li>
          <li>Star: ${planet.star}</li>
          <li>Distance from Earth: ${planet.distance}</li>
          <li>Number of Moons: ${planet.moons}</li>
        </ol>
        <img src="${planet.image}">
      `;
      missionTarget.innerHTML = newHTML;
    });
  });



  let fuelStatus = document.getElementById('fuelStatus');
  let fuelStatusOriginal = fuelStatus.innerHTML;
  let cargoStatus = document.getElementById('cargoStatus');
  let cargoStatusOriginal = cargoStatus.innerHTML;

  function itemsNotReady() {
    let faultyItemsDiv = document.getElementById('faultyItems');
    faultyItemsDiv.style.visibility = 'visible';
  }

  function updateLaunchStatus(readyForLaunch){
    let launchStatus = document.getElementById('launchStatus');
    if(!readyForLaunch) {
      launchStatus.style.color = 'red';
      launchStatus.innerHTML = 'Shuttle NOT Ready for Launch!';
    } else {
      launchStatus.style.color = 'green';
      launchStatus.innerHTML = 'Shuttle is Ready for Launch!';
      fuelStatus.innerHTML = fuelStatusOriginal;
    }
  }
  
  function submitActivated(pilotName,copilotName,fuelLevel,cargoMass) {
    let pilotStatus = document.getElementById('pilotStatus');
    pilotStatus.innerHTML = `Pilot ${pilotName}: Ready`;
  
    let copilotStatus = document.getElementById('copilotStatus');
    copilotStatus.innerHTML = `Co-pilot ${copilotName}: Ready`
  
    let readyForLaunch = true;
    if (fuelLevel < 10000) {
      fuelStatus.innerHTML = `Fuel Status: Not enough for journey`;
      readyForLaunch = false;
      itemsNotReady();
    } else {
      fuelStatus.innerHTML = fuelStatusOriginal;
    }
    if(cargoMass > 10000) {
      cargoStatus.innerHTML = `Cargo Status: Too much mass for takeoff`;
      readyForLaunch = false;
      itemsNotReady();
    } else {
      cargoStatus.innerHTML = cargoStatusOriginal;
    }
    
    updateLaunchStatus(readyForLaunch);
  }

  let form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");

    if(pilotName.value === "" 
       || copilotName.value === "" 
       || fuelLevel.value === ""
       || cargoMass.value === "") {
      window.alert("All fields are required!");
    } else if(!isNaN(pilotName.value)){
    window.alert("Pilot name should not be a number!")
    } else if(!isNaN(copilotName.value)) {
      window.alert("Copilot Name should not be a number!")
    } else if(isNaN(fuelLevel.value)) {
      window.alert("Fuel level needs to be a number.");
    } else if(isNaN(cargoMass.value)) {
      window.alert("Cargo Mass needs to be a number.");
    } else {
      submitActivated(pilotName.value, copilotName.value,fuelLevel.value, cargoMass.value);
    }
  });

});