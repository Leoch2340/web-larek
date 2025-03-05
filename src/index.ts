import './scss/styles.scss';

//import...

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement; //следует рассматривать как HTMLTemplateElement, чтобы ошибки не было 
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

// Создаем экземпляр ApiModel с параметрами CDN_URL и API_URL
const apiModel = new ApiModel(CDN_URL, API_URL);
// Создаем новый экземпляр EventEmitter для управления событиями
const events = new EventEmitter();
// Создаем экземпляр DataModel, передавая ему объект событий
const dataModel = new DataModel(events);
// Создаем экземпляр Modal, передавая контейнер модального окна и объект событий
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
// Создаем экземпляр Basket, передавая шаблон корзины и объект событий
const basket = new Basket(basketTemplate, events);
// Создаем экземпляр BasketModel без параметров
const basketModel = new BasketModel();
// Создаем экземпляр FormModel, передавая объект событий
const formModel = new FormModel(events);
// Создаем экземпляр Order, передавая шаблон заказа и объект событий
const order = new Order(orderTemplate, events);
// Создаем экземпляр Contacts, передавая шаблон контактов и объект событий
const contacts = new Contacts(contactsTemplate, events);

//Отображения карточек товара на странице

// Подписываемся на событие 'productCards:receive'
events.on('productCards:receive', () => {
    // Перебираем все карточки товаров в dataModel
    dataModel.productCards.forEach(item => {
      // Создаем экземпляр Card, передавая шаблон, объект событий и обработчик клика
      const card = new Card(cardCatalogTemplate, events, { onClick: () => events.emit('card:select', item) });
      // Добавляем отрендеренную карточку в галерею
      ensureElement<HTMLElement>('.gallery').append(card.render(item));
    });
  });
  
//Получить объект данных карточки по которой кликнули 
events.on('card:select', (item: IProductItem) => { dataModel.setPreview(item) });

//Открываем модальное окно карточки товара

// Подписываемся на событие 'modalCard:open' и передаем выбранный товар
events.on('modalCard:open', (item: IProductItem) => {
    // Создаем экземпляр CardPreview, передавая шаблон и объект событий
    const cardPreview = new CardPreview(cardPreviewTemplate, events);
    // Устанавливаем содержимое модального окна
    modal.content = cardPreview.render(item);
    // Отображаем модальное окно
    modal.render();
  });
  

//Добавление карточки товара в корзину 

// Подписываемся на событие 'card:addBasket'
events.on('card:addBasket', () => {
    // Добавляем выбранную карточку товара в корзину
    basketModel.setSelectedСard(dataModel.selectedСard);
    // Отображаем количество товара на иконке корзины
    basket.renderHeaderBasketCounter(basketModel.getCounter());
    // Закрываем модальное окно
    modal.close();
  });
  

//Открытие модального окна корзины 

// Подписываемся на событие 'basket:open'
events.on('basket:open', () => {
    // Отображаем сумму всех продуктов в корзине
    basket.renderSumAllProducts(basketModel.getSumAllProducts());
    let i = 0;
    // Создаем элементы корзины на основе товаров в basketModel
    basket.items = basketModel.basketProducts.map((item) => {
      // Создаем экземпляр BasketItem, передавая шаблон, объект событий и обработчик удаления
      const basketItem = new BasketItem(cardBasketTemplate, events, { onClick: () => events.emit('basket:basketItemRemove', item) });
      i = i + 1;
      return basketItem.render(item, i);
    });
    // Устанавливаем содержимое модального окна
    modal.content = basket.render();
    // Отображаем модальное окно
    modal.render();
  });
  
//Удаление карточки товара из корзины 

// Подписываемся на событие 'basket:basketItemRemove' и передаем удаляемый товар
events.on('basket:basketItemRemove', (item: IProductItem) => {
    // Удаляем товар из корзины
    basketModel.deleteCardToBasket(item);
    // Отображаем обновленное количество товаров на иконке корзины
    basket.renderHeaderBasketCounter(basketModel.getCounter());
    // Отображаем обновленную сумму всех товаров в корзине
    basket.renderSumAllProducts(basketModel.getSumAllProducts());
    let i = 0;
    // Перерисовываем элементы корзины
    basket.items = basketModel.basketProducts.map((item) => {
      // Создаем экземпляр BasketItem с обработчиком удаления
      const basketItem = new BasketItem(cardBasketTemplate, events, { onClick: () => events.emit('basket:basketItemRemove', item) });
      i = i + 1;
      return basketItem.render(item, i);
    });
  });
  

