export const windowStates = {
  type: {
    "Пластиковое окно": {
      type: {
        status: 1,
        selected: 0,
        options: { "Пластиковое окно": "Пластиковое", "Деревянное окно": "Деревянное", "Аллюминиевое окно": "Алюминиевое" },
      },
      antikoshka: {
        status: 1,
        selected: 0,
        options: { "Защитная антикошка": "Защитная (до 7кг котик)", "Усиленная антикошка": "Усиленная (до 17 кг котик)" },
      },
      open: { status: 1, selected: 0, options: { "сетка не открывается": "Нет", "сетка открывается": "Да" } },
    },
    "Деревянное окно": {
      type: {
        status: 1,
        selected: 1,
        options: { "Пластиковое окно": "Пластиковое", "Деревянное окно": "Деревянное", "Аллюминиевое окно": "Алюминиевое" },
      },
      antikoshka: { status: 1, selected: 0, options: { "Защитная антикошка": "Защитная (до 7кг котик)" } },
      open: { status: 1, selected: 0, options: { "сетка не открывается": "Нет" } },
    },
    "Аллюминиевое окно": {
      type: {
        status: 1,
        selected: 2,
        options: { "Пластиковое окно": "Пластиковое", "Деревянное окно": "Деревянное", "Аллюминиевое окно": "Алюминиевое" },
      },
      antikoshka: { status: 1, selected: 0, options: { "Защитная антикошка": "Защитная (до 7кг котик)" } },
      open: { status: 1, selected: 0, options: { "сетка не открывается": "Нет" } },
    },
  },
  antikoshka: {
    "Защитная антикошка": {
      type: {
        status: 1,
        selected: 0,
        options: { "Пластиковое окно": "Пластиковое", "Деревянное окно": "Деревянное", "Аллюминиевое окно": "Алюминиевое" },
      },
      antikoshka: {
        status: 1,
        selected: 0,
        options: { "Защитная антикошка": "Защитная (до 7кг котик)", "Усиленная антикошка": "Усиленная (до 17 кг котик)" },
      },
      open: { status: 1, selected: 0, options: { "сетка не открывается": "Нет", "сетка открывается": "Да" } },
    },
    "Усиленная антикошка": {
      type: { status: 1, selected: 0, options: { "Пластиковое окно": "Пластиковое" } }, // только пластиковое
      antikoshka: {
        status: 1,
        selected: 1,
        options: { "Защитная антикошка": "Защитная (до 7кг котик)", "Усиленная антикошка": "Усиленная (до 17 кг котик)" },
      },
      open: { status: 1, selected: 0, options: { "сетка не открывается": "Нет" } },
    },
  },
  open: {
    "сетка не открывается": {
      type: {
        status: 1,
        selected: 0,
        options: { "Пластиковое окно": "Пластиковое", "Деревянное окно": "Деревянное", "Аллюминиевое окно": "Алюминиевое" },
      },
      antikoshka: {
        status: 1,
        selected: 0,
        options: { "Защитная антикошка": "Защитная (до 7кг котик)", "Усиленная антикошка": "Усиленная (до 17 кг котик)" },
      },
      open: { status: 1, selected: 0, options: { "сетка не открывается": "Нет", "сетка открывается": "Да" } },
    },
    "сетка открывается": {
      type: { status: 1, selected: 0, options: { "Пластиковое окно": "Пластиковое" } }, // только пластиковое
      antikoshka: { status: 1, selected: 0, options: { "Защитная антикошка": "Защитная (до 7кг котик)" } },
      open: { status: 1, selected: 1, options: { "сетка не открывается": "Нет", "сетка открывается": "Да" } },
    },
  },
};

// calcForm.ts

export interface FieldState {
  status: number;
  selected: number;
  options: Record<string, string>;
}

export interface WindowState {
  type: FieldState;
  antikoshka: FieldState;
  open: FieldState;
}

export interface WindowStates {
  type: Record<string, WindowState>;
  antikoshka: Record<string, WindowState>;
  open: Record<string, WindowState>;
}

