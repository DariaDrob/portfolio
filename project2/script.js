document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.navigation a[href*="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    window.switchLanguage = function(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-lang-ru][data-lang-en]').forEach(el => {
            el.innerHTML = el.getAttribute(`data-lang-${lang}`);
        });
        document.querySelectorAll('input[placeholder]').forEach(input => {
            input.placeholder = input.getAttribute(`data-lang-${lang}`);
        });
        document.querySelector('title').innerHTML = document.querySelector('title').getAttribute(`data-lang-${lang}`);
        document.querySelector('meta[name="description"]').setAttribute('content', document.querySelector('meta[name="description"]').getAttribute(`data-lang-${lang}`));
        document.querySelectorAll('.language-switcher button').forEach(btn => {
            btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
        });
    };

    const orderButton = document.querySelector('a[href="#order"]');
    if (orderButton) {
        orderButton.addEventListener('click', (e) => {
            e.preventDefault();
            const formSection = document.querySelector('#order');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    };


    const socialLinks = document.querySelectorAll('.vk-link, .telegram-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Страница в социальных сетях находится в разработке. Следите за обновлениями!');
            }
        });
    });


    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;

    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        let slideInterval = setInterval(nextSlide, 10000);

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 10000);
            });

            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 10000);
            });
        }
    }


    const form = document.getElementById('order-form');
    const submitBtn = document.getElementById('submit-btn');

    if (form && submitBtn) {
        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();

            if (!name || !email || !phone) {
                alert('Пожалуйста, заполните все поля формы.');
                return;
            }

            const formData = { name, email, phone };

            try {
                const response = await fetch('http://localhost:3000/api/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                    form.reset();
                } else {
                    const errorData = await response.json();
                    alert(`Ошибка при отправке заявки: ${errorData.message || 'Попробуйте снова позже.'}`);
                }
            } catch (error) {
                alert('Ошибка сети. Пожалуйста, проверьте подключение и попробуйте снова.');
                console.error('Error:', error);
            }
        });
    }
});