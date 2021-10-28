import { createPlayer, createElement, createReloadButton, $arenas } from './create.js';
import { generateLogs } from './js.someLogs.js';
import { $formFight } from './config.js';
import { changeHP, elHP, renderHP } from './hp.js';

// создаем функцию ничьи
export const getDraw = () => {
    const $draw = createElement('div', 'loseTitle');
    $draw.innerText = 'FIGHT AGAIN';

    return $draw;
}

// функция, которая выводит имя победителя на экран
export const playerWin = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = `${name} wins`;

    return $winTitle;
}

// Функцию, кот. сравнивает ХП игроков и выводит победителя на экран и в лог боя
export const getWinner = (player1, player2) => {
    if(player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(getDraw());
        generateLogs('draw', player1, player2);
    } else if (player1.hp > 0) {
        $arenas.appendChild(playerWin(player1.name));
        generateLogs('end', player1, player2);
    } else {
        $arenas.appendChild(playerWin(player2.name));
        generateLogs('end', player2, player1);
    }
}

// Добавляем функцию, которая показывает результат раунда

export const showRoundResult = (player1, player2) => {
    if(player1.hp === 0 || player2.hp === 0) {
        // создаём кнопку рестарта страницы
        createReloadButton();

        // при победе одного игрока убираем форму с экрана
        $formFight.style.display = 'none';
        // добавляем функцию, которая сравнивает ХП игроков и выводит победителя на экран
        return getWinner(player1, player2);
    }
}

