import { translations } from "./translation";

export const windowStates = {
  type: {
    [translations.ru.window_type_plastic]: {
      type: {
        status: 1,
        selected: 0,
        options: {
          [translations.ru.window_type_plastic]: translations.ru.window_plastic,
          [translations.ru.window_type_wood]: translations.ru.window_wood,
          [translations.ru.window_type_aluminum]: translations.ru.window_aluminum,
        },
      },
      antikoshka: {
        status: 1,
        selected: 0,
        options: {
          [translations.ru.antikoshka_safe]: translations.ru.antikoshka_safe_desc,
          [translations.ru.antikoshka_reinforced]: translations.ru.antikoshka_reinforced_desc,
        },
      },
      open: {
        status: 1,
        selected: 0,
        options: {
          [translations.ru.open_no]: translations.ru.open_no_desc,
          [translations.ru.open_yes]: translations.ru.open_yes_desc,
        },
      },
    },
    [translations.ru.window_type_wood]: {
      type: {
        status: 1,
        selected: 1,
        options: {
          [translations.ru.window_type_plastic]: translations.ru.window_plastic,
          [translations.ru.window_type_wood]: translations.ru.window_wood,
          [translations.ru.window_type_aluminum]: translations.ru.window_aluminum,
        },
      },
      antikoshka: {
        status: 1,
        selected: 0,
        options: { [translations.ru.antikoshka_safe]: translations.ru.antikoshka_safe_desc },
      },
      open: { status: 1, selected: 0, options: { [translations.ru.open_no]: translations.ru.open_no_desc } },
    },
    [translations.ru.window_type_aluminum]: {
      type: {
        status: 1,
        selected: 2,
        options: {
          [translations.ru.window_type_plastic]: translations.ru.window_plastic,
          [translations.ru.window_type_wood]: translations.ru.window_wood,
          [translations.ru.window_type_aluminum]: translations.ru.window_aluminum,
        },
      },
      antikoshka: {
        status: 1,
        selected: 0,
        options: { [translations.ru.antikoshka_safe]: translations.ru.antikoshka_safe_desc },
      },
      open: { status: 1, selected: 0, options: { [translations.ru.open_no]: translations.ru.open_no_desc } },
    },
  },
  antikoshka: {
    [translations.ru.antikoshka_safe]: {
      type: {
        status: 1,
        selected: 0,
        options: {
          [translations.ru.window_type_plastic]: translations.ru.window_plastic,
          [translations.ru.window_type_wood]: translations.ru.window_wood,
          [translations.ru.window_type_aluminum]: translations.ru.window_aluminum,
        },
      },
      antikoshka: {
        status: 1,
        selected: 0,
        options: {
          [translations.ru.antikoshka_safe]: translations.ru.antikoshka_safe_desc,
          [translations.ru.antikoshka_reinforced]: translations.ru.antikoshka_reinforced_desc,
        },
      },
      open: {
        status: 1,
        selected: 0,
        options: {
          [translations.ru.open_no]: translations.ru.open_no_desc,
          [translations.ru.open_yes]: translations.ru.open_yes_desc,
        },
      },
    },
    [translations.ru.antikoshka_reinforced]: {
      type: { status: 1, selected: 0, options: { [translations.ru.window_type_plastic]: translations.ru.window_plastic } },
      antikoshka: {
        status: 1,
        selected: 1,
        options: {
          [translations.ru.antikoshka_safe]: translations.ru.antikoshka_safe_desc,
          [translations.ru.antikoshka_reinforced]: translations.ru.antikoshka_reinforced_desc,
        },
      },
      open: { status: 1, selected: 0, options: { [translations.ru.open_no]: translations.ru.open_no_desc } },
    },
  },
  open: {
    [translations.ru.open_no]: {
      type: {
        status: 1,
        selected: 0,
        options: {
          [translations.ru.window_type_plastic]: translations.ru.window_plastic,
          [translations.ru.window_type_wood]: translations.ru.window_wood,
          [translations.ru.window_type_aluminum]: translations.ru.window_aluminum,
        },
      },
      antikoshka: {
        status: 1,
        selected: 0,
        options: {
          [translations.ru.antikoshka_safe]: translations.ru.antikoshka_safe_desc,
          [translations.ru.antikoshka_reinforced]: translations.ru.antikoshka_reinforced_desc,
        },
      },
      open: {
        status: 1,
        selected: 0,
        options: {
          [translations.ru.open_no]: translations.ru.open_no_desc,
          [translations.ru.open_yes]: translations.ru.open_yes_desc,
        },
      },
    },
    [translations.ru.open_yes]: {
      type: { status: 1, selected: 0, options: { [translations.ru.window_type_plastic]: translations.ru.window_plastic } },
      antikoshka: { status: 1, selected: 0, options: { [translations.ru.antikoshka_safe]: translations.ru.antikoshka_safe_desc } },
      open: {
        status: 1,
        selected: 1,
        options: {
          [translations.ru.open_no]: translations.ru.open_no_desc,
          [translations.ru.open_yes]: translations.ru.open_yes_desc,
        },
      },
    },
  },
};








// Определяем интерфейсы как раньше
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

// Теперь функция принимает массив состояний и текущий язык
export function initCalcForm(states: WindowStates, lang: "ru" | "uk") {
  const t = translations[lang]; // Получаем объект переводов для выбранного языка

  const typeSelect = document.querySelector<HTMLSelectElement>('select[name="type"]')!;
  const antikoshkaSelect = document.querySelector<HTMLSelectElement>('select[name="antikoshka"]')!;
  const openSelect = document.querySelector<HTMLSelectElement>('select[name="open"]')!;
  const antikoshkaField = antikoshkaSelect.closest(".fieldset")!;
  const openField = openSelect.closest(".fieldset")!;

  function updateSelectOptions(
    select: HTMLSelectElement,
    optionsObj: Record<string, string>,
    selectedIndex: number
  ) {
    select.innerHTML = "";
    Object.keys(optionsObj).forEach((key, index) => {
      const option = document.createElement("option");
      // Используем ключ перевода из `optionsObj`
      option.value = key; 
      // А здесь получаем переведенный текст
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
    return states[field][value] ?? states.type[t.window_type_plastic];
  }

  typeSelect.addEventListener("change", () =>
    updateFields(getStateBySelection("type", typeSelect.value))
  );
  antikoshkaSelect.addEventListener("change", () =>
    updateFields(getStateBySelection("antikoshka", antikoshkaSelect.value))
  );
  openSelect.addEventListener("change", () =>
    updateFields(getStateBySelection("open", openSelect.value))
  );

  // Инициализируем форму с выбранным языком
  updateFields(states.type[t.window_type_plastic]);
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
