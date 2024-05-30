// Selecció dels elements HTML necessaris
let field = document.getElementById("card-template"); // Element on s'afegeix el contingut
let select = document.getElementById("filtres"); // Element select per a la selecció de filtres
let cnt=0; // Comptador per a la cerca de geolocalització
let cntcerca=0; // Comptador per a les opcions de cerca

// Funció per ordenar les festes segons el valor seleccionat al desplegable
function sortingValue(value){
    
    // Esborrar el contingut anterior
    while(field.hasChildNodes()){
        field.removeChild(field.lastChild);
    }

    // Obtenció de les dades JSON
    getJSON("festes.json").then(data=>{

        // Opció predeterminada
        if(value === 'Predeterminat'){
            data.forEach(festa=>{
                field.innerHTML += Festacard(festa);
            })
            
        }

        // Ordenar alfabèticament
        if(value === 'Alfabeticament'){
            data.sort((a,b)=>{
                return a.name.localeCompare(b.name);
            });
            data.forEach(festa=>{
                field.innerHTML += Festacard(festa);
            })
        }

        // Cerca geogràfica
        if(value === 'Cerca'){
            
            cntcerca++;
            if(cntcerca%2!=0&&cnt%2!=0){
                filtres(); // Realitza la cerca geogràfica
            }
            else if(cntcerca%2!=0){
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(success, error); // Obté la ubicació actual
                } else {
                    console.log("no hi ha permis");
                } 
            }else{
                sortingValue("Predeterminat"); // Si ja s'ha realitzat la cerca, restaura l'ordre predeterminat
            }
        }

        // Ordenar per data
        if(value === 'PerData'){
            const currentDate = new Date();
    
            data.sort((a, b) => {
                const dateA = new Date(a.startDate);
                const dateB = new Date(b.startDate);
                const timeDifferenceA = Math.abs(dateA - currentDate);
                const timeDifferenceB = Math.abs(dateB - currentDate);
                return timeDifferenceA - timeDifferenceB;
            });
    
            data.forEach(festa => {
                field.innerHTML += Festacard(festa);
            });
        }
    });
}

// Funció per a la cerca geogràfica
function filtres(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exitgeo, error);
    } else {
        console.log("no hi ha permis");
    } 
}

// Funció per gestionar errors de geolocalització
function error(error) {
    console.log(error.message);
}

// Funció per a l'èxit de la cerca de geolocalització
function success(position) {
    // S'obté la ubicació actual
    getJSON("festes.json").then(data=>{
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        let festes = [];
        data.forEach(festa =>{
            const earthRadiusKm = 6371;
            
            const dLat = (festa.location.geo.latitude - latitude)* Math.PI / 180;
            const dLon = (festa.location.geo.longitude - longitude)* Math.PI / 180;

            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(latitude * Math.PI / 180) * Math.cos(festa.location.geo.latitude* Math.PI / 180) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            let dist = earthRadiusKm * c;
            let dist_min = 10;

            // Filtrar festes segons la proximitat
            if(dist <= dist_min)
            {
                festes.push(festa);
            }
        })

        // Afegir les festes filtrades al camp HTML
        festes.forEach(festa=>{
            field.innerHTML += Festacard(festa);
        })
    })
}

// Funció per a l'èxit de la cerca de geolocalització alternativa
function exitgeo(position) {
    // S'obté la ubicació actual
    getJSON("festes.json").then(data=>{
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        let festes = [];
        data.forEach(festa =>{
            const earthRadiusKm = 6371;
            
            const dLat = (festa.location.geo.latitude - latitude)* Math.PI / 180;
            const dLon = (festa.location.geo.longitude - longitude)* Math.PI / 180;

            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(latitude * Math.PI / 180) * Math.cos(festa.location.geo.latitude* Math.PI / 180) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            let dist = earthRadiusKm * c;
            let dist_min = 10;

            // Filtrar festes segons la proximitat
            if(dist <= dist_min)
            {
                festes.push(festa);
            }
        })

        // Afegir les festes filtrades al camp HTML
        festes.forEach(festa=>{
            field.innerHTML += Festacard(festa);
        })
    })
}
