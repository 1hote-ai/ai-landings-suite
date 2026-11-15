# SYNAPSE Hub — Киберпанк-коворкинг и хакерспейс 24/7

Готовый к продакшену, адаптивный и высокотехнологичный лендинг технологического коворкинга и хакерспейса **SYNAPSE Hub**. 

Дизайн выполнен в эстетике **Neo-brutalist Cyber Tech & Terminal Abyss** с неоновыми кибер-акцентами (Cyber Cyan `#00F0FF`, Hot Magenta `#FF0055`, Dark Matrix Purple `#17142B`), CRT-сканлайнами и шрифтовой парой **Unbounded + Space Mono**.

---

## 📁 Структура проекта

```text
landing-6/
├── index.html       # Семантическая разметка HTML5, микроразметка Open Graph, доступность
├── style.css        # Современные CSS-переменные, нео-брутализм, адаптивная сетка, анимации
├── script.js        # Движок лендинга, конфигурация LANDING_CONFIG, калькулятор, Яндекс Карты
└── README.md        # Руководство по настройке, замене контента и деплою
```

---

## ⚡ Быстрая настройка через `LANDING_CONFIG`

Все ключевые данные проекта (телефон, email, адрес, график работы, координаты на карте, соцсети и цены) собраны в одном объекте в начале файла [`script.js`](file:///Users/egor/Desktop/lendigs/landing-6/script.js#L26-L84):

```javascript
const LANDING_CONFIG = {
  brand: {
    name: 'SYNAPSE Hub',
    tagline: 'Киберпанк-коворкинг и хакерспейс 24/7 в Москве',
    badge: 'ONLINE 24/7'
  },
  contacts: {
    phone: '+7 (495) 109-88-24',           // Отображаемый телефон
    phoneClean: '+74951098824',             // Номер для tel: ссылок
    email: 'access@synapse-hub.tech',      // Корпоративная почта
    address: 'Москва, ул. Нижняя Сыромятническая, д. 10, стр. 2',
    metro: 'Курская / Чкаловская (8 минут пешком)',
    schedule: 'Круглосуточно 24/7/365 (Без выходных)'
  },
  location: {
    coordinates: [55.758836, 37.653421],    // Координаты Яндекс Карт [широта, долгота]
    zoom: 16,
    placemarkTitle: 'SYNAPSE Hub [24/7]',
    placemarkSubtitle: 'Artplay, стр. 2, вход B (3 этаж)'
  },
  social: {
    telegram: 'https://t.me/synapse_hub_msk',
    github: 'https://github.com/synapse-hub',
    discord: 'https://discord.gg/synapse-hub'
  },
  pricing: {
    hotdesk: { basePrice: 18000, availableSlots: 8 },
    dedicated: { basePrice: 28000, availableSlots: 4 },
    office: { basePrice: 95000, availableSlots: 1 },
    daypass: { basePrice: 2000, availableSlots: 12 }
  }
};
```

При загрузке страницы скрипт автоматически подставляет эти данные во все элементы с атрибутом `data-bind` (в шапке, подвале, блоке контактов и ссылках).

---

## 📸 Как заменить фотографии

Все фотографии в [`index.html`](file:///Users/egor/Desktop/lendigs/landing-6/index.html) снабжены поясняющими комментариями:

```html
<!-- КАК ЗАМЕНИТЬ ФОТО: Замените src на images/open-space.jpg -->
<img src="https://images.unsplash.com/photo-..." alt="Описание зоны" class="zone-img" loading="lazy">
```

### Вариант 1. Загрузка собственных фото:
1. Создайте в директории `landing-6` папку `images/`.
2. Поместите туда оптимизированные фотографии (рекомендуемый формат `.webp` или `.jpg`, разрешение 1200×800px):
   - `open-space.jpg` — опенспейс
   - `team-office.jpg` — приватные смарт-офисы
   - `maker-lab.jpg` — паяльная лаборатория / хакерспейс
   - `server-room.jpg` — серверная стойка / колокейшн
   - `zoom-pods.jpg` — звукоизолированные зум-кабины
   - `sleep-pod.jpg` — капсулы сна и биохакинг
3. В `index.html` замените `src="..."` на `images/имя_файла.jpg`.

---

## 🗺️ Яндекс Карты (2.1 API)

Карта инициализируется в секции `Точка входа в матрицу` через официальный скрипт:
```html
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
```

### Как изменить метку и координаты:
1. Откройте [Яндекс Карты](https://yandex.ru/maps) и найдите ваш адрес.
2. Скопируйте координаты и вставьте их в `LANDING_CONFIG.location.coordinates`:
   ```javascript
   coordinates: [55.758836, 37.653421]
   ```
3. Для добавления собственного API-ключа (при высокой посещаемости) добавьте параметр `apikey` в подключение скрипта в `<head>`:
   ```html
   <script src="https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU"></script>
   ```
4. Если у пользователя отключен JavaScript или API недоступен, автоматически отображается резервная карточка со ссылкой на прямой маршрут.

---

## 🧮 Интерактивный калькулятор

Калькулятор автоматически пересчитывает:
- Базовый тариф (`Hot Desk`, `Dedicated Cyber`, `Team Cyber Suite`, `Hacker Day Pass`).
- Скидку за длительность: 1 месяц (0%), 3 месяца (-10%), 6 месяцев (-15%), 12 месяцев (-20%).
- Дополнительные опции: полка 1U в серверной стойке (+4 500 ₽/мес), доступ в Hardware Lab (+3 500 ₽/мес), капсулы сна и душ (+3 000 ₽/мес), статический белый IP (+1 500 ₽/мес).
- При клике на **«Забронировать этот слот»** все выбранные параметры и итоговая цена автоматически передаются в модальное окно заявки.

---

## 📬 Подключение сбора заявок (Telegram / Webhook / CRM)

В блоке `initLeadModal()` в [`script.js`](file:///Users/egor/Desktop/lendigs/landing-6/script.js) настроена валидация формы и маска телефона `+7 (___) ___-__-__`.

Для отправки заявок в ваш Telegram-чат или CRM (AmoCRM, Bitrix24, Leadback) замените секцию отправки на `fetch`:

```javascript
const payload = {
  name: nameInput.value,
  phone: phoneInput.value,
  telegram: document.getElementById('lead-telegram').value,
  plan: currentModalPlan,
  date: document.getElementById('lead-date').value
};

fetch('https://api.ваш-сервер.ru/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => {
  // Показываем экран успешной авторизации
  formView.classList.add('hidden');
  successView.classList.remove('hidden');
});
```

---

## 🚀 Запуск и деплой

### Локальный просмотр:
Можно открыть `index.html` прямо в браузере или запустить легковесный локальный сервер:
```bash
# Python 3
cd /Users/egor/Desktop/lendigs/landing-6
python3 -m http.server 8080
```
После запуска откройте `http://localhost:8080`.

### Продакшен:
Лендинг является 100% статическим сайтом без зависимостей. Подходит для любого хостинга: Nginx, Apache, GitHub Pages, Cloudflare Pages, Vercel или Netlify.
