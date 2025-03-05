// Интерфейс для товара
export interface IProductItem {
    id: string;          // Уникальный идентификатор товара
    description: string; // Описание товара
    image: string;       // Ссылка на изображение товара
    title: string;       // Название товара
    category: string;    // Категория товара
    price: number | null;// Цена товара (может быть null)
  }
  
  // Интерфейс для действий с карточкой товара (например, клик)
  export interface IActions {
    onClick: (event: MouseEvent) => void; // Обработчик клика
  }
  
  // Интерфейс формы заказа
  export interface IOrderForm { // ? - свойство является необязательным 
    payment?: string;         // Способ оплаты
    address?: string;         // Адрес доставки
    phone?: string;           // Телефон покупателя
    email?: string;           // Email покупателя
    total?: string | number;  // Общая сумма заказа
  }
  
  // Интерфейс заказа (содержит данные формы + список товаров)
  export interface IOrder extends IOrderForm {
    items: string[]; // Список ID товаров в заказе
  }
  
  // Интерфейс заказа, отправляемого на сервер
  export interface IOrderLot {
    payment: string;    // Способ оплаты (обязательное поле)
    email: string;      // Email покупателя (обязательное поле)
    phone: string;      // Телефон покупателя (обязательное поле)
    address: string;    // Адрес доставки (обязательное поле)
    total: number;      // Итоговая сумма заказа (обязательное поле)
    items: string[];    // Список ID товаров в заказе (обязательное поле)
  }
  
  // Интерфейс результата успешного заказа
  export interface IOrderResult {
    id: string;   // Уникальный идентификатор заказа
    total: number;// Итоговая сумма заказа
  }
  
  // Тип для ошибок формы (каждое поле IOrder может содержать сообщение об ошибке)
  export type FormErrors = Partial<Record<keyof IOrder, string>>;
  