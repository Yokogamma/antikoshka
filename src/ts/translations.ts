// Структура перевода для одной опции
export interface TranslationItem {
  data: string;  // Соответствует data-user-text
  label: string; // Соответствует видимому тексту опции
}

// Структура объекта Translations (без ключа языка)
export interface Translations {
  type: Record<string, TranslationItem>;
  antikoshka: Record<string, TranslationItem>;
  open: Record<string, TranslationItem>;
  [key: string]: Record<string, TranslationItem>;
}

// Структура состояния для одного поля (из windowStates)
export interface FieldState {
  status: number;
  selected: number;
  options: string[]; // Массив ключей опций (например, 'plastic', 'standart')
}

// Структура состояния для всех полей при определенном выборе
export interface WindowState {
  type: FieldState;
  antikoshka: FieldState;
  open: FieldState;
  [key: string]: FieldState;
}

// Структура всей базы данных состояний (WindowStates)
export interface WindowStates {
  type: Record<string, WindowState>;
  antikoshka: Record<string, WindowState>;
  open: Record<string, WindowState>;
  [key: string]: Record<string, WindowState>;
}
export const translations = {
  ru: {
    type: {
      plastic: { data: "Пластиковое окно", label: "Пластиковое" },
      wooden: { data: "Деревянное окно", label: "Деревянное" },
      aluminum: { data: "Аллюминиевое окно", label: "Аллюминиевое" },
    },
    antikoshka: {
      standart: { data: "Защитная антикошка", label: "Защитная (до 7кг котик)" },
      strong: { data: "Усиленная антикошка", label: "Усиленная (до 17 кг котик)" },
    },
    open: {
      no: { data: "сетка не открывается", label: "Нет" },
      yes: { data: "сетка открывается", label: "Да" },
    },
    color: {
      white: { data: "цвет Белый", label: "Белый" },
      brown: { data: "цвет Коричневый", label: "Коричневый" },
      anthracite: { data: "цвет Антрацит", label: "Антрацит (Графит)" },
    },
  },
  uk: {
    type: {
      plastic: { data: "Пластикове вікно", label: "Пластикове" },
      wooden: { data: "Дерев’яне вікно", label: "Дерев’яне" },
      aluminum: { data: "Алюмінієве вікно", label: "Алюмінієве" },
    },
    antikoshka: {
      standart: { data: "Захисна антикішка", label: "Захисна (до 7кг котик)" },
      strong: { data: "Посилена антикішка", label: "Посилена (до 17 кг котик)" },
    },
    open: {
      no: { data: "сітка не відкривається", label: "Ні" },
      yes: { data: "сітка відкривається", label: "Так" },
    },
    color: {
      white: { data: "колір Білий", label: "Білий" },
      brown: { data: "колір Коричневий", label: "Коричневий" },
      anthracite: { data: "колір Антрацит", label: "Антрацит (Графіт)" },
    },
  },
};
