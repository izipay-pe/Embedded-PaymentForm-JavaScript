// Evento que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', () => {
  console.log("datos de consola");

  // Recupera los datos guardados en sessionStorage
  const formData = JSON.parse(sessionStorage.getItem('formData'));

  if (!formData) {
    alert('No se encontraron datos del formulario. Redirigiendo...');
    window.location.href = './index.html';
    return;
  }

  // Captura los valores del formulario en variables
  const monto = formData.amount;   // Monto de la transacción
  const moneda = formData.currency; // Moneda utilizada
  const nombre = formData.firstName; // Nombre del cliente
  const apellido = formData.lastName; // Apellido del cliente
  const correo = formData.email; // Correo electrónico del cliente
  const telefono = formData.phoneNumber; // Número de teléfono
  const tipoDocumento = formData.identityType; // Tipo de documento de identidad
  const documento = formData.identityCode; // Número de documento
  const direccion = formData.address; // Dirección del cliente
  const pais = formData.country; // País
  const departamento = formData.state; // Departamento o estado
  const ciudad = formData.city; // Ciudad
  const codigoPostal = formData.zipCode;  // Código postal
  const numeroOrden = formData.orderId;  // Número de orden

  // Llama a la función para procesar el pago
  onCheckout(nombre, apellido, correo, telefono, tipoDocumento, documento, direccion, pais, departamento, ciudad, codigoPostal, numeroOrden, monto, moneda);
});

/**
 * Procesa el pago y genera el token necesario.
 */

function onCheckout(nombre, apellido, correo, telefono, tipoDocumento, documento, direccion, pais, departamento, ciudad, codigoPostal, numeroOrden, monto, moneda) {
  // Crea el objeto de la orden
  const order = {
    amount: monto * 100, // Convierte a la unidad menor de la moneda
    currency: moneda,
    customer: {
      email: correo,
      billingDetails: {
        firstName: nombre,
        lastName: apellido,
        phoneNumber: telefono,
        identityType: tipoDocumento,
        identityCode: documento,
        address: direccion,
        country: pais,
        state: departamento,
        city: ciudad,
        zipCode: codigoPostal
      }
    },
    orderId: numeroOrden
  };

  // Obtiene el token del formulario y muestra el formulario de pago
  getFormToken(order, displayPaymentForm, alert);
}

/**
 * Obtiene el token del formulario desde el servidor.
 * @param {Object} order - Objeto de la orden.
 * @param {Function} resolve - Función a ejecutar si la solicitud tiene éxito.
 * @param {Function} reject - Función a ejecutar si la solicitud falla.
 */
function getFormToken(order, resolve, reject) {
  const request = new XMLHttpRequest();

  // Configura la solicitud POST
  request.open('POST', 'http://localhost:3000/create-payment', true);
  request.setRequestHeader('Content-Type', 'application/json');

  // Define la respuesta en caso de éxito o error
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const respuesta = JSON.parse(this.response);
      const token = respuesta.data;
      console.log(respuesta);
      resolve(token);
    } else {
      reject("Respuesta inválida del servidor. Código: " + request.status);
    }
  };

  request.onerror = function (error) {
    reject(error);
  };

  // Envía la solicitud con los datos de la orden
  request.send(JSON.stringify(order));
}

/**
 * Muestra el formulario de pago utilizando el token proporcionado.
 * @param {string} formToken - Token del formulario.
 */
function displayPaymentForm(formToken) {
  // Muestra el contenedor del formulario de pago
  document.getElementById('mostrartoken').style.display = 'block';

  // Establece el token del formulario
  KR.setFormToken(formToken);

  // Agrega un listener para el evento de envío del formulario
  KR.onSubmit(onPaid);
}

/**
 * Maneja el evento de pago completado.
 * @param {Object} event - Evento que contiene la respuesta del pago.
 */
function onPaid(event) {
  if (event.clientAnswer.orderStatus === "PAID") {
    console.log(event);

    try {
      // Guarda los datos del pago en sessionStorage
      sessionStorage.setItem('resultadoPago', JSON.stringify({ ...event }));

      // Redirige a la página de resultados
      window.location.href = './result.html';
    } catch (error) {
      console.error('Error procesando el formulario:', error);
      alert('Hubo un problema al procesar los datos. Inténtalo de nuevo.');
    }

    // Elimina el formulario de pago
    KR.removeForms();

    // Muestra un mensaje de éxito
    document.getElementById("paymentSuccessful").style.display = "block";
  } else {
    // Muestra un mensaje de error al usuario
    alert("¡El pago falló!");
  }
}