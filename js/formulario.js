document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos los campos del formulario y el botón de enviar
    var form = document.getElementById("contactForm");
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var messageInput = document.getElementById("message");
    var submitButton = document.getElementById("submitButton");
  
    // Agregamos un event listener al formulario para el evento "input"
    form.addEventListener("input", function () {
      // Verificamos si todos los campos están completos y válidos
      var isNameValid = isNameInputValid(nameInput.value) // Llamamos a la función con el valor del campo del nombre
      var isEmailValid = validarCorreoElectronico(emailInput.value); // Llamamos a la función con el valor del campo de correo electrónico
      var isPhoneValid = validarNumeroTelefono(phoneInput.value); // Llamamos a la función con el valor del campo de teléfono
      var isMessageValid = isMessageInputValid(messageInput.value); // Llamamos a la función con el valor del campo de mensaje
  
      // Si todos los campos son válidos, habilitamos el botón de enviar
      if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        submitButton.disabled = false;
        submitButton.classList.remove("disabled");
      } else {
        // Si algún campo no es válido, deshabilitamos el botón de enviar
        submitButton.disabled = true;
        submitButton.classList.add("disabled");
      }
    });
});

function validarCorreoElectronico(correo) {
    // Expresión regular para validar el formato de correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(correo);
}

function validarNumeroTelefono(numero) {
    // Expresión regular para validar números de teléfono con o sin el símbolo "+"
    var regex = /^(?:\+?[0-9] ?){6,14}[0-9]$/;
    return regex.test(numero);
}

function isNameInputValid(name) {
    // Verificar si la longitud del mensaje es mayor o igual a 10
    return name.length >= 3;
}

function isMessageInputValid(message) {
    // Verificar si la longitud del mensaje es mayor o igual a 10
    return message.length >= 10;
}