export function initSlider() {

    const slider = document.querySelector('.reviews-grid');

    if (!slider) return;

    const cards = document.querySelectorAll('.review-card');

    let current = 0;
    let autoSlide;

    /* ================= CREATE CONTROLS ================= */

    const controls = document.createElement('div');
    controls.className = 'slider-controls';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-btn prev-btn';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-btn next-btn';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    controls.append(prevBtn, nextBtn);

    slider.parentElement.appendChild(controls);

    /* ================= CREATE DOTS ================= */

    const dotsWrapper = document.createElement('div');
    dotsWrapper.className = 'slider-dots';

    cards.forEach((_, index) => {

        const dot = document.createElement('span');

        dot.className = 'slider-dot';

        if (index === 0) {
            dot.classList.add('active');
        }

        dot.addEventListener('click', () => {
            goToSlide(index);
        });

        dotsWrapper.appendChild(dot);

    });

    slider.parentElement.appendChild(dotsWrapper);

    const dots = document.querySelectorAll('.slider-dot');

    /* ================= INITIAL STYLE ================= */

    slider.style.display = 'flex';
    slider.style.gap = '30px';
    slider.style.transition = 'transform 0.8s cubic-bezier(.77,0,.18,1)';
    slider.style.willChange = 'transform';

    cards.forEach(card => {

        card.style.minWidth = '100%';
        card.style.flex = '0 0 100%';

        card.style.opacity = '0.4';
        card.style.transform = 'scale(0.88)';
        card.style.transition = 'all 0.8s ease';

    });

    /* ================= UPDATE SLIDER ================= */

    function updateSlider() {

        slider.style.transform = `translateX(-${current * 100}%)`;

        cards.forEach((card, index) => {

            card.classList.remove('active-slide');

            if (index === current) {

                card.classList.add('active-slide');

                card.style.opacity = '1';
                card.style.transform = 'scale(1)';

            } else {

                card.style.opacity = '0.35';
                card.style.transform = 'scale(0.88)';

            }

        });

        dots.forEach(dot => dot.classList.remove('active'));

        dots[current].classList.add('active');

    }

    /* ================= NEXT ================= */

    function nextSlide() {

        current++;

        if (current >= cards.length) {
            current = 0;
        }

        updateSlider();

    }

    /* ================= PREV ================= */

    function prevSlide() {

        current--;

        if (current < 0) {
            current = cards.length - 1;
        }

        updateSlider();

    }

    /* ================= GO TO ================= */

    function goToSlide(index) {

        current = index;

        updateSlider();

    }

    /* ================= AUTO SLIDE ================= */

    function startAutoSlide() {

        autoSlide = setInterval(() => {
            nextSlide();
        }, 4500);

    }

    function stopAutoSlide() {

        clearInterval(autoSlide);

    }

    startAutoSlide();

    /* ================= EVENTS ================= */

    nextBtn.addEventListener('click', () => {

        nextSlide();

        stopAutoSlide();
        startAutoSlide();

    });

    prevBtn.addEventListener('click', () => {

        prevSlide();

        stopAutoSlide();
        startAutoSlide();

    });

    slider.addEventListener('mouseenter', stopAutoSlide);

    slider.addEventListener('mouseleave', startAutoSlide);

    /* ================= TOUCH SWIPE ================= */

    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {

        startX = e.touches[0].clientX;

    });

    slider.addEventListener('touchmove', (e) => {

        endX = e.touches[0].clientX;

    });

    slider.addEventListener('touchend', () => {

        if (startX - endX > 60) {

            nextSlide();

        }

        if (endX - startX > 60) {

            prevSlide();

        }

    });

    /* ================= PARALLAX EFFECT ================= */

    cards.forEach(card => {

        card.addEventListener('mousemove', (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.03)
            `;

        });

        card.addEventListener('mouseleave', () => {

            if (card.classList.contains('active-slide')) {

                card.style.transform = 'scale(1)';

            } else {

                card.style.transform = 'scale(0.88)';

            }

        });

    });

    /* ================= START ================= */

    updateSlider();

}