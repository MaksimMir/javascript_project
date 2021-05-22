let event, ok;

let answers = [];

func(works, 'a');
switch (event) {
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
        func(works, 'b');
        switch (event) {
            case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно
                func(works, 'd');

                break;
            case 2: // Второе действие   Если ввели 2 то также переходим на 4 окно
                func(works, 'd');

                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2: // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
        func(works, 'c');
        switch (event) {
            case 1: // Второе действие
                func(works, 'd');

                break;
            case 2: // Второе действие
                func(works, 'd');

                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case -1: // Первое действие
        break;
    default:
        alert('Ошибка');
}
alert('Спасибо за игру');

//------------------------------------------

function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
	return true;
    
}

function func(obj, letter) {
    do {//Выводим первый вопрос
        ok = false;
        event = +prompt(obj[`${letter}00`] + obj[`${letter}1`] + obj[`${letter}2`] + '-1 - Выход из игры');
       
        if (event == -1) {
            break;
        }
        else {
            ok = isAnswer(obj[`${letter}0`], event);
        }
    } while (!ok);
    answers.push({quest: obj[`${letter}00`], answer: obj[`${letter}${event}`]});
    return event;
}

function func2() {
    let q = prompt('Номер интересующего вас вороса?');

    for (let i = 0; i < answers.length; i++) {
        if (i == (q - 1)) {
            console.log(`На ворос - ${answers[i].quest}, вы ответили - ${answers[i].answer}`);
        }
        
    }
}

func2();