const users = [
    { username: "admin", password: "admin123", name: "Administrador" },
    { username: "usuario1", password: "clave123", name: "Usuario de Prueba" }
];

// Funciones para ventanas emergentes personalizadas
function customAlert(message, title = "Mensaje") {
    return new Promise((resolve) => {
        const modalElement = document.getElementById('custom-alert-modal');
        document.getElementById('alert-title').textContent = title;
        document.getElementById('alert-message').textContent = message;
        
        const confirmBtn = document.getElementById('alert-confirm-btn');
        
        // Eliminar eventos previos para evitar duplicados
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        
        // Agregar el nuevo evento
        newConfirmBtn.addEventListener('click', () => {
            modalElement.classList.remove('active');
            resolve(true);
        });
        
        // Mostrar el modal
        modalElement.classList.add('active');
    });
}

function customConfirm(message, title = "Confirmar") {
    return new Promise((resolve) => {
        const modalElement = document.getElementById('custom-confirm-modal');
        document.getElementById('confirm-title').textContent = title;
        document.getElementById('confirm-message').textContent = message;
        
        const acceptBtn = document.getElementById('confirm-accept-btn');
        const cancelBtn = document.getElementById('confirm-cancel-btn');
        
        // Eliminar eventos previos para evitar duplicados
        const newAcceptBtn = acceptBtn.cloneNode(true);
        const newCancelBtn = cancelBtn.cloneNode(true);
        acceptBtn.parentNode.replaceChild(newAcceptBtn, acceptBtn);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
        
        // Agregar los nuevos eventos
        newAcceptBtn.addEventListener('click', () => {
            modalElement.classList.remove('active');
            resolve(true);
        });
        
        newCancelBtn.addEventListener('click', () => {
            modalElement.classList.remove('active');
            resolve(false);
        });
        
        // Mostrar el modal
        modalElement.classList.add('active');
    });
}

// Elementos del DOM
const loginScreen = document.getElementById('login-screen');
const appContainer = document.getElementById('app-container');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const createAccountBtn = document.getElementById('create-account-btn');

// Manejar el inicio de sesión
loginBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        await customAlert('Por favor ingrese usuario y contraseña', 'Campos requeridos');
        return;
    }

    try {
        const response = await fetch('api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            // Inicio de sesión exitoso
            loginScreen.style.display = 'none';
            appContainer.style.display = 'flex';
            
            // Guardar información del usuario en localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            // Inicializar la aplicación
            PetControl.init();
        } else {
            await customAlert(data.error || 'Error en el inicio de sesión', 'Error');
        }
    } catch (error) {
        await customAlert('Error al conectar con el servidor', 'Error de conexión');
        console.error('Error:', error);
    }
});

// Eliminar los event listeners duplicados y consolidar en uno solo
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar el fondo al login screen cuando se carga la página
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        // Asegurarnos de que los estilos se mantengan
        loginScreen.style.display = 'flex';
        // Verificar si la imagen de fondo está aplicada correctamente
        if (!loginScreen.style.backgroundImage || loginScreen.style.backgroundImage === 'none') {
            loginScreen.style.backgroundImage = "url('dos.jpg')";
            loginScreen.style.backgroundSize = "cover";
            loginScreen.style.backgroundPosition = "center";
        }
    }
    
    // Configurar el botón de logout
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            const confirmLogout = await customConfirm('¿Estás seguro de que deseas cerrar sesión?', 'Cerrar sesión');
            
            if (confirmLogout) {
                // Eliminar usuario actual del almacenamiento local
                localStorage.removeItem('currentUser');
                
                // Ocultar el contenedor principal de la aplicación
                const appContainer = document.getElementById('app-container');
                if (appContainer) {
                    appContainer.style.display = 'none';
                }
                
                // Mostrar la pantalla de inicio de sesión
                const loginScreen = document.getElementById('login-screen');
                if (loginScreen) {
                    // Asegurarnos de que los estilos se mantengan
                    loginScreen.style.display = 'flex';
                    // Verificar si la imagen de fondo está aplicada correctamente
                    if (!loginScreen.style.backgroundImage || loginScreen.style.backgroundImage === 'none') {
                        loginScreen.style.backgroundImage = "url('dos.jpg')";
                        loginScreen.style.backgroundSize = "cover";
                        loginScreen.style.backgroundPosition = "center";
                    }
                }
                
                // Limpiar campos de login
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            }
        });
    } else {
        console.error('El botón de cerrar sesión no se encontró en el DOM.');
    }

    // Verificar si hay un usuario logueado y inicializar la aplicación
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        loginScreen.style.display = 'none';
        appContainer.style.display = 'flex';
    }
    
    // Inicializar la aplicación en todos los casos
    PetControl.init();
});

// Manejar la creación de cuenta
createAccountBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        await customAlert('Por favor ingrese usuario y contraseña', 'Campos requeridos');
        return;
    }

    try {
        const response = await fetch('api/login.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                name: username // Usar el username como nombre por defecto
            })
        });

        const data = await response.json();

        if (data.success) {
            await customAlert('Cuenta creada exitosamente. Ahora puede iniciar sesión.', 'Operación exitosa');
            usernameInput.value = '';
            passwordInput.value = '';
        } else {
            await customAlert(data.error || 'Error al crear la cuenta', 'Error');
        }
    } catch (error) {
        await customAlert('Error al conectar con el servidor', 'Error de conexión');
        console.error('Error:', error);
    }
});

