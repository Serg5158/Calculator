class StackNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
  }
}
export class Stack {
  constructor() {
    this.root = null; // корневое значение - стек пуст
    this.countElement = 0; //количество элементов в стеке
  }
  isEmpty() {
    return this.countElement === 0; // проверка состояния стека (true если пустой)
  }
  size() {
    return this.countElement; // количество элементов в стеке
  }
  push(value) {
    // добавление элемента в стек
    let oldFirst = this.root; // запоминаем верхнее значение
    this.root = new StackNode(value); // помещаем на верх стека новое значение
    this.root.prev = oldFirst; // значение под верхним элементом (предыдущее)
    this.countElement++; // увеличиваем счетчик стека
  }
  pop() {
    // извлечение элемента из стека
    if (this.isEmpty) return null; // проверяем, если стек пуст - возвращаем null
    let oldFirst = this.root; //	запоминаем верхнее значение
    this.root = oldFirst.prev; // указатель текущего значения стека смещаем на пред. число
    this.countElement--; // уменьшаем счетчик стека
    return oldFirst.value; // возвращаем изьятое из стека значение
  }
}
