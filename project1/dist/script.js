const flowers = [
    { id: 1, name: "Троянди червоні", category: "Троянди", price: 2500, image: "./images/red-roses.jpg", description: "Класичні червоні троянди, 50 см", rating: 4.8 },
    { id: 2, name: "Тюльпани білі", category: "Тюльпани", price: 1500, image: "./images/white-tulips.jpg", description: "Свіжі білі тюльпани, 40 см", rating: 4.5 },
    { id: 3, name: "Соняшники", category: "Соняшники", price: 2000, image: "./images/sunflowers.jpg", description: "Яскраві соняшники, 60 см", rating: 4.7 },
    { id: 4, name: "Лілії рожеві", category: "Лілії", price: 3000, image: "./images/pink-lilies.jpg", description: "Елегантні рожеві лілії", rating: 4.9 },
    { id: 5, name: "Півонії білі", category: "Півонії", price: 2800, image: "./images/white-peonies.jpg", description: "Ніжні білі півонії", rating: 4.6 },
    { id: 6, name: "Хризантеми жовті", category: "Хризантеми", price: 1700, image: "./images/yellow-chrysanthemums.jpg", description: "Яскраві хризантеми", rating: 4.4 },
    { id: 7, name: "Еустоми фіолетові", category: "Еустоми", price: 2200, image: "./images/purple-eustomas.jpg", description: "Фіолетові еустоми, 45 см", rating: 4.8 },
    { id: 8, name: "Ромашки польові", category: "Ромашки", price: 1300, image: "./images/field-daisies.jpg", description: "Прості польові ромашки", rating: 4.3 },
    { id: 9, name: "Гортензії сині", category: "Гортензії", price: 2700, image: "./images/blue-hydrangeas.jpg", description: "Сині гортензії, 50 см", rating: 4.7 },
    { id: 10, name: "Троянди білі", category: "Троянди", price: 2400, image: "./images/white-roses.jpg", description: "Білі троянди, 50 см", rating: 4.6 },
    { id: 11, name: "Тюльпани рожеві", category: "Тюльпани", price: 1600, image: "./images/pink-tulips.jpg", description: "Рожеві тюльпани, 40 см", rating: 4.5 },
    { id: 12, name: "Лілії білі", category: "Лілії", price: 2900, image: "./images/white-lilies.jpg", description: "Білі лілії, 55 см", rating: 4.8 },
    { id: 13, name: "Півонії рожеві", category: "Півонії", price: 2600, image: "./images/pink-peonies.jpg", description: "Рожеві півонії", rating: 4.7 },
    { id: 14, name: "Еустоми білі", category: "Еустоми", price: 2100, image: "./images/white-eustomas.jpg", description: "Білі еустоми, 45 см", rating: 4.6 },
    { id: 15, name: "Гортензії рожеві", category: "Гортензії", price: 2800, image: "./images/pink-hydrangeas.jpg", description: "Рожеві гортензії, 50 см", rating: 4.9 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 'home';

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'block';
    currentPage = page;
    if (page === 'products') renderProducts();
    if (page === 'cart') renderCart();
}

function renderStars(rating) {
    const stars = Math.round(rating);
    let html = '';
    for (let i = 0; i < stars; i++) {
        html += '<svg style="width:16px;height:16px" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.167 1.191-5.917 5.765 1.396 8.134-7.314-3.85-7.314 3.85 1.396-8.134-5.917-5.765 8.167-1.191z"/></svg>';
    }
    return `<div class="stars">${html}<span style="margin-left:4px;color:#333">(${rating})</span></div>`;
}

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    const categories = [...new Set(flowers.map(f => f.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="">Усі категорії</option>' + categories.map(c => `<option value="${c}">${c}</option>`).join('');

    flowers.forEach(flower => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${flower.image}" alt="${flower.name}">
            <h2>${flower.name}</h2>
            <p>Від ${flower.price} грн</p>
            ${renderStars(flower.rating)}
            <button onclick="showDetail(${flower.id})">Деталі</button>
        `;
        productList.appendChild(card);
    });
    filterProducts();
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const priceRange = document.getElementById('priceRangeFilter').value;
    const search = document.getElementById('searchFilter').value.toLowerCase();

    const filtered = flowers.filter(flower => {
        const matchesCategory = !category || flower.category === category;
        const matchesPrice = !priceRange || (
            priceRange === 'low' ? flower.price <= 2000 :
                priceRange === 'mid' ? flower.price > 2000 && flower.price <= 2500 :
                    flower.price > 2500
        );
        const matchesSearch = !search || flower.name.toLowerCase().includes(search);
        return matchesCategory && matchesPrice && matchesSearch;
    });

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    filtered.forEach(flower => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${flower.image}" alt="${flower.name}">
            <h2>${flower.name}</h2>
            <p>Від ${flower.price} грн</p>
            ${renderStars(flower.rating)}
            <button onclick="showDetail(${flower.id})">Деталі</button>
        `;
        productList.appendChild(card);
    });
}

function showDetail(id) {
    const flower = flowers.find(f => f.id === id);
    if (!flower) return;
    const details = getFlowerDetails(id);
    let html = `
        <img src="${flower.image}" alt="${flower.name}">
        <h1>${flower.name}</h1>
        <p>${details.description}</p>
        <p>Для кого: ${details.forWhom}</p>
        <p>Підходить для: ${details.situations}</p>
        <p>Ціна за букет: ${flower.price} грн</p>
        <div class="quantity">
            <label>Кількість букетів:</label>
            <input type="number" id="detailQuantity" min="1" value="1" onchange="updateTotalPrice(${flower.price})">
        </div>
        <p>Загальна сума: <span id="detailTotal">${flower.price}</span> грн</p>
        <button onclick="addToCart(${flower.id}, document.getElementById('detailQuantity').value)">Додати до кошика</button>
    `;
    document.getElementById('detail-content').innerHTML = html;
    showPage('product-detail');
}

function updateTotalPrice(price) {
    const quantity = parseInt(document.getElementById('detailQuantity').value) || 1;
    document.getElementById('detailTotal').textContent = price * quantity;
}

function addToCart(id, quantity) {
    const flower = flowers.find(f => f.id === id);
    if (!flower) return;
    const qty = parseInt(quantity) || 1;
    if (qty < 1) return;
    const item = { ...flower, quantity: qty, totalPrice: flower.price * qty };
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.quantity += qty;
        existing.totalPrice = existing.price * existing.quantity;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showPopup();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Кошик порожній</p>';
        document.getElementById('cart-total').style.display = 'none';
    } else {
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div>
                    <h2>${item.name} x ${item.quantity}</h2>
                    <p>Ціна за 1 букет: ${item.price} грн<br>Ціна за ${item.quantity} букетів: ${item.totalPrice} грн</p>
                </div>
                <div class="cart-actions">
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value, ${item.price})">
                    <button onclick="removeFromCart(${item.id})">Видалити</button>
                </div>
            `;
            cartItems.appendChild(div);
        });
        const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        document.getElementById('cart-total').innerHTML = `Загальна сума замовлення: ${total} грн`;
        document.getElementById('cart-total').style.display = 'block';
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateQuantity(id, quantity, price) {
    const qty = parseInt(quantity) || 1;
    if (qty < 1) return;
    cart = cart.map(item => item.id === id ? { ...item, quantity: qty, totalPrice: price * qty } : item);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function showPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <h2>Товар додано до кошика!</h2>
        <button onclick="closePopup()">Продовжити покупки</button>
        <button onclick="closePopup(); showPage('cart')">Перейти до кошика</button>
    `;
    document.body.appendChild(popup);
}

function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) popup.remove();
}

