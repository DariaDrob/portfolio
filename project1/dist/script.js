const flowers = [
    { id: 1, name: "Троянди червоні", category: "Троянди", price: 2500, image: "/images/red-roses.jpg", description: "Класичні червоні троянди, 50 см", rating: 4.8 },
    { id: 2, name: "Тюльпани білі", category: "Тюльпани", price: 1500, image: "/images/white-tulips.jpg", description: "Свіжі білі тюльпани, 40 см", rating: 4.5 },
    { id: 3, name: "Соняшники", category: "Соняшники", price: 2000, image: "/images/sunflowers.jpg", description: "Яскраві соняшники, 60 см", rating: 4.7 },
    { id: 4, name: "Лілії рожеві", category: "Лілії", price: 3000, image: "/images/pink-lilies.jpg", description: "Елегантні рожеві лілії", rating: 4.9 },
    { id: 5, name: "Півонії білі", category: "Півонії", price: 2800, image: "/images/white-peonies.jpg", description: "Ніжні білі півонії", rating: 4.6 },
    { id: 6, name: "Хризантеми жовті", category: "Хризантеми", price: 1700, image: "/images/yellow-chrysanthemums.jpg", description: "Яскраві хризантеми", rating: 4.4 },
    { id: 7, name: "Еустоми фіолетові", category: "Еустоми", price: 2200, image: "/images/purple-eustomas.jpg", description: "Фіолетові еустоми, 45 см", rating: 4.8 },
    { id: 8, name: "Ромашки польові", category: "Ромашки", price: 1300, image: "/images/field-daisies.jpg", description: "Прості польові ромашки", rating: 4.3 },
    { id: 9, name: "Гортензії сині", category: "Гортензії", price: 2700, image: "/images/blue-hydrangeas.jpg", description: "Сині гортензії, 50 см", rating: 4.7 },
    { id: 10, name: "Троянди білі", category: "Троянди", price: 2400, image: "/images/white-roses.jpg", description: "Білі троянди, 50 см", rating: 4.6 },
    { id: 11, name: "Тюльпани рожеві", category: "Тюльпани", price: 1600, image: "/images/pink-tulips.jpg", description: "Рожеві тюльпани, 40 см", rating: 4.5 },
    { id: 12, name: "Лілії білі", category: "Лілії", price: 2900, image: "/images/white-lilies.jpg", description: "Білі лілії, 55 см", rating: 4.8 },
    { id: 13, name: "Півонії рожеві", category: "Півонії", price: 2600, image: "/images/pink-peonies.jpg", description: "Рожеві півонії", rating: 4.7 },
    { id: 14, name: "Еустоми білі", category: "Еустоми", price: 2100, image: "/images/white-eustomas.jpg", description: "Білі еустоми, 45 см", rating: 4.6 },
    { id: 15, name: "Гортензії рожеві", category: "Гортензії", price: 2800, image: "/images/pink-hydrangeas.jpg", description: "Рожеві гортензії, 50 см", rating: 4.9 },
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
    for (let i = 0; i < stars; i++) html += '<svg style="width:16px;height:16px" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.167 1.191-5.917 5.765 1.396 8.134-7.314-3.85-7.314 3.85 1.396-8.134-5.917-5.765 8.167-1.191z"/></svg>';
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
    const quantity = document.getElementById('detailQuantity').value;
    document.getElementById('detailTotal').textContent = price * quantity;
}

function addToCart(id, quantity) {
    const flower = flowers.find(f => f.id === id);
    const item = { ...flower, quantity: parseInt(quantity), totalPrice: flower.price * parseInt(quantity) };
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.quantity += parseInt(quantity);
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
            div.style.cssText = 'display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e5e7eb;padding:16px 0';
            div.innerHTML = `
        <div><h2>${item.name} x ${item.quantity}</h2><p>Ціна за 1 букет: ${item.price} грн<br>Ціна за ${item.quantity} букетів: ${item.totalPrice} грн</p></div>
        <div style="display:flex;gap:16px">
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value, ${item.price})" style="padding:8px;border:1px solid #ccc;border-radius:4px;width:80px">
          <button onclick="removeFromCart(${item.id})" style="color:#ef4444;text-decoration:none;border:none;background:none;cursor:pointer">Видалити</button>
        </div>
      `;
            cartItems.appendChild(div);
        });
        const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        document.getElementById('cart-total').textContent = `Загальна сума замовлення: ${total} грн`;
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
    cart = cart.map(item => item.id === id ? { ...item, quantity: parseInt(quantity), totalPrice: price * parseInt(quantity) } : item);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateCartCount() {
    const count = cart.length;
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
    document.getElementById('detail-content').appendChild(popup);
}

function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) popup.remove();
}

function getFlowerDetails(id) {
    switch (id) {
        case 1: return { description: "Червоні троянди — класичний символ глибокої любові та пристрасті...", forWhom: "Цей букет створений для коханої людини...", situations: "Ідеально для першого побачення..." };
        case 2: return { description: "Білі тюльпани — втілення ніжності, чистоти та витонченості...", forWhom: "Чудовий подарунок для мами...", situations: "Підходить для дня народження..." };
        case 3: return { description: "Яскраві соняшники — символ сонця, радості та оптимізму...", forWhom: "Соняшники створені для друзів...", situations: "Чудово для дружніх посиденьок..." };
        case 4: return { description: "Ніжні рожеві лілії — символ витонченості та ніжності...", forWhom: "Для подруги...", situations: "Підходить для романтичних вечорів..." };
        case 5: return { description: "Білі піони — символ чистоти та достатку...", forWhom: "Ідеально для бабусі...", situations: "Чудово для весілля..." };
        case 6: return { description: "Жовті хризантеми — символ радості та довголіття...", forWhom: "Для друзів...", situations: "Підходить для осінніх свят..." };
        case 7: return { description: "Фіолетові еустоми — ніжні квіти з м’якими пелюстками...", forWhom: "Для романтичних натур...", situations: "Ідеально для побачень..." };
        case 8: return { description: "Польові ромашки — символ простоти та природної краси...", forWhom: "Для дітей...", situations: "Чудово для дружніх зустрічей..." };
        case 9: return { description: "Блакитні гортензії — розкішні квіти з великими суцвіттями...", forWhom: "Для тих, хто любить вишуканість...", situations: "Підходить для весілля..." };
        case 10: return { description: "Білі троянди — символ чистоти та ніжності...", forWhom: "Для коханої...", situations: "Ідеально для весілля..." };
        case 11: return { description: "Рожеві тюльпани — втілення м’якості та радості...", forWhom: "Для сестри...", situations: "Підходить для дня народження..." };
        case 12: return { description: "Білі лілії — символ чистоти та вишуканості...", forWhom: "Для мами...", situations: "Чудово для офіційних подій..." };
        case 13: return { description: "Рожеві піони — символ ніжності та достатку...", forWhom: "Для коханої...", situations: "Ідеально для весілля..." };
        case 14: return { description: "Білі еустоми — ніжні квіти з м’якими пелюстками...", forWhom: "Для сестри...", situations: "Підходить для побачень..." };
        case 15: return { description: "Рожеві гортензії — символ ніжності та гармонії...", forWhom: "Для мами...", situations: "Чудово для весілля..." };
        default: return { description: "Ці квіти — унікальний вибір...", forWhom: "Для тих, хто шукає щось особливе...", situations: "Для будь-якої нагоди..." };
    }
}

function changeLanguage(lang) {
    alert(`Змінено мову на ${lang}`);
}

window.onload = () => {
    showPage('home');
    updateCartCount();
};