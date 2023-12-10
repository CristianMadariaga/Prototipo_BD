let selectedPayment = null;

function selectPayment(paymentType) {
    selectedPayment = paymentType;

    document.getElementById(`${paymentType}Btn`).classList.add('selected');

    const otherPaymentType = paymentType === 'tarjeta' ? 'efectivo' : 'tarjeta';
    document.getElementById(`${otherPaymentType}Btn`).classList.remove('selected');

    document.getElementById('realizarPagoBtn').removeAttribute('disabled');
}

function realizarPago() {
    if (selectedPayment) {
        window.location.href = 'fin_pago.html'; // Redirige a la página de Fin del Pago
    } else {
        alert('Seleccione un método de pago antes de realizar el pago.'); // Opcional: Puedes mantener esta alerta si lo deseas
    }
}
