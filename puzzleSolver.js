const fs = require("fs");

// Функція для пошуку найдовшої послідовності з фрагментів
function solvePuzzleLogic(fragments) {
  // Створення графу з фрагментів
  const graph = createGraph(fragments);
  const memo = new Map(); // Для кешування результатів (оптимізація через динамічне програмування)

  // Функція для пошуку найдовшого шляху через граф (рекурсивний пошук)
  function dfs(fragment, visited) {
    // Якщо результат для цього фрагмента вже є у кеші, повертаємо його
    if (memo.has(fragment)) {
      return memo.get(fragment);
    }

    visited.add(fragment); // Позначаємо фрагмент як відвіданий

    let longestChain = fragment; // Ініціалізуємо найдовший шлях з поточного фрагмента
    for (const neighbor of graph[fragment]) {
      // Перевіряємо всіх сусідів
      if (!visited.has(neighbor)) {
        const chain = fragment + dfs(neighbor, visited); // Рекурсивно будуємо шлях
        if (chain.length > longestChain.length) {
          longestChain = chain; // Оновлюємо найдовший шлях, якщо знайшли довший
        }
      }
    }

    visited.delete(fragment); // Знімаємо позначку про відвідування для подальших викликів
    memo.set(fragment, longestChain); // Зберігаємо результат у кеш
    return longestChain;
  }

  let bestChain = ""; // Ініціалізація найдовшої послідовності
  for (const fragment of fragments) {
    // Перебираємо всі фрагменти як стартові точки
    const chain = dfs(fragment, new Set());
    if (chain.length > bestChain.length) {
      bestChain = chain; // Оновлюємо найдовшу послідовність, якщо знайшли довшу
    }
  }

  // Видаляємо перекриття між фрагментами у фінальному результаті
  return removeOverlappingPairs(bestChain);
}

// Функція для створення графу з фрагментів
function createGraph(fragments) {
  const graph = {};

  // Ініціалізація графу: кожен фрагмент має порожній список сусідів
  fragments.forEach((fragment) => {
    graph[fragment] = [];
  });

  // Створення ребер графу: перевірка, які фрагменти можуть бути сусідами
  for (let i = 0; i < fragments.length; i++) {
    for (let j = 0; j < fragments.length; j++) {
      if (i !== j) {
        const firstFragment = fragments[i];
        const secondFragment = fragments[j];
        // Якщо останні два символи першого фрагмента збігаються з першими двома другого
        if (firstFragment.slice(-2) === secondFragment.slice(0, 2)) {
          // Перевіряємо, щоб уникнути дублювання
          if (!graph[firstFragment].includes(secondFragment)) {
            graph[firstFragment].push(secondFragment);
          }
        }
      }
    }
  }

  return graph; // Повертаємо побудований граф
}

// Функція для видалення кожної третьої пари символів у послідовності
function removeOverlappingPairs(result) {
  let finalResult = result.slice(0, 2); // Ініціалізуємо фінальну послідовність першими двома символами

  for (let i = 2; i < result.length; i += 2) {
    // Перевіряємо, чи пара символів не перекривається з попередньою
    if (result[i] !== result[i - 2] || result[i + 1] !== result[i - 1]) {
      finalResult += result[i] + result[i + 1]; // Додаємо пару до фінального результату
    }
  }

  return finalResult; // Повертаємо послідовність без перекриттів
}

// Читання фрагментів з файлу
fs.readFile("fragments.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Помилка при зчитуванні файлу:", err); // Виведення помилки, якщо файл не зчитано
    return;
  }

  // Розбиття вмісту файлу на масив фрагментів
  const fragments = data
    .split(/[\n, ]+/) // Розділення за пробілами, комами або новими рядками
    .map((line) => line.trim()) // Видалення зайвих пробілів
    .filter((line) => line); // Видалення порожніх рядків

  // Виклик основної функції для розв'язання задачі
  const solvedPuzzle = solvePuzzleLogic(fragments);

  // Виведення результатів
  console.log("Фінальна послідовність:", solvedPuzzle);
  console.log(
    "Кількість символів у фінальній послідовності:",
    solvedPuzzle.length
  );
});
