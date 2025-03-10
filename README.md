# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

### События

1. **События связанные с товарами**:
   - `productCards:receive`: Получение карточек товара с сервера.
   - `card:select`: Выбор товара для подробного просмотра.
   - `card:addBasket`: Добавление товара в корзину.

2. **События связанные с корзиной**:
   - `basket:open`: Открытие модального окна корзины.
   - `basket:basketItemRemove`: Удаление товара из корзины.
   
3. **События связанные с заказом**:
   - `order:open`: Открытие формы для оформления заказа.
   - `order:paymentSelection`: Выбор способа оплаты.
   - `order:changeAddress`: Изменение данных о доставке.
   
4. **События связанные с контактными данными**:
   - `contacts:open`: Открытие формы для ввода контактных данных.
   - `contacts:changeInput`: Изменение данных в форме.

5. **События связанные с успехом заказа**:
   - `success:open`: Открытие модального окна с информацией об успешном заказе.
   - `success:close`: Закрытие модального окна с успехом.


### Описание типов данных 

1. **IProductItem**
Определяет структуру данных для товара в каталоге:

    - `id`: `string` - Уникальный идентификатор товара.
    - `description`: `string` - Описание товара.
    - `image`: `string` - Ссылка на изображение товара.
    - `title`: `string` - Название товара.
    - `category`: `string` - Категория товара.
    - `price`: `number | null` - Цена товара.

2. **IOrderForm**
Определяет структуру данных формы заказа:

    - `payment`: `string` - Способ оплаты.
    - `address`: `string` - Адрес доставки.
    - `phone`: `string` - Телефон покупателя.
    - `email`: `string` - Email покупателя.
    - `total`: `string | number` - Общая сумма заказа.

3. **IOrderLot**
Описание данных для отправки заказа на сервер:

    - `payment`: `string` - Способ оплаты.
    - `email`: `string` - Email покупателя.
    - `phone`: `string` - Телефон покупателя.
    - `address`: `string` - Адрес доставки.
    - `total`: `number` - Общая сумма заказа.
    - `items`: `string` - Товары.

4 **FormErrors**
 - Определяет тип ошибок формы для каждого поля заказа (например, адрес, email, телефон).

5. **IOrderResult**
    - `id`: `number` - Уникальный индефикатор.
    - `total`: `number` - Общая сумма заказа.
