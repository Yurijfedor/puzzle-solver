const fs = require("fs");

// Функція для пошуку найдовшої послідовності
function solvePuzzleLogic(fragments) {
  const graph = createGraph(fragments);
  const memo = new Map(); // Для збереження результатів пошуку (динамічне програмування)

  // Функція для рекурсивного пошуку найдовшого шляху
  function dfs(fragment, visited) {
    if (memo.has(fragment)) {
      return memo.get(fragment);
    }

    visited.add(fragment);

    let longestChain = fragment;
    for (const neighbor of graph[fragment]) {
      if (!visited.has(neighbor)) {
        const chain = fragment + dfs(neighbor, visited);
        if (chain.length > longestChain.length) {
          longestChain = chain;
        }
      }
    }

    visited.delete(fragment);
    memo.set(fragment, longestChain);
    return longestChain;
  }

  let bestChain = "";
  for (const fragment of fragments) {
    const chain = dfs(fragment, new Set());
    if (chain.length > bestChain.length) {
      bestChain = chain;
    }
  }

  // Обробка результату для видалення кожної третьої пари
  return removeOverlappingPairs(bestChain);
}

// Функція для створення графа з фрагментів
function createGraph(fragments) {
  const graph = {};

  // Ініціалізація графу: кожен фрагмент має порожній список сусідів
  fragments.forEach((fragment) => {
    graph[fragment] = [];
  });

  // Створення з'єднань (ребер) між фрагментами
  for (let i = 0; i < fragments.length; i++) {
    for (let j = 0; j < fragments.length; j++) {
      if (i !== j) {
        const firstFragment = fragments[i];
        const secondFragment = fragments[j];
        // Якщо останні два символи першого фрагмента збігаються з першими двома другого фрагмента
        if (firstFragment.slice(-2) === secondFragment.slice(0, 2)) {
          // Перевірка, чи вже не додано цей фрагмент як сусід
          if (!graph[firstFragment].includes(secondFragment)) {
            graph[firstFragment].push(secondFragment);
          }
        }
      }
    }
  }

  return graph;
}

// Функція для видалення кожної третьої пари
function removeOverlappingPairs(result) {
  let finalResult = result.slice(0, 2); // Додаємо перші два символи
  console.log(finalResult);

  for (let i = 2; i < result.length; i += 2) {
    // Додаємо тільки ту пару, яка не перекривається з попередньою
    if (result[i] !== result[i - 2] || result[i + 1] !== result[i - 1]) {
      finalResult += result[i] + result[i + 1];
    }
  }

  return finalResult;
}

// Читання фрагментів з файлу
fs.readFile("fragments.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Помилка при зчитуванні файлу:", err);
    return;
  }

  const fragments = data
    .split(/[\n, ]+/)
    .map((line) => line.trim())
    .filter((line) => line);
  const solvedPuzzle = solvePuzzleLogic(fragments);

  // Виведення фінальної послідовності без перекриттів
  console.log("Фінальна послідовність:", solvedPuzzle);
  console.log(
    "Кількість символів у фінальній послідовності:",
    solvedPuzzle.length
  );
});
