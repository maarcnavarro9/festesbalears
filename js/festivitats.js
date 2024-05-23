
let card = document.getElementById("card-template");

// Funció per obtenir dades JSON
function getJSON(json) {
    let arrayjson = [];
    return fetch('./assets/'+json)   
    .then(response => response.json())
    .then(dades => {
        let x=0;
        // Itera sobre les propietats de les dades JSON
        for (let prop in dades) {
            if (Object.prototype.hasOwnProperty.call(dades, prop)) {
                if(x===2){
                    arrayjson=dades[prop];
                }
                else{
                    x++;
                }
            }
        }
        arrayjson.flat();
        return arrayjson;
    })
    .catch(error => console.error(error));
}

// Crida la funció getJSON per obtenir les dades de "festes.json"
var res = getJSON("festes.json").then(data=>{
    // Itera sobre les dades obtingudes
    data.forEach(festa=>{
        // Afegeix el contingut de cada festa al div amb l'id "card-template"
        card.innerHTML += Festacard(festa);
    })
});

// Funció per generar el contingut de la targeta de cada festa
function Festacard(festa) {
    return `<div class="card shadow border-0">
                <img class="card-img-top festaImg" src="${festa.image[0].contentUrl}" alt="..." />
                <div class="card-body p-4">
                    <a class="text-decoration-none link-dark stretched-link" href="festa.html?${festa.id}"><h5 class="card-title mb-3">${festa.name}</h5></a>
                    <div class="badge bg-primary bg-gradient rounded-pill mb-2">${festa.address.addressRegion}</div><br>
                    <p class="card-text mb-0 margin-card-p"><h6>Codi Postal: ${festa.address.postalCode}</h6></p><br>
                    <p class="card-text mb-0 margin-card-p"><h6>Data de Inici: ${festa.startDate}</h6></p><br>
                    <p class="card-text mb-0 margin-card-p"><h6>Data de Fi: ${festa.endDate}</h6></p>
                </div>
            </div>`
}
