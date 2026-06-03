document.addEventListener('DOMContentLoaded', () => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const animatedElements = new WeakSet();

    function uniqueElements(elements) {
        return Array.from(new Set(elements.filter(Boolean)));
    }

    function getFreshElements(elements) {
        return uniqueElements(elements).filter((element) => !animatedElements.has(element));
    }

    function markAnimated(elements) {
        elements.forEach((element) => animatedElements.add(element));
    }

    function reveal(targets, options = {}) {
        const elements = getFreshElements(Array.isArray(targets) ? targets : Array.from(targets || []));
        if (!elements.length) return;

        markAnimated(elements);

        gsap.from(elements, {
            opacity: 0,
            y: options.y ?? 72,
            scale: options.scale ?? 0.96,
            duration: options.duration ?? 1,
            ease: options.ease ?? 'back.out(1.28)',
            stagger: options.stagger ?? 0.12,
            clearProps: 'transform,opacity',
            scrollTrigger: {
                trigger: options.trigger ?? elements[0],
                start: options.start ?? 'top 84%',
                once: true,
            },
        });
    }

    function revealSectionShell(section) {
        const wrapper = section.querySelector(':scope > .max-w-7xl, :scope > .max-w-6xl, :scope > .max-w-5xl');
        if (!wrapper) return;

        const shellChildren = Array.from(wrapper.children).filter((child) => child.tagName !== 'SCRIPT');
        reveal(shellChildren, {
            trigger: section,
            y: 64,
            scale: 0.98,
            stagger: 0.16,
        });
    }

    function revealRows(section) {
        const rowSelectors = [
            '.grid',
            '.podium-stack',
            '#pricing-cards-container',
            '#faq',
            '#timer-container',
        ];

        rowSelectors.forEach((selector) => {
            section.querySelectorAll(selector).forEach((row) => {
                const items = Array.from(row.children).filter((child) => child.offsetParent !== null);
                reveal(items, {
                    trigger: row,
                    y: 78,
                    scale: 0.94,
                    stagger: 0.1,
                });
            });
        });
    }

    function revealStandaloneComponents() {
        const groups = [
            {
                trigger: document.querySelector('.countdown-bridge'),
                elements: document.querySelectorAll('.countdown-bridge__card'),
            },
            {
                trigger: document.getElementById('kategori'),
                elements: document.querySelectorAll('.podium-awards'),
            },
            {
                trigger: document.getElementById('route'),
                elements: document.querySelectorAll('.tab-btn'),
            },
            {
                trigger: document.querySelector('footer'),
                elements: document.querySelectorAll('footer .max-w-7xl > *'),
            },
        ];

        groups.forEach((group) => {
            if (!group.trigger) return;
            reveal(group.elements, {
                trigger: group.trigger,
                y: 54,
                scale: 0.97,
                stagger: 0.08,
            });
        });
    }

    function animateActiveRouteContent() {
        const activeTabContent = document.querySelector('.tab-content.active');
        if (!activeTabContent) return;

        const visibleChildren = Array.from(activeTabContent.children).filter((child) => child.offsetParent !== null);
        if (!visibleChildren.length) return;

        gsap.fromTo(visibleChildren, {
            opacity: 0,
            y: 42,
            scale: 0.97,
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.18)',
            stagger: 0.08,
            overwrite: 'auto',
            clearProps: 'transform,opacity',
        });
    }

    function bindRouteSwitchAnimation() {
        const routeButtons = document.querySelectorAll('.tab-btn');
        if (!routeButtons.length) return;

        routeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                requestAnimationFrame(animateActiveRouteContent);
            });
        });
    }

    function bindFaqBounce() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        if (!accordionItems.length) return;

        accordionItems.forEach((item) => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            if (!header || !content) return;

            header.addEventListener('click', () => {
                if (!item.classList.contains('active')) return;

                gsap.fromTo(content, {
                    opacity: 0,
                    y: -12,
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    ease: 'back.out(1.4)',
                    clearProps: 'transform,opacity',
                });
            });
        });
    }

    function initParallaxAccents() {
        const parallaxTargets = uniqueElements([
            ...document.querySelectorAll('#kategori .podium-awards'),
            ...document.querySelectorAll('#venue iframe'),
            ...document.querySelectorAll('#charity .lg\\:col-span-5 > div'),
        ]);

        parallaxTargets.forEach((element) => {
            gsap.fromTo(element, {
                y: 0,
            }, {
                y: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8,
                },
            });
        });
    }

    const animatedSections = document.querySelectorAll('section:not(#home), footer');
    animatedSections.forEach((section) => {
        revealSectionShell(section);
        revealRows(section);
    });

    const countdownBridge = document.querySelector('.countdown-bridge');
    if (countdownBridge) {
        reveal([countdownBridge], {
            trigger: countdownBridge,
            y: 56,
            scale: 0.98,
            stagger: 0,
        });
        revealRows(countdownBridge);
    }

    revealStandaloneComponents();
    animateActiveRouteContent();
    bindRouteSwitchAnimation();
    bindFaqBounce();
    initParallaxAccents();

    ScrollTrigger.refresh();
});
