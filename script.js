// 1

var a = 1, b = 1, c, d;
c = ++a; console.log(c);        // 2 - применен преинкремент, т.е сначала производится операция сложения, а потом сумма записывается в переменную
d = b++; console.log(d);        // 1 - применен постинкркмент, поэтому значение переменной булет проссумировано после присвоения значения переменной в другую переменную
c = (2+ ++a); console.log(c);   // 5 - после первого действия а = 2, применен преинкремент, в результате чего а становится равной 3, сумма всего действия 5
d = (2+ b++); console.log(d);   // 4 - после первого действия b = 2, применен постинкремент, в результате чего переменнная b изменит значение после действия, сумма всего действия 4
console.log(a);                 // 3 - после двух действий с переменной с значение переменной a становится 3
console.log(b);                 // 3 - после двух действий c переменной d значение переменной b становится 3

// 2

var y = 2;
var x = 1 + (a *= 2); // 5

// 3

let min = -10, max = 10, num1, num2;

num1 = Math.floor(min + Math.random() * (max + 1 - min));
num2 = Math.floor(min + Math.random() * (max + 1 - min));

if (num1 >= 0 && num2 >= 0) {
    console.log(num1 - num2);
} else if (num1 < 0 && num2 < 0) {
    console.log(num1 * num2);
} else {
    console.log(num1 + num2);
}

// 4

let number = Math.floor(Math.random() * (15 + 1));

function printNumber(n) {
    if (n <= 15) {
        console.log(n)
    } else {
        return;
    }

    n++; 
    printNumber(n);  
}

printNumber(number);

// 5, 6

let param1 = +prompt('Введите первое число');
let param2 = +prompt('Введите второе число');
let operation = prompt('Введите знак необходимой вам операции(+, -, *, /)');

function sum(p1, p2) {
    return p1 + p2;
}

function sub(p1, p2) {
    return p1 - p2;
}

function mul(p1, p2) {
    return p1 * p2;
}

function div(p1, p2) {
    return p1 / p2;
}

function mathOperation(arg1, arg2, ops) {
    switch (ops) {
        case '+':
            alert(`Резудьтат сложения равен ${sum(arg1, arg2)}`);
            break;
        case '-':
            alert(`Резудьтат вычитания равен ${sub(arg1, arg2)}`);
            break;
        case '*':
            alert(`Резудьтат умножения равен ${mul(arg1, arg2)}`);
            break;
        case '/':
            alert(`Резудьтат деления равен ${div(arg1, arg2)}`);
            break;
    }
}

mathOperation(param1, param2, operation);

// 7 null не равно нулю, так как для нестрогого сравнения это отдельное правило, когда null ни к чему не приводится и является отдельным типом. Однако применяя сравнения > < >= <= нужно знать что null приводится к нулю поэтому значение null >= 0 истинно.

// 9

function power(val, pow) {
    if (pow == 1) {
        return val;
    } else {
        return val * power(val, pow - 1);
    }
}

console.log(power(5, 3));
