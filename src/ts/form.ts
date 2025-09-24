import { translations } from "./translations";
import { windowStates } from "./windowstates";

export interface FieldState {
  status: number;
  selected: number;
  options: string[];
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

/**
 * Инициализирует форму калькулятора с учетом выбранного языка и состояний полей.
 * @param language - Язык для отображения (например, 'ru' или 'uk').
 */
export function initCalcForm(language: "ru" | "uk") {
  const typeSelect = document.querySelector<HTMLSelectElement>('select[name="type"]')!;
  const antikoshkaSelect = document.querySelector<HTMLSelectElement>('select[name="antikoshka"]')!;
  const openSelect = document.querySelector<HTMLSelectElement>('select[name="open"]')!;

  const antikoshkaField = antikoshkaSelect.closest(".fieldset")!;
  const openField = openSelect.closest(".fieldset")!;

  function updateSelectOptions(
    select: HTMLSelectElement,
    availableOptions: string[],
    selectedIndex: number,
    fieldTranslations: Record<string, { data: string; label: string }>
  ) {
    select.innerHTML = "";
    availableOptions.forEach((key, index) => {
      const option = document.createElement("option");
      option.value = key;
      const translation = fieldTranslations[key];
      if (translation) {
        option.textContent = translation.label; // Используем label для текста
        option.setAttribute("data-user-text", translation.data); // Используем data для атрибута
      }
      if (index === selectedIndex) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  }

  function updateFields(state: WindowState) {
    const langTranslations = translations[language];

    // Обновляем select 'type'
    const typeState = state.type;
    typeSelect.disabled = typeState.status === 0;
    typeSelect.closest(".fieldset")!.classList.toggle("hidden", typeState.status === 0);
    updateSelectOptions(typeSelect, typeState.options, typeState.selected, langTranslations.type);

    // Обновляем select 'antikoshka'
    const antikoshkaState = state.antikoshka;
    antikoshkaSelect.disabled = antikoshkaState.status === 0;
    antikoshkaField.classList.toggle("hidden", antikoshkaState.status === 0);
    updateSelectOptions(antikoshkaSelect, antikoshkaState.options, antikoshkaState.selected, langTranslations.antikoshka);

    // Обновляем select 'open'
    const openState = state.open;
    openSelect.disabled = openState.status === 0;
    openField.classList.toggle("hidden", openState.status === 0);
    updateSelectOptions(openSelect, openState.options, openState.selected, langTranslations.open);
  }

  function getStateBySelection(field: keyof WindowStates, value: string): WindowState {
    const statesForField = windowStates[field];
    // Assert that `value` is a key of the object.
    return statesForField[value as keyof typeof statesForField];
  }

  typeSelect.addEventListener("change", (e) => {
    const selectedValue = (e.target as HTMLSelectElement).value;
    updateFields(getStateBySelection("type", selectedValue));
  });

  antikoshkaSelect.addEventListener("change", (e) => {
    const selectedValue = (e.target as HTMLSelectElement).value;
    updateFields(getStateBySelection("antikoshka", selectedValue));
  });

  openSelect.addEventListener("change", (e) => {
    const selectedValue = (e.target as HTMLSelectElement).value;
    updateFields(getStateBySelection("open", selectedValue));
  });

  // Инициализация формы при загрузке.
  const initialKey = Object.keys(windowStates.type)[0] as keyof typeof windowStates.type;
  if (initialKey) {
    updateFields(windowStates.type[initialKey]);
  }
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
