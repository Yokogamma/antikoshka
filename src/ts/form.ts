
import { windowStates } from "./windowstates";

export interface TranslationItem {
  data: string;
  label: string;
}

export interface Translations {
  type: Record<string, TranslationItem>;
  antikoshka: Record<string, TranslationItem>;
  open: Record<string, TranslationItem>;
  color: Record<string, TranslationItem>;
  [key: string]: Record<string, TranslationItem>;
}

export interface FieldState {
  status: number;
  selected: number;
  options: string[];
}

export interface WindowState {
  type: FieldState;
  antikoshka: FieldState;
  open: FieldState;
  [key: string]: FieldState;
}

export interface WindowStates {
  type: Record<string, WindowState>;
  antikoshka: Record<string, WindowState>;
  open: Record<string, WindowState>;
  [key: string]: Record<string, WindowState>; 
}


export function generateTranslationsFromForm(form: HTMLFormElement): Translations {
  const collectedTranslations: Partial<Translations> = {};
  
  // Выбираем все select'ы, которые нас интересуют
  const selectElements = form.querySelectorAll<HTMLSelectElement>('select[name="type"], select[name="antikoshka"], select[name="open"], select[name="color"]');

  selectElements.forEach(select => {
    const fieldName = select.name as keyof Translations;
    const fieldTranslations: Record<string, TranslationItem> = {};

    Array.from(select.options).forEach(option => {
      const optionValue = option.value;
      
      fieldTranslations[optionValue] = {
        data: option.dataset.userText || "",
        label: option.textContent?.trim() || "",
      };
    });

    collectedTranslations[fieldName] = fieldTranslations;
  });

  return collectedTranslations as Translations;
}





export function initCalcForm(translations: Translations) {
  // Получаем элементы формы
  const typeSelect = document.querySelector<HTMLSelectElement>('select[name="type"]')!;
  const antikoshkaSelect = document.querySelector<HTMLSelectElement>('select[name="antikoshka"]')!;
  const openSelect = document.querySelector<HTMLSelectElement>('select[name="open"]')!;
  
  const antikoshkaField = antikoshkaSelect.closest(".fieldset")!;
  const openField = openSelect.closest(".fieldset")!;

  function updateSelectOptions(
    select: HTMLSelectElement,
    availableOptions: string[],
    selectedIndex: number,
    fieldTranslations: Record<string, TranslationItem>
  ) {
    select.innerHTML = "";
    availableOptions.forEach((key, index) => {
      const option = document.createElement("option");
      option.value = key;
      const translation = fieldTranslations[key];
      
      if (translation) {
        option.textContent = translation.label; 
        option.setAttribute('data-user-text', translation.data); 
      }
      
      if (index === selectedIndex) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  }

  function updateFields(state: WindowState) {
    // Обновляем select 'type'
    const typeState = state.type;
    typeSelect.disabled = typeState.status === 0;
    typeSelect.closest(".fieldset")!.classList.toggle("hidden", typeState.status === 0);
    updateSelectOptions(typeSelect, typeState.options, typeState.selected, translations.type);

    // Обновляем select 'antikoshka'
    const antikoshkaState = state.antikoshka;
    antikoshkaSelect.disabled = antikoshkaState.status === 0;
    antikoshkaField.classList.toggle("hidden", antikoshkaState.status === 0);
    updateSelectOptions(antikoshkaSelect, antikoshkaState.options, antikoshkaState.selected, translations.antikoshka);

    // Обновляем select 'open'
    const openState = state.open;
    openSelect.disabled = openState.status === 0;
    openField.classList.toggle("hidden", openState.status === 0);
    updateSelectOptions(openSelect, openState.options, openState.selected, translations.open);
    
    // (Обработка поля 'color' здесь, если оно используется)
  }

 function getStateBySelection(field: keyof WindowStates, value: string): WindowState {
    // 1. Утверждаем, что windowStates является Record<string, any> для доступа по field.
    // 2. Утверждаем, что результат [field] является Record<string, WindowState>
    // 3. Утверждаем, что value является ключом этого результата.
    
    // Более простой и эффективный способ:
    const statesForField = (windowStates as Record<keyof WindowStates, Record<string, WindowState>>)[field];

    // Утверждаем, что value является ключом для полученного объекта.
    return statesForField[value as keyof typeof statesForField];
}

  // --- ОБРАБОТЧИКИ СОБЫТИЙ CHANGE ---
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

  // --- ИНИЦИАЛИЗАЦИЯ ---
  
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
