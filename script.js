// Research Scholar's Conclave 2025 - Main Scripts

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip for dropdown toggles
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
                    document.getElementById('mobile-menu').classList.add('hidden');
                }
                
                // Calculate offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Sticky Header
    const header = document.querySelector('nav');
    const heroSection = document.getElementById('home');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('shadow-md');
        } else {
            if (window.scrollY <= 100) {
                header.classList.remove('shadow-md');
            }
        }
    });
    
    // Gallery Image Enhancement
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.getAttribute('src');
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const lightboxContent = document.createElement('div');
            lightboxContent.classList.add('lightbox-content');
            
            const lightboxImg = document.createElement('img');
            lightboxImg.setAttribute('src', src);
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('lightbox-close');
            closeBtn.innerHTML = '&times;';
            
            // Append elements
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Show lightbox with animation
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            // Close functionality
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            });
            
            // Close on outside click
            lightbox.addEventListener('click', function(e) {
                if (e.target === this) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                }
            });
        });
    });
    
    // Add Lightbox Styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
            opacity: 1;
            pointer-events: auto;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
        }
        
        .lightbox-content img {
            width: 100%;
            height: auto;
            max-height: 80vh;
            object-fit: contain;
            border: 4px solid white;
            border-radius: 4px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            padding: 5px;
        }
    `;
    document.head.appendChild(style);
    
    // Counter Animation for statistics
    function startCounterAnimation() {
        document.querySelectorAll('.counter-value').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easeInOutCubic = progress < 0.5 
                    ? 4 * progress ** 3 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                const currentValue = Math.floor(easeInOutCubic * target);
                counter.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }
    
    // Use Intersection Observer for triggering counter animation
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounterAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe stat counters if they exist
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Add button styles
    const btnStyle = document.createElement('style');
    btnStyle.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            color: white;
            border: none;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .scroll-top-btn.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .scroll-top-btn:hover {
            background-color: var(--primary-color);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(btnStyle);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Copy to clipboard functionality for committee members
    document.addEventListener('click', function(e) {
        if (e.target.closest('.copy-btn')) {
            const btn = e.target.closest('.copy-btn');
            const textToCopy = btn.dataset.copy;
            
            navigator.clipboard.writeText(textToCopy).then(function() {
                // Create toast notification
                const toast = document.createElement('div');
                toast.className = 'toast-notification';
                toast.innerHTML = `<i class="fas fa-check-circle"></i> Copied to clipboard!`;
                document.body.appendChild(toast);
                
                // Show and then remove toast
                setTimeout(function() {
                    toast.classList.add('show');
                    setTimeout(function() {
                        toast.classList.remove('show');
                        setTimeout(function() {
                            document.body.removeChild(toast);
                        }, 300);
                    }, 2000);
                }, 100);
            });
        }
    });
    
    // Form Submission Handling for Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showToast('Please enter your email address', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission success
            emailInput.value = '';
            showToast('Thank you for subscribing to our newsletter!', 'success');
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Toast notification system
    function showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.classList.add('toast-container');
            document.body.appendChild(toastContainer);
            
            // Add toast container styles
            const toastStyle = document.createElement('style');
            toastStyle.textContent = `
                .toast-container {
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    z-index: 9999;
                }
                
                .toast {
                    min-width: 250px;
                    margin-top: 10px;
                    padding: 15px 20px;
                    border-radius: 4px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    color: white;
                    display: flex;
                    align-items: center;
                    animation: slideIn 0.3s ease forwards, fadeOut 0.5s ease 2.5s forwards;
                    opacity: 0;
                    transform: translateX(-20px);
                }
                
                .toast.info {
                    background-color: #2196F3;
                }
                
                .toast.success {
                    background-color: #4CAF50;
                }
                
                .toast.error {
                    background-color: #F44336;
                }
                
                .toast-icon {
                    margin-right: 10px;
                    font-size: 20px;
                }
                
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(toastStyle);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.classList.add('toast', type);
        
        // Set icon based on type
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle toast-icon"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle toast-icon"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle toast-icon"></i>';
        }
        
        toast.innerHTML = `${icon} <div>${message}</div>`;
        toastContainer.appendChild(toast);
        
        // Remove toast after animation completes
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 3000);
    }
});

// Additional jQuery Enhancements
$(document).ready(function() {
    // Add hover effect to navigation links
    $('.nav-link').hover(
        function() {
            $(this).addClass('hover-effect');
        },
        function() {
            $(this).removeClass('hover-effect');
        }
    );
    
    // Animate elements on scroll with jQuery
    $(window).scroll(function() {
        var windowTop = $(window).scrollTop();
        
        // Fade in elements as they come into view
        $('.fade-on-scroll:not(.animated)').each(function() {
            var elementTop = $(this).offset().top;
            var elementVisible = 150;
            
            if (windowTop > elementTop - elementVisible) {
                $(this).addClass('animated fadeIn');
            }
        });
    });
    
    // Enhance image galleries with jQuery for better user interaction
    $('.gallery-image').on('mouseenter', function() {
        $(this).parent().siblings().find('.gallery-image').css({
            'filter': 'grayscale(50%)',
            'transform': 'scale(1)'
        });
    }).on('mouseleave', function() {
        $('.gallery-image').css({
            'filter': 'grayscale(0%)',
            'transform': 'scale(1)'
        });
    });
    
    // Enhance dropdown menu interactions
    $('.dropdown').hover(
        function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(300);
        },
        function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(300);
        }
    );
    
    // Mobile menu toggle with animation
    $('#mobile-menu-button').click(function() {
        if ($('#mobile-menu').hasClass('hidden')) {
            $('#mobile-menu').removeClass('hidden').hide().slideDown(300);
        } else {
            $('#mobile-menu').slideUp(300, function() {
                $(this).addClass('hidden').css('display', '');
            });
        }
    });
});
