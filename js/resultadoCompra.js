// Evento que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', () => {
  console.log("datos de consola");

  // Recupera los datos guardados en sessionStorage
  const formData = JSON.parse(sessionStorage.getItem('resultadoPago'));

  if (!formData) {
    alert('No se encontraron datos del formulario. Redirigiendo...');
    // window.location.href = './index.html'; // Descomentarlo si se requiere redirección
    return;
  }

  // Muestra los datos en la consola para depuración (opcional)
  console.log(formData);

  // Convierte el hash a un formato legible
  const resultado = JSON.stringify(formData.hash);

  // Captura el estado de la orden y lo muestra
  const estadoOrden = formData.clientAnswer?.orderStatus;
  const estadoOrdendiv = document.getElementById('orderStatus');
  estadoOrdendiv.textContent = estadoOrden;

  // Captura y muestra el monto total
  const montoTotal = formData.clientAnswer?.orderDetails?.orderTotalAmount;
  const montoTotaldiv = document.getElementById('orderTotalAmount');
  montoTotaldiv.textContent = (montoTotal / 100).toFixed(2);

  // Captura y muestra la moneda
  const moneda = formData.clientAnswer?.orderDetails?.orderCurrency;
  const monedadiv = document.getElementById('orderCurrency');
  monedadiv.textContent = moneda;

  // Captura y muestra el número de orden
  const numeroOrden = formData.clientAnswer?.orderDetails?.orderId;
  const numeroOrdendiv = document.getElementById('orderId');
  numeroOrdendiv.textContent = numeroOrden;

  // Captura y muestra el hash
  const hashDiv = document.getElementById('hash');
  hashDiv.textContent = resultado;

  // Captura y muestra el algoritmo del hash
  const hashAlg = formData.hashAlgorithm;
  const hashAlgDiv = document.getElementById('hashAlgorithm');
  hashAlgDiv.textContent = hashAlg;

  // Captura y muestra el tipo de respuesta
  const answerType = formData.clientAnswer?._type;
  const answerTypeDiv = document.getElementById('_type');
  answerTypeDiv.textContent = answerType;

  // Captura y muestra la respuesta sin procesar del cliente
  const krAnswer = formData.rawClientAnswer;
  const krAnswerDiv = document.getElementById('krAnswer');
  krAnswerDiv.textContent = krAnswer;

  // Captura y muestra la clave del hash
  const hashKey = formData.hashKey;
  const hashKeyDiv = document.getElementById('hashKey');
  hashKeyDiv.textContent = hashKey;

  // Captura y muestra la respuesta del cliente
  const answerdiv = document.getElementById('kranswer');
  answerdiv.textContent = JSON.stringify(formData.clientAnswer, undefined, 5);
});
