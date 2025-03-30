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
    init: function() {
        this.loadData();
        this.setupEventListeners();
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
        document.getElementById('pet-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePet();
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
            document.getElementById('pet-name').value = pet.name;
            document.getElementById('pet-species').value = pet.species;
            document.getElementById('pet-breed').value = pet.breed;
            document.getElementById('pet-age').value = pet.age;
            document.getElementById('pet-owner').value = pet.owner;
            document.getElementById('pet-photo').value = pet.photo || '';
        } else {
            // Modo agregar
            document.getElementById('pet-modal-title').textContent = 'Agregar Nueva Mascota';
            form.reset();
        }
        
        modal.classList.add('active');
    },
    
    savePet: function() {
        const form = document.getElementById('pet-form');
        const petId = document.getElementById('pet-id').value;
        const isEdit = !!petId;
        
        const petData = {
            id: petId || this.generateId(),
            name: document.getElementById('pet-name').value,
            species: document.getElementById('pet-species').value,
            breed: document.getElementById('pet-breed').value,
            age: document.getElementById('pet-age').value,
            owner: document.getElementById('pet-owner').value,
            photo: document.getElementById('pet-photo').value
        };
        
        if (isEdit) {
            // Actualizar mascota existente
            const index = this.data.pets.findIndex(p => p.id === petId);
            if (index !== -1) {
                this.data.pets[index] = petData;
            }
        } else {
            // Agregar nueva mascota
            this.data.pets.push(petData);
        }
        
        this.saveData();
        this.renderPets();
        this.closeModal('pet-modal');
        this.renderDashboard(); // Actualizar estadísticas
    },
    
    deletePet: function(petId) {
        if (confirm('¿Estás seguro de que deseas eliminar esta mascota? También se eliminarán sus registros asociados.')) {
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
        
        if (this.data.pets.length === 0) {
            petsList.innerHTML = '<p>No hay mascotas registradas. Agrega tu primera mascota.</p>';
            return;
        }
        
        this.data.pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            
            const photoStyle = pet.photo ? `background-image: url('${pet.photo}')` : 
                `background-color: ${pet.species === 'Perro' ? '#4a6fa5' : pet.species === 'Gato' ? '#ff9800' : '#4caf50'}`;
            
            petCard.innerHTML = `
                <div class="pet-card-header" style="${photoStyle}">
                    <span class="pet-species">${pet.species}</span>
                </div>
                <div class="pet-card-body">
                    <h3>${pet.name}</h3>
                    <p><strong>Raza:</strong> ${pet.breed || 'N/A'}</p>
                    <p><strong>Edad:</strong> ${pet.age} años</p>
                    <p><strong>Dueño:</strong> ${pet.owner}</p>
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
                this.showPetModal(pet);
            });
        });
        
        document.querySelectorAll('.delete-pet').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const petId = e.target.closest('button').getAttribute('data-id');
                this.deletePet(petId);
            });
        });
        
        // Actualizar filtros en otras secciones
        this.updatePetFilters();
    },
    
    // ===== VACUNAS =====
    showVaccineModal: function(vaccine = null) {
        const modal = document.getElementById('vaccine-modal');
        const form = document.getElementById('vaccine-form');
        const petSelect = document.getElementById('vaccine-pet');
        
        // Llenar selector de mascotas
        petSelect.innerHTML = '';
        this.data.pets.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.id;
            option.textContent = pet.name;
            petSelect.appendChild(option);
        });
        
        if (vaccine) {
            // Modo edición
            document.getElementById('vaccine-modal-title').textContent = 'Editar Vacuna';
            document.getElementById('vaccine-id').value = vaccine.id;
            document.getElementById('vaccine-pet').value = vaccine.petId;
            document.getElementById('vaccine-type').value = vaccine.type;
            document.getElementById('vaccine-date').value = vaccine.date;
            document.getElementById('vaccine-next-date').value = vaccine.nextDate || '';
            document.getElementById('vaccine-notes').value = vaccine.notes || '';
        } else {
            // Modo agregar
            document.getElementById('vaccine-modal-title').textContent = 'Agregar Vacuna';
            form.reset();
            document.getElementById('vaccine-date').value = new Date().toISOString().split('T')[0];
        }
        
        modal.classList.add('active');
    },
    
    saveVaccine: function() {
        const form = document.getElementById('vaccine-form');
        const vaccineId = document.getElementById('vaccine-id').value;
        const isEdit = !!vaccineId;
        
        const vaccineData = {
            id: vaccineId || this.generateId(),
            petId: document.getElementById('vaccine-pet').value,
            type: document.getElementById('vaccine-type').value,
            date: document.getElementById('vaccine-date').value,
            nextDate: document.getElementById('vaccine-next-date').value || null,
            notes: document.getElementById('vaccine-notes').value
        };
        
        if (isEdit) {
            // Actualizar vacuna existente
            const index = this.data.vaccines.findIndex(v => v.id === vaccineId);
            if (index !== -1) {
                this.data.vaccines[index] = vaccineData;
            }
        } else {
            // Agregar nueva vacuna
            this.data.vaccines.push(vaccineData);
        }
        
        this.saveData();
        this.renderVaccines();
        this.closeModal('vaccine-modal');
        this.renderDashboard(); // Actualizar estadísticas
        this.checkReminders(); // Verificar recordatorios
    },
    
    deleteVaccine: function(vaccineId) {
        if (confirm('¿Estás seguro de que deseas eliminar este registro de vacuna?')) {
            this.data.vaccines = this.data.vaccines.filter(vaccine => vaccine.id !== vaccineId);
            this.saveData();
            this.renderVaccines();
            this.renderDashboard();
            this.checkReminders();
        }
    },
    
    renderVaccines: function() {
        const vaccinesList = document.getElementById('vaccines-list');
        vaccinesList.innerHTML = '';
        
        const filterPetId = document.getElementById('filter-vaccine-pet').value;
        let vaccinesToShow = [...this.data.vaccines];
        
        if (filterPetId) {
            vaccinesToShow = vaccinesToShow.filter(v => v.petId === filterPetId);
        }
        
        if (vaccinesToShow.length === 0) {
            vaccinesList.innerHTML = '<tr><td colspan="5">No hay registros de vacunas.</td></tr>';
            return;
        }
        
        vaccinesToShow.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        vaccinesToShow.forEach(vaccine => {
            const pet = this.data.pets.find(p => p.id === vaccine.petId);
            const petName = pet ? pet.name : 'Mascota desconocida';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${petName}</td>
                <td>${vaccine.type}</td>
                <td>${this.formatDate(vaccine.date)}</td>
                <td>${vaccine.nextDate ? this.formatDate(vaccine.nextDate) : 'N/A'}</td>
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
            btn.addEventListener('click', (e) => {
                const vaccineId = e.target.closest('button').getAttribute('data-id');
                this.deleteVaccine(vaccineId);
            });
        });
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
            option.textContent = pet.name;
            petSelect.appendChild(option);
        });
        
        if (visit) {
            // Modo edición
            document.getElementById('visit-modal-title').textContent = 'Editar Visita Veterinaria';
            document.getElementById('visit-id').value = visit.id;
            document.getElementById('visit-pet').value = visit.petId;
            document.getElementById('visit-date').value = visit.date;
            document.getElementById('visit-reason').value = visit.reason;
            document.getElementById('visit-diagnosis').value = visit.diagnosis;
            document.getElementById('visit-treatment').value = visit.treatment || '';
            document.getElementById('visit-next-date').value = visit.nextDate || '';
        } else {
            // Modo agregar
            document.getElementById('visit-modal-title').textContent = 'Agregar Visita Veterinaria';
            form.reset();
            document.getElementById('visit-date').value = new Date().toISOString().split('T')[0];
        }
        
        modal.classList.add('active');
    },
    
    saveVisit: function() {
        const form = document.getElementById('visit-form');
        const visitId = document.getElementById('visit-id').value;
        const isEdit = !!visitId;
        
        const visitData = {
            id: visitId || this.generateId(),
            petId: document.getElementById('visit-pet').value,
            date: document.getElementById('visit-date').value,
            reason: document.getElementById('visit-reason').value,
            diagnosis: document.getElementById('visit-diagnosis').value,
            treatment: document.getElementById('visit-treatment').value || null,
            nextDate: document.getElementById('visit-next-date').value || null
        };
        
        if (isEdit) {
            // Actualizar visita existente
            const index = this.data.visits.findIndex(v => v.id === visitId);
            if (index !== -1) {
                this.data.visits[index] = visitData;
            }
        } else {
            // Agregar nueva visita
            this.data.visits.push(visitData);
        }
        
        this.saveData();
        this.renderVisits();
        this.closeModal('visit-modal');
        this.renderDashboard(); // Actualizar estadísticas
        this.checkReminders(); // Verificar recordatorios
    },
    
    deleteVisit: function(visitId) {
        if (confirm('¿Estás seguro de que deseas eliminar este registro de visita?')) {
            this.data.visits = this.data.visits.filter(visit => visit.id !== visitId);
            this.saveData();
            this.renderVisits();
            this.renderDashboard();
            this.checkReminders();
        }
    },
    
    renderVisits: function() {
        const visitsList = document.getElementById('visits-list');
        visitsList.innerHTML = '';
        
        const filterPetId = document.getElementById('filter-visit-pet').value;
        let visitsToShow = [...this.data.visits];
        
        if (filterPetId) {
            visitsToShow = visitsToShow.filter(v => v.petId === filterPetId);
        }
        
        if (visitsToShow.length === 0) {
            visitsList.innerHTML = '<tr><td colspan="5">No hay registros de visitas.</td></tr>';
            return;
        }
        
        visitsToShow.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        visitsToShow.forEach(visit => {
            const pet = this.data.pets.find(p => p.id === visit.petId);
            const petName = pet ? pet.name : 'Mascota desconocida';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${petName}</td>
                <td>${this.formatDate(visit.date)}</td>
                <td>${visit.reason}</td>
                <td>${visit.diagnosis.length > 50 ? visit.diagnosis.substring(0, 50) + '...' : visit.diagnosis}</td>
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
            option.textContent = pet.name;
            petSelect.appendChild(option);
        });
        
        if (medicine) {
            // Modo edición
            document.getElementById('medicine-modal-title').textContent = 'Editar Medicamento';
            document.getElementById('medicine-id').value = medicine.id;
            document.getElementById('medicine-pet').value = medicine.petId;
            document.getElementById('medicine-name').value = medicine.name;
            document.getElementById('medicine-dose').value = medicine.dose;
            document.getElementById('medicine-frequency').value = medicine.frequency;
            document.getElementById('medicine-start-date').value = medicine.startDate;
            document.getElementById('medicine-end-date').value = medicine.endDate || '';
            document.getElementById('medicine-notes').value = medicine.notes || '';
        } else {
            // Modo agregar
            document.getElementById('medicine-modal-title').textContent = 'Agregar Medicamento';
            form.reset();
            document.getElementById('medicine-start-date').value = new Date().toISOString().split('T')[0];
        }
        
        modal.classList.add('active');
    },
    
    saveMedicine: function() {
        const form = document.getElementById('medicine-form');
        const medicineId = document.getElementById('medicine-id').value;
        const isEdit = !!medicineId;
        
        const medicineData = {
            id: medicineId || this.generateId(),
            petId: document.getElementById('medicine-pet').value,
            name: document.getElementById('medicine-name').value,
            dose: document.getElementById('medicine-dose').value,
            frequency: document.getElementById('medicine-frequency').value,
            startDate: document.getElementById('medicine-start-date').value,
            endDate: document.getElementById('medicine-end-date').value || null,
            notes: document.getElementById('medicine-notes').value || null
        };
        
        if (isEdit) {
            // Actualizar medicamento existente
            const index = this.data.medicines.findIndex(m => m.id === medicineId);
            if (index !== -1) {
                this.data.medicines[index] = medicineData;
            }
        } else {
            // Agregar nuevo medicamento
            this.data.medicines.push(medicineData);
        }
        
        this.saveData();
        this.renderMedicines();
        this.closeModal('medicine-modal');
        this.renderDashboard(); // Actualizar estadísticas
        this.checkReminders(); // Verificar recordatorios
    },
    
    deleteMedicine: function(medicineId) {
        if (confirm('¿Estás seguro de que deseas eliminar este registro de medicamento?')) {
            this.data.medicines = this.data.medicines.filter(medicine => medicine.id !== medicineId);
            this.saveData();
            this.renderMedicines();
            this.renderDashboard();
            this.checkReminders();
        }
    },
    
    renderMedicines: function() {
        const medicinesList = document.getElementById('medicines-list');
        medicinesList.innerHTML = '';
        
        const filterPetId = document.getElementById('filter-medicine-pet').value;
        let medicinesToShow = [...this.data.medicines];
        
        if (filterPetId) {
            medicinesToShow = medicinesToShow.filter(m => m.petId === filterPetId);
        }
        
        if (medicinesToShow.length === 0) {
            medicinesList.innerHTML = '<tr><td colspan="7">No hay registros de medicamentos.</td></tr>';
            return;
        }
        
        medicinesToShow.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        
        medicinesToShow.forEach(medicine => {
            const pet = this.data.pets.find(p => p.id === medicine.petId);
            const petName = pet ? pet.name : 'Mascota desconocida';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${petName}</td>
                <td>${medicine.name}</td>
                <td>${medicine.dose}</td>
                <td>${medicine.frequency}</td>
                <td>${this.formatDate(medicine.startDate)}</td>
                <td>${medicine.endDate ? this.formatDate(medicine.endDate) : 'N/A'}</td>
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
    diagnose: function() {
        const petId = document.getElementById('diagnosis-pet').value;
        if (!petId) {
            alert('Por favor selecciona una mascota.');
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
            alert('Por favor selecciona al menos un síntoma.');
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
        
        // Guardar en el historial
        const diagnosisRecord = {
            id: this.generateId(),
            petId: petId,
            date: new Date().toISOString().split('T')[0],
            symptoms: symptoms,
            possibleDiseases: possibleDiseases.map(d => d.name),
            recommendations: possibleDiseases.length > 0 ? 
                possibleDiseases.map(d => d.recommendation).join(' ') : 
                'Consulta con un veterinario para un diagnóstico preciso.'
        };
        
        this.data.diagnosisHistory.unshift(diagnosisRecord);
        this.saveData();
        this.renderDiagnosisHistory();
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
            option.textContent = pet.name;
            petSelect.appendChild(option);
        });
        
        if (this.data.diagnosisHistory.length === 0) {
            historyList.innerHTML = '<tr><td colspan="5">No hay historial de diagnósticos.</td></tr>';
            return;
        }
        
        this.data.diagnosisHistory.forEach(diagnosis => {
            const pet = this.data.pets.find(p => p.id === diagnosis.petId);
            const petName = pet ? pet.name : 'Mascota desconocida';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.formatDate(diagnosis.date)}</td>
                <td>${petName}</td>
                <td>${diagnosis.symptoms.join(', ')}</td>
                <td>${diagnosis.possibleDiseases.join(', ') || 'Ninguna coincidencia'}</td>
                <td>${diagnosis.recommendations}</td>
            `;
            
            historyList.appendChild(row);
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
            return vaccine.nextDate && new Date(vaccine.nextDate) <= twoWeeksFromNow && 
                   new Date(vaccine.nextDate) >= today;
        }).length;
        
        document.getElementById('pending-vaccines').textContent = pendingVaccines;
        
        // Próximas visitas (próximas 2 semanas)
        const upcomingVisits = this.data.visits.filter(visit => {
            return visit.nextDate && new Date(visit.nextDate) <= twoWeeksFromNow && 
                   new Date(visit.nextDate) >= today;
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
            return vaccine.nextDate && new Date(vaccine.nextDate) <= twoWeeksFromNow && 
                   new Date(vaccine.nextDate) >= today;
        });
        
        // Visitas próximas
        const visitReminders = this.data.visits.filter(visit => {
            return visit.nextDate && new Date(visit.nextDate) <= twoWeeksFromNow && 
                   new Date(visit.nextDate) >= today;
        });
        
        // Medicamentos activos
        const medicineReminders = this.data.medicines.filter(medicine => {
            const endDate = medicine.endDate ? new Date(medicine.endDate) : new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // Si no hay fecha fin, asumir 30 días
            return new Date(medicine.startDate) <= today && endDate >= today;
        });
        
        // Combinar todos los recordatorios
        this.data.reminders = [];
        
        vaccineReminders.forEach(vaccine => {
            const pet = this.data.pets.find(p => p.id === vaccine.petId);
            const petName = pet ? pet.name : 'Mascota desconocida';
            
            this.data.reminders.push({
                type: 'vaccine',
                date: vaccine.nextDate,
                message: `Vacuna "${vaccine.type}" para ${petName} el ${this.formatDate(vaccine.nextDate)}`,
                petId: vaccine.petId,
                itemId: vaccine.id
            });
        });
        
        visitReminders.forEach(visit => {
            const pet = this.data.pets.find(p => p.id === visit.petId);
            const petName = pet ? pet.name : 'Mascota desconocida';
            
            this.data.reminders.push({
                type: 'visit',
                date: visit.nextDate,
                message: `Cita veterinaria para ${petName} el ${this.formatDate(visit.nextDate)} - Motivo: ${visit.reason}`,
                petId: visit.petId,
                itemId: visit.id
            });
        });
        
        medicineReminders.forEach(medicine => {
            const pet = this.data.pets.find(p => p.id === medicine.petId);
            const petName = pet ? pet.name : 'Mascota desconocida';
            
            this.data.reminders.push({
                type: 'medicine',
                date: medicine.startDate,
                message: `Medicamento "${medicine.name}" para ${petName} - ${medicine.dose} ${medicine.frequency}`,
                petId: medicine.petId,
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
                option.textContent = pet.name;
                select.appendChild(option);
            });
            
            // Restaurar el valor seleccionado si todavía existe
            if (currentValue && this.data.pets.some(pet => pet.id === currentValue)) {
                select.value = currentValue;
            }
        });
    },
    
    // Función para generar PDF (simulada)
    generatePDF: function(petId) {
        alert('Función de generación de PDF simulada. En una implementación real, se usaría una biblioteca como jsPDF o pdfkit.');
        // Aquí iría el código real para generar el PDF
    }
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => PetControl.init());