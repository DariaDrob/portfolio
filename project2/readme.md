Aveji — Exclusive Furniture
Project Overview
This project is a website for Aveji, a company specializing in exclusive and custom furniture. The design is inspired by the Figma mockup: https://www.figma.com/design/Mjw3T665A9Wjj2g2LSUYX6/Aveji?node-id=0-1&p=f&t=RvOuRJ6z4BArvZjA-0 Aveji Figma Design. The website supports bilingual functionality (English and Russian) with a language switcher and includes a backend for processing form submissions.
Pages

Home (index.html): The main page showcasing the company’s services, projects, customer reviews, and a contact form for ordering projects.
Materials (materials.html): A page detailing the high-quality natural materials (glass, wood, concrete, stone, metal, epoxy resin) used in furniture production.
Policy (policy.html): A page outlining the privacy policy, payment, and delivery terms, featuring a slider with images.

Backend
The backend is built with Node.js and Express, running in a Docker container. It handles form submissions from the order form, logging user data (name, email, phone, and language) to the terminal in the selected language.
Technologies

Frontend: HTML, CSS (Tailwind CSS), JavaScript
Backend: Node.js, Express
Containerization: Docker
Features: Bilingual support (English/Russian), form submission handling, responsive design

Setup and Running

Ensure Docker is installed.

Clone the repository or navigate to the project directory.

Build the Docker image:
docker build -t furniture-app .

Run the Docker container:
docker run -p 3000:3000 furniture-app

Open http://localhost:3000 in a browser to view the website.



Aveji — Эксклюзивная мебель
Обзор проекта
Этот проект представляет собой веб-сайт для компании Aveji, специализирующейся на эксклюзивной и нестандартной мебели. Дизайн вдохновлён макетом Figma: https://www.figma.com/design/Mjw3T665A9Wjj2g2LSUYX6/Aveji?node-id=0-1&p=f&t=RvOuRJ6z4BArvZjA-0  Aveji Figma Design. Сайт поддерживает двуязычную функциональность (английский и русский) с переключателем языка и включает бэкенд для обработки отправленных форм.
Страницы

Главная (index.html): Основная страница с информацией о компании, проектах, отзывах клиентов и формой для заказа проектов.
Материалы (materials.html): Страница с описанием высококачественных натуральных материалов (стекло, дерево, бетон, камень, металл, эпоксидная смола), используемых в производстве мебели.
Политика (policy.html): Страница с политикой конфиденциальности, условиями оплаты и доставки, а также слайдером с изображениями.

Бэкенд
Бэкенд реализован на Node.js с использованием Express и запущен в контейнере Docker. Он обрабатывает отправку формы заказа, логируя данные пользователя (имя, email, телефон и язык) в терминал на выбранном языке.
Технологии

Фронтенд: HTML, CSS (Tailwind CSS), JavaScript
Бэкенд: Node.js, Express
Контейнеризация: Docker
Особенности: Поддержка двух языков (английский/русский), обработка отправки форм, адаптивный дизайн

Установка и запуск

Убедитесь, что Docker установлен.

Перейдите в директорию проекта.

Соберите Docker-образ:
docker build -t furniture-app .

Запустите контейнер:
docker run -p 3000:3000 furniture-app

Откройте http://localhost:3000 в браузере для просмотра сайта.

