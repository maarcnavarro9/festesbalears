let card = document.getElementById("fest");
var url = window.location.search.substring(1);
let festa;


function getJSON(json) {    
    let arrayjson = [];
    return fetch('./assets/'+json)   
    .then(response => response.json()) 
    .then(data => {
        let x=0;
        for (let prop in data) {
            if (Object.prototype.hasOwnProperty.call(data, prop)) {
                if(x===2){
                    arrayjson=data[prop];
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
function getJSONCompaneros(url) {    
    let arrayjson = [];
    return fetch(url)   
    .then(response => response.json()) 
    .then(data => {
        let x=0;
        for (let prop in data) {
            if (Object.prototype.hasOwnProperty.call(data, prop)) {
                if(x===2){
                    arrayjson=data[prop];
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

var res = getJSON("festes.json").then(data=>{
    festa = data[0]
    data.forEach(fest=>{
        if (fest.identifier == url) {
            festa = fest;

            //Creació del JSON-LD
            let s = {
                "@context": "http://schema.org",
                "@type": "ExhibitionEvent",
                "identifier": festa.identifier,
                "name": festa.name,
                "description": festa.description,
                "startDate": festa.startDate,
                "endDate": festa.endDate,
                "url": festa.url,
                "location": {
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": festa.location.address.addressLocality,
                        "addressRegion": festa.location.address.addressRegion,
                        "postalCode": festa.location.address.postalCode,
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": festa.location.geo.latitude,
                        "longitude": festa.location.geo.longitude
                    },
                  },
                "image": festa.image,
                "subjectOf": {
                    "@type": "CreativeWork",
                    "video": festa.video
                }
            }
            document.getElementById("WebSemantica").innerHTML += JSON.stringify(s);
        }
    })
    getWeatherInfo();
    card.innerHTML =
        `   <div class="row gx-5 align-items-center justify-content-center margin noMarginTop">
                <div class="col-lg-8 col-xl-7 col-xxl-6">
                    <div class="my-5 text-center text-xl-start">
                        <h1 class="display-5 fw-bolder text-black mb-2">${festa.name}</h1>
                        <p class="lead fw-normal text-black-50 mb-4">${formatearDescripcionHTML(festa.description)}</p>
                    </div>
                </div>
                <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                <img class="img-fluid imgFest rounded-3 my-5" src="${festa.image[1].contentUrl}" alt="..." />
                ${inclusiovideo(festa)}
                </div>
            </div>
            
            <section class="justify-content-center bg-map">
                <div class="row margin">
                    <div class="col-md-6">
                    <h3 class="text-primary fw-bolder text-white">Temps actual al lloc de la festa</h3>
                    <div id="weather-info"></div>
                    </div>
                    <div class="col-md-6">
                        <h3 class="text-primary text-white fw-bolder">Mapa</h3>
                        <p class="lead fw-normal text-muted text-white mb-5" id="map">Aquí es mostrar el mapa</p>
                    </div>
                </div>
            </section>

            <div id="carouselExampleControls" class="carousel slide bg-map" data-ride="carousel" data-interval="3000">
                <div class="carousel-inner">
                </div>
                <a class="carousel-control-prev text-decoration-none" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next text-decoration-none" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
            </div>
            <div class="margin">
            <div class="">
                <h3 class="text-primary text-blue text-center fw-bolder">Teatres a ≤ 10 km</h3>
                <div class="row2" id="teatros">
                    ${TeatresAprop(festa)}
                </div>
            </div>
        </div>
        <div class="margin">
            <div class="">
                <h3 class="text-primary text-blue text-center fw-bolder">Galeries i Museus a ≤ 10 km</h3>
                <div class="row2" id="galeries">
                    ${GaleriesAprop(festa)}
                </div>
            </div>
        </div>
            `

// Obté  l'element del carrusel
var carouselInner = document.querySelector('.carousel-inner');

// Variable per controlar el índex de la imatge activa
var activeIndex = 0;

// Genera lels divs amb la clase carousel-item y afegeix les imatges
for (var i = 0; i < festa.image.length; i++) {
    var carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    // Agrega la clase 'active' nomes si es l'índex de la imatge activa
    if (i === activeIndex) {
        carouselItem.classList.add('active');
    }

    carouselItem.innerHTML =
        `<img class="rounded mx-auto d-block w-50" src="${festa.image[i].contentUrl}" alt="Slide ${i + 1}">`;
    carouselInner.appendChild(carouselItem);
}

// Funció per avançar al següent slide del carrusel
function nextSlide() {
    var slides = document.querySelectorAll('.carousel-item');
    slides[activeIndex].classList.remove('active'); // elimina la classe 'active' del slide actual
    activeIndex = (activeIndex + 1) % slides.length; // Incrementa l' index de la imatge activa
    slides[activeIndex].classList.add('active'); // Agrega la classe 'active' al següent slide
}

// Funció per tornar al slide anterior del carrusel
function prevSlide() {
    var slides = document.querySelectorAll('.carousel-item');
    slides[activeIndex].classList.remove('active'); // elimina la classe 'active' del slide actual
    activeIndex = (activeIndex - 1 + slides.length) % slides.length; // Decrementa l' index de la imatge activa
    slides[activeIndex].classList.add('active'); // Agrega la clase 'active' al slide anterior
}

// Asigna els events de clic als controls del carrusel
document.querySelector('.carousel-control-prev').addEventListener('click', prevSlide);
document.querySelector('.carousel-control-next').addEventListener('click', nextSlide);

});


function initMap() {

    getJSON("festes.json").then(data=>{
        festa = data[0]
        data.forEach(fest=>{
            if (fest.identifier == url) {
                festa = fest;
            }
        })

    var festacoord = { lat: Number(festa.location.geo.latitude), lng: Number(festa.location.geo.longitude) };

    var map = new google.maps.Map(document.getElementById("map"), {
        center: festacoord,
        zoom: 11,
    });

    var marker = new google.maps.Marker({
        position: festacoord,
        map: map,
        title: festa.name,
    });

    var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${festa.name}, ${festa.location.address.streetAddress}, ${festa.location.address.addressLocality}, ${festa.location.address.addressRegion}`;

    var infoWindowContent = `
            <div>
                <h6>${festa.name}</h6>
                <div>${festa.location.address.postalCode}</div>
                <div>${festa.location.address.addressLocality}</div>
                <div>${festa.location.address.addressRegion}</div>
                <a href="${googleMapsUrl}" target="_blank">Veure en Google Maps</a>
            </div>`
        ;
        var infowindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });
    marker.addListener("click", function () {
        infowindow.open(map, marker);
    });
    }); 
}


  
function getWeatherInfo() {
    const apiKey = '0dbb101dc3db32c5054e676a3da93543';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Number(festa.location.geo.latitude)}&lon=${Number(festa.location.geo.longitude)}&appid=${apiKey}&units=metric&lang=es`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Temps a  ${festa.location.address.addressLocality}</h5>
                        <p class="card-text">Clima: <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"alt="Icon de clima"></p>               
                        <p class="card-text">Temperatura: ${data.main.temp}°C</p>
                        <p class="card-text">Sensació Tèrmica: ${data.main.feels_like}°C</p>     
                    </div>
                </div>`
            ;
            const weatherInfoDiv = document.getElementById('weather-info');
            weatherInfoDiv.innerHTML = weatherInfo;
        })
        .catch(error => console.error(error));
}
function inclusiovideo(festa) {
    if (festa.subjectOf.video[0].contentUrl !== "") {
        return `
            <video autoplay loop muted controls class="videoGaleria">
                <source src="${festa.subjectOf.video[0].contentUrl}" type="video/mp4">
            </video>
        `;
    } else {
        return "";
    }
}

function formatearDescripcionHTML(descripcion) {
    // cambia \n amb <br> per salts de línea en HTML
    var textoFormateado = descripcion.replace(/\n/g, '<br><br>');
    
    return textoFormateado;
}

function TeatresAprop(edif){
    let ed=[];
    let latitude = edif.location.geo.latitude;
    let longitude = edif.location.geo.longitude;
    fetch("https://www.descobreixteatre.com/assets/json/Teatre.json")
    .then((response) => response.json())
    .then((data) => {
        let teatres = data.itemListElement;
        teatres.forEach(teatre =>{
            const earthRadiusKm = 6371;
            const dLat = (teatre.geo.latitude - latitude)* Math.PI / 180;
            const dLon = (teatre.geo.longitude - longitude)* Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(latitude * Math.PI / 180) * Math.cos(teatre.geo.latitude* Math.PI / 180) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            let dist = earthRadiusKm * c;
            let dist_min = 10;
            if(dist <= dist_min)
            {
                ed.push(teatre);
            }
        })
        if(ed.length===0){
            teatros.innerHTML=`<h5 class="text-muted fw-bolder text-primary text-center">No hi ha teatres propers</h5>`
        }else{
            for(let i=0; i<ed.length;i++){
                if(i===0){
                    teatros.innerHTML=cardTeatre(ed[i]);
                }else{
                    teatros.innerHTML += cardTeatre(ed[i]);
                }  
            }
            console.log(teatros)
        }  
    }).catch((error) => {
        console.error(error);
    });
}


function cardTeatre(teat) {
    return `<div class="card shadow border-0">
                <img class="card-img-top festaImg" src="https://www.descobreixteatre.com/${teat.image.contentUrl}" alt="..." />
                <div class="card-body p-4">
                    <a class="text-decoration-none link-dark stretched-link" href="https://www.descobreixteatre.com"><h5 class="card-title mb-3">${teat.name}</h5></a>
                    <div class="badge bg-primary bg-gradient rounded-pill mb-2">${teat.address.addressLocality}</div><br>
                    <p class="card-text mb-0 margin-card-p"><h6>Telefon: ${teat.telephone}</h6></p><br>
                    <p class="card-text mb-0 margin-card-p"><h6>Codi Postal: ${teat.address.postalCode}</h6></p>
                </div>
            </div>`
}

function GaleriesAprop(gal){
    let ed=[];
    let latitude = gal.location.geo.latitude;
    let longitude = gal.location.geo.longitude;
    fetch("https://www.memoriabalear.com/api/find?lang=es")
    .then((response) => response.json())
    .then((data) => {
            data.forEach(galeria =>{
            const earthRadiusKm = 6371;
            const dLat = (galeria.geo.latitude - latitude)* Math.PI / 180;
            const dLon = (galeria.geo.longitude - longitude)* Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(latitude * Math.PI / 180) * Math.cos(galeria.geo.latitude* Math.PI / 180) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            let dist = earthRadiusKm * c;
            let dist_min = 10;
            if(dist <= dist_min)
            {
                ed.push(galeria);
            }
        })
        if(ed.length===0){
            galeries.innerHTML=`<h5 class="text-muted fw-bolder text-primary text-center">No hi ha galeries properes</h5>`
        }else{
            for(let i=0; i<ed.length;i++){
                if(i===0){
                    galeries.innerHTML=Galeriescard(ed[i]);
                }else{
                    galeries.innerHTML += Galeriescard(ed[i]);
                }  
            }
            console.log(galeries)
        }  
    }).catch((error) => {
        console.error(error);
    });
}


function Galeriescard(gal) {
    return `<div class="card shadow border-0">
                <img class="card-img-top festaImg" src="${gal.image}" />
                <div class="card-body p-4">
                    <a class="text-decoration-none link-dark stretched-link" href="https://www.memoriabalear.com/"><h5 class="card-title mb-3">${gal.name}</h5></a>
                    <div class="badge bg-primary bg-gradient rounded-pill mb-2">${gal.address.addressLocality}</div><br>
                    <p class="card-text mb-0 margin-card-p"><h6>Telefon: ${gal.telephone}</h6></p><br>
                    <p class="card-text mb-0 margin-card-p"><h6>Direcció: ${gal.address.streetAddress}</h6></p>
                </div>
            </div>`
}
