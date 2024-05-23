/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Drets d'autor 2013-2023 Start Bootstrap
* Llicència sota MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/

// Funció per a reduir la barra de navegació quan es desplaça cap amunt
window.addEventListener('DOMContentLoaded', event => {

    // Funció per a reduir la barra de navegació
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Redueix la barra de navegació inicialment
    navbarShrink();

    // Redueix la barra de navegació quan la pàgina es desplaça
    document.addEventListener('scroll', navbarShrink);

    // Activa el Bootstrap scrollspy en l'element de navegació principal
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Col·lapsa la barra de navegació quan el botó de toglle està visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activa el plugin SimpleLightbox per als elements de portafoli
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});


// Funció per actualitzar l'any
function actualizarYear() {
    // Obtenir l'element span amb l'id "year"
    var yearSpan = document.getElementById("year");

    // Obtenir l'any actual
    var year = new Date().getFullYear();

    // Assignar l'any actual al contingut del span
    yearSpan.textContent = year;
}

// Crida a la funció perquè s'executi quan es carregui la pàgina
actualizarYear();

// Funció per canviar el color de la barra de navegació quan es carrega una pàgina específica
function changeColorOnPageLoad() {
    // Obtenir el nom de la pàgina actual
    var currentPage = window.location.pathname.split('/').pop();
    
    // Array de pàgines en les quals vols canviar el color
    var pagesToChangeColor = [];
    
    // Comprovar si la pàgina actual està en l'array de pàgines per canviar el color
    if (pagesToChangeColor.includes(currentPage)) {
        // Canvia el color dels elements
        document.querySelector('#mainNav .navbar-brand').style.color = '#000000'; // Canvia pel teu color desitjat
        var navLinks = document.querySelectorAll('#mainNav .navbar-nav .nav-item .nav-link');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].style.color = '#000000'; // Canvia pel teu color desitjat
        }
    }
}

// Crida a la funció quan es carrega la pàgina
changeColorOnPageLoad();

// Crida a la funció quan es carrega la pàgina
window.onload = changeColorOnPageLoad;
