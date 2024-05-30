let card = document.querySelector(".row.g-0");

function getJSON(json) {
    // Crear un array buit per emmagatzemar els objectes JSON
    let arrayjson = [];
    return fetch('./assets/' + json)
        .then(response => response.json()) // Analitzar la resposta JSON
        .then(dades => {
            let x = 0;
            // Iterar sobre les propietats de les dades JSON
            for (let prop in dades) {
                if (Object.prototype.hasOwnProperty.call(dades, prop)) {
                    // Seleccionar la segona propietat del JSON com a dades principals
                    if (x === 2) {
                        arrayjson = dades[prop];
                    } else {
                        x++;
                    }
                }
            }
            // Aplanar l'array de dades JSON
            arrayjson.flat();
            return arrayjson;
        })
        .catch(error => console.error(error));
}

function generatePortfolioBox(item) {
    // Generar el codi HTML per a una caixa de portafoli
    return `
    <div class="col-lg-4 col-sm-6">
        <a class="portfolio-box" href="${item.image[1].contentUrl}" title="${item.name}">
            <img class="img-fluidport" src="${item.image[1].contentUrl}" alt="..." />
            <div class="portfolio-box-caption">
                <div class="project-category text-white-50">${item.location.address.addressRegion}</div>
                <div class="project-name">${item.name}</div>
            </div>
        </a>
    </div>`;
}

let res = getJSON("festes.json").then(dades => {
    // Iterar sobre les dades JSON i generar caixes de portafoli
    dades.forEach(festa => {
        card.innerHTML += generatePortfolioBox(festa);
    });
});
