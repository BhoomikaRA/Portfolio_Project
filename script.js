
        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuToggle.classList.remove('active');
        });
        
        // Close sidebar when clicking on a nav link (mobile)
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });

        // Typing Animation
        const typingElement = document.getElementById('typing');
        const typingTexts = ['Frontend Developer', 'Web Designer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentText = typingTexts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }

        // Start typing animation
        setTimeout(type, 1000);
        
        // Active navigation link based on scroll position
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Skill bars animation on scroll
        const skillItems = document.querySelectorAll('.skill-item');
        
        function animateSkillBars() {
            skillItems.forEach(item => {
                const itemPosition = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (itemPosition < screenPosition) {
                    const skillLevel = item.querySelector('.skill-level');
                    const width = skillLevel.getAttribute('data-width');
                    skillLevel.style.width = width + '%';
                    item.classList.add('animated');
                }
            });
        }
        
        window.addEventListener('scroll', animateSkillBars);
        
        // Initialize skill bars on page load if already in view
        window.addEventListener('load', animateSkillBars);

        // Contact Form Validation
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');
        const successMessage = document.getElementById('success-message');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Name validation
            if (nameInput.value.trim() === '') {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }

            // Subject validation
            if (subjectInput.value.trim() === '') {
                subjectError.style.display = 'block';
                isValid = false;
            } else {
                subjectError.style.display = 'none';
            }

            // Message validation
            if (messageInput.value.trim() === '') {
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }

            // If form is valid, show success message
            if (isValid) {
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });

        // Resume download from home section — fetch and force a download (works across browsers)
        document.getElementById('resume-btn-home').addEventListener('click', async function(e) {
            e.preventDefault();
            const anchor = this;
            const url = anchor.getAttribute('href');
            const suggestedName = anchor.getAttribute('download') || 'Resume.pdf';

            // Show starting popup
            showPopup('Starting resume download...');

            try {
                // Try fetching the file as a blob (better control, works even if browser would open in new tab)
                const res = await fetch(url, { cache: 'no-store' });

                if (!res.ok) throw new Error('Network response was not ok');

                const blob = await res.blob();
                const blobUrl = window.URL.createObjectURL(blob);

                const tempLink = document.createElement('a');
                tempLink.href = blobUrl;
                tempLink.download = suggestedName;
                document.body.appendChild(tempLink);
                tempLink.click();
                tempLink.remove();

                // Revoke blob URL after a short delay to ensure download started
                setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);

                showPopup('Resume downloaded successfully!');
            } catch (err) {
                // Fallback: navigate to the file (browser will open or download depending on headers)
                console.warn('Fetch/download failed, falling back to direct navigation:', err);
                showPopup('Download failed via fetch — opening file in new tab...');
                window.open(url, '_blank');
            }
        });

        // Popup function
        function showPopup(message) {
            const popup = document.getElementById('popupMsg');
            popup.textContent = message;
            popup.classList.add('active');
            
            setTimeout(() => {
                popup.classList.remove('active');
            }, 3000);
        }

        // Particle Background
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size
                const size = Math.random() * 60 + 10;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation duration and delay
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Floating Elements
        function createFloatingElements() {
            const floatingContainer = document.getElementById('floatingElements');
            const elementCount = 15;
            
            for (let i = 0; i < elementCount; i++) {
                const element = document.createElement('div');
                element.classList.add('floating-element');
                
                // Random size
                const size = Math.random() * 40 + 5;
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                
                // Random position
                element.style.left = `${Math.random() * 100}%`;
                element.style.top = `${Math.random() * 100}%`;
                
                // Random animation duration and delay
                const duration = Math.random() * 30 + 15;
                const delay = Math.random() * 10;
                element.style.animationDuration = `${duration}s`;
                element.style.animationDelay = `${delay}s`;
                
                floatingContainer.appendChild(element);
            }
        }

        // Scroll animations
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }
        
        // Initialize on page load
        window.addEventListener('load', () => {
            createParticles();
            createFloatingElements();
            handleScrollAnimations();
        });
        
        // Handle scroll events
        window.addEventListener('scroll', handleScrollAnimations);
   