// Objeto principal de la aplicación
const PetControl = {
    // Datos iniciales
    data: {
        pets: [],
        vaccines: [],
        visits: [],
        medicines: [],
        diagnosisHistory: [],
        reminders: []
    },
    
    // Enfermedades y síntomas predefinidos
    diseases: [
        {
            name: "Moquillo",
            symptoms: ["Fiebre", "Letargo", "Pérdida de apetito", "Secreción ocular", "Secreción nasal", "Tos"],
            description: "Enfermedad viral altamente contagiosa que afecta múltiples sistemas del cuerpo.",
            recommendation: "Consulta veterinaria urgente. Aislamiento de otras mascotas. Mantener hidratado."
        },
        {
            name: "Parvovirus",
            symptoms: ["Vómitos", "Diarrea", "Pérdida de apetito", "Letargo", "Fiebre"],
            description: "Enfermedad viral grave que afecta el tracto gastrointestinal.",
            recommendation: "Emergencia veterinaria inmediata. Altamente contagioso para otros perros."
        },
        {
            name: "Leptospirosis",
            symptoms: ["Fiebre", "Vómitos", "Diarrea", "Letargo", "Sed excesiva"],
            description: "Infección bacteriana que puede dañar el hígado y los riñones.",
            recommendation: "Tratamiento con antibióticos necesario. Puede ser zoonótica (transmisible a humanos)."
        },
        {
            name: "Alergias",
            symptoms: ["Picor", "Estornudos", "Secreción ocular"],
            description: "Reacción alérgica a factores ambientales o alimenticios.",
            recommendation: "Identificar alérgenos. Pueden requerirse antihistamínicos o cambio de dieta."
        },
        {
            name: "Artritis",
            symptoms: ["Cojea", "Letargo", "Dificultad para moverse"],
            description: "Inflamación de las articulaciones, común en mascotas mayores.",
            recommendation: "Suplementos articulares. Control de peso. Medicamentos antiinflamatorios bajo supervisión veterinaria."
        },
        {
            name: "Infección de oído",
            symptoms: ["Picor", "Sacudida de cabeza", "Secreción ocular"],
            description: "Infección bacteriana o por hongos en el canal auditivo.",
            recommendation: "Limpieza y medicación tópica. Evitar que entre agua en los oídos."
        },
        {
            name: "Obesidad",
            symptoms: ["Pérdida de apetito", "Letargo", "Dificultad para respirar", "Pérdida de peso"],
            description: "Exceso de peso que afecta la salud general de la mascota.",
            recommendation: "Plan de alimentación controlado. Incremento gradual de ejercicio."
        }
    ],
    
    // Inicialización de la aplicación
    init: async function() {
        try {
            // Cargar datos desde el servidor
            await this.loadPets();
            await this.loadVaccines();
            await this.loadVisits();
            await this.loadMedicines();
            await this.loadDiagnosis();
            
            // Configurar event listeners
            this.setupEventListeners();
            
            // Renderizar las diferentes secciones
            this.renderDashboard();
            this.renderPets();
            this.renderVaccines();
            this.renderVisits();
            this.renderMedicines();
            this.renderDiagnosisHistory();
            this.checkReminders();
            
            // Mostrar la sección activa basada en hash o por defecto dashboard
            const hash = window.location.hash.substring(1);
            const defaultSection = hash || 'dashboard';
            this.showSection(defaultSection);
        } catch (error) {
            console.error('Error en la inicialización:', error);
            await customAlert('Error al cargar los datos iniciales', 'Error de inicialización');
        }
    },
    
    // Cargar datos desde localStorage
    loadData: function() {
        const savedData = localStorage.getItem('petControlData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        } else {
            // Datos de ejemplo para demostración
            this.data = {
                pets: [
                    {
                        id: '1',
                        name: 'Max',
                        species: 'Perro',
                        breed: 'Labrador Retriever',
                        age: 3,
                        owner: 'Juan Pérez',
                        photo: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    },
                    {
                        id: '2',
                        name: 'Luna',
                        species: 'Gato',
                        breed: 'Siamés',
                        age: 2,
                        owner: 'María Gómez',
                        photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    }
                ],
                vaccines: [
                    {
                        id: '1',
                        petId: '1',
                        type: 'Rabia',
                        date: '2023-01-15',
                        nextDate: '2024-01-15',
                        notes: 'Vacuna anual contra la rabia'
                    },
                    {
                        id: '2',
                        petId: '1',
                        type: 'Moquillo',
                        date: '2023-03-10',
                        nextDate: '2024-03-10',
                        notes: 'Vacuna múltiple'
                    },
                    {
                        id: '3',
                        petId: '2',
                        type: 'Leucemia Felina',
                        date: '2023-02-20',
                        nextDate: '2024-02-20',
                        notes: 'Vacuna anual'
                    }
                ],
                visits: [
                    {
                        id: '1',
                        petId: '1',
                        date: '2023-04-05',
                        reason: 'Chequeo anual',
                        diagnosis: 'Salud óptima',
                        treatment: 'Ninguno necesario',
                        nextDate: '2024-04-05'
                    },
                    {
                        id: '2',
                        petId: '2',
                        date: '2023-05-12',
                        reason: 'Problemas digestivos',
                        diagnosis: 'Indigestión leve',
                        treatment: 'Dieta blanda por 2 días',
                        nextDate: ''
                    }
                ],
                medicines: [
                    {
                        id: '1',
                        petId: '2',
                        name: 'Antibiótico',
                        dose: '1 tableta',
                        frequency: 'Cada 12 horas',
                        startDate: '2023-05-12',
                        endDate: '2023-05-19',
                        notes: 'Tomar con comida'
                    }
                ],
                diagnosisHistory: [
                    {
                        id: '1',
                        petId: '1',
                        date: '2023-06-01',
                        symptoms: ['Fiebre', 'Letargo', 'Pérdida de apetito'],
                        possibleDiseases: ['Moquillo', 'Parvovirus'],
                        recommendations: 'Consulta veterinaria urgente. Mantener hidratado.'
                    }
                ],
                reminders: []
            };
            this.saveData();
        }
    },
    
    // Guardar datos en localStorage
    saveData: function() {
        localStorage.setItem('petControlData', JSON.stringify(this.data));
    },
    
    // Configurar event listeners
    setupEventListeners: function() {
        // Navegación
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                this.showSection(section);
                window.location.hash = section;
            });
        });
        
        // Mascotas
        document.getElementById('add-pet-btn').addEventListener('click', () => this.showPetModal());
        
        // Usar una variable para controlar si ya se está procesando un envío
        let isSubmitting = false;
        
        document.getElementById('pet-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Evitar múltiples envíos
            if (isSubmitting) return;
            isSubmitting = true;
            
            try {
                await this.savePet();
            } catch (error) {
                console.error('Error al guardar mascota:', error);
            } finally {
                isSubmitting = false;
            }
        });
        
        document.querySelector('#pet-modal .close').addEventListener('click', () => this.closeModal('pet-modal'));
        
        // Vacunas
        document.getElementById('add-vaccine-btn').addEventListener('click', () => this.showVaccineModal());
        document.getElementById('vaccine-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveVaccine();
        });
        document.querySelector('#vaccine-modal .close').addEventListener('click', () => this.closeModal('vaccine-modal'));
        document.getElementById('filter-vaccine-pet').addEventListener('change', () => this.renderVaccines());
        
        // Visitas
        document.getElementById('add-visit-btn').addEventListener('click', () => this.showVisitModal());
        document.getElementById('visit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveVisit();
        });
        document.querySelector('#visit-modal .close').addEventListener('click', () => this.closeModal('visit-modal'));
        document.getElementById('filter-visit-pet').addEventListener('change', () => this.renderVisits());
        
        // Medicamentos
        document.getElementById('add-medicine-btn').addEventListener('click', () => this.showMedicineModal());
        document.getElementById('medicine-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveMedicine();
        });
        document.querySelector('#medicine-modal .close').addEventListener('click', () => this.closeModal('medicine-modal'));
        document.getElementById('filter-medicine-pet').addEventListener('change', () => this.renderMedicines());
        
        // Diagnóstico
        document.getElementById('diagnose-btn').addEventListener('click', () => this.diagnose());
    },
    
    // Mostrar sección específica
    showSection: function(sectionId) {
        // Ocultar todas las secciones
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Desactivar todos los enlaces de navegación
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Mostrar la sección solicitada
        document.getElementById(sectionId).classList.add('active');
        
        // Activar el enlace de navegación correspondiente
        document.querySelector(`.nav-link[data-section="${sectionId}"]`).classList.add('active');
        
        // Actualizar la sección si es necesario
        switch(sectionId) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'pets':
                this.renderPets();
                break;
            case 'vaccines':
                this.renderVaccines();
                break;
            case 'visits':
                this.renderVisits();
                break;
            case 'medicines':
                this.renderMedicines();
                break;
            case 'diagnosis':
                this.renderDiagnosisHistory();
                break;
        }
    },
    
    // Cerrar modal
    closeModal: function(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.getElementById(modalId.replace('modal', 'form')).reset();
    },
    
    // Generar ID único
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Formatear fecha
    formatDate: function(dateString) {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    },
    
    // ===== MASCOTAS =====
    showPetModal: function(pet = null) {
        const modal = document.getElementById('pet-modal');
        const form = document.getElementById('pet-form');
        
        if (pet) {
            // Modo edición
            document.getElementById('pet-modal-title').textContent = 'Editar Mascota';
            document.getElementById('pet-id').value = pet.id;
            document.getElementById('pet-name').value = pet.nombre || '';
            document.getElementById('pet-species').value = pet.especie || '';
            document.getElementById('pet-breed').value = pet.raza || '';
            document.getElementById('pet-age').value = pet.edad || '';
            document.getElementById('pet-owner').value = pet.duenio || '';
            document.getElementById('pet-photo').value = pet.foto || '';
        } else {
            // Modo agregar
            document.getElementById('pet-modal-title').textContent = 'Agregar Nueva Mascota';
            form.reset();
            document.getElementById('pet-id').value = '';
        }
        
        modal.classList.add('active');
    },
    
    savePet: async function() {
        const petId = document.getElementById('pet-id').value;
        const isEdit = !!petId;
        
        // Validar campos requeridos
        const nombre = document.getElementById('pet-name').value.trim();
        const especie = document.getElementById('pet-species').value.trim();
        const duenio = document.getElementById('pet-owner').value.trim();
        
        if (!nombre || !especie || !duenio) {
            await customAlert('Por favor completa los campos obligatorios (nombre, especie y dueño)', 'Campos requeridos');
            return;
        }

        const petData = {
            nombre: nombre,
            especie: especie,
            raza: document.getElementById('pet-breed').value.trim() || '',
            edad: parseInt(document.getElementById('pet-age').value) || 0,
            duenio: duenio,
            foto: document.getElementById('pet-photo').value.trim() || ''
        };

        try {
            const response = await fetch('api/mascotas.php', {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(isEdit ? { ...petData, id: petId } : petData)
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (data.success) {
                // Cerrar el modal antes de recargar los datos
                this.closeModal('pet-modal');
                
                // Recargar y renderizar una sola vez
                await this.loadPets();
                this.renderPets();
                
                await customAlert(isEdit ? 'Mascota actualizada correctamente' : 'Mascota agregada correctamente', 'Operación exitosa');
            } else {
                await customAlert(data.error || 'Error al guardar la mascota', 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            await customAlert('Error al conectar con el servidor', 'Error de conexión');
            throw error; // Re-lanzar el error para que sea manejado por el caller
        }
    },
    
    // Función para cargar mascotas desde el servidor
    loadPets: async function() {
        try {
            const response = await fetch('api/mascotas.php');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Mascotas cargadas:', data);
            this.data.pets = Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
            this.data.pets = [];
            throw error;
        }
    },
    
    deletePet: async function(petId) {
        const confirmDelete = await customConfirm('¿Estás seguro de que deseas eliminar esta mascota? También se eliminarán sus registros asociados.', 'Eliminar mascota');
        
        if (confirmDelete) {
            // Eliminar mascota
            this.data.pets = this.data.pets.filter(pet => pet.id !== petId);
            
            // Eliminar registros asociados
            this.data.vaccines = this.data.vaccines.filter(vaccine => vaccine.petId !== petId);
            this.data.visits = this.data.visits.filter(visit => visit.petId !== petId);
            this.data.medicines = this.data.medicines.filter(medicine => medicine.petId !== petId);
            this.data.diagnosisHistory = this.data.diagnosisHistory.filter(diagnosis => diagnosis.petId !== petId);
            
            this.saveData();
            this.renderPets();
            this.renderVaccines();
            this.renderVisits();
            this.renderMedicines();
            this.renderDiagnosisHistory();
            this.renderDashboard();
        }
    },
    
    renderPets: function() {
        const petsList = document.getElementById('pets-list');
        petsList.innerHTML = '';
        
        if (!this.data.pets || this.data.pets.length === 0) {
            petsList.innerHTML = '<p>No hay mascotas registradas. Agrega tu primera mascota.</p>';
            return;
        }
        
        this.data.pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            
            const photoStyle = pet.foto ? `background-image: url('${pet.foto}')` : 
                `background-color: ${pet.especie === 'Perro' ? '#4a6fa5' : pet.especie === 'Gato' ? '#ff9800' : '#4caf50'}`;
            
            petCard.innerHTML = `
                <div class="pet-card-header" style="${photoStyle}">
                    <span class="pet-species">${pet.especie || 'No especificado'}</span>
                </div>
                <div class="pet-card-body">
                    <h3>${pet.nombre || 'Sin nombre'}</h3>
                    <p><strong>Raza:</strong> ${pet.raza || 'N/A'}</p>
                    <p><strong>Edad:</strong> ${pet.edad ? pet.edad + ' años' : 'N/A'}</p>
                    <p><strong>Dueño:</strong> ${pet.duenio || 'No especificado'}</p>
                </div>
                <div class="pet-card-footer">
                    <button class="btn btn-secondary btn-sm edit-pet" data-id="${pet.id}">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm delete-pet" data-id="${pet.id}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            
            petsList.appendChild(petCard);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.edit-pet').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const petId = e.target.closest('button').getAttribute('data-id');
                const pet = this.data.pets.find(p => p.id === petId);
                if (pet) {
                    this.showPetModal(pet);
                }
            });
        });
        
        document.querySelectorAll('.delete-pet').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const petId = e.target.closest('button').getAttribute('data-id');
                const confirmDelete = await customConfirm('¿Estás seguro de que deseas eliminar esta mascota?', 'Eliminar mascota');
                
                if (confirmDelete) {
                    try {
                        const response = await fetch('api/mascotas.php', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: petId })
                        });
                        
                        const data = await response.json();
                        if (data.success) {
                            await this.loadPets();
                            this.renderPets();
                            await customAlert('Mascota eliminada correctamente', 'Operación exitosa');
                        } else {
                            await customAlert(data.error || 'Error al eliminar la mascota', 'Error');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        await customAlert('Error al conectar con el servidor', 'Error de conexión');
                    }
                }
            });
        });
    },
    
    // ===== VACUNAS =====
    showVaccineModal: function(vaccine = null) {
        const modal = document.getElementById('vaccine-modal');
        const form = document.getElementById('vaccine-form');
        const petSelect = document.getElementById('vaccine-pet');
        
        // Llenar selector de mascotas
        petSelect.innerHTML = '<option value="">Seleccione una mascota...</option>';
        this.data.pets.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.id;
            option.textContent = pet.nombre;
            petSelect.appendChild(option);
        });
        
        if (vaccine) {
            // Modo edición
            document.getElementById('vaccine-modal-title').textContent = 'Editar Vacuna';
            document.getElementById('vaccine-id').value = vaccine.id;
            document.getElementById('vaccine-pet').value = vaccine.mascota_id;
            document.getElementById('vaccine-type').value = vaccine.tipo;
            document.getElementById('vaccine-date').value = vaccine.fecha;
            document.getElementById('vaccine-next-date').value = vaccine.proxima_fecha || '';
            document.getElementById('vaccine-notes').value = vaccine.notas || '';
        } else {
            // Modo agregar
            document.getElementById('vaccine-modal-title').textContent = 'Agregar Vacuna';
            form.reset();
            document.getElementById('vaccine-date').value = new Date().toISOString().split('T')[0];
        }
        
        modal.classList.add('active');
    },
    
    saveVaccine: async function() {
        const form = document.getElementById('vaccine-form');
        const vaccineId = document.getElementById('vaccine-id').value;
        const isEdit = !!vaccineId;
        
        if (!document.getElementById('vaccine-pet').value) {
            await customAlert('Por favor seleccione una mascota', 'Campo requerido');
            return;
        }
        
        if (!document.getElementById('vaccine-type').value) {
            await customAlert('Por favor seleccione un tipo de vacuna', 'Campo requerido');
            return;
        }
        
        if (!document.getElementById('vaccine-date').value) {
            await customAlert('Por favor seleccione una fecha', 'Campo requerido');
            return;
        }
        
        const vaccineData = {
            id: vaccineId,
            mascota_id: document.getElementById('vaccine-pet').value,
            tipo: document.getElementById('vaccine-type').value,
            fecha: document.getElementById('vaccine-date').value,
            proxima_fecha: document.getElementById('vaccine-next-date').value || null,
            notas: document.getElementById('vaccine-notes').value
        };
        
        console.log('Enviando datos de vacuna:', vaccineData);
        
        try {
            const response = await fetch('api/vacunas.php', {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vaccineData)
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
            if (data.success) {
                this.closeModal('vaccine-modal');
                await this.loadVaccines();
                this.renderVaccines();
                this.renderDashboard();
                this.checkReminders();
                await customAlert(isEdit ? 'Vacuna actualizada correctamente' : 'Vacuna agregada correctamente', 'Operación exitosa');
            } else {
                await customAlert(data.error || 'Error al guardar la vacuna', 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            await customAlert('Error al conectar con el servidor', 'Error de conexión');
        }
    },
    
    deleteVaccine: async function(vaccineId) {
        const confirmDelete = await customConfirm('¿Estás seguro de que deseas eliminar este registro de vacuna?', 'Eliminar vacuna');
        
        if (confirmDelete) {
            try {
                const response = await fetch('api/vacunas.php', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: vaccineId })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    await this.loadVaccines();
                    this.renderVaccines();
                    this.renderDashboard();
                    this.checkReminders();
                    await customAlert('Vacuna eliminada correctamente', 'Operación exitosa');
                } else {
                    await customAlert(data.error || 'Error al eliminar la vacuna', 'Error');
                }
            } catch (error) {
                console.error('Error:', error);
                await customAlert('Error al conectar con el servidor', 'Error de conexión');
            }
        }
    },
    
    renderVaccines: function() {
        const vaccinesList = document.getElementById('vaccines-list');
        vaccinesList.innerHTML = '';
        
        const filterPetId = document.getElementById('filter-vaccine-pet').value;
        let vaccinesToShow = [...this.data.vaccines];
        
        if (filterPetId) {
            vaccinesToShow = vaccinesToShow.filter(v => v.mascota_id === filterPetId);
        }
        
        if (vaccinesToShow.length === 0) {
            vaccinesList.innerHTML = '<tr><td colspan="5">No hay registros de vacunas.</td></tr>';
            return;
        }
        
        vaccinesToShow.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        vaccinesToShow.forEach(vaccine => {
            const pet = this.data.pets.find(p => p.id === vaccine.mascota_id);
            const petName = pet ? pet.nombre : 'Mascota desconocida';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${petName}</td>
                <td>${vaccine.tipo}</td>
                <td>${this.formatDate(vaccine.fecha)}</td>
                <td>${vaccine.proxima_fecha ? this.formatDate(vaccine.proxima_fecha) : 'N/A'}</td>
                <td class="actions">
                    <button class="btn btn-secondary btn-sm edit-vaccine" data-id="${vaccine.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm delete-vaccine" data-id="${vaccine.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            vaccinesList.appendChild(row);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.edit-vaccine').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const vaccineId = e.target.closest('button').getAttribute('data-id');
                const vaccine = this.data.vaccines.find(v => v.id === vaccineId);
                this.showVaccineModal(vaccine);
            });
        });
        
        document.querySelectorAll('.delete-vaccine').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const vaccineId = e.target.closest('button').getAttribute('data-id');
                await this.deleteVaccine(vaccineId);
            });
        });
    },
    
    // Función para cargar vacunas desde el servidor
    loadVaccines: async function() {
        try {
            const response = await fetch('api/vacunas.php');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.data.vaccines = Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error al cargar vacunas:', error);
            this.data.vaccines = [];
            throw error;
        }
    },
    
    // ===== VISITAS VETERINARIAS =====
    showVisitModal: function(visit = null) {
        const modal = document.getElementById('visit-modal');
        const form = document.getElementById('visit-form');
        const petSelect = document.getElementById('visit-pet');
        
        // Llenar selector de mascotas
        petSelect.innerHTML = '';
        this.data.pets.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.id;
            option.textContent = pet.nombre;
            petSelect.appendChild(option);
        });
        
        if (visit) {
            // Modo edición
            document.getElementById('visit-modal-title').textContent = 'Editar Visita Veterinaria';
            document.getElementById('visit-id').value = visit.id;
            document.getElementById('visit-pet').value = visit.mascota_id || visit.petId || '';
            document.getElementById('visit-date').value = visit.fecha || visit.date || '';
            document.getElementById('visit-reason').value = visit.motivo || visit.reason || '';
            document.getElementById('visit-diagnosis').value = visit.diagnostico || visit.diagnosis || '';
            document.getElementById('visit-treatment').value = visit.tratamiento || visit.treatment || '';
            document.getElementById('visit-next-date').value = visit.proxima_visita || visit.nextDate || '';
        } else {
            // Modo agregar
            document.getElementById('visit-modal-title').textContent = 'Agregar Visita Veterinaria';
            form.reset();
            document.getElementById('visit-date').value = new Date().toISOString().split('T')[0];
        }
        
        modal.classList.add('active');
    },
    
    saveVisit: async function() {
        const form = document.getElementById('visit-form');
        const visitId = document.getElementById('visit-id').value;
        const isEdit = !!visitId;
        
        // Validar campos obligatorios
        if (!document.getElementById('visit-pet').value) {
            await customAlert('Por favor seleccione una mascota', 'Campo requerido');
            return;
        }
        
        if (!document.getElementById('visit-date').value) {
            await customAlert('Por favor seleccione una fecha', 'Campo requerido');
            return;
        }
        
        if (!document.getElementById('visit-reason').value) {
            await customAlert('Por favor ingrese el motivo de la visita', 'Campo requerido');
            return;
        }
        
        if (!document.getElementById('visit-diagnosis').value) {
            await customAlert('Por favor ingrese el diagnóstico', 'Campo requerido');
            return;
        }
        
        const visitData = {
            id: visitId,
            petId: document.getElementById('visit-pet').value,
            date: document.getElementById('visit-date').value,
            reason: document.getElementById('visit-reason').value,
            diagnosis: document.getElementById('visit-diagnosis').value,
            treatment: document.getElementById('visit-treatment').value || null,
            nextDate: document.getElementById('visit-next-date').value || null
        };
        
        console.log('Enviando datos de visita:', visitData);
        
        try {
            const response = await fetch('api/visitas.php', {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(visitData)
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
            if (data.success || data.id) {
                this.closeModal('visit-modal');
                // Recargar visitas desde el servidor
                const visitsResponse = await fetch('api/visitas.php');
                if (visitsResponse.ok) {
                    const visitsData = await visitsResponse.json();
                    this.data.visits = Array.isArray(visitsData) ? visitsData : [];
                }
                this.renderVisits();
                this.renderDashboard();
                this.checkReminders();
                await customAlert(isEdit ? 'Visita actualizada correctamente' : 'Visita agregada correctamente', 'Operación exitosa');
            } else {
                await customAlert(data.error || 'Error al guardar la visita', 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            await customAlert('Error al conectar con el servidor', 'Error de conexión');
        }
    },
    
    deleteVisit: async function(visitId) {
        const confirmDelete = await customConfirm('¿Estás seguro de que deseas eliminar este registro de visita?', 'Eliminar visita');
        
        if (confirmDelete) {
            try {
                const response = await fetch('api/visitas.php', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: visitId })
                });
                
                const data = await response.json();
                
                if (data.success || data.deleted) {
                    // Recargar visitas desde el servidor
                    const visitsResponse = await fetch('api/visitas.php');
                    if (visitsResponse.ok) {
                        const visitsData = await visitsResponse.json();
                        this.data.visits = Array.isArray(visitsData) ? visitsData : [];
                    }
                    this.renderVisits();
                    this.renderDashboard();
                    this.checkReminders();
                    await customAlert('Visita eliminada correctamente', 'Operación exitosa');
                } else {
                    await customAlert(data.error || 'Error al eliminar la visita', 'Error');
                }
            } catch (error) {
                console.error('Error:', error);
                await customAlert('Error al conectar con el servidor', 'Error de conexión');
            }
        }
    },
    
    renderVisits: function() {
        const visitsList = document.getElementById('visits-list');
        visitsList.innerHTML = '';
        
        const filterPetId = document.getElementById('filter-visit-pet').value;
        let visitsToShow = [...this.data.visits];
        
        if (filterPetId) {
            visitsToShow = visitsToShow.filter(v => v.mascota_id === filterPetId);
        }
        
        if (visitsToShow.length === 0) {
            visitsList.innerHTML = '<tr><td colspan="5">No hay registros de visitas.</td></tr>';
            return;
        }
        
        visitsToShow.sort((a, b) => new Date(b.fecha || b.date) - new Date(a.fecha || a.date));
        
        visitsToShow.forEach(visit => {
            // Asegurarnos de que existan las propiedades correctas
            const fecha = visit.fecha || visit.date || '';
            const motivo = visit.motivo || visit.reason || '';
            const diagnostico = visit.diagnostico || visit.diagnosis || '';
            const mascotaId = visit.mascota_id || visit.petId || '';
            
            const pet = this.data.pets.find(p => p.id === mascotaId);
            const petName = pet ? pet.nombre : 'Mascota desconocida';
            
            // Verificar que el diagnóstico existe y es una cadena antes de intentar acceder a .length
            const diagnosisText = typeof diagnostico === 'string' ? 
                (diagnostico.length > 50 ? diagnostico.substring(0, 50) + '...' : diagnostico) : 
                'Sin diagnóstico';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${petName}</td>
                <td>${this.formatDate(fecha)}</td>
                <td>${motivo}</td>
                <td>${diagnosisText}</td>
                <td class="actions">
                    <button class="btn btn-secondary btn-sm edit-visit" data-id="${visit.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm delete-visit" data-id="${visit.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            visitsList.appendChild(row);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.edit-visit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const visitId = e.target.closest('button').getAttribute('data-id');
                const visit = this.data.visits.find(v => v.id === visitId);
                this.showVisitModal(visit);
            });
        });
        
        document.querySelectorAll('.delete-visit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const visitId = e.target.closest('button').getAttribute('data-id');
                this.deleteVisit(visitId);
            });
        });
    },
    
    // ===== MEDICAMENTOS =====
    showMedicineModal: function(medicine = null) {
        const modal = document.getElementById('medicine-modal');
        const form = document.getElementById('medicine-form');
        const petSelect = document.getElementById('medicine-pet');
        
        // Llenar selector de mascotas
        petSelect.innerHTML = '';
        this.data.pets.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.id;
            option.textContent = pet.nombre;
            petSelect.appendChild(option);
        });
        
        if (medicine) {
            // Modo edición
            document.getElementById('medicine-modal-title').textContent = 'Editar Medicamento';
            document.getElementById('medicine-id').value = medicine.id;
            document.getElementById('medicine-pet').value = medicine.mascota_id || medicine.petId || '';
            document.getElementById('medicine-name').value = medicine.nombre || medicine.name || '';
            document.getElementById('medicine-dose').value = medicine.dosis || medicine.dose || '';
            document.getElementById('medicine-frequency').value = medicine.frecuencia || medicine.frequency || '';
            document.getElementById('medicine-start-date').value = medicine.fecha_inicio || medicine.startDate || '';
            document.getElementById('medicine-end-date').value = medicine.fecha_fin || medicine.endDate || '';
            document.getElementById('medicine-notes').value = medicine.notas || medicine.notes || '';
        } else {
            // Modo agregar
            document.getElementById('medicine-modal-title').textContent = 'Agregar Medicamento';
            form.reset();
            document.getElementById('medicine-start-date').value = new Date().toISOString().split('T')[0];
        }
        
        modal.classList.add('active');
    },
    
    saveMedicine: async function() {
        const form = document.getElementById('medicine-form');
        const medicineId = document.getElementById('medicine-id').value;
        const isEdit = !!medicineId;
        
        // Validar campos obligatorios
        if (!document.getElementById('medicine-pet').value) {
            await customAlert('Por favor seleccione una mascota', 'Campo requerido');
            return;
        }
        
        if (!document.getElementById('medicine-name').value) {
            await customAlert('Por favor ingrese el nombre del medicamento', 'Campo requerido');
            return;
        }
        
        if (!document.getElementById('medicine-dose').value) {
            await customAlert('Por favor ingrese la dosis', 'Campo requerido');
            return;
        }
        
        if (!document.getElementById('medicine-frequency').value) {
            await customAlert('Por favor ingrese la frecuencia', 'Campo requerido');
            return;
        }
        
        if (!document.getElementById('medicine-start-date').value) {
            await customAlert('Por favor seleccione la fecha de inicio', 'Campo requerido');
            return;
        }
        
        const medicineData = {
            id: medicineId,
            petId: document.getElementById('medicine-pet').value,
            name: document.getElementById('medicine-name').value,
            dose: document.getElementById('medicine-dose').value,
            frequency: document.getElementById('medicine-frequency').value,
            startDate: document.getElementById('medicine-start-date').value,
            endDate: document.getElementById('medicine-end-date').value || null,
            notes: document.getElementById('medicine-notes').value || null
        };
        
        console.log('Enviando datos de medicamento:', medicineData);
        
        try {
            const response = await fetch('api/medicamentos.php', {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medicineData)
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
            if (data.success || data.id) {
                this.closeModal('medicine-modal');
                // Recargar medicamentos desde el servidor
                const medicinesResponse = await fetch('api/medicamentos.php');
                if (medicinesResponse.ok) {
                    const medicinesData = await medicinesResponse.json();
                    this.data.medicines = Array.isArray(medicinesData) ? medicinesData : [];
                }
                this.renderMedicines();
                this.renderDashboard();
                this.checkReminders();
                await customAlert(isEdit ? 'Medicamento actualizado correctamente' : 'Medicamento agregado correctamente', 'Operación exitosa');
            } else {
                await customAlert(data.error || 'Error al guardar el medicamento', 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            await customAlert('Error al conectar con el servidor', 'Error de conexión');
        }
    },
    
    deleteMedicine: async function(medicineId) {
        const confirmDelete = await customConfirm('¿Estás seguro de que deseas eliminar este registro de medicamento?', 'Eliminar medicamento');
        
        if (confirmDelete) {
            try {
                const response = await fetch('api/medicamentos.php', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: medicineId })
                });
                
                const data = await response.json();
                
                if (data.success || data.deleted) {
                    // Recargar medicamentos desde el servidor
                    const medicinesResponse = await fetch('api/medicamentos.php');
                    if (medicinesResponse.ok) {
                        const medicinesData = await medicinesResponse.json();
                        this.data.medicines = Array.isArray(medicinesData) ? medicinesData : [];
                    }
                    this.renderMedicines();
                    this.renderDashboard();
                    this.checkReminders();
                    await customAlert('Medicamento eliminado correctamente', 'Operación exitosa');
                } else {
                    await customAlert(data.error || 'Error al eliminar el medicamento', 'Error');
                }
            } catch (error) {
                console.error('Error:', error);
                await customAlert('Error al conectar con el servidor', 'Error de conexión');
            }
        }
    },
    
    renderMedicines: function() {
        const medicinesList = document.getElementById('medicines-list');
        medicinesList.innerHTML = '';
        
        const filterPetId = document.getElementById('filter-medicine-pet').value;
        let medicinesToShow = [...this.data.medicines];
        
        if (filterPetId) {
            medicinesToShow = medicinesToShow.filter(m => m.mascota_id === filterPetId);
        }
        
        if (medicinesToShow.length === 0) {
            medicinesList.innerHTML = '<tr><td colspan="7">No hay registros de medicamentos.</td></tr>';
            return;
        }
        
        medicinesToShow.sort((a, b) => new Date(b.fecha_inicio || b.startDate) - new Date(a.fecha_inicio || a.startDate));
        
        medicinesToShow.forEach(medicine => {
            // Asegurarnos de que existan las propiedades correctas
            const nombre = medicine.nombre || medicine.name || '';
            const dosis = medicine.dosis || medicine.dose || '';
            const frecuencia = medicine.frecuencia || medicine.frequency || '';
            const fechaInicio = medicine.fecha_inicio || medicine.startDate || '';
            const fechaFin = medicine.fecha_fin || medicine.endDate || null;
            const mascotaId = medicine.mascota_id || medicine.petId || '';
            
            const pet = this.data.pets.find(p => p.id === mascotaId);
            const petName = pet ? pet.nombre : 'Mascota desconocida';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${petName}</td>
                <td>${nombre}</td>
                <td>${dosis}</td>
                <td>${frecuencia}</td>
                <td>${this.formatDate(fechaInicio)}</td>
                <td>${fechaFin ? this.formatDate(fechaFin) : 'N/A'}</td>
                <td class="actions">
                    <button class="btn btn-secondary btn-sm edit-medicine" data-id="${medicine.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm delete-medicine" data-id="${medicine.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            medicinesList.appendChild(row);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.edit-medicine').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const medicineId = e.target.closest('button').getAttribute('data-id');
                const medicine = this.data.medicines.find(m => m.id === medicineId);
                this.showMedicineModal(medicine);
            });
        });
        
        document.querySelectorAll('.delete-medicine').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const medicineId = e.target.closest('button').getAttribute('data-id');
                this.deleteMedicine(medicineId);
            });
        });
    },
    
    // ===== DIAGNÓSTICO DE ENFERMEDADES =====
    diagnose: async function() {
        const petId = document.getElementById('diagnosis-pet').value;
        if (!petId) {
            await customAlert('Por favor selecciona una mascota.', 'Campo requerido');
            return;
        }
        
        // Obtener síntomas seleccionados
        const symptoms = [];
        document.querySelectorAll('input[name="symptom"]:checked').forEach(checkbox => {
            symptoms.push(checkbox.value);
        });
        
        // Agregar síntomas manuales
        const otherSymptoms = document.getElementById('other-symptoms').value;
        if (otherSymptoms) {
            otherSymptoms.split(',').forEach(symptom => {
                const trimmedSymptom = symptom.trim();
                if (trimmedSymptom) symptoms.push(trimmedSymptom);
            });
        }
        
        if (symptoms.length === 0) {
            await customAlert('Por favor selecciona al menos un síntoma.', 'Campo requerido');
            return;
        }
        
        // Buscar enfermedades que coincidan con los síntomas
        const possibleDiseases = this.diseases.filter(disease => {
            // Contar cuántos síntomas de la enfermedad están presentes
            const matchingSymptoms = disease.symptoms.filter(symptom => 
                symptoms.includes(symptom)
            ).length;
            
            // Considerar que coincide si al menos la mitad de los síntomas están presentes
            return matchingSymptoms >= Math.ceil(disease.symptoms.length / 2);
        });
        
        // Mostrar resultados
        const resultContainer = document.getElementById('diagnosis-result');
        
        if (possibleDiseases.length === 0) {
            resultContainer.innerHTML = `
                <h3>Resultado del Diagnóstico</h3>
                <p>No se encontraron enfermedades que coincidan con los síntomas ingresados.</p>
                <p><strong>Recomendación:</strong> Consulta con un veterinario para un diagnóstico preciso.</p>
            `;
        } else {
            let html = '<h3>Resultado del Diagnóstico</h3>';
            
            possibleDiseases.forEach(disease => {
                html += `
                    <div class="disease-item">
                        <h4>${disease.name}</h4>
                        <p><strong>Descripción:</strong> ${disease.description}</p>
                        <p><strong>Recomendación:</strong> ${disease.recommendation}</p>
                    </div>
                `;
            });
            
            resultContainer.innerHTML = html;
        }
        
        // Preparar los datos para guardar en la base de datos
        const recommendations = possibleDiseases.length > 0 ? 
            possibleDiseases.map(d => d.recommendation).join(' ') : 
            'Consulta con un veterinario para un diagnóstico preciso.';
            
        // Crear objeto de diagnóstico para enviar al servidor
        const diagnosisData = {
            petId: petId,
            date: new Date().toISOString().split('T')[0], // Asegurarnos de enviar la fecha en formato ISO
            symptoms: JSON.stringify(symptoms), // Convertir a JSON string
            possibleDiseases: JSON.stringify(possibleDiseases.map(d => d.name)), // Convertir a JSON string
            recommendations: recommendations
        };
        
        console.log('Enviando datos de diagnóstico:', diagnosisData);
        
        try {
            const response = await fetch('api/diagnosticos.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(diagnosisData)
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
            if (data.success || data.id) {
                await customAlert('Diagnóstico guardado correctamente', 'Operación exitosa');
                
                // Recargar el historial de diagnósticos desde el servidor
                await this.loadDiagnosis();
                this.renderDiagnosisHistory();
            } else {
                await customAlert(data.error || 'Error al guardar el diagnóstico', 'Error');
                console.error('Error del servidor:', data);
                
                // En caso de error, al menos mostrar el diagnóstico localmente
                const localDiagnosis = {
                    id: this.generateId(),
                    petId: petId,
                    date: new Date().toISOString().split('T')[0],
                    symptoms: symptoms,
                    possibleDiseases: possibleDiseases.map(d => d.name),
                    recommendations: recommendations
                };
                
                this.data.diagnosisHistory.unshift(localDiagnosis);
                this.renderDiagnosisHistory();
            }
        } catch (error) {
            console.error('Error al guardar diagnóstico:', error);
            await customAlert('Error al conectar con el servidor. El diagnóstico se guardará localmente.', 'Error de conexión');
            
            // En caso de error de conexión, guardar localmente
            const localDiagnosis = {
                id: this.generateId(),
                petId: petId,
                date: new Date().toISOString().split('T')[0],
                symptoms: symptoms,
                possibleDiseases: possibleDiseases.map(d => d.name),
                recommendations: recommendations
            };
            
            this.data.diagnosisHistory.unshift(localDiagnosis);
            this.renderDiagnosisHistory();
        }
        
        // Limpiar los checkboxes y otros síntomas
        document.querySelectorAll('input[name="symptom"]:checked').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.getElementById('other-symptoms').value = '';
    },
    
    renderDiagnosisHistory: function() {
        const historyList = document.getElementById('diagnosis-history-list');
        historyList.innerHTML = '';
        
        // Llenar selector de mascotas en el formulario de diagnóstico
        const petSelect = document.getElementById('diagnosis-pet');
        petSelect.innerHTML = '<option value="">Selecciona una mascota</option>';
        this.data.pets.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.id;
            option.textContent = pet.nombre;
            petSelect.appendChild(option);
        });
        
        if (!this.data.diagnosisHistory || this.data.diagnosisHistory.length === 0) {
            historyList.innerHTML = '<tr><td colspan="5">No hay historial de diagnósticos.</td></tr>';
            return;
        }
        
        console.log('Historial de diagnósticos:', this.data.diagnosisHistory);
        
        this.data.diagnosisHistory.forEach(diagnosis => {
            try {
                // Asegurarnos de que existan las propiedades correctas
                const mascotaId = diagnosis.mascota_id || diagnosis.petId || '';
                let fecha = diagnosis.fecha || diagnosis.date || '';
                
                // Manejar los síntomas que pueden venir como array o como string JSON
                let symptoms = [];
                if (typeof diagnosis.sintomas === 'string') {
                    try {
                        symptoms = JSON.parse(diagnosis.sintomas);
                    } catch (e) {
                        symptoms = [diagnosis.sintomas];
                    }
                } else if (Array.isArray(diagnosis.sintomas)) {
                    symptoms = diagnosis.sintomas;
                } else if (Array.isArray(diagnosis.symptoms)) {
                    symptoms = diagnosis.symptoms;
                }
                
                // Manejar enfermedades posibles que pueden venir como array o como string JSON
                let possibleDiseases = [];
                if (typeof diagnosis.enfermedades_posibles === 'string') {
                    try {
                        possibleDiseases = JSON.parse(diagnosis.enfermedades_posibles);
                    } catch (e) {
                        possibleDiseases = [diagnosis.enfermedades_posibles];
                    }
                } else if (Array.isArray(diagnosis.enfermedades_posibles)) {
                    possibleDiseases = diagnosis.enfermedades_posibles;
                } else if (Array.isArray(diagnosis.possibleDiseases)) {
                    possibleDiseases = diagnosis.possibleDiseases;
                }
                
                // Manejo de recomendaciones
                const recommendations = diagnosis.recomendaciones || diagnosis.recommendations || 'Sin recomendaciones';
                
                // Convertir arrays a cadenas para mostrar
                const symptomsText = Array.isArray(symptoms) ? symptoms.join(', ') : 'Sin síntomas';
                const diseasesText = Array.isArray(possibleDiseases) && possibleDiseases.length > 0 ? 
                    possibleDiseases.join(', ') : 'Ninguna coincidencia';
                
                const pet = this.data.pets.find(p => p.id === mascotaId);
            const petName = pet ? pet.nombre : 'Mascota desconocida';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${this.formatDate(fecha)}</td>
                <td>${petName}</td>
                    <td>${symptomsText}</td>
                    <td>${diseasesText}</td>
                    <td>${recommendations}</td>
            `;
            
            historyList.appendChild(row);
            } catch (error) {
                console.error('Error al renderizar diagnóstico:', error, diagnosis);
            }
        });
    },
    
    // ===== DASHBOARD Y RECORDATORIOS =====
    renderDashboard: function() {
        // Estadísticas
        document.getElementById('pets-count').textContent = this.data.pets.length;
        
        // Vacunas pendientes (próximas 2 semanas)
        const today = new Date();
        const twoWeeksFromNow = new Date();
        twoWeeksFromNow.setDate(today.getDate() + 14);
        
        const pendingVaccines = this.data.vaccines.filter(vaccine => {
            return vaccine.proxima_fecha && new Date(vaccine.proxima_fecha) <= twoWeeksFromNow && 
                   new Date(vaccine.proxima_fecha) >= today;
        }).length;
        
        document.getElementById('pending-vaccines').textContent = pendingVaccines;
        
        // Próximas visitas (próximas 2 semanas)
        const upcomingVisits = this.data.visits.filter(visit => {
            return visit.proxima_visita && new Date(visit.proxima_visita) <= twoWeeksFromNow && 
                   new Date(visit.proxima_visita) >= today;
        }).length;
        
        document.getElementById('upcoming-visits').textContent = upcomingVisits;
        
        // Actualizar recordatorios
        this.checkReminders();
    },
    
    checkReminders: function() {
        const today = new Date();
        const twoWeeksFromNow = new Date();
        twoWeeksFromNow.setDate(today.getDate() + 14);
        
        // Vacunas próximas
        const vaccineReminders = this.data.vaccines.filter(vaccine => {
            return vaccine.proxima_fecha && new Date(vaccine.proxima_fecha) <= twoWeeksFromNow && 
                   new Date(vaccine.proxima_fecha) >= today;
        });
        
        // Visitas próximas
        const visitReminders = this.data.visits.filter(visit => {
            return visit.proxima_visita && new Date(visit.proxima_visita) <= twoWeeksFromNow && 
                   new Date(visit.proxima_visita) >= today;
        });
        
        // Medicamentos activos
        const medicineReminders = this.data.medicines.filter(medicine => {
            const endDate = medicine.fecha_fin ? new Date(medicine.fecha_fin) : new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // Si no hay fecha fin, asumir 30 días
            return new Date(medicine.fecha_inicio) <= today && endDate >= today;
        });
        
        // Combinar todos los recordatorios
        this.data.reminders = [];
        
        vaccineReminders.forEach(vaccine => {
            const pet = this.data.pets.find(p => p.id === vaccine.mascota_id);
            const petName = pet ? pet.nombre : 'Mascota desconocida';
            
            this.data.reminders.push({
                type: 'vaccine',
                date: vaccine.proxima_fecha,
                message: `Vacuna "${vaccine.tipo}" para ${petName} el ${this.formatDate(vaccine.proxima_fecha)}`,
                petId: vaccine.mascota_id,
                itemId: vaccine.id
            });
        });
        
        visitReminders.forEach(visit => {
            const pet = this.data.pets.find(p => p.id === visit.mascota_id);
            const petName = pet ? pet.nombre : 'Mascota desconocida';
            
            this.data.reminders.push({
                type: 'visit',
                date: visit.proxima_visita,
                message: `Cita veterinaria para ${petName} el ${this.formatDate(visit.proxima_visita)} - Motivo: ${visit.motivo}`,
                petId: visit.mascota_id,
                itemId: visit.id
            });
        });
        
        medicineReminders.forEach(medicine => {
            const pet = this.data.pets.find(p => p.id === medicine.mascota_id);
            const petName = pet ? pet.nombre : 'Mascota desconocida';
            
            this.data.reminders.push({
                type: 'medicine',
                date: medicine.fecha_inicio,
                message: `Medicamento "${medicine.nombre}" para ${petName} - ${medicine.dosis} ${medicine.frecuencia}`,
                petId: medicine.mascota_id,
                itemId: medicine.id
            });
        });
        
        // Ordenar recordatorios por fecha
        this.data.reminders.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Mostrar en el dashboard
        this.renderReminders();
    },
    
    renderReminders: function() {
        const remindersList = document.getElementById('reminders-list');
        remindersList.innerHTML = '';
        
        if (this.data.reminders.length === 0) {
            remindersList.innerHTML = '<li>No hay recordatorios pendientes.</li>';
            return;
        }
        
        this.data.reminders.forEach(reminder => {
            const li = document.createElement('li');
            li.innerHTML = `
                <i class="fas fa-bell"></i>
                <span>${reminder.message}</span>
            `;
            remindersList.appendChild(li);
        });
    },
    
    // ===== FUNCIONES AUXILIARES =====
    updatePetFilters: function() {
        // Actualizar filtros en todas las secciones
        const petSelectors = [
            'filter-vaccine-pet',
            'filter-visit-pet',
            'filter-medicine-pet'
        ]; 
        
        petSelectors.forEach(selector => {
            const select = document.getElementById(selector);
            const currentValue = select.value;
            
            select.innerHTML = '<option value="">Todas las mascotas</option>';
            this.data.pets.forEach(pet => {
                const option = document.createElement('option');
                option.value = pet.id;
                option.textContent = pet.nombre;
                select.appendChild(option);
            });
            
            // Restaurar el valor seleccionado si todavía existe
            if (currentValue && this.data.pets.some(pet => pet.id === currentValue)) {
                select.value = currentValue;
            }
        });
    },
    
    // Función para generar PDF (simulada)
    generatePDF: async function(petId) {
        await customAlert('Función de generación de PDF simulada. En una implementación real, se usaría una biblioteca como jsPDF o pdfkit.', 'Información');
        // Aquí iría el código real para generar el PDF
    },
    
    // Función para cargar visitas desde el servidor
    loadVisits: async function() {
        try {
            const response = await fetch('api/visitas.php');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Visitas cargadas:', data);
            this.data.visits = Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error al cargar visitas:', error);
            this.data.visits = [];
            throw error;
        }
    },
    
    // Función para cargar medicamentos desde el servidor
    loadMedicines: async function() {
        try {
            const response = await fetch('api/medicamentos.php');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Medicamentos cargados:', data);
            this.data.medicines = Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error al cargar medicamentos:', error);
            this.data.medicines = [];
            throw error;
        }
    },
    
    // Función para cargar diagnósticos desde el servidor
    loadDiagnosis: async function() {
        try {
            const response = await fetch('api/diagnosticos.php');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Diagnósticos cargados:', data);
            this.data.diagnosisHistory = Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error al cargar diagnósticos:', error);
            this.data.diagnosisHistory = [];
            throw error;
        }
    }
}; 