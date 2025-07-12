// Задача: Получение первого элемента массива
// Реализуй дженериковую функцию getFirstElement<T>,
// которая принимает массив элементов и возвращает первый элемент массива.
// Если массив пуст, функция должна вернуть undefined

const getFirstElement = <T>(arr: T[]): T | undefined => {
  return arr.length === 0 ? undefined : arr[0];
};

// Примеры использования:
console.log(getFirstElement([1, 2, 3])); // 1
console.log(getFirstElement(['apple', 'banana', 'cherry'])); // "apple"
console.log(getFirstElement([])); // undefined

// В качестве ответа напиши переписанную функцию getFirstElement
// ❗Для обозначения дженерика используйте `T`
// Пример ответа:
// const getFirstElement = (arr: T): T => {
//   return arr
// }
