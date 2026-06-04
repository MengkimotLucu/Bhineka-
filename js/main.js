/**
 * BHINNEKA RUN 2026 - Main Interactive JavaScript
 * Author: Development Team
 * Date: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    const REGISTRATION_ENABLED = false;

    // Pricing Cards Data & Render
    const ticketCategories = [
        {
            key: '3k',
            name: '3K',
            price: 'Rp 75.000',
            benefits: [
                'Kategori Usia Open: minimal 13 tahun',
                'Cut-Off Time (COT): 60 Menit',
                'Finisher Medal (Bronze)',
                'Jersey Peserta Premium'
            ],
            donationConversion: '2 Buku Edukasi, 1 Susu Kotak, dan 2 Buah Segar',
            registrationUrl: 'https://dev.dtiketin.com/events/bhinneka-run',
            openLabel: 'Daftar 3K',
            closedLabel: 'Coming Soon'
        },
        {
            key: '5k',
            name: '5K',
            price: 'Rp 125.000',
            benefits: [
                'Kategori Usia Open: minimal 13 tahun',
                'Kategori Usia Master: di atas 40 tahun',
                'Cut-Off Time (COT): 90 Menit',
                'Finisher Medal (Silver)',
                'Jersey Peserta Premium',
                'RFID Timing Chip Terintegrasi'
            ],
            donationConversion: '3 Buku Edukasi, 2 Susu Kotak, dan 4 Buah Segar',
            registrationUrl: 'https://dev.dtiketin.com/events/bhinneka-run',
            openLabel: 'Daftar 5K',
            closedLabel: 'Coming Soon'
        },
        {
            key: '10k',
            name: '10K',
            price: 'Rp 150.000',
            benefits: [
                'Kategori Usia Open: minimal 13 tahun',
                'Kategori Usia Master: di atas 40 tahun',
                'Cut-Off Time (COT): 120 Menit',
                'Finisher Medal (Gold)',
                'Jersey Peserta Premium',
                'RFID Timing Chip Terintegrasi'
            ],
            donationConversion: '4 Buku Edukasi, 2 Susu Kotak, dan 4 Buah Segar',
            registrationUrl: 'https://dev.dtiketin.com/events/bhinneka-run',
            openLabel: 'Daftar 10K',
            closedLabel: 'Coming Soon'
        }
    ];

    const pricingContainer = document.getElementById('pricing-cards-container');
    if (pricingContainer) {
        pricingContainer.innerHTML = ticketCategories.map((cat, index) => {
            const stateClass = index === 0 ? 'pricing-card pricing-card--active' : 'pricing-card';
            const cardClass = index === 1 ? `${stateClass} pricing-card--featured` : stateClass;

            return `
                <article class="${cardClass}" data-kategori-card="${cat.key}">
                    <div class="space-y-3">
                        <h3 class="font-heading text-4xl font-extrabold">${cat.name}</h3>
                        <div class="pricing-card__price">
                            <span class="pricing-card__price-label">Kontribusi Sosial</span>
                            <strong class="pricing-card__price-value">${cat.price}</strong>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }

    const kategoriCopyLabel = document.getElementById('kategori-copy-label');
    const kategoriCopyDesc = document.getElementById('kategori-copy-desc');
    const kategoriCopyCta = document.getElementById('kategori-copy-cta');
    const kategoriCards = document.querySelectorAll('[data-kategori-card]');

    function syncRegistrationButtonState(button) {
        if (!button) return;

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
            if (button.dataset.registrationHref) {
                button.setAttribute('href', button.dataset.registrationHref);
            }
            button.textContent = closedLabel;
            button.classList.add('registration-cta-disabled');
            button.setAttribute('aria-disabled', 'true');
            button.setAttribute('tabindex', '-1');
        }
    }

    function renderKategoriCopy(category) {
        if (!category || !kategoriCopyDesc) return;

        const benefitItems = category.benefits.map((benefit) => `
            <li>✓ ${benefit}</li>
        `).join('');

        kategoriCopyDesc.innerHTML = `
            <ul class="kategori-copy__benefits">
                ${benefitItems}
            </ul>
            <div class="mt-5 p-4 rounded-2xl bg-[#FFF0F0] border border-[#FCD9D9]">
                <p class="text-xs font-extrabold uppercase tracking-[0.12em] text-brandRed flex items-center gap-1.5">
                    Dampak Kontribusi Sosial
                </p>
                <p class="mt-1.5 text-sm font-semibold text-gray-700 leading-relaxed">
                    Setara dengan penyaluran: <strong class="text-brandDark">${category.donationConversion}</strong> untuk program sosial anak-anak.
                </p>
            </div>
        `;

        if (kategoriCopyCta) {
            kategoriCopyCta.setAttribute('href', category.registrationUrl);
            kategoriCopyCta.dataset.openLabel = category.openLabel;
            kategoriCopyCta.dataset.closedLabel = category.closedLabel;
            kategoriCopyCta.dataset.registrationHref = category.registrationUrl;
            syncRegistrationButtonState(kategoriCopyCta);
        }
    }

    renderKategoriCopy(ticketCategories[0]);

    kategoriCards.forEach((card) => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-kategori-card');
            const category = ticketCategories.find((item) => item.key === key);
            if (!category) return;

            kategoriCards.forEach((item) => {
                item.classList.remove('pricing-card--active');
            });

            card.classList.add('pricing-card--active');

            if (kategoriCopyLabel) {
                kategoriCopyLabel.textContent = `Kategori ${category.name}`;
            }

            renderKategoriCopy(category);
        });
    });

    // 1. STICKY NAVBAR & ACTIVE LINK INDICATOR ON SCROLL
    const navbar = document.getElementById('navbar-container');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const registrationButtons = document.querySelectorAll('[data-registration-cta]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    registrationButtons.forEach(button => {
        syncRegistrationButtonState(button);
        button.addEventListener('click', (event) => {
            if (!REGISTRATION_ENABLED) {
                event.preventDefault();
            }
        });
    });

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
    const countdownState = new Map();

    function setCountdownValue(element, value, animate = true) {
        if (!element) return;

        const nextValue = value.toString();
        const currentValue = countdownState.get(element.id);

        if (currentValue === nextValue) return;

        if (!window.gsap || prefersReducedMotion || !animate || currentValue == null) {
            element.textContent = nextValue;
            countdownState.set(element.id, nextValue);
            return;
        }

        const wrapper = element.parentElement;
        if (!wrapper) {
            element.textContent = nextValue;
            countdownState.set(element.id, nextValue);
            return;
        }

        const outgoing = element.cloneNode(true);
        outgoing.removeAttribute('id');
        outgoing.textContent = currentValue;
        wrapper.appendChild(outgoing);

        element.textContent = nextValue;

        gsap.set(element, { yPercent: 100, opacity: 0 });
        gsap.set(outgoing, { yPercent: 0, opacity: 1 });

        const tl = gsap.timeline({
            onComplete: () => {
                outgoing.remove();
            },
        });

        tl.to(outgoing, {
            yPercent: -100,
            opacity: 0,
            duration: 0.45,
            ease: 'power2.out',
        }, 0);

        tl.to(element, {
            yPercent: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
        }, 0);

        countdownState.set(element.id, nextValue);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const dEl = document.getElementById('timer-days');
        const hEl = document.getElementById('timer-hours');
        const mEl = document.getElementById('timer-minutes');
        const sEl = document.getElementById('timer-seconds');
        if (difference <= 0) {
            setCountdownValue(dEl, '00');
            setCountdownValue(hEl, '00');
            setCountdownValue(mEl, '00');
            setCountdownValue(sEl, '00');

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

        setCountdownValue(dEl, days.toString().padStart(2, '0'));
        setCountdownValue(hEl, hours.toString().padStart(2, '0'));
        setCountdownValue(mEl, minutes.toString().padStart(2, '0'));
        setCountdownValue(sEl, seconds.toString().padStart(2, '0'));
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

    // 4b. ROUTE PREVIEW TABS (Hero CTA Route Section)
    const routePreviewButtons = document.querySelectorAll('[data-route-preview-btn]');
    const routePreviewPanels = document.querySelectorAll('[data-route-preview-panel]');

    routePreviewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-route-preview-btn');

            routePreviewButtons.forEach(btn => {
                btn.classList.remove('route-preview-btn--active');
                btn.classList.remove('bg-white', 'text-brandRed', 'shadow-md');
                btn.classList.add('border', 'border-white/40', 'text-white');
            });

            button.classList.add('route-preview-btn--active');
            button.classList.remove('border', 'border-white/40', 'text-white');
            button.classList.add('bg-white', 'text-brandRed', 'shadow-md');

            routePreviewPanels.forEach(panel => {
                panel.classList.add('hidden');
            });

            const targetPanel = document.querySelector(`[data-route-preview-panel="${category}"]`);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });

    // 4c. ABOUT DESKTOP CARD SWITCHER
    const tentangCards = document.querySelectorAll('[data-tentang-target]');
    const tentangPanels = document.querySelectorAll('[data-tentang-panel]');

    tentangCards.forEach((card) => {
        card.addEventListener('click', () => {
            const target = card.getAttribute('data-tentang-target');

            tentangCards.forEach((item) => {
                item.classList.remove('tentang-card--active');
            });

            tentangPanels.forEach((panel) => {
                panel.classList.add('hidden');
                panel.removeAttribute('data-tentang-active');
            });

            card.classList.add('tentang-card--active');

            const activePanel = document.querySelector(`[data-tentang-panel="${target}"]`);
            if (activePanel) {
                activePanel.classList.remove('hidden');
                activePanel.setAttribute('data-tentang-active', 'true');
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

    // 6. FLOATING SCROLL TO TOP
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const cloudBurstLayer = document.getElementById('cloud-burst-layer');
    let cloudTapCount = 0;
    let cloudTapTimer = null;

    function createRainCloud() {
        if (!cloudBurstLayer) return;

        const sizePresets = [
            { size: 22, mobile: 15 },
            { size: 18, mobile: 12.5 },
            { size: 14.5, mobile: 10 },
            { size: 11, mobile: 7.4 },
            { size: 8, mobile: 5.4 },
            { size: 5.8, mobile: 4 },
        ];

        const preset = sizePresets[Math.floor(Math.random() * sizePresets.length)];
        const left = 4 + Math.random() * 92;
        const topOffset = -(Math.random() * 18 + 4);
        const travel = 54 + Math.random() * 20;
        const duration = 1650 + Math.random() * 550;
        const drift = (Math.random() * 18 - 9).toFixed(2);

        const cloud = document.createElement('div');
        cloud.className = 'cloud-burst';
        cloud.style.setProperty('--cloud-left', `${left}%`);
        cloud.style.setProperty('--cloud-size', `${preset.size}rem`);
        cloud.style.setProperty('--cloud-size-mobile', `${preset.mobile}rem`);
        cloud.style.setProperty('--cloud-travel', `${travel}vh`);
        cloud.style.setProperty('--cloud-duration', `${duration}ms`);
        cloud.style.setProperty('--cloud-start-top', `${topOffset}rem`);
        cloud.style.setProperty('--cloud-drift', `${drift}vw`);

        const image = document.createElement('img');
        image.src = 'assets/awankinton.svg';
        image.alt = '';
        image.setAttribute('aria-hidden', 'true');

        cloud.appendChild(image);
        cloudBurstLayer.appendChild(cloud);

        window.setTimeout(() => {
            cloud.remove();
        }, Math.ceil(duration + 220));
    }

    function launchCloudBurst() {
        if (!cloudBurstLayer) return;

        const rainDuration = 3000;
        const rainInterval = 180;
        const startedAt = Date.now();

        const spawnBatch = () => {
            const batchSize = 1 + Math.floor(Math.random() * 2);
            Array.from({ length: batchSize }).forEach(() => createRainCloud());

            if (Date.now() - startedAt < rainDuration) {
                window.setTimeout(spawnBatch, rainInterval);
            }
        };

        spawnBatch();
    }

    function createPassingCloud() {
        if (!cloudBurstLayer) return;

        const sizePresets = [
            { size: 22, mobile: 15 },
            { size: 18, mobile: 12.5 },
            { size: 14.5, mobile: 10 },
            { size: 11, mobile: 7.4 },
            { size: 8, mobile: 5.4 },
            { size: 5.8, mobile: 4 },
        ];

        const preset = sizePresets[Math.floor(Math.random() * sizePresets.length)];
        const fromLeft = Math.random() > 0.5;
        const top = 8 + Math.random() * 70;
        const duration = 4000;
        const driftY = (Math.random() * 8 - 4).toFixed(2);
        const opacity = (0.22 + Math.random() * 0.42).toFixed(2);

        const cloud = document.createElement('div');
        cloud.className = `cloud-burst cloud-burst--cross ${fromLeft ? 'cloud-burst--ltr' : 'cloud-burst--rtl'}`;
        cloud.style.setProperty('--cloud-size', `${preset.size}rem`);
        cloud.style.setProperty('--cloud-size-mobile', `${preset.mobile}rem`);
        cloud.style.setProperty('--cloud-cross-top', `${top}%`);
        cloud.style.setProperty('--cloud-duration', `${duration}ms`);
        cloud.style.setProperty('--cloud-cross-drift-y', `${driftY}vh`);
        cloud.style.setProperty('--cloud-cross-visual-opacity', opacity);

        const image = document.createElement('img');
        image.src = 'assets/awankinton.svg';
        image.alt = '';
        image.setAttribute('aria-hidden', 'true');

        cloud.appendChild(image);
        cloudBurstLayer.appendChild(cloud);

        window.setTimeout(() => {
            cloud.remove();
        }, Math.ceil(duration + 180));
    }

    function launchCloudCrossBurst() {
        if (!cloudBurstLayer) return;

        const crossDuration = 4000;
        const crossInterval = 240;
        const startedAt = Date.now();

        const spawnWave = () => {
            const batchSize = 1 + Math.floor(Math.random() * 2);
            Array.from({ length: batchSize }).forEach(() => createPassingCloud());

            if (Date.now() - startedAt < crossDuration) {
                const nextInterval = crossInterval + Math.random() * 180;
                window.setTimeout(spawnWave, nextInterval);
            }
        };

        spawnWave();
    }

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            cloudTapCount += 1;

            if (cloudTapTimer) {
                window.clearTimeout(cloudTapTimer);
            }

            cloudTapTimer = window.setTimeout(() => {
                if (cloudTapCount >= 3) {
                    launchCloudCrossBurst();
                } else if (cloudTapCount === 2) {
                    launchCloudBurst();
                } else {
                    window.scrollTo({
                        top: 0,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    });
                }

                cloudTapCount = 0;
                cloudTapTimer = null;
            }, 280);
        });
    }
});
