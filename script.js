// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.about-card, .experience-card, .skill-card, .project-card, .service-card, .contact-card, .about-summary'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Add stagger animation delay
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.about-card, .skill-card, .project-card, .service-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing Effect for Hero Title (Optional Enhancement)
const typingEffect = () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                nameElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        
        setTimeout(type, 500);
    }
};

// Run typing effect on load
window.addEventListener('load', () => {
    setTimeout(typingEffect, 300);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add hover effect to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        color: var(--primary-color);
    }
    
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Language Toggle
let currentLang = 'ar';

const updateLanguage = (lang) => {
    const html = document.documentElement;
    currentLang = lang;
    
    // Update HTML attributes
    if (lang === 'ar') {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
    } else {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
    }
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        const text = lang === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (!element.value || element.value === element.getAttribute('data-ar') || element.value === element.getAttribute('data-en')) {
                // Only update placeholder, not value if user has typed something
                element.placeholder = text;
            }
        } else if (element.tagName === 'P' && element.innerHTML.includes('&copy;')) {
            element.innerHTML = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Special handling for CV button
    const cvText = document.querySelector('.cv-text');
    if (cvText) {
        cvText.textContent = lang === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV';
    }
    
    // Update form language
    updateFormLanguage(lang);
    
    // Save preference
    localStorage.setItem('preferredLang', lang);
};

const languageToggle = () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update language
            updateLanguage(lang);
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== 'ar') {
        const enBtn = document.querySelector('.lang-btn[data-lang="en"]');
        if (enBtn) {
            enBtn.classList.add('active');
            document.querySelector('.lang-btn[data-lang="ar"]').classList.remove('active');
            updateLanguage('en');
        }
    }
};

// Initialize language toggle
document.addEventListener('DOMContentLoaded', () => {
    languageToggle();
    
    // Initialize form placeholders
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    updateFormLanguage(savedLang);
});

// Progress Bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            formMessage.textContent = currentLang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = currentLang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
        formMessage.style.display = 'none';
        
        try {
            // Send to Formspree
            const response = await fetch('https://formspree.io/f/mblyldkl', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            });
            
            if (response.ok) {
                formMessage.textContent = currentLang === 'ar' ? 'شكراً لك! تم إرسال رسالتك بنجاح' : 'Thank you! Your message has been sent successfully';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                contactForm.reset();
                
                // Reset placeholders
                const savedLang = localStorage.getItem('preferredLang') || 'ar';
                updateFormLanguage(savedLang);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formMessage.textContent = currentLang === 'ar' ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى' : 'An error occurred while sending. Please try again';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Update form labels and placeholders on language change
const updateFormLanguage = (lang) => {
    const formLabels = document.querySelectorAll('.form-group label');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formLabels.forEach((label) => {
        if (label.getAttribute('data-ar') && label.getAttribute('data-en')) {
            label.textContent = lang === 'ar' ? label.getAttribute('data-ar') : label.getAttribute('data-en');
        }
    });
    
    formInputs.forEach(input => {
        if (input.getAttribute('data-ar') && input.getAttribute('data-en')) {
            const placeholder = lang === 'ar' ? input.getAttribute('data-ar') : input.getAttribute('data-en');
            input.placeholder = placeholder;
            // Only update value if it's empty or matches old placeholder
            if (!input.value || input.value === input.getAttribute('data-ar') || input.value === input.getAttribute('data-en')) {
                input.value = '';
            }
        }
    });
    
    // Update submit button
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    if (submitBtn && submitBtn.getAttribute('data-ar') && submitBtn.getAttribute('data-en')) {
        submitBtn.textContent = lang === 'ar' ? submitBtn.getAttribute('data-ar') : submitBtn.getAttribute('data-en');
    }
};

// Console welcome message
console.log('%cمرحباً بك في موقع Portfolio الخاص بإيهاب عبداللاه', 'color: #2c2c2c; font-size: 20px; font-weight: bold;');
console.log('%cتم التطوير بواسطة HTML, CSS, JavaScript', 'color: #6a6a6a; font-size: 14px;');