//Открытие модального окна "способа оплаты" и "адреса доставки" 

// Подписываемся на событие 'order:open'
events.on('order:open', () => {
    // Устанавливаем содержимое модального окна с формой заказа
    modal.content = order.render();
    // Отображаем модальное окно
    modal.render();
    // Передаем список ID товаров, которые покупаются
    formModel.items = basketModel.basketProducts.map(item => item.id);
  });

//Передаём способ оплаты  

// Подписываемся на событие 'order:paymentSelection' и передаем выбранную кнопку
events.on('order:paymentSelection', (button: HTMLButtonElement) => { 
    // Устанавливаем выбранный способ оплаты в formModel
    formModel.payment = button.name; 
  });

//Отслеживаем изменение в поле в вода "адреса доставки" 

// Подписываемся на событие 'order:changeAddress' и передаем измененные данные
events.on('order:changeAddress', (data: { field: string, value: string }) => {
  // Устанавливаем обновленный адрес в formModel
  formModel.setOrderAddress(data.field, data.value);
});

//Валидация данных строки "address" и payment 

// Подписываемся на событие 'formErrors:address' и передаем объект с ошибками
events.on('formErrors:address', (errors: Partial<IOrderForm>) => {
    // Деструктурируем ошибки адреса и оплаты
    const { address, payment } = errors;
    // Устанавливаем флаг валидности формы (если ошибок нет — true)
    order.valid = !address && !payment;
    // Отображаем текст ошибок, объединяя их через '; '
    order.formErrors.textContent = Object.values({ address, payment }).filter(i => !!i).join('; ');
  });
  

//Открытие модального окна "Email" и "Телефон" 

// Подписываемся на событие 'contacts:open'
events.on('contacts:open', () => {
    // Устанавливаем общую сумму заказа в formModel
    formModel.total = basketModel.getSumAllProducts();
    // Устанавливаем содержимое модального окна с контактной формой
    modal.content = contacts.render();
    // Отображаем модальное окно
    modal.render();
  });
  

//Отслеживаем изменение в полях вода "Email" и "Телефон" 

// Подписываемся на событие 'contacts:changeInput' и передаем измененные данные
events.on('contacts:changeInput', (data: { field: string, value: string }) => {
    // Обновляем данные заказа в formModel
    formModel.setOrderData(data.field, data.value);
  });  

//Валидация данных строки "Email" и "Телефон" 

// Подписываемся на событие 'formErrors:change' и передаем объект с ошибками
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
    // Деструктурируем ошибки email и phone
    const { email, phone } = errors;
    // Устанавливаем флаг валидности формы (если ошибок нет — true)
    contacts.valid = !email && !phone;
    // Отображаем текст ошибок, объединяя их через '; '
    contacts.formErrors.textContent = Object.values({ phone, email }).filter(i => !!i).join('; ');
  });
  

//Открытие модального окна "Заказ оформлен" 

// Подписываемся на событие 'success:open'
events.on('success:open', () => {
    // Отправляем заказ на сервер
    apiModel.postOrderLot(formModel.getOrderLot())
      .then((data) => {
        console.log(data); // Выводим ответ сервера в консоль
        // Создаем экземпляр Success, передавая шаблон и объект событий
        const success = new Success(successTemplate, events);
        // Устанавливаем содержимое модального окна с сообщением об успешном заказе
        modal.content = success.render(basketModel.getSumAllProducts());
        // Очищаем корзину
        basketModel.clearBasketProducts();
        // Обновляем счетчик товаров в корзине
        basket.renderHeaderBasketCounter(basketModel.getCounter());
        // Отображаем модальное окно
        modal.render();
      })
      .catch(error => console.log(error)); // Обрабатываем возможную ошибку
  });  

// Подписываемся на событие 'success:close' и закрываем модальное окно
events.on('success:close', () => modal.close());

//Блокируем прокрутку страницы при открытие модального окна 

// Подписываемся на событие 'modal:open' и блокируем модальное окно
events.on('modal:open', () => {
    modal.locked = true;
  });
  

//Разблокируем прокрутку страницы при закрытие модального окна 

// Подписываемся на событие 'modal:close' и разблокируем модальное окно
events.on('modal:close', () => {
    modal.locked = false;
  });  

//Получаем данные с сервера 

// Запрашиваем список карточек товаров с сервера
apiModel.getListProductCard()
  .then(function (data: IProductItem[]) {
    // Сохраняем полученные данные в dataModel
    dataModel.productCards = data;
  })
  .catch(error => console.log(error)); // Обрабатываем возможную ошибку
