document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor with smooth following effect
    // Only enable for devices that are not mobile (e.g., screen width > 768px)
    if (window.innerWidth > 768) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        // Initialize cursor positions
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        let dotX = 0;
        let dotY = 0;
        
        // Smoothing factor (lower = smoother but slower)
        const smoothFactor = 0.15;
        
        // Update mouse position on move
        window.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // The dot follows the cursor more closely
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });
        
        // Animation loop for smooth cursor following
        function animateCursor() {
            // Calculate the distance between current position and target
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            // Move a percentage of the distance (lerp)
            outlineX += distX * smoothFactor;
            outlineY += distY * smoothFactor;
            
            // Apply the smooth position
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            // Continue the animation loop
            requestAnimationFrame(animateCursor);
        }
        
        // Start the animation loop
        animateCursor();

        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', function() {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });

        document.addEventListener('mouseenter', function() {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });

        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-items span, input, textarea');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'var(--secondary-color)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--primary-color)';
            });
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Activate nav links based on scroll position
        activateNavOnScroll();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Activate navigation links based on scroll position
    function activateNavOnScroll() {
        let sections = Array.from(document.querySelectorAll('section[id]'));
        // Ensure 'services' section is correctly ordered if it exists
        const servicesIndex = sections.findIndex(section => section.id === 'services');
        if (servicesIndex !== -1) {
            const servicesSection = sections.splice(servicesIndex, 1)[0];
            const projectsIndex = sections.findIndex(section => section.id === 'projects');
            if (projectsIndex !== -1) {
                sections.splice(projectsIndex, 0, servicesSection);
            } else {
                sections.push(servicesSection); // Add to end if no projects section
            }
        }
        const scrollPosition = window.pageYOffset + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-links a.active')?.classList.remove('active');
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });



    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section-header, .about-content, .project-card, .contact-item');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-text');
            }
        });
    }

    // Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            console.log('Form submitted!');
            // FormSubmit will handle the actual submission and redirection
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check on page load

    // Preloader (optional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

});