var citas = [];

function saveAppointment() {
    var clientName = document.getElementById('client-name').value;
    var appointmentDate = document.getElementById('appointment-date').value;
    var description = document.getElementById('description').value;
    var amount = document.getElementById('amount').value;
    var currency = document.querySelector('input[name="currency"]:checked').value;
    var whatsappNumber = document.getElementById('whatsapp-number').value;

    citas.push({
        name: clientName,
        date: appointmentDate,
        description: description,
        amount: amount,
        currency: currency,
        status: 'Pendiente',
        whatsapp: whatsappNumber
    });

    displayAppointments();
    clearForm();
}

function displayAppointments() {
    var citasPendientesContainer = document.getElementById('citas-pendientes');
    var citasCumplidasContainer = document.getElementById('citas-cumplidas');
    var citasPospuestasContainer = document.getElementById('citas-pospuestas');

    citasPendientesContainer.innerHTML = '';
    citasCumplidasContainer.innerHTML = '';
    citasPospuestasContainer.innerHTML = '';

    citas.forEach(function(cita, index) {
        var citaElement = document.createElement('div');
        citaElement.className = 'cita';
        citaElement.innerHTML = `
            <span>Nombre: ${cita.name} - Fecha: ${cita.date} - Estado: ${cita.status}</span>
            <br>Descripción: ${cita.description}
            <br>Monto Pagado: ${cita.amount} ${cita.currency}
            <br>Número de WhatsApp: ${cita.whatsapp}
            <br><button onclick="markAs('Cumplida', ${index})">Cumplida</button>
            <button onclick="markAs('Pospuesta', ${index})">Pospuesta</button>
            <button onclick="markAs('Pendiente', ${index})">Pendiente</button>
        `;

        if (cita.status === 'Pendiente') {
            citasPendientesContainer.appendChild(citaElement);
        } else if (cita.status === 'Cumplida') {
            citasCumplidasContainer.appendChild(citaElement);
        } else if (cita.status === 'Pospuesta') {
            citasPospuestasContainer.appendChild(citaElement);
        }else if (cita.status === 'Pendiente') {
            citasPospuestasContainer.appendChild(citaElement);
        }
    });
}

function markAs(status, index) {
    citas[index].status = status;
    displayAppointments();
}

function returnToPending(index) {
    citas[index].status = 'Pendiente';
    displayAppointments();
}
function clearForm() {
    document.getElementById('client-name').value = '';
    document.getElementById('appointment-date').value = '';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.querySelectorAll('input[name="currency"]').forEach(function(el) {
        el.checked = false;
    });
    document.getElementById('whatsapp-number').value = '';
}

function openWhatsApp() {
    var phoneNumber = document.getElementById('whatsapp-number').value;
    if (phoneNumber) {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
    } else {
        alert('Por favor, ingresa un número de teléfono.');
    }
}
