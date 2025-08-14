const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname)));

app.post('/api/submit-form', (req, res) => {
    const { name, email, phone } = req.body;

    console.log('Получен новый запрос от клиента:');
    console.log('Имя:', name);
    console.log('Email:', email);
    console.log('Телефон:', phone);
    console.log('---');

    res.status(200).json({ message: 'Заявка успешно получена' });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});