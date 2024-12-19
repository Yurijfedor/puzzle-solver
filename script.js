function solvePuzzle() {
  const fileInput = document.getElementById("fileInput"); // Отримуємо елемент введення файлу.
  const resultDiv = document.getElementById("result"); // Елемент для виводу результату.

  // Перевіряємо, чи завантажено файл.
  if (fileInput.files.length === 0) {
    resultDiv.textContent = "Будь ласка, завантажте файл."; // Виводимо повідомлення про помилку.
    return;
  }

  const file = fileInput.files[0]; // Отримуємо перший завантажений файл.
  const reader = new FileReader(); // Створюємо об'єкт FileReader для читання файлу.

  // Обробник успішного завантаження файлу.
  reader.onload = function (event) {
    const text = event.target.result; // Зчитаний вміст файлу.

    const fragments = text
      .split(/[\n, ]+/) // Розділяємо за новими рядками, комами або пробілами.
      .map((line) => line.trim()) // Видаляємо зайві пробіли на початку та в кінці фрагментів.
      .filter((line) => line); // Відфільтровуємо порожні рядки.

    // Перевіряємо, чи є хоча б один фрагмент.
    if (fragments.length === 0) {
      resultDiv.textContent = "Файл не містить жодного фрагмента.";
      return;
    }

    // Викликаємо функцію вирішення головоломки з фрагментами.
    const solvedPuzzle = solvePuzzleLogic(fragments);
    resultDiv.textContent = solvedPuzzle; // Виводимо результат.
  };

  // Обробник помилок при завантаженні файлу.
  reader.onerror = function () {
    resultDiv.textContent = "Помилка при завантаженні файлу."; // Виводимо повідомлення про помилку.
  };

  reader.readAsText(file); // Читаємо файл як текст.
}

// Логіка вирішення головоломки.
function solvePuzzleLogic(fragments) {
  let bestChain = []; // Змінна для збереження найкращого ланцюжка.

  // Перебираємо всі можливі стартові фрагменти.
  for (let startIndex = 0; startIndex < fragments.length; startIndex++) {
    const chain = [fragments[startIndex]]; // Початковий ланцюжок починається з поточного фрагмента.
    const remainingFragments = fragments.filter((_, i) => i !== startIndex); // Решта фрагментів, окрім стартового.

    let isUpdated = true; // Прапорець для перевірки, чи були внесені зміни до ланцюжка.
    while (isUpdated) {
      isUpdated = false; // Скидаємо прапорець перед ітерацією.

      // Перебираємо всі фрагменти, які залишилися.
      for (let i = 0; i < remainingFragments.length; i++) {
        const fragment = remainingFragments[i]; // Поточний фрагмент.
        const lastFragment = chain[chain.length - 1]; // Останній фрагмент у ланцюжку.
        const firstFragment = chain[0]; // Перший фрагмент у ланцюжку.

        // Перевіряємо, чи збігаються останні 2 символи останнього фрагмента з першими 2 символами поточного.
        if (lastFragment.slice(-2) === fragment.slice(0, 2)) {
          chain.push(fragment.slice(2)); // Додаємо фрагмент (без перших 2 символів) у кінець ланцюжка.
          remainingFragments.splice(i, 1); // Видаляємо цей фрагмент зі списку залишків.
          isUpdated = true; // Позначаємо, що були зміни.
          break; // Виходимо з циклу, щоб почати нову ітерацію.
        }
        // Перевіряємо, чи збігаються перші 2 символи першого фрагмента з останніми 2 символами поточного.
        else if (firstFragment.slice(0, 2) === fragment.slice(-2)) {
          chain.unshift(fragment.slice(0, -2)); // Додаємо фрагмент (без останніх 2 символів) на початок ланцюжка.
          remainingFragments.splice(i, 1);
          isUpdated = true;
          break;
        }
      }
    }

    // Оновлюємо найкращий ланцюжок, якщо поточний довший.
    if (chain.join("").length > bestChain.join("").length) {
      bestChain = chain;
    }
  }

  return bestChain.join(""); // Повертаємо об'єднаний найкращий ланцюжок.
}
