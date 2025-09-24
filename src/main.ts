import "./style.scss";

const toggleButton = document.querySelector("#brandmenu") as HTMLFormElement;
const dropdownMenu = document.querySelector(".brandmenu-dropdown") as HTMLFormElement;

toggleButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});

// ✅ Описуємо інтерфейс для відповіді від сервера.
// Це гарантує, що ми очікуємо саме ті дані і в потрібному форматі.
interface ApiResponse {
  square: number;
  price: number;
}

// ✅ Знаходимо форму і явно вказуємо її тип як HTMLFormElement.
// Знак оклику (!) в кінці говорить TypeScript, що ми впевнені, що елемент існує.
const form = document.getElementById("calc-form") as HTMLFormElement;

// ✅ Типізуємо об'єкт події як SubmitEvent.
const handleSubmit = async (event: SubmitEvent): Promise<void> => {
  // 1. Запобігаємо стандартній поведінці форми
  event.preventDefault();

  const oldOrder = document.getElementById("orderResult");
  if (oldOrder) {
    oldOrder.innerHTML = ""; // полностью очищает содержимое, включая вложенные элементы
  }

  // 2. Збираємо дані з форми
  const formData = new FormData(form);
  const data: Record<string, string> = Object.fromEntries(formData.entries()) as Record<string, string>;

  console.log(data);

  const url = "https://dim.komax.com.ua/api/calc/moskitos"; // Замініть на ваш URL
  //const url = "http://ava.test/api/calc/moskitos"; // Замініть на ваш URL
  try {
    // 3. Виконуємо fetch-запит
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // пробуем вытащить текст/JSON ошибки от сервера
      let errorMessage = `Помилка: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // если сервер вернул не JSON
        errorMessage = await response.text();
      }

      throw new Error(errorMessage);
    }

    // 4. Отримуємо JSON і типізуємо його згідно з нашим інтерфейсом
    const result: ApiResponse = await response.json();
    console.log("✅ Площа (square):", result.square);
    console.log("✅ Ціна (price):", result.price);

    const priceResult = document.getElementById("price-result") as HTMLElement;
    priceResult.textContent = result.price.toString();

    const squareResult = document.getElementById("square-result") as HTMLElement;
    squareResult.textContent = result.square.toString();
    hideCurrentBlock();
    expandBlockById("calc-results-block");

    //const obj = data;
    data.price = result.price.toString();
    data.square = result.square.toString();

    const city = data.city;

    const keysToDelete = ["formData", "moskitos_" + city, "moskitos_temp_" + city];

    keysToDelete.forEach((key) => localStorage.removeItem(key));

    // Сохраняем в localStorage как строку
    localStorage.setItem("moskitos_temp_" + city, JSON.stringify(data));

    if (typeof city === "string") {
      localStorage.setItem("city", city);
    }

    console.log("Сохранено в LocalStorage:", data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Виникла проблема:", error.message);
    } else {
      console.error("Невідома помилка:", error);
    }
  }
};

// Додаємо обробник події
form.addEventListener("submit", handleSubmit);

function addBasket(): void {
  const city: string | null = localStorage.getItem("city");

  if (city) {
    // Достаём строку из localStorage
    const formDataStr: string | null = localStorage.getItem("moskitos_temp_" + city);

    if (formDataStr) {
      // Преобразуем JSON-строку обратно в объект
      const obj: Record<string, string> = JSON.parse(formDataStr);

      // Достаём существующий массив объектов или создаём новый
      const existing: Record<string, string>[] = JSON.parse(localStorage.getItem("moskitos_setki_kyiv") || "[]");

      // Добавляем новый объект
      existing.push(obj);

      // Сохраняем обратно
      localStorage.setItem("moskitos_setki_kyiv", JSON.stringify(existing));

      console.log("Обновлённый массив объектов:", existing);
      renderList();

      localStorage.setItem("windows_lastAdded", Date.now().toString());

      // const calcResultsBlock = document.getElementById("basket-block") as HTMLDivElement;
      // calcResultsBlock.classList.add("active");

      expandBlockById("basket-block");
    }
  }
}

const addbutton = document.getElementById("addBasket");
addbutton?.addEventListener("click", () => addBasket());

const fillOrder = document.getElementById("open-fill-order");
fillOrder?.addEventListener("click", () => openFillOrder());

function openFillOrder(): void {
  expandBlockById("fill-order");
}

function expandBlockById(blockId: string) {
  const block = document.getElementById(blockId) as HTMLDivElement | null;
  if (!block) return;

  block.classList.add("active");
  block.style.maxHeight = block.scrollHeight + "px";

  window.addEventListener("resize", () => {
    if (block.classList.contains("active")) {
      block.style.maxHeight = block.scrollHeight + "px";
    }
  });
}

// function collapseBlockById(blockId: string) {
//   const block = document.getElementById(blockId) as HTMLDivElement | null;
//   if (!block) return;

//   block.style.maxHeight = "0";
//     block.classList.remove("active");
// }

// Функция для схлопывания блока
function collapseAllBlocks() {
  const activeBlocks = document.querySelectorAll<HTMLElement>(".active");

  // Схлопываем все блоки
  activeBlocks.forEach((block) => {
    block.style.maxHeight = "0";
    block.classList.remove("active");
  });
}

interface WindowData {
  city: string;
  width: string;
  height: string;
  antikoshka: string;
  type: string;
  color: string;
  price: string;
}

function renderList(): void {
  const listEl = document.getElementById("list");
  if (!listEl) return;

  const existing: WindowData[] = JSON.parse(localStorage.getItem("moskitos_setki_kyiv") || "[]");

  // Если массив пустой, вызываем foo() и выходим
  if (existing.length === 0) {
    collapseAllBlocks();
    listEl.innerHTML = ""; // на всякий случай очищаем список
    return;
  }

  listEl.innerHTML = "";

  existing.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "setka-in-basket-block";

    li.textContent = `${index + 1}. ${item.antikoshka} на ${item.type}: ${item.width} x ${item.height} - ${item.color} = ${item.price} грн.`;

    // Создаём кнопку удаления
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "setka-item";

    const svgStr = `
  <svg xmlns="http://www.w3.org/2000/svg" 
       fill="none" 
       viewBox="0 0 24 24" 
       stroke-width="1.5" 
       stroke="currentColor" 
       class="size-6"
       aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 L18 6 M6 6 L18 18"></path>
  </svg>
`;

    deleteBtn.innerHTML = svgStr;
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", () => {
      removeWindow(index);
    });

    li.appendChild(deleteBtn);
    listEl.appendChild(li);
  });
  // Получить
  const lastAddedStr = localStorage.getItem("windows_lastAdded");
  if (lastAddedStr) {
    const lastAdded = new Date(parseInt(lastAddedStr));
    console.log("Последнее добавление:", lastAdded.toLocaleString());
  }

  updateSummary();
}

// Удаление объекта по индексу
function removeWindow(index: number): void {
  const existing: WindowData[] = JSON.parse(localStorage.getItem("moskitos_setki_kyiv") || "[]");
  existing.splice(index, 1); // удаляем элемент
  localStorage.setItem("moskitos_setki_kyiv", JSON.stringify(existing));
  renderList();
}

// Функция для обновления сводки
function updateSummary(): void {
  const existing: WindowData[] = JSON.parse(localStorage.getItem("moskitos_setki_kyiv") || "[]");

  const countEl = document.getElementById("count");
  const sumWidthEl = document.getElementById("sumWidth");

  // Количество объектов
  const count = existing.length;

  // Сумма width (преобразуем строки в числа)
  const sumWidth = existing.reduce((sum, item) => sum + Number(item.price || 0), 0);

  if (countEl) countEl.textContent = count.toString();
  if (sumWidthEl) sumWidthEl.textContent = sumWidth.toString();
}

renderList();

interface OrderData {
  name: string;
  email: string;
  phone: string;
  setki: WindowData[];
  quantity: number;
  total_cost: number;
  payment: string;
  delivery: string;
  city: string;
  address: string;
}

// Получаем форму
const zakazForm = document.getElementById("zakaz") as HTMLFormElement;
const orderResult = document.getElementById("orderResult");

zakazForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(zakazForm);
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const address = formData.get("address")?.toString() || "";

  // Получаем выбранную радио-кнопку
  const paymentInput = zakazForm.querySelector<HTMLInputElement>('input[name="choice2"]:checked');
  const payment = paymentInput?.value || "";

  const deliveryInput = zakazForm.querySelector<HTMLInputElement>('input[name="choice"]:checked');
  const delivery = deliveryInput?.value || "";

  // Достаём массив окон из localStorage
  const setki: WindowData[] = JSON.parse(localStorage.getItem("moskitos_setki_kyiv") || "[]");

  const city = setki[0]?.city;

  // Считаем sumWidth и count
  const quantity = setki.length;
  const total_cost = setki.reduce((sum, w) => sum + Number(w.width || 0), 0);

  // Формируем объект для отправки
  const orderData: OrderData = {
    name,
    email,
    phone,
    setki,
    quantity,
    total_cost,
    payment,
    delivery,
    city,
    address,
  };

  try {
    const response = await fetch("https://dim.komax.com.ua/api/zakaz/moskitos", {
      // const response = await fetch("http://ava.test/api/zakaz/moskitos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Ошибка отправки заказа");
    }

    // Предположим, сервер возвращает { orderNumber: "12345" }
    const result = await response.json();
    const orderNumber = result.orderNumber;

    if (orderResult) {
      // Показываем номер заказа
      orderResult.textContent = `Ваш номер заказа: ${orderNumber}`;

      // Очистка формы и корзины
      zakazForm.reset();
      localStorage.removeItem("moskitos_setki_kyiv");
      initDeliveryAddress();

      collapseAllBlocks();

      // Ждём, пока браузер пересчитает layout
      requestAnimationFrame(() => {
        // Можно добавить небольшую задержку, чтобы блоки успели схлопнуться визуально
        setTimeout(() => {
          if (orderResult) {
            
            const orderLink = document.getElementById("orderLink") as HTMLAnchorElement | null;

            if (orderLink) {
              // Разбираем текущий href
              const url = new URL(orderLink.href, window.location.origin);

              // Обновляем параметр current
              url.searchParams.set("current", orderNumber.toString());

              // Присваиваем обратно
              orderLink.href = url.toString();
            }

            showCurrentBlock();
            orderResult.scrollIntoView({ behavior: "smooth", block: "start" });
            orderResult.classList.add("highlight");
            setTimeout(() => orderResult.classList.remove("highlight"), 2000);
          }
        }, 500); // 50ms — достаточно для плавного визуального эффекта
      });
    }
  } catch (error) {
    console.error(error);
    if (orderResult) orderResult.textContent = "Произошла ошибка при отправке заказа.";
  }
});

import { windowStates, initCalcForm } from "./ts/form";

// Экспортируем объект состояний, если нужно использовать где-то ещё
export { windowStates };

import { initDeliveryAddress } from "./ts/form";

// Инициализация формы
document.addEventListener("DOMContentLoaded", () => {
  initCalcForm(windowStates);
  initDeliveryAddress();
});

function showCurrentBlock(): void {
  const block = document.querySelector(".show-current");
  if (block) {
    block.classList.add("active");
  }
}

function hideCurrentBlock(): void {
  const block = document.querySelector(".show-current");
  if (block) {
    block.classList.remove("active");
  }
}
