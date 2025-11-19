// script.js - Main JavaScript file for the website

// ===== DYNAMIC REAL-TIME CONTENT =====
// Function to update current date and time
function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    const elements = document.querySelectorAll('.current-date-time');
    elements.forEach(element => {
        element.textContent = dateTimeString;
    });
}

// Update date/time every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

// ===== DYNAMIC CONTENT FUNCTIONS =====
// Function to change text dynamically
function changeText(elementId, newText) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = newText;
    }
}

// Function to change HTML dynamically
function changeHTML(elementId, newHTML) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = newHTML;
    }
}

// Function to add new element
function addNewElement(containerId, tagName, textContent, className) {
    const container = document.getElementById(containerId);
    if (container) {
        const newElement = document.createElement(tagName);
        newElement.textContent = textContent;
        if (className) {
            newElement.classList.add(className);
        }
        container.appendChild(newElement);
    }
}

// Function to remove last element
function removeLastElement(containerId) {
    const container = document.getElementById(containerId);
    if (container && container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }
}

// Function to display user input
function displayUserInput(inputId, displayId) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    if (input && display) {
        display.textContent = input.value;
    }
}

// ===== FORM VALIDATION FUNCTIONS =====
// Generic validation function
function validateField(field, rules) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (rules.required && !value) {
        isValid = false;
        errorMessage = `${field.name} is required.`;
    } else if (rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `${field.name} must be at least ${rules.minLength} characters long.`;
    } else if (rules.pattern && !rules.pattern.test(value)) {
        isValid = false;
        errorMessage = `Please enter a valid ${field.name.toLowerCase()}.`;
    }

    return { isValid, errorMessage };
}

// Function to show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="error-message">${message}</div>`;
    }
}

