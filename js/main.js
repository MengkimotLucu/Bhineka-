/**
 * BHINNEKA RUN 2026 - Main Interactive JavaScript
 * Author: Development Team
 * Date: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    const REGISTRATION_ENABLED = false;
    const ENABLE_HERO_SCRAMBLE = true;

    // 1. STICKY NAVBAR & ACTIVE LINK INDICATOR ON SCROLL
    const navbar = document.getElementById('navbar-container');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const registrationButtons = document.querySelectorAll('[data-registration-cta]');
    const heroScrambleTarget = document.querySelector('[data-hero-scramble]');
    const desktopScrambleQuery = window.matchMedia('(min-width: 1280px)');
    const scrambleText = heroScrambleTarget ? heroScrambleTarget.textContent.trim() : '';
    const entertainmentSection = document.getElementById('entertainment');
    const entertainmentVisuals = document.querySelectorAll('[data-entertainment-visual]');

    registrationButtons.forEach(button => {
        const openLabel = button.dataset.openLabel || button.textContent.trim();
        const closedLabel = button.dataset.closedLabel || 'Coming Soon';
        const originalHref = button.getAttribute('href');

        button.dataset.openLabel = openLabel;
        if (originalHref) {
            button.dataset.registrationHref = originalHref;
        }

        if (REGISTRATION_ENABLED) {
            if (button.dataset.registrationHref) {
                button.setAttribute('href', button.dataset.registrationHref);
            }
            button.textContent = openLabel;
            button.classList.remove('registration-cta-disabled');
            button.removeAttribute('aria-disabled');
            button.removeAttribute('tabindex');
        } else {
            button.removeAttribute('href');
            button.textContent = closedLabel;
            button.classList.add('registration-cta-disabled');
            button.setAttribute('aria-disabled', 'true');
            button.setAttribute('tabindex', '-1');
            button.addEventListener('click', (event) => {
                event.preventDefault();
            });
        }
    });

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    if (ENABLE_HERO_SCRAMBLE && heroScrambleTarget && window.gsap && window.ScrambleTextPlugin && desktopScrambleQuery.matches) {
        gsap.registerPlugin(ScrambleTextPlugin);

        const playHeroScramble = () => {
            gsap.fromTo(heroScrambleTarget,
                { opacity: 1 },
                {
                    duration: 1.8,
                    scrambleText: {
                        text: scrambleText,
                        chars: 'upperCase',
                        revealDelay: 0.18,
                        speed: 0.45,
                        tweenLength: false,
                    },
                    ease: 'none',
                }
            );
        };

        playHeroScramble();
        // gsap.delayedCall(4.5, function repeatScramble() {
        //     playHeroScramble();
        //     gsap.delayedCall(4.5, repeatScramble);
        // });
    }

    if (entertainmentVisuals.length > 0 && window.gsap && window.ScrollTrigger) {
        gsap.set(entertainmentVisuals, {
            yPercent: 95,
        });

        entertainmentVisuals.forEach((visual) => {
            const card = visual.closest('.entertainment-card');
            if (!card) return;

            gsap.to(visual, {
                yPercent: -18,
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 92%',
                    end: 'top 38%',
                    scrub: 0.9,
                },
            });
        });

        if (entertainmentSection) {
            ScrollTrigger.refresh();
        }
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Sticky Navbar effect
        if (navbar && scrollY > 50) {
            navbar.classList.add('shadow-xl', 'bg-opacity-95', 'backdrop-blur-md');
            navbar.classList.remove('bg-opacity-100');
        } else if (navbar) {
            navbar.classList.remove('shadow-xl', 'bg-opacity-95', 'backdrop-blur-md');
            navbar.classList.add('bg-opacity-100');
        }

        // Active link tracking
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Desktop navbar
                navLinks.forEach(link => {
                    link.classList.remove('text-[#D4AF37]', 'font-bold');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-[#D4AF37]', 'font-bold');
                    }
                });
                // Mobile navbar
                mobileNavLinks.forEach(link => {
                    link.classList.remove('bg-white', 'text-[#C62828]');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('bg-white', 'text-[#C62828]');
                    }
                });
            }
        });
    });


    // 2. MOBILE HAMBURGER MENU TOGGLE
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isOpen = !mobileMenu.classList.contains('hidden');
            menuBtn.setAttribute('aria-expanded', isOpen.toString());
            
            // Toggle hamburger icon animation
            const pathElement = menuBtn.querySelector('svg path');
            if (isOpen) {
                pathElement.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
                pathElement.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        });

        // Close mobile menu when clicking any nav link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const pathElement = menuBtn.querySelector('svg path');
                pathElement.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. COUNTDOWN TIMER (Targets: 12 July 2026 05:00:00 AM UTC+7)
    const targetDate = new Date('2026-07-12T05:00:00+07:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const dEl = document.getElementById('timer-days');
        const hEl = document.getElementById('timer-hours');
        const mEl = document.getElementById('timer-minutes');
        const sEl = document.getElementById('timer-seconds');
        if (difference <= 0) {
            if (dEl) dEl.innerText = '00';
            if (hEl) hEl.innerText = '00';
            if (mEl) mEl.innerText = '00';
            if (sEl) sEl.innerText = '00';
            
            const messageEl = document.getElementById('timer-message');
            if (messageEl) {
                messageEl.innerText = 'EVENT SEDANG BERLANGSUNG ATAU SUDAH SELESAI';
                messageEl.classList.remove('hidden');
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (dEl) dEl.innerText = days.toString().padStart(2, '0');
        if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
        if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
        if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
    }

    // Run immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 4. ROUTE SELECTOR TABS (Plain Vanilla JS Tabs)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-tab');

            // Deactivate all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('bg-[#C62828]', 'text-white');
                btn.classList.add('bg-white', 'text-[#1A1A1A]');
            });

            // Activate current button
            button.classList.remove('bg-white', 'text-[#1A1A1A]');
            button.classList.add('bg-[#C62828]', 'text-white');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show active tab content
            const targetContent = document.getElementById(`route-${category}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 5. FAQ ACCORDION INTERACTIVITY
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all active items to ensure clean accordions
            accordionItems.forEach(innerItem => {
                innerItem.classList.remove('active');
                innerItem.setAttribute('aria-expanded', 'false');
                const innerHeader = innerItem.querySelector('.accordion-header');
                if (innerHeader) {
                    innerHeader.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                item.setAttribute('aria-expanded', 'true');
                header.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard accessibility
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });
});
