import "./style.css";
const formulario = document.querySelector<HTMLFormElement>('#formulario');
const borrarBtn = document.querySelector<HTMLButtonElement>('#borrar');

const borradoDeBase = () => {
  localStorage.removeItem('nombres');
  localStorage.removeItem('edades');
  localStorage.removeItem('paises');
};


formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const formulario = (document.querySelector<HTMLSelectElement>('#formulario') as HTMLSelectElement).value;
  const nombre = (document.querySelector<HTMLInputElement>('#nombre') as HTMLInputElement).value;
  const edad = Number((document.querySelector<HTMLInputElement>('#edad') as HTMLInputElement).value);
  const pais = (document.querySelector<HTMLSelectElement>('#pais') as HTMLSelectElement).value;

  borrarBtn.addEventListener('click', () => {
    borradoDeBase();
  });
  

  if (nombre === '' || edad === 0 || pais === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (edad < 18) {
    alert('Debes ser mayor 18 años para registrarte.');
    return;
  }

  let maxPersonas = null;

  switch (pais) {
    case 'arg':
      maxPersonas = 50;
      break;
    case 'chi':
      maxPersonas = 60;
      break;
    case 'uru':
      maxPersonas = 70;
      break;
    default:
      alert('Selecciona un país válido.');
      return;
  }

  let personas: Array<{ nombre: string, edad: number, pais: string }> = JSON.parse(localStorage.getItem('personas')) || [];

  if (personas.length >= maxPersonas) {
    alert(`Lo siento, ya se alcanzó el máximo de ${maxPersonas} personas para ${pais.toUpperCase()}.`);
    return;
  }

  const nuevaPersona = {
    nombre: nombre,
    edad: edad,
    pais: pais,
  };

  personas.push(nuevaPersona);

  localStorage.setItem('personas', JSON.stringify(personas));

  let nombres: Array<string> = JSON.parse(localStorage.getItem('nombres')) || [];
  nombres.push(nombre);
  localStorage.setItem('nombres', JSON.stringify(nombres));

  let edades: Array<number> = JSON.parse(localStorage.getItem('edades')) || [];
  edades.push(edad);
  localStorage.setItem('edades', JSON.stringify(edades));

  let paises: Array<string> = JSON.parse(localStorage.getItem('paises')) || [];
  paises.push(pais);
  localStorage.setItem('paises', JSON.stringify(paises));
  
	formulario.reset();
	
  alert('¡Registro exitoso!');
  
});