// Function to show success message
function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="success-message">${message}</div>`;
    }
}

// Function to clear messages
function clearMessages(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

// ===== ENQUIRY FORM VALIDATION =====
function validateEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearMessages('enquiry-feedback');

        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');

        let isFormValid = true;
        let errors = [];

        // Validate name
        const nameValidation = validateField(nameField, { required: true, minLength: 2 });
        if (!nameValidation.isValid) {
            isFormValid = false;
            errors.push(nameValidation.errorMessage);
        }

        // Validate email
        const emailValidation = validateField(emailField, {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        });
        if (!emailValidation.isValid) {
            isFormValid = false;
            errors.push(emailValidation.errorMessage);
        }

        // Validate phone
        const phoneValidation = validateField(phoneField, {
            required: true,
            pattern: /^[\+]?[1-9][\d]{0,15}$/
        });
        if (!phoneValidation.isValid) {
            isFormValid = false;
            errors.push(phoneValidation.errorMessage);
        }

        // Validate subject
        const subjectValidation = validateField(subjectField, { required: true, minLength: 5 });
        if (!subjectValidation.isValid) {
            isFormValid = false;
            errors.push(subjectValidation.errorMessage);
        }

        // Validate message
        const messageValidation = validateField(messageField, { required: true, minLength: 10 });
        if (!messageValidation.isValid) {
            isFormValid = false;
            errors.push(messageValidation.errorMessage);
        }

        if (!isFormValid) {
            showError('enquiry-feedback', `<div class="error-summary"><h3>Please correct the following errors:</h3><ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul></div>`);
        } else {
            // Simulate form submission (replace with actual submission logic)
            showSuccess('enquiry-feedback', 'Thank you for your enquiry! We will get back to you soon.');
            form.reset();
        }
    });
}

// ===== CONTACT FORM VALIDATION =====
function validateContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearMessages('contact-feedback');

        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');

        let isFormValid = true;
        let errors = [];

        // Validate name
        const nameValidation = validateField(nameField, { required: true, minLength: 2 });
        if (!nameValidation.isValid) {
            isFormValid = false;
            errors.push(nameValidation.errorMessage);
        }

        // Validate email
        const emailValidation = validateField(emailField, {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        });
        if (!emailValidation.isValid) {
            isFormValid = false;
            errors.push(emailValidation.errorMessage);
        }

        // Validate message
        const messageValidation = validateField(messageField, { required: true, minLength: 10 });
        if (!messageValidation.isValid) {
            isFormValid = false;
            errors.push(messageValidation.errorMessage);
        }

        if (!isFormValid) {
            showError('contact-feedback', `<div class="error-summary"><h3>Please correct the following errors:</h3><ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul></div>`);
        } else {
            // Use EmailJS for email processing
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
                .then(function() {
                    showSuccess('contact-feedback', 'Thank you for your message! We will get back to you soon.');
                    form.reset();
                }, function(error) {
                    showError('contact-feedback', 'Sorry, there was an error sending your message. Please try again later.');
                    console.error('EmailJS error:', error);
                });
        }
    });
}

// ===== NEWSLETTER FORM HANDLER =====
function handleNewsletterSubmit(event) {
    event.preventDefault();
    clearMessages('newsletter-feedback');

    const emailField = document.getElementById('newsletter-email');

    // Validate email
    const emailValidation = validateField(emailField, {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    });

    if (!emailValidation.isValid) {
        showError('newsletter-feedback', emailValidation.errorMessage);
    } else {
        // Simulate newsletter subscription
        showSuccess('newsletter-feedback', 'Thank you for subscribing to our newsletter!');
        event.target.reset();
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    const searchInput = document.getElementById('product-search');
    const priceFilter = document.getElementById('price-filter');

    if (!searchInput) return;

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const priceRange = priceFilter ? priceFilter.value : 'all';
        const products = document.querySelectorAll('.product-item');

        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            const description = product.querySelector('p').textContent.toLowerCase();
            const priceText = product.querySelector('p:last-of-type').textContent;
            const price = parseInt(priceText.replace('Price: R', ''));

            let matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            let matchesPrice = true;

            if (priceRange === 'under-1500') {
                matchesPrice = price < 1500;
            } else if (priceRange === '1500-2000') {
                matchesPrice = price >= 1500 && price <= 2000;
            } else if (priceRange === 'over-2000') {
                matchesPrice = price > 2000;
            }

            if (matchesSearch && matchesPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterProducts);
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
}

// ===== ACCORDION FUNCTIONALITY =====
function initializeAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
}

// ===== MODAL FUNCTIONALITY =====
function initializeModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// ===== LOAD MORE FUNCTIONALITY =====
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    let currentIndex = 6; // Assuming 6 products are initially visible
    const products = [
        { name: 'Advanced Speed Boots', desc: 'Next-level speed technology.', price: 'R2200', img: '../assests/speed-boots.jpg' },
        { name: 'Elite Control Boots', desc: 'Precision control for midfielders.', price: 'R2100', img: '../assests/control-boots.jpg' },
        // Add more products as needed
    ];

    loadMoreBtn.addEventListener('click', function() {
        const container = document.querySelector('.products-grid');
        if (!container) return;

        for (let i = 0; i < 3 && currentIndex < products.length; i++) {
            const product = products[currentIndex];
            const productHTML = `
                <div class="product-item animate-on-scroll">
                    <h3>${product.name}</h3>
                    <img src="${product.img}" alt="${product.name}" width="400" height="300" data-glightbox="gallery" data-title="${product.name}">
                    <p>${product.desc}</p>
                    <p>Price: ${product.price}</p>
                    <button class="modal-trigger" data-modal="product-modal">View Details</button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', productHTML);
            currentIndex++;
        }

        if (currentIndex >= products.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

// ===== ANIMATION ON SCROLL =====
function initializeScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}



// ===== GLIGHTBOX GALLERY INITIALIZATION =====
function initializeGallery() {
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '[data-glightbox="gallery"]'
        });
    }
}

// ===== SLIDESHOW FUNCTIONALITY =====
function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-play every 3 seconds
    setInterval(nextSlide, 3000);
}

// ===== INITIALIZE ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    validateEnquiryForm();
    validateContactForm();
    initializeSearch();
    initializeAccordions();
    initializeModals();
    initializeLoadMore();
    initializeScrollAnimation();
    initializeGallery();
    initializeSlideshow();

    // Initialize newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
});


