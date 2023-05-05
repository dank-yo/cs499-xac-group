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

    axios.post('/api/request', {
        latitude: lat,
        longitude: lng
    })
    .then(function (response) {
        const closestLocations = response.data;
        
        // clear the list
        const ul = document.querySelector('ul');
        ul.innerHTML = '';
    
        // loop through the closestLocations and add them to the list
        closestLocations.forEach(function(location) {
            const li = document.createElement('li');
            const text = document.createTextNode(`Lat: ${location.Latitude}, Long: ${location.Longitude}`);
            const br = document.createElement('br');
            li.appendChild(text);
            li.appendChild(br); // add the br element
            const streetText = document.createTextNode(`Street Address: ${location['Street Address']}`);
            li.appendChild(streetText);
            const cityText = document.createTextNode(`, City: ${location.City}`);
            li.appendChild(cityText);
            ul.appendChild(li);
        });
    })
    .catch(function (error) {
        console.log(error);
    });
});

clearButton.addEventListener('click', function() {
    const points = document.querySelectorAll('.point');
    points.forEach(point => point.remove());

    // clear the list
    const ul = document.querySelector('ul');
    ul.innerHTML = '';
});