export function initCalcForm(states: WindowStates) {
  const typeSelect = document.querySelector<HTMLSelectElement>('select[name="type"]')!;
  const antikoshkaSelect = document.querySelector<HTMLSelectElement>('select[name="antikoshka"]')!;
  const openSelect = document.querySelector<HTMLSelectElement>('select[name="open"]')!;
  const antikoshkaField = antikoshkaSelect.closest(".fieldset")!;
  const openField = openSelect.closest(".fieldset")!;

  function updateSelectOptions(select: HTMLSelectElement, optionsObj: Record<string, string>, selectedIndex: number) {
    select.innerHTML = "";
    Object.keys(optionsObj).forEach((key, index) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = optionsObj[key];
      if (index === selectedIndex) option.selected = true;
      select.appendChild(option);
    });
  }

  function updateFields(state: WindowState) {
    typeSelect.disabled = state.type.status === 0;
    typeSelect.closest(".fieldset")!.classList.toggle("hidden", state.type.status === 0);
    updateSelectOptions(typeSelect, state.type.options, state.type.selected);

    antikoshkaSelect.disabled = state.antikoshka.status === 0;
    antikoshkaField.classList.toggle("hidden", state.antikoshka.status === 0);
    updateSelectOptions(antikoshkaSelect, state.antikoshka.options, state.antikoshka.selected);

    openSelect.disabled = state.open.status === 0;
    openField.classList.toggle("hidden", state.open.status === 0);
    updateSelectOptions(openSelect, state.open.options, state.open.selected);
  }

  function getStateBySelection(field: keyof WindowStates, value: string): WindowState {
    return states[field][value] ?? states.type["Пластиковое окно"];
  }

  typeSelect.addEventListener("change", () => updateFields(getStateBySelection("type", typeSelect.value)));
  antikoshkaSelect.addEventListener("change", () => updateFields(getStateBySelection("antikoshka", antikoshkaSelect.value)));
  openSelect.addEventListener("change", () => updateFields(getStateBySelection("open", openSelect.value)));

  updateFields(states.type["Пластиковое окно"]);

  // const form = document.getElementById('calc-form') as HTMLFormElement;
  // form.addEventListener('submit', e => {
  //   e.preventDefault();
  //   const formData = new FormData(form);
  //   const data: Record<string, string> = {};
  //   formData.forEach((value, key) => { data[key] = value.toString(); });
  //   console.log('Данные формы:', data);
  //   alert('Форма отправлена! Проверьте консоль.');
  // });
}

// deliveryAddress.ts
export function initDeliveryAddress(): void {
  // Находим радиокнопки
  const deliveryRadios = document.querySelectorAll<HTMLInputElement>('input[name="choice"]');

  // Создаём или находим контейнер для ввода адреса
  let addressContainer = document.getElementById("delivery-address") as HTMLDivElement;
  // if (!addressContainer) {
  //   addressContainer = document.createElement("div");
  //   addressContainer.id = "delivery-address";
  //   addressContainer.style.display = "none"; // скрыто по умолчанию
  //   addressContainer.innerHTML = `
  //     <label for="address-input">Введите адрес доставки:</label>
  //     <input type="text" id="address-input" name="address" />
  //   `;
  //   // добавляем после блока радиокнопок
  //   const radioGroup = document.querySelector(".radio-group");
  //   radioGroup?.appendChild(addressContainer);
  // }

  // Функция проверки и показа/скрытия поля
  function updateAddressVisibility(): void {
    const selectedValue = document.querySelector<HTMLInputElement>('input[name="choice"]:checked')?.value;
    if (selectedValue === "1" || selectedValue === "2") {
      addressContainer.style.display = "flex";
    } else {
      addressContainer.style.display = "none";
    }

    const parentBlock = document.getElementById("fill-order");
    if (parentBlock?.classList.contains("active")) {
      parentBlock.style.maxHeight = parentBlock.scrollHeight + "px";
    }
  }

  // Ставим обработчик на все радиокнопки
  deliveryRadios.forEach((radio) => {
    radio.addEventListener("change", updateAddressVisibility);
  });

  // Инициализация при загрузке страницы
  updateAddressVisibility();
}
