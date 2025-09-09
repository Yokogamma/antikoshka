// ✅ Описуємо інтерфейс для відповіді від сервера.
// Це гарантує, що ми очікуємо саме ті дані і в потрібному форматі.
interface ApiResponse {
    square: number;
    price: number;
}

// ✅ Знаходимо форму і явно вказуємо її тип як HTMLFormElement.
// Знак оклику (!) в кінці говорить TypeScript, що ми впевнені, що елемент існує.
const form = document.getElementById('myForm') as HTMLFormElement;

// ✅ Типізуємо об'єкт події як SubmitEvent.
const handleSubmit = async (event: SubmitEvent): Promise<void> => {
    // 1. Запобігаємо стандартній поведінці форми
    event.preventDefault();

    // 2. Збираємо дані з форми
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const url = 'https://api.example.com/calculate'; // Замініть на ваш URL

    try {
        // 3. Виконуємо fetch-запит
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Помилка мережі: ${response.status}`);
        }

        // 4. Отримуємо JSON і типізуємо його згідно з нашим інтерфейсом
        const result: ApiResponse = await response.json();

        // 5. Виводимо дані в консоль. TypeScript вже "знає", 
        // що в 'result' є поля 'square' і 'price'.
        console.log('Дані успішно отримано:');
        console.log('Площа (square):', result.square);
        console.log('Ціна (price):', result.price);

    } catch (error) {
        // 6. ✅ Правильна обробка помилок в TS
        if (error instanceof Error) {
            console.error('Виникла проблема із запитом:', error.message);
        } else {
            console.error('Невідома помилка:', error);
        }
    }
};

// Додаємо обробник події
form.addEventListener('submit', handleSubmit);