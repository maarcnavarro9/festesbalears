function initMap() {
    // Funció per inicialitzar el mapa
    getJSON("festes.json").then(data => {
        let results = []; // Variable per emmagatzemar els resultats
        // Recorre les dades i afegeix cada festa a la llista de resultats
        data.forEach(festa => {
            results.push({
                lat: Number(festa.geo.latitude), // Latitud de la festa
                lng: Number(festa.geo.longitude), // Longitud de la festa
                id: festa.id, // ID de la festa
                name: festa.name, // Nom de la festa
                codigo: festa.address.postalCode, // Codi postal de la festa
                locality: festa.address.addressLocality, // Localitat de la festa
                region: festa.address.addressRegion, // Regió de la festa
            });
        });

        // Coordenades de la primera festa com a centre del mapa
        let festes = { lat: Number(data[0].geo.latitude), lng: Number(data[0].geo.longitude) };

        // Element HTML on es mostrarà el mapa
        let targetElem = document.getElementById('map');
        
        // Posició de la càmera del mapa
        let cameraPosition = { zoom: 9, center: festes };
        
        // Crea el mapa de Google Maps
        let map = new google.maps.Map(targetElem, cameraPosition);

        // Variable per emmagatzemar la finestra d'informació actual
        let currentInfoWindow = null;

        // Recorre els resultats per afegir marcadors i finestres d'informació al mapa
        results.forEach(festa => {
            // Crea un marcador per a cada festa
            let marker = new google.maps.Marker({ map: map, position: festa, title: festa.name });
            
            // Contingut de la finestra d'informació
            let infoWindowContent = `
                <div>
                    <h6>${festa.name}</h6>
                    <div>${festa.codigo}</div>
                    <div>${festa.locality}</div>
                    <div>${festa.region}</div>
                    <a href=festa.html?${festa.id}>Ver más</a>
                </div>`;

            // Crea una finestra d'informació per a cada festa
            let infowindow = new google.maps.InfoWindow({
                content: infoWindowContent
            });

            // Afegeix un escoltador d'esdeveniments per mostrar la finestra d'informació quan es fa clic al marcador
            marker.addListener('click', function () {
                if (currentInfoWindow != null) {
                    currentInfoWindow.close();
                }
                currentInfoWindow = infowindow;
                infowindow.open(map, marker);
            });
        });
    });
}