function getFlowerDetails(id) {
    switch (id) {
        case 1: return { description: "Червоні троянди — класичний символ глибокої любові та пристрасті. Кожна квітка на високому стеблі заввишки 50 см вражає своєю насиченістю кольору та елегантністю. Ці троянди вирощуються з особливою турботою в екологічно чистих умовах.", forWhom: "Цей букет створений для коханої людини, дружини чи подруги, яка мріє про романтику.", situations: "Ідеально для першого побачення, ювілею кохання чи пропозиції руки і серця." };
        case 2: return { description: "Білі тюльпани — втілення ніжності, чистоти та витонченості. Кожна квітка має стебло заввишки 40 см і вирізняється своєю природною свіжістю. Вони додають легкості та гармонії будь-якому простору.", forWhom: "Чудовий подарунок для мами, сестри чи колеги, які цінують спокій і красу.", situations: "Підходить для дня народження, вибачень чи святкування весни, наприклад, 8 Березня." };
        case 3: return { description: "Яскраві соняшники — символ сонця, радості та оптимізму. Кожна квітка на стеблі заввишки 60 см випромінює енергію та тепло. Ці квіти ідеально підходять для створення позитивного настрою.", forWhom: "Соняшники створені для друзів, дітей чи колег, які люблять яскраві емоції.", situations: "Чудово для дружніх посиденьок, привітання з успіхом чи літнього свята." };
        case 4: return { description: "Ніжні рожеві лілії — символ витонченості та ніжності. Їх стебла заввишки 50 см додають простору елегантності та вишуканості з легким ароматом.", forWhom: "Для подруги, сестри чи мами, які люблять ніжні та витончені квіти.", situations: "Підходить для романтичних вечорів, ювілеїв чи подарунка на знак подяки." };
        case 5: return { description: "Білі піони — символ чистоти та достатку. Їх стебла заввишки 45 см і пишні пелюстки створюють розкішний букет із ніжним ароматом.", forWhom: "Ідеально для бабусі, коханої чи подруги, яка цінує витонченість.", situations: "Чудово для весілля, випускного чи як подарунок на особливу дату." };
        case 6: return { description: "Жовті хризантеми — символ радості та довголіття. Їх стебла заввишки 40 см додають яскравості будь-якому інтер’єру.", forWhom: "Для друзів, колег чи родичів, які люблять сонячні кольори.", situations: "Підходить для осінніх свят, привітань чи створення затишку." };
        case 7: return { description: "Фіолетові еустоми — ніжні квіти з м’якими пелюстками, що нагадують маленькі троянди. Стебла заввишки 45 см додають романтики.", forWhom: "Для романтичних натур: коханої, подруги чи сестри.", situations: "Ідеально для побачень, заручин чи подарунка на знак вдячності." };
        case 8: return { description: "Польові ромашки — символ простоти та природної краси. Їх стебла заввишки 35 см додають затишку та легкості.", forWhom: "Для дітей, друзів чи близьких, які цінують природність.", situations: "Чудово для дружніх зустрічей, пікніків чи подарунка з нагоди." };
        case 9: return { description: "Блакитні гортензії — розкішні квіти з великими суцвіттями. Їх стебла заввишки 50 см створюють ефектний букет.", forWhom: "Для тих, хто любить вишуканість: мами, подруги чи колеги.", situations: "Підходить для весілля, ювілеїв чи офіційних подій." };
        case 10: return { description: "Білі троянди — символ чистоти та ніжності. Їх стебла заввишки 50 см ідеально підходять для вишуканих букетів.", forWhom: "Для коханої, мами чи подруги, яка цінує елегантність.", situations: "Ідеально для весілля, хрещин чи подарунка на знак поваги." };
        case 11: return { description: "Рожеві тюльпани — втілення м’якості та радості. Їх стебла заввишки 40 см додають ніжності будь-якому простору.", forWhom: "Для сестри, подруги чи колеги, яка любить ніжні кольори.", situations: "Підходить для дня народження, свят чи як жест турботи." };
        case 12: return { description: "Білі лілії — символ чистоти та вишуканості. Їх стебла заввишки 50 см наповнюють простір ніжним ароматом.", forWhom: "Для мами, бабусі чи подруги, яка цінує класику.", situations: "Чудово для офіційних подій, весілля чи подарунка на свято." };
        case 13: return { description: "Рожеві піони — символ ніжності та достатку. Їх стебла заввишки 45 см створюють розкішний і ароматний букет.", forWhom: "Для коханої, подруги чи мами, яка любить розкіш.", situations: "Ідеально для весілля, ювілею чи подарунка на особливу подію." };
        case 14: return { description: "Білі еустоми — ніжні квіти з м’якими пелюстками. Їх стебла заввишки 45 см додають легкості та романтики.", forWhom: "Для сестри, подруги чи колеги, яка цінує витонченість.", situations: "Підходить для побачень, вибачень чи подарунка на знак вдячності." };
        case 15: return { description: "Рожеві гортензії — символ ніжності та гармонії. Їх стебла заввишки 50 см створюють пишний і ефектний букет.", forWhom: "Для мами, коханої чи подруги, яка любить м’які відтінки.", situations: "Чудово для весілля, ювілеїв чи подарунка на свято." };
        default: return { description: "Ці квіти — унікальний вибір для особливого моменту.", forWhom: "Для тих, хто шукає щось особливе.", situations: "Для будь-якої нагоди, коли хочеться здивувати." };
    }
}

function changeLanguage(lang) {
    alert(`Змінено мову на ${lang}`);
}

window.onload = () => {
    showPage('home');
    updateCartCount();
};