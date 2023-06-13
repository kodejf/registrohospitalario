document.addEventListener('DOMContentLoaded', function () {
  // Formulario de doctores
  const doctorForm = document.getElementById('doctor-form');
  doctorForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addDoctor();
    doctorForm.reset();
  });

  // Formulario de pacientes
  const patientForm = document.getElementById('patient-form');
  patientForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addPatient();
    patientForm.reset();
  });

  // Lista de pacientes
  const patientsList = document.getElementById('patients-list');
  const doctorsList = document.getElementById('doctors-list');

  // Cargar datos al cargar la página
  window.addEventListener('load', function () {
    loadData();
  });

  // Agregar datos del doctor al objeto
  function addDoctor() {
    const name = document.getElementById('doctor-name').value;
    const lastname = document.getElementById('doctor-lastname').value;
    const id = document.getElementById('doctor-id').value;
    const specialty = document.getElementById('doctor-specialty').value;
    const office = document.getElementById('doctor-office').value;
    const email = document.getElementById('doctor-email').value;

    const doctor = {
      name,
      lastname,
      id,
      specialty,
      office,
      email
    };

    data.doctors.push(doctor);
    saveData();
    displayDoctors();
  }

  // Agregar datos del paciente al objeto
  function addPatient() {
    const name = document.getElementById('patient-name').value;
    const lastname = document.getElementById('patient-lastname').value;
    const id = document.getElementById('patient-id').value;
    const age = document.getElementById('patient-age').value;
    const phone = document.getElementById('patient-phone').value;
    const specialty = document.getElementById('patient-specialty').value;

    const patient = {
      name,
      lastname,
      id,
      age,
      phone,
      specialty
    };

    data.patients.push(patient);
    saveData();
    displayPatients();
  }

  // Guardar datos en el almacenamiento local
  function saveData() {
    localStorage.setItem('clinicData', JSON.stringify(data));
  }

  // Cargar datos desde el almacenamiento local
  function loadData() {
    const jsonData = localStorage.getItem('clinicData');
    data = JSON.parse(jsonData) || { doctors: [], patients: [] };
    displayPatients();
    displayDoctors();
  }

  // Mostrar lista de pacientes
  function displayPatients() {
    patientsList.innerHTML = '';
    if (data.patients.length === 0) {
      patientsList.innerHTML = '<p>No hay pacientes registrados.</p>';
    } else {
      const patientsUl = document.createElement('ul');
      data.patients.forEach(function (patient) {
        const patientLi = document.createElement('li');
        patientLi.innerHTML = `
          <strong>Nombre:</strong> ${patient.name} ${patient.lastname}<br>
          <strong>Cédula:</strong> ${patient.id}<br>
          <strong>Edad:</strong> ${patient.age}<br>
          <strong>Teléfono:</strong> ${patient.phone}<br>
          <strong>Especialidad requerida:</strong> ${patient.specialty}
        `;
        patientsUl.appendChild(patientLi);
      });
      patientsList.appendChild(patientsUl);
    }
  }

  // Mostrar lista de doctores
  function displayDoctors() {
    doctorsList.innerHTML = '';
    if (data.doctors.length === 0) {
      doctorsList.innerHTML = '<p>No hay doctores registrados.</p>';
    } else {
      const doctorsUl = document.createElement('ul');
      data.doctors.forEach(function (doctor) {
        const doctorLi = document.createElement('li');
        doctorLi.innerHTML = `
          <strong>Nombre:</strong> ${doctor.name} ${doctor.lastname}<br>
          <strong>Cédula:</strong> ${doctor.id}<br>
          <strong>Especialidad:</strong> ${doctor.specialty}<br>
          <strong>Consultorio:</strong> ${doctor.office}<br>
          <strong>Correo de contacto:</strong> ${doctor.email}
        `;
        doctorsUl.appendChild(doctorLi);
      });
      doctorsList.appendChild(doctorsUl);
    }
  }
});
