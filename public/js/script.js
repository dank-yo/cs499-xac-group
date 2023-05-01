const mapContainer = document.getElementById('indiana-map');
const clearButton = document.getElementById('clearButton');

mapContainer.addEventListener('click', async function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const lat = (((mapContainer.offsetHeight - y) / mapContainer.offsetHeight) * (41.708306024819386 - 37.784794629439574) + 37.784794629439574).toFixed(4);
    const lng = (((x / mapContainer.offsetWidth) * (-87.52404309397492 + 88.03878932936094)) - 87.52404309397492).toFixed(4);
    const point = document.createElement('div');
    point.className = 'point';
    point.style.top = y + 'px';
    point.style.left = x + 'px';
    mapContainer.appendChild(point);
    const coordsDisplay = document.createElement('div');
    coordsDisplay.className = 'coords-display';
    point.appendChild(coordsDisplay);
    const coordsText = document.createElement('span');
    coordsText.className = 'coords';
    coordsText.innerText = 'Lat: ' + lat + ', Long: ' + lng;
    coordsText.setAttribute("style", "display: block")
    point.appendChild(coordsText);

    const data = {latitude: lat, longitude: lng}
    fetch("/api/request/", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }) 
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
});

clearButton.addEventListener('click', function() {
    const points = document.querySelectorAll('.point');
    points.forEach(point => point.remove());
});
    
