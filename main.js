import { getRandomNumber, getTime } from './js/utils.js';
import { changeHP, elHP, renderHP } from './js/hp.js';
import { logs, generateLogs, $chat } from './js/js.someLogs.js';
import { HIT, ATTACK, enemyAttack, playerAttack, $formFight } from './js/config.js';
import { createReloadButton, createElement, createPlayer, $arenas } from './js/create.js';
import { getDraw, getWinner, playerWin, showRoundResult } from './js/actions.js';


const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'katana', 'fire ball'],
    attack: function() {
        console.log(`${this.name} Fight...`);
    },
    elHP,
    changeHP,
    renderHP,
}

const player2 = {
    player: 2,
    name: 'SUBZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ice ball', 'ice floor', 'ice arrow'],
    attack: function () {
        console.log(`${this.name} Fight...`);
    },
    elHP,
    changeHP,
    renderHP,
}

// Выведем игроков на экран
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

// Показываем сообщение о начале боя
const showFirstMessage = (type) => {
    const text = logs[type].replace('[time]', getTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
    const elem = `<p>${text}</p>` // создаем строку
    $chat.insertAdjacentHTML('afterbegin', elem); //  к чату добавим нашу строку сразу после открывающегося тега p
}

// Вызовем нашу функцию чтобы сразу получить в чат сообщение о бое
showFirstMessage('start');

$formFight.addEventListener('submit', (event) => {
    event.preventDefault(); // останавливаем отправку данных на сервер в форме

    // компьютер играет за игрока
    const enemy = enemyAttack();
    // мы играем за первого игрока
    const player = playerAttack();
    /*
    Делаем проверку на удары и защиту. Если наш блок не равен удару компа, то от наших ХП отнимается value.
    И наоборот, если защита игрока не равна нашим ударам, то отнимает значение value игрока от ХП компа
     */
    if(player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        // Вызоваем функцию лога. Первый аргумент это ключ из объекта logs
        generateLogs('hit', player2, player1, enemy.value)
    }
    if(enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        // Вызоваем функцию лога. Первый аргумент это ключ из объекта logs
        generateLogs('hit', player1, player2, player.value)
    }
    // вызываем нашу функцию результата раунда
    showRoundResult(player1, player2);
    /*
    Выводим результаты для того, чтобы сравнивать объект компа и игрока
     */
    console.log('####: мы', player)
    console.log('####: он', enemy)
})