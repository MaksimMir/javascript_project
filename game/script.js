// Глобальные переменные:                            
const FIELD_SIZE_X = 20;//строки
const FIELD_SIZE_Y = 20;//столбцы
const SNAKE_SPEED = 200; // Интервал между перемещениями змейки
let snake = []; // Сама змейка
let direction = 'y+'; // Направление движения змейки
let gameIsRunning = false; // Запущена ли игра
let snake_timer; // Таймер змейки
let bomb_timer; 
let score = 0; // Результат

const scoreOfGame = document.querySelector('.score_game');

function init() {
    prepareGameField(); // Генерация поля

    let wrap = document.querySelector('.wrap');
    // Подгоняем размер контейнера под игровое поле
    
	/*
	if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '380px';
    }
    else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }
    */
    wrap.style.width = '400px';
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

// Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    let game_table = document.createElement('table');
    game_table.classList.add('game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        let row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            let cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.append(cell); // Добавление ячейки
        }
        game_table.append(row); // Добавление строки
    }

    document.getElementById('snake-field').append(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() {
    gameIsRunning = true;
    respawn();//создали змейку

    snake_timer = setInterval(move, SNAKE_SPEED);//каждые 200мс запускаем функцию move
    setTimeout(createFood, 5000);
    bomb_timer = setInterval(createBomb, 7000);
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    let start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    let start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Хвост змейки
    let snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.className + ' snake-unit');
    // Голова змейки
    let snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.className + ' snake-unit');

    snake.push(snake_tail);
    snake.push(snake_head);
}

/**
 * Движение змейки
 */
function move() {

    // Сборка классов
    let snake_head_classes = snake[snake.length - 1].className.split(' ');

    // Сдвиг головы
    let new_unit;
    let snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив
    let coord_y = parseInt(snake_coords[1]);
    let coord_x = parseInt(snake_coords[2]);

    // Определяем новую точку
    if (direction == 'x-') {
        if (coord_x <= 0) {
            coord_x = 20;
        }
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {
        if (coord_x >= 19) {
            coord_x = -1;
        }
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {
        if (coord_y <= 0) {
            coord_y = 20;
        }
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
        if (coord_y >= 19) {
            coord_y = -1;
        }
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }

    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля

    if (!isSnakeUnit(new_unit) && new_unit !== undefined && !haveBomb(new_unit)) {
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.className + ' snake-unit');
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            // Находим хвост
            var removed = snake.splice(0, 1)[0];
            var classes = removed.className.split(' ');

            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    }
    else {
        finishTheGame();
    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) {
    let check = false;

    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    let check = false;

    const unit_classes = unit.className.split(' ');

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();
        score++;
        scoreOfGame.innerHTML = score;
    }
    return check;
}

/**
 * Создание еды
 */
function createFood() {
    let foodCreated = false;

    while (!foodCreated) { //пока еду не создали
        // рандом
        const food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        const food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        const food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        let food_cell_classes = food_cell.className.split(' ');

        // проверка на змейку
        if (!food_cell_classes.includes('snake-unit')) {
            let classes = '';
            for (let i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}

function haveBomb(unit) {
    let check = false;

    const unit_classes = unit.className.split(' ');

    if (unit_classes.includes('bomb-unit')) {
        check = true;
        createBomb();
    }
    return check;
}

function createBomb() {   
    const bomb_x = Math.floor(Math.random() * FIELD_SIZE_X);
    const bomb_y = Math.floor(Math.random() * FIELD_SIZE_Y);

    const bomb_cell = document.getElementsByClassName('cell-' + bomb_y + '-' + bomb_x)[0];
    let bomb_cell_classes = bomb_cell.className.split(' ');

    // проверка на змейку
    if (!bomb_cell_classes.includes('snake-unit') && !bomb_cell_classes.includes('food-unit')) {
        let classes = '';
        for (let i = 0; i < bomb_cell_classes.length; i++) {
            classes += bomb_cell_classes[i] + ' ';
        }

        bomb_cell.setAttribute('class', classes + 'bomb-unit');          
    }
    setTimeout(() => {
        bomb_cell.classList.remove('bomb-unit');
    }, 4000);
    
}

/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {

	switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    clearInterval(bomb_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;