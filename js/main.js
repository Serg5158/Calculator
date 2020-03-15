// ("use strict");
class StackNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
  }
}
class Stack {
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
// let stackNumber = new Stack(),
//   stackOper = new Stack(),
//   char = "",
//   numberBufer;
//===========================================================
//===========================================================
function Token(type, value) {
  this.type = type;
  this.value = value;
}
// Токенизатор строкового выражения
function tokenize(str) {
  //удалить пробелы из строки
  str.replace(/\s+/g, "");
  // Разбить строку на отдельные символы
  str = str.split("");
  //накопительные массивы
  var result = [];
  var letterBuffer = [];
  var numberBuffer = [];
  //цикл обхода массива символов
  str.forEach(function(char, idx) {
    if (isDigit(char)) {
      numberBuffer.push(char);
    } else if (char == ".") {
      numberBuffer.push(char);
    } else if (isLetter(char)) {
      if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
        result.push(new Token("Operator", "*"));
      }
      letterBuffer.push(char);
    } else if (isOperator(char)) {
      emptyNumberBufferAsLiteral();
      emptyLetterBufferAsVariables();
      result.push(new Token("Operator", char));
    } else if (isLeftParenthesis(char)) {
      if (letterBuffer.length) {
        result.push(new Token("Function", letterBuffer.join("")));
        letterBuffer = [];
      } else if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
        result.push(new Token("Operator", "*"));
      }
      result.push(new Token("Left Parenthesis", char));
    } else if (isRightParenthesis(char)) {
      emptyLetterBufferAsVariables();
      emptyNumberBufferAsLiteral();
      result.push(new Token("Right Parenthesis", char));
    } else if (isComma(char)) {
      emptyNumberBufferAsLiteral();
      emptyLetterBufferAsVariables();
      result.push(new Token("Function Argument Separator", char));
    }
  });

  if (numberBuffer.length) {
    emptyNumberBufferAsLiteral();
  }

  if (letterBuffer.length) {
    emptyLetterBufferAsVariables();
  }

  return result;

  function emptyLetterBufferAsVariables() {
    var l = letterBuffer.length;
    for (var i = 0; i < l; i++) {
      result.push(new Token("Variable", letterBuffer[i]));
      if (i < l - 1) {
        //there are more Variables left
        result.push(new Token("Operator", "*"));
      }
    }
    letterBuffer = [];
  }

  function emptyNumberBufferAsLiteral() {
    if (numberBuffer.length) {
      result.push(new Token("Literal", numberBuffer.join("")));
      numberBuffer = [];
    }
  }
}
//Проверка  запятая
function isComma(ch) {
  return /,/.test(ch);
}
//Проверка на цифры
function isDigit(ch) {
  return /\d/.test(ch);
}
//Проверка на буквы
function isLetter(ch) {
  return /[a-z]/i.test(ch);
}
//Проверка на операторы
function isOperator(ch) {
  return /\+|-|\*|\/|\^/.test(ch);
}
//Проверка на левую скобку
function isLeftParenthesis(ch) {
  return /\(/.test(ch);
}
//Проверка на праую скобку
function isRightParenthesis(ch) {
  return /\)/.test(ch);
}
//====================================================================
//====================================================================
//Calculator
let total = document.querySelector("#resultat"),
  formula = "",
  minus = false;
//функция ввода и формирование строки выражения -> formula
function input(i) {
  formula += i;
  output(formula);
  return formula;
}
//ограничение вывода на экран не более 12 символов
function output(exp) {
  // total.innerHTML = exp;
  if (exp.length > 12) {
    exp = exp.slice(exp.length - 12);
  }
  total.textContent = exp;
}

//вычисление выражения

function resultat() {
  console.log(tokenize(formula));
  //parser(formula);
  let res = eval(formula).toFixed(2);
  if (res.length > 12) {
    res = "overflow";
  }
  if (res == Infinity) {
    res = "error";
  }
  output(res);
}
//изменение знака выражения
function znak() {
  if (formula[0] !== "-") {
    formula = "-" + formula;
    output(formula);
    minus = true;
  } else {
    formula = formula.slice(1);
    output(formula);
    minus = false;
  }
}
//стирание последнего символа
function backspace() {
  formula = formula.substring(0, formula.length - 1);
  output(formula);
  if (formula.length == 0) {
    reset();
  }
}
//сброс на 0
function reset() {
  formula = "";
  total.innerHTML = 0;
  minus = false;
}

//Поддержка ввода чисел и знаков с клавиатуры
document.addEventListener("keydown", function(event) {
  event.preventDefault();
  switch (event.key) {
    case "Enter":
      resultat();
      break;
    case "1":
      input("1");
      break;
    case "2":
      input("2");
      break;
    case "3":
      input("3");
      break;
    case "4":
      input("4");
      break;
    case "5":
      input("5");
      break;
    case "6":
      input("6");
      break;
    case "7":
      input("7");
      break;
    case "8":
      input("8");
      break;
    case "9":
      input("9");
      break;
    case "0":
      input("0");
      break;
    case "+":
      input("+");
      break;
    case "=":
      resultat();
      break;
    case "/":
      input("/");
      break;
    case "-":
      input("-");
      break;
    case "*":
      input("*");
      break;
    case ".":
      input(".");
      break;
    case "(":
      input("(");
      break;
    case ")":
      input(")");
      break;
    case "^":
      input("**");
      break;
    case "%":
      input("%");
      break;
    case "Escape":
      reset();
      break;
    case "Backspace":
      backspace();
      break;
  }
});

//===============T E S T================================================
//var tokens = tokenize("89sin(45) + 2.2x/7");
var tokens = tokenize(formula);
tokens.forEach(function(token, index) {
  console.log(index + "=> " + token.type + "(" + token.value + ")");
});

//===================================================================
