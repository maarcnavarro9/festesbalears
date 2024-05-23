function searchProduct() {
    // Obté el valor del text introduït per l'usuari i converteix-lo a majúscules
    const input = document.getElementById("filter").value.toUpperCase();

    // Obté el contenidor de les targetes de producte
    const cardContainer = document.getElementById('card-template');

    // Obté totes les targetes de producte dins del contenidor
    const cards = cardContainer.getElementsByClassName('card');

    // Itera sobre cada targeta de producte
    for (let i = 0; i < cards.length; i++) {
        // Obté el títol i el tipus de cada targeta
        let title = cards[i].querySelector('.card-body h5.card-title');
        let type = cards[i].querySelector('.card-body .badge');

        // Comprova si el títol o el tipus de la targeta coincideixen amb el text introduït
        if (title.innerText.toUpperCase().indexOf(input) > -1 || type.innerText.toUpperCase().indexOf(input) > -1) {
            // Mostra la targeta si coincideix
            cards[i].style.display = "";
        } else {
            // Amaga la targeta si no coincideix
            cards[i].style.display = "none";
        }
    }
}
