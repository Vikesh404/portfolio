// Vikesh Yadav Portfolio - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSmoothScrolling();
    initContactForm();
    initNavbarBehavior();
    initPricingButtons();
});

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(`
        .section-header,
        .service-card,
        .pricing-card,
        .portfolio-card,
        .addon-badge,
        .tech-item,
        .about-text,
        .contact-form-wrapper,
        .contact-info
    `);

    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .hero-cta');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Simulate form submission
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            showSuccessMessage();
            form.reset();
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Form validation
function validateForm(data) {
    let isValid = true;
    const fields = ['name', 'email', 'projectType', 'message'];
    
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else if (field === 'email' && !isValidEmail(data[field])) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input) {
    const value = input.value.trim();
    
    if (!value) {
        showFieldError(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && !isValidEmail(value)) {
        showFieldError(input, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(input);
    return true;
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    input.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.classList.add('field-error');
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
}

function clearFieldError(input) {
    input.classList.remove('error');
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
        </div>
    `;
    
    // Add styles for success message
    successMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const successContent = successMessage.querySelector('.success-content');
    successContent.style.cssText = `
        background: var(--color-surface);
        padding: 2rem;
        border-radius: var(--radius-lg);
        text-align: center;
        max-width: 400px;
        margin: 0 1rem;
        box-shadow: var(--shadow-lg);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    const successIcon = successMessage.querySelector('.success-icon');
    successIcon.style.cssText = `
        width: 60px;
        height: 60px;
        background: var(--color-success);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
        margin: 0 auto 1rem;
    `;
    
    document.body.appendChild(successMessage);
    
    // Animate in
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successContent.style.transform = 'scale(1)';
    }, 10);
    
    // Auto close after 3 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 3000);
    
    // Close on click
    successMessage.addEventListener('click', function(e) {
        if (e.target === successMessage) {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 300);
        }
    });
}

// Navbar behavior on scroll
function initNavbarBehavior() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Add/remove scrolled class
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Update active nav link
                updateActiveNavLink();
                
                lastScrollTop = scrollTop;
                isScrolling = false;
            });
        }
        isScrolling = true;
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Pricing buttons functionality
function initPricingButtons() {
    const pricingButtons = document.querySelectorAll('.pricing-card .btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the package name from the card
            const card = this.closest('.pricing-card');
            const packageName = card.querySelector('.pricing-title').textContent;
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = contactSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Pre-fill the project type in the contact form
            setTimeout(() => {
                const projectTypeSelect = document.getElementById('projectType');
                const messageTextarea = document.getElementById('message');
                
                // Map package names to select options
                const packageMapping = {
                    'Starter Website': 'starter',
                    'Growth App': 'growth',
                    'Business Solution': 'business',
                    'Premium Enterprise': 'enterprise'
                };
                
                if (packageMapping[packageName]) {
                    projectTypeSelect.value = packageMapping[packageName];
                }
                
                // Pre-fill message
                messageTextarea.value = `Hi Vikesh, I'm interested in the ${packageName} package. I'd like to discuss my project requirements.`;
                
                // Focus on name field
                document.getElementById('name').focus();
            }, 800);
        });
    });
}

// Add CSS for error states and active nav links
const additionalStyles = `
    .form-control.error {
        border-color: var(--color-error);
        box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
    }
    
    .field-error {
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
    }
    
    .nav-links a.active {
        color: var(--color-primary);
        position: relative;
    }
    
    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-primary);
        border-radius: 1px;
    }
    
    .navbar.scrolled {
        background: rgba(252, 252, 249, 0.98);
        box-shadow: var(--shadow-sm);
    }
    
    @media (prefers-color-scheme: dark) {
        .navbar {
            background: rgba(31, 33, 33, 0.95);
        }
        
        .navbar.scrolled {
            background: rgba(31, 33, 33, 0.98);
        }
    }
    
    [data-color-scheme="dark"] .navbar {
        background: rgba(31, 33, 33, 0.95);
    }
    
    [data-color-scheme="dark"] .navbar.scrolled {
        background: rgba(31, 33, 33, 0.98);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Utility function for throttling scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add some hover effects for better interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyles = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    
    const rippleStyleSheet = document.createElement('style');
    rippleStyleSheet.textContent = rippleStyles;
    document.head.appendChild(rippleStyleSheet);
});

// Performance optimization: Lazy load animations
function initLazyAnimations() {
    const cards = document.querySelectorAll('.service-card, .pricing-card, .portfolio-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize lazy animations
document.addEventListener('DOMContentLoaded', initLazyAnimations);