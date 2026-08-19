/**
 * iOS-Style Interactive Animations for DevOps Sandbox
 */

document.addEventListener('DOMContentLoaded', () => {
    initTouchFeedback();
    initModalAnimations();
    initPipelineChecklist();
    initSmoothScroll();
});

/* 1. Efecto de pulsación táctil/click estilo iOS (Active Scale) */
function initTouchFeedback() {
    const interactiveElements = document.querySelectorAll('.btn, .card, nav a, .checklist li');

    interactiveElements.forEach(el => {
        // Transición suave por defecto
        el.style.transition = 'transform 0.4s cubic-bezier(0.15, 0.85, 0.35, 1.2), opacity 0.2s ease';

        el.addEventListener('mousedown', () => {
            el.style.transform = 'scale(0.95)';
        });

        el.addEventListener('mouseup', () => {
            el.style.transform = 'scale(1)';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
        });
    });
}

/* 2. Animación de alerta/modal tipo iOS */
function triggerTest() {
    const status = document.getElementById('health-status');
    status.innerText = "Checking...";
    status.className = "text-warning";

    setTimeout(() => {
        status.innerText = "200 OK (Healthy)";
        status.className = "text-success";
        
        // Modal personalizado estilo iOS en lugar del alert() nativo
        showIOSAlert("✅ Check de Salud", "Todas las pruebas de integración han respondido con éxito.");
    }, 800);
}

function showIOSAlert(title, message) {
    // Fondo borroso (Backdrop)
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(15px)',
        webkitBackdropFilter: 'blur(15px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });

    // Tarjeta Modal con física de resorte (Spring)
    const alertBox = document.createElement('div');
    Object.assign(alertBox.style, {
        backgroundColor: 'rgba(30, 41, 59, 0.85)',
        border: '1px solid var(--border-color)',
        borderRadius: '18px',
        padding: '1.5rem',
        maxWidth: '320px',
        width: '85%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        transform: 'scale(1.2)',
        opacity: '0',
        transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease'
    });

    alertBox.innerHTML = `
        <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem; color: #fff;">${title}</h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.2rem;">${message}</p>
        <button id="ios-alert-btn" style="
            background: var(--accent-blue);
            color: #0f172a;
            border: none;
            padding: 0.6rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            width: 100%;
            cursor: pointer;
        ">Entendido</button>
    `;

    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);

    // Trigger de entrada
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        alertBox.style.transform = 'scale(1)';
        alertBox.style.opacity = '1';
    });

    // Cerrar modal
    const closeBtn = alertBox.querySelector('#ios-alert-btn');
    closeBtn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        alertBox.style.transform = 'scale(0.85)';
        setTimeout(() => overlay.remove(), 300);
    });
}

/* 3. Animación de revelado progresivo (Staggered Entrance) para la lista */
function initPipelineChecklist() {
    const items = document.querySelectorAll('.checklist li');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(15px)';
                    item.style.transition = `all 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.08}s`;
                    
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const pipelineSection = document.querySelector('.pipeline-section');
    if (pipelineSection) observer.observe(pipelineSection);
}

/* 4. Desplazamiento Suave (Smooth Scroll) estilo iOS */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}