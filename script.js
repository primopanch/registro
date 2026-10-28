const $ = id => document.getElementById(id);

function avisar(input, aviso, texto) {
  input.classList.remove('invalido');
  void input.offsetWidth;
  input.classList.add('invalido');
  aviso.textContent = texto;
  clearTimeout(input._t);
  input._t = setTimeout(() => { input.classList.remove('invalido'); aviso.textContent = ''; }, 1800);
}

function restringir(id, avisoId, regla, mensaje) {
  const input = $(id), aviso = $(avisoId);
  input.onkeypress = e => {
    if (e.ctrlKey || e.metaKey || e.key.length > 1) return;
    if (!regla.test(e.key)) { e.preventDefault(); avisar(input, aviso, mensaje); }
  };
  input.addEventListener('input', () => {
    const limpio = [...input.value].filter(caracter => regla.test(caracter)).join('');
    if (limpio !== input.value) { input.value = limpio; avisar(input, aviso, mensaje); }
  });
}

restringir('nombre',   'aviso-nombre',   /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]$/, 'Solo letras y espacios');
restringir('apellido', 'aviso-apellido', /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]$/, 'Solo letras y espacios');
restringir('telefono', 'aviso-telefono', /^[0-9]$/, 'Solo números');
restringir('correo',   'aviso-correo',   /^\S$/, 'El correo no lleva espacios');

const bio = $('bio'), contador = $('contador');
bio.onkeypress = bio.oninput = () => {
  setTimeout(() => {
    contador.textContent = bio.value.length;
    contador.parentElement.classList.toggle('limite', bio.value.length >= 200);
  });
};

$('formulario').addEventListener('submit', e => {
  e.preventDefault();
  const ok = $('nombre').value.trim() && $('apellido').value.trim() &&
             /^\d{10}$/.test($('telefono').value) &&
             /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('correo').value);
  $('exito').style.color = ok ? '' : 'var(--error)';
  $('exito').textContent = ok
    ? '¡Listo! Tus cambios se guardaron.'
    : 'Revisa nombre, apellido, teléfono (10 dígitos) y correo.';
});
