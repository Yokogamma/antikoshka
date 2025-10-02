// Интерфейс для плоского объекта, где ключ — 'user_name', а значение — текст.
interface FormTextData {
  [key: string]: string;
}

/**
 * Собирает текстовое описание (data-user-text или value) со всех полей формы,
 * добавляя префикс "user_" к ключам.
 * * @param form - HTMLFormElement для обработки.
 * @returns Плоский объект FormTextData с префиксом "user_".
 */
export function collectFormTextData(form: HTMLFormElement): FormTextData {
  const finalData: FormTextData = {};
  
  // Выбираем все элементы, которые могут содержать данные и имеют 'name'
  const formElements = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input[name], select[name]');

  formElements.forEach(element => {
    const name = element.name;
    // --- ДОБАВЛЕНИЕ ПРЕФИКСА ---
    const prefixedName = `user_${name}`;
    // --------------------------
    let dataText: string;

    if (element instanceof HTMLInputElement) {
      // Для input'ов используем их текущее значение (value)
      dataText = element.value;
      
    } else if (element instanceof HTMLSelectElement) {
      // Для select'ов находим выбранную <option>
      const selectedOption = element.options[element.selectedIndex];
      
      // Предпочтительно data-user-text, иначе textContent, иначе value.
      dataText = selectedOption.dataset.userText || selectedOption.textContent?.trim() || selectedOption.value;
    } else {
      return; 
    }

    // Присваиваем значение новому ключу с префиксом
    finalData[prefixedName] = dataText;
  });

  return finalData;
}