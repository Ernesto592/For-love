// Floating hearts animation
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️', '🌹'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 15000);
    }, 1000);
}

createFloatingHearts();

// Auth System
const authContainer = document.getElementById('authContainer');
const mainContainer = document.getElementById('mainContainer');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

// Check if user is logged in
const currentUser = localStorage.getItem('currentUser');
if (currentUser) {
    showDashboard(currentUser);
}

// Switch between login and register
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Register
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden 💔');
        return;
    }
    
    if (password.length < 4) {
        alert('La contraseña debe tener al menos 4 caracteres');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[username]) {
        alert('Este usuario ya existe 😊');
        return;
    }
    
    users[username] = { password, createdAt: new Date().toISOString() };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);
    
    showDashboard(username);
});

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (!users[username]) {
        alert('Usuario no encontrado 💔');
        return;
    }
    
    if (users[username].password !== password) {
        alert('Contraseña incorrecta 💔');
        return;
    }
    
    localStorage.setItem('currentUser', username);
    showDashboard(username);
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    mainContainer.style.display = 'none';
    authContainer.style.display = 'flex';
});

function showDashboard(username) {
    authContainer.style.display = 'none';
    mainContainer.style.display = 'block';
    document.getElementById('userName').textContent = username.charAt(0).toUpperCase() + username.slice(1);
    
    initializeDashboard();
}

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.dataset.section;
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(targetSection + 'Section').classList.add('active');
    });
});

// Dashboard Initialization
function initializeDashboard() {
    updateDaysCounter();
    animateStats();
    createCharts();
    initializeCalendar();
    loadMailbox();
    initializeGallery();
}

// Days Counter
function updateDaysCounter() {
    const startDate = new Date('2025-12-01');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const counter = document.getElementById('daysCounter');
    let currentCount = 0;
    const target = diffDays;
    
    const interval = setInterval(() => {
        currentCount += Math.ceil(target / 100);
        if (currentCount >= target) {
            currentCount = target;
            clearInterval(interval);
        }
        counter.textContent = currentCount;
    }, 20);
}

// Animate Stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const progressBars = document.querySelectorAll('.stat-progress-bar');
    
    setTimeout(() => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            let current = 0;
            const increment = target / 100;
            
            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                stat.textContent = Math.floor(current);
            }, 20);
        });
        
        progressBars.forEach(bar => {
            setTimeout(() => {
                bar.style.width = bar.dataset.width + '%';
            }, 100);
        });
    }, 500);
}

// Charts
function createCharts() {
    // Moments Chart
    const momentsCtx = document.getElementById('momentsChart').getContext('2d');
    new Chart(momentsCtx, {
        type: 'line',
        data: {
            labels: ['Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'],
            datasets: [{
                label: 'Momentos Especiales',
                data: [15, 28, 35, 42, 38, 45],
                borderColor: '#c94b4b',
                backgroundColor: 'rgba(201, 75, 75, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f5f5f5' } },
                x: { grid: { display: false } }
            }
        }
    });
    
    // Happiness Chart
    const happinessCtx = document.getElementById('happinessChart').getContext('2d');
    new Chart(happinessCtx, {
        type: 'doughnut',
        data: {
            labels: ['Sonrisas', 'Risas', 'Abrazos', 'Besos', 'Momentos Dulces'],
            datasets: [{
                data: [30, 25, 15, 20, 10],
                backgroundColor: [
                    '#c94b4b',
                    '#ff6b9d',
                    '#ffd4d4',
                    '#d4af37',
                    '#ffb6c1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Calendar
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    
    const daysInFebruary = 28;
    const specialDays = {
        14: { label: 'San Valentín', icon: '💝' },
        25: { label: 'Tu Cumpleaños', icon: '🎂' }
    };
    
    for (let day = 1; day <= daysInFebruary; day++) {
        const dayCard = document.createElement('div');
        dayCard.className = 'calendar-day';
        
        const isUnlocked = currentMonth === 1 && day <= currentDay;
        const isSpecial = specialDays[day];
        
        if (isUnlocked) {
            dayCard.classList.add('unlocked');
        } else {
            dayCard.classList.add('locked');
        }
        
        if (isSpecial && isUnlocked) {
            dayCard.classList.add('special');
        }
        
        dayCard.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-label">${isSpecial ? isSpecial.label : 'Febrero'}</div>
            <div class="day-icon">${isUnlocked ? (isSpecial ? isSpecial.icon : '💕') : '🔒'}</div>
        `;
        
        if (isUnlocked) {
            dayCard.addEventListener('click', () => showDaySurprise(day, isSpecial));
        }
        
        calendarGrid.appendChild(dayCard);
    }
}

function showDaySurprise(day, special) {
    const messages = {
        1: "¡Feliz febrero! Un mes lleno de amor comienza hoy 💕",
        2: "Cada día contigo es un regalo especial 🎁",
        3: "Tu sonrisa ilumina mis días ☀️",
        4: "Gracias por existir y ser parte de mi vida 💖",
        5: "Eres la razón de mi felicidad 😊",
        6: "Cada momento a tu lado es perfecto ✨",
        7: "Mi amor por ti crece cada día 🌱",
        8: "Eres mi persona favorita en el mundo 🌍",
        9: "Contigo todo es mejor 💫",
        10: "Tu amor me hace la persona más afortunada 🍀",
        11: "Eres mi sueño hecho realidad 💭",
        12: "No hay nadie como tú 👑",
        13: "Mañana es San Valentín, ¡estoy emocionado! 💝",
        14: "¡Feliz San Valentín, mi amor! Eres todo para mí 💘",
        15: "Después de San Valentín, mi amor sigue creciendo 💗",
        16: "Faltan pocos días para tu cumpleaños 🎈",
        17: "Mi pastelito de fresa te amo muchito 💕💕",
        18: "El sol ya salió y brillas igual que él 🌟☀️",
        19: "Hoy están tan hermosa con siempre te amo 💕😍",
        20: "Un año más de vida, de felecidad para todas las personas que te apreciamos 🫂",
        21: "Jhumi y Ernes <3 #01",
        22: "3 dias para tu día especial 🎊",
        23: "2 días para tu día especial 🎉" ,
        24: "¡Mañana es tu cumpleñaos! 🎂",
        25: "¡FELIZ CUMPLEÑAOS JHUMIRA! Eres increíble 🎂🎉🎁"
    };
    
    const defaultMessage = "Un día más de amor y felicidad juntos 💕";
    
    alert(messages[day] || defaultMessage);
}

// Mailbox
function loadMailbox() {
    const mailboxContainer = document.getElementById('mailboxContainer');
    
    const messages = [
        {
            date: '12 Feb 2025',
            subject: 'Te amo hoy y siempre 💕',
            content: 'Cada momento contigo se vuelve especial, porque tu presencia llena mi vida de paz y alegría.',
            unread: true
        },
        {
            date: '11 Feb 2025',
            subject: 'Todo para mi Jhumi preciosa',
            content: 'A veces me detengo a pensar en todo lo que has traído a mi vida, y no puedo evitar sonreír. Tu presencia convierte lo simple en especial, y tu cariño es ese impulso silencioso que me anima a seguir creciendo. No sé cómo explicarlo con exactitud, pero contigo todo tiene más sentido. Gracias por ser tú, Jhumira.💫',
            unread: true
        },
        {
            date: '10 Feb 2025',
            subject: 'Para la persona más especial',
            content: 'Cada día que pasa me doy cuenta de lo afortunado que soy de tenerte en mi vida. Tu sonrisa ilumina mis días más oscuros, y tu amor me da la fuerza para ser mejor cada día. Gracias por existir, Jhumira. Te amo más de lo que las palabras pueden expresar. 💕',
            unread: true
        },
        {
            date: '8 Feb 2025',
            subject: 'Pensando en ti',
            content: 'Hoy desperté pensando en ti, como todos los días. Tu risa es mi melodía favorita, tus ojos son mi lugar seguro. No puedo esperar para crear más recuerdos contigo. Eres mi presente y mi futuro. 💖',
            unread: true
        },
        {
            date: '5 Feb 2025',
            subject: 'Nuestros momentos',
            content: 'Recuerdo cada detalle de nuestros momentos juntos. Desde nuestra primera cita hasta nuestro primer beso, cada segundo contigo ha sido mágico. Gracias por llenar mi vida de amor y alegría. 🌟',
            unread: false
        }
    ];
    
    messages.forEach(msg => {
        const mailItem = document.createElement('div');
        mailItem.className = 'mail-item';
        if (msg.unread) mailItem.classList.add('unread');
        
        mailItem.innerHTML = `
            <div class="mail-header">
                <span class="mail-date">${msg.date}</span>
                ${msg.unread ? '<span class="mail-badge">Nuevo</span>' : ''}
            </div>
            <h3 class="mail-subject">${msg.subject}</h3>
            <p class="mail-content">${msg.content}</p>
        `;
        
        mailboxContainer.appendChild(mailItem);
    });
}

// Gallery
function initializeGallery() {
const galleryGrid = document.getElementById('galleryGrid');
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const photos = [
    { unlockDay: 1, title: 'Nuestros anillos 💕', description: 'El comienzo de algo hermoso', image: 'foto1.jpeg' },
    { unlockDay: 5, title: 'Momentos Dulces', description: 'Recuerdos que atesoramos', image: 'foto8.jpg' },
    { unlockDay: 7, title: 'Una Semana de Amor', description: 'Celebrando nuestros momentos', image: 'foto4.jpeg' }
];

photos.forEach(photo => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const isUnlocked = (currentYear === 2026 && currentMonth === 1 && currentDay >= photo.unlockDay);
    
    if (!isUnlocked) {
        item.classList.add('locked');
        item.innerHTML = `
            <div class="gallery-placeholder">
                <div class="lock-icon">🔒</div>
                <p>Se desbloquea el ${photo.unlockDay} de Febrero</p>
            </div>
        `;
    } else {
        item.innerHTML = `
            <img src="images/${photo.image}" class="gallery-image" alt="${photo.title}">
            <div class="gallery-overlay">
                <h4>${photo.title}</h4>
                <p>${photo.description}</p>
            </div>
        `;
    }
    
    galleryGrid.appendChild(item);
});
}

// Valentine Modal
const secretButton = document.getElementById('secretButton');
const valentineModal = document.getElementById('valentineModal');
const responseModal = document.getElementById('responseModal');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const closeResponseBtn = document.getElementById('closeResponseBtn');

secretButton.addEventListener('click', (e) => {
    e.preventDefault();
    valentineModal.classList.add('active');
    createModalHearts();
});

function createModalHearts() {
    const container = document.querySelector('.hearts-float');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animation = `floatHeart ${Math.random() * 5 + 5}s infinite`;
        container.appendChild(heart);
    }
}

yesBtn.addEventListener('click', () => {
    valentineModal.classList.remove('active');
    showResponse(true);
});

let noClickCount = 0;
noBtn.addEventListener('click', () => {
    noClickCount++;
    
    if (noClickCount === 1) {
        noBtn.textContent = '¿Segura? 🥺';
    } else if (noClickCount === 2) {
        noBtn.textContent = '¿En serio? 💔';
        noBtn.style.transform = 'scale(0.8)';
    } else if (noClickCount === 3) {
        noBtn.textContent = 'Piénsalo bien 😢';
        noBtn.style.transform = 'scale(0.6)';
    } else {
        // Move the button randomly
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        noBtn.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
        noBtn.textContent = '¡No puedes! 😅';
    }
});

function showResponse(answer) {
    responseModal.classList.add('active');
    const title = document.getElementById('responseTitle');
    const message = document.getElementById('responseMessage');
    
    if (answer) {
        title.textContent = '¡Sabía que dirías que sí! 💖';
        message.textContent = 'Eres la persona más especial de mi vida, Jhumira. Gracias por hacer este San Valentín inolvidable. Te amo con todo mi corazón. Este es solo el comienzo de muchas celebraciones juntos. 💕✨';
        createCelebration();
    } else {
        title.textContent = '¡Vamos! 😄';
        message.textContent = 'Sabemos que en el fondo quieres decir que sí 💝';
    }
}

closeResponseBtn.addEventListener('click', () => {
    responseModal.classList.remove('active');
});

function createCelebration() {
    const container = document.getElementById('celebrationAnimation');
    const emojis = ['🎉', '🎊', '💕', '💖', '💝', '✨', '🌟', '💫'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'absolute';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = Math.random() * 100 + '%';
            emoji.style.fontSize = (Math.random() * 30 + 20) + 'px';
            emoji.style.animation = 'floatHeart 3s ease-out forwards';
            container.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 3000);
        }, i * 50);
    }
}

// Close modals when clicking outside
valentineModal.addEventListener('click', (e) => {
    if (e.target === valentineModal) {
        valentineModal.classList.remove('active');
    }
});

responseModal.addEventListener('click', (e) => {
    if (e.target === responseModal) {
        responseModal.classList.remove('active');
    }
});
