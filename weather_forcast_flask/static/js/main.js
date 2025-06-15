// Main JavaScript file for AirCast Thailand

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeDatePicker();
    initializeFormValidation();
    initializeAnimations();
    initializeAccessibility();
});

/**
 * Initialize date picker with constraints
 */
function initializeDatePicker() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Set maximum date to 30 days from today
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
        
        // Set default date to today if not already set
        if (!dateInput.value) {
            dateInput.value = today;
        }
    }
}

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    const form = document.querySelector('.forecast-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const province = document.getElementById('province');
            const date = document.getElementById('date');
            
            let isValid = true;
            
            // Validate province selection
            if (!province.value) {
                showFieldError(province, 'Please select a province');
                isValid = false;
            } else {
                clearFieldError(province);
            }
            
            // Validate date selection
            if (!date.value) {
                showFieldError(date, 'Please select a date');
                isValid = false;
            } else {
                const selectedDate = new Date(date.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    showFieldError(date, 'Please select a current or future date');
                    isValid = false;
                } else {
                    clearFieldError(date);
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                // Focus on first error field
                const firstError = form.querySelector('.is-invalid');
                if (firstError) {
                    firstError.focus();
                }
            } else {
                // Show loading state
                showLoadingState();
            }
        });
    }
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Show loading state when form is submitted
 */
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading Forecast...';
        submitBtn.disabled = true;
        
        // Store original text for potential restoration
        submitBtn.dataset.originalText = originalText;
    }
}

/**
 * Initialize subtle animations and interactions
 */
function initializeAnimations() {
    // Animate forecast cards on results page
    const forecastCards = document.querySelectorAll('.forecast-card');
    forecastCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    // Animate hotel cards
    const hotelCards = document.querySelectorAll('.hotel-card');
    hotelCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + forecastCards.length) * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    // Add smooth scrolling for anchor links
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

/**
 * Initialize accessibility features
 */
function initializeAccessibility() {
    // Add keyboard navigation for custom elements
    const clickableElements = document.querySelectorAll('.forecast-card, .hotel-card, .info-card');
    clickableElements.forEach(element => {
        // Make elements focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard event listeners
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Announce dynamic content changes to screen readers
    const announceElement = createAnnouncementElement();
    
    // Announce when form validation errors occur
    document.addEventListener('invalid', function(e) {
        const field = e.target;
        const label = field.labels && field.labels[0] ? field.labels[0].textContent : 'Field';
        announceToScreenReader(`${label} is required`, announceElement);
    }, true);
}

/**
 * Create hidden element for screen reader announcements
 */
function createAnnouncementElement() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    return announcer;
}

/**
 * Announce message to screen readers
 */
function announceToScreenReader(message, announcer) {
    announcer.textContent = message;
    setTimeout(() => {
        announcer.textContent = '';
    }, 1000);
}

/**
 * Handle responsive navigation
 */
function initializeNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
            navbarToggler.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    }
}

/**
 * Utility function to format numbers with locale
 */
function formatNumber(number, locale = 'en-US') {
    return new Intl.NumberFormat(locale).format(number);
}

/**
 * Utility function to format dates
 */
function formatDate(dateString, options = {}) {
    const date = new Date(dateString);
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Add CSS animation classes
 */
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .fade-in-up {
            animation: none;
            opacity: 1;
            transform: none;
        }
    }
`;
document.head.appendChild(style);

// Initialize navigation after DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavigation);