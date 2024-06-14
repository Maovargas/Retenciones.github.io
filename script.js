function limpiarFormulario() {
    document.getElementById('retencionForm').reset();
    document.getElementById('valorCompra').value = '';
    document.getElementById('baseRetencion').value = '';
  }
  
  function formatearNumero(value) {
    const num = value.replace(/[^0-9]/g, '');
    if (num === '') return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(num).replace(/COP/, '$').trim();
  }
  
  function actualizarValor(event) {
    const valorSinFormato = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = formatearNumero(valorSinFormato);
  }
  
  document.getElementById('valorCompra').addEventListener('input', actualizarValor);
  document.getElementById('baseRetencion').addEventListener('input', actualizarValor);
  
  function calcularRetencion() {
    const camposRequeridos = [
      'agenteRetenedor',
      'fecha',
      'contribuyente',
      'nitCedula',
      'direccion',
      'valorCompra',
      'concepto',
      'baseRetencion',
      'tarifaRetencion'
    ];
  
    let formularioValido = true;
  
    camposRequeridos.forEach(id => {
      const campo = document.getElementById(id);
      if (!campo.value || (campo.tagName === 'SELECT' && campo.value === '')) {
        campo.style.borderColor = 'red';
        formularioValido = false;
      } else {
        campo.style.borderColor = '';
      }
    });
  
    if (!formularioValido) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
  
    const baseRetencion = parseFloat(document.getElementById('baseRetencion').value.replace(/[^0-9]/g, ''));
    const tarifa = parseFloat(document.getElementById('tarifaRetencion').value);
    const valorRetenido = Math.ceil(baseRetencion * (tarifa / 100));
  
    document.getElementById('valorRetenido').value = formatearNumero(valorRetenido.toString());
    document.getElementById('valorPagar').value = formatearNumero((baseRetencion - valorRetenido).toString());
  }
  