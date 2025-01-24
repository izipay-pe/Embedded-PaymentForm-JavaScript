// Agrega un event listener al formulario para manejar el evento 'submit'.
document.getElementById('formulario').addEventListener('submit', async function (event) {
  event.preventDefault(); // Evita el envío tradicional del formulario.

  // Captura los datos del formulario.
  const formData = new FormData(event.target); // Crea un objeto FormData a partir del formulario.
  const data = Object.fromEntries(formData.entries()); // Convierte FormData en un objeto JavaScript.

  try {
      // Guarda los datos del formulario en sessionStorage.
      sessionStorage.setItem('formData', JSON.stringify({ ...data }));

      // Redirige al usuario a la página de checkout.
      window.location.href = './checkout.html';
  } catch (error) {
      console.error('Error procesando el formulario:', error); // Muestra errores en la consola para depuración.
      alert('Hubo un problema al procesar los datos. Inténtalo de nuevo.'); // Notifica al usuario sobre el problema.
  }
});
