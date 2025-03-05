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

## Описание программного интерфейса компонентов 
EventEmitter

-Отвечает за управление событиями в приложении. Позволяет подписываться на события и их обработку. Например, при добавлении товара в корзину, срабатывает событие card:addBasket, на которое подписан компонент корзины.

ApiModel

Методы:
-getListProductCard(): Загружает список карточек товаров с сервера.
-postOrderLot(): Отправляет заказ на сервер.

DataModel

    Свойства:
        productCards: Массив объектов IProductItem, представляющих товары.
    Методы:
        setPreview(item: IProductItem): Устанавливает выбранный товар для отображения в подробном просмотре.

BasketModel

    Свойства:
        basketProducts: Массив товаров, добавленных в корзину.
    Методы:
        setSelectedСard(item: IProductItem): Добавляет товар в корзину.
        getCounter(): Возвращает количество товаров в корзине.
        getSumAllProducts(): Возвращает общую сумму товаров в корзине.
        deleteCardToBasket(item: IProductItem): Удаляет товар из корзины.
        clearBasketProducts(): Очищает корзину.

FormModel

    Свойства:
        payment: Способ оплаты.
        address: Адрес доставки.
        phone: Телефон покупателя.
        email: Электронная почта покупателя.
        total: Сумма заказа.
        items: Список ID товаров.
    Методы:
        setOrderAddress(field: string, value: string): Устанавливает адрес доставки.
        setOrderData(field: string, value: string): Обновляет контактные данные.

Modal

    Отвечает за отображение модальных окон с различным содержимым.
    Свойства:
        locked: Блокирует или разблокирует прокрутку страницы при открытии/закрытии модального окна.
        content: Содержимое модального окна.