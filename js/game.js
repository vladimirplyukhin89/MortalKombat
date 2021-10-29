import { logs, generateLogs, $chat } from './js.someLogs.js';
import { getRandomNumber, getTime } from './utils.js';
import { createPlayer, createElement, $arenas } from './create.js';
import { player1, player2 } from './players.js';
import { $formFight, enemyAttack, playerAttack } from './config.js';
import { showRoundResult } from './actions.js';


class Game {
    constructor(props) {

    }
    // задаю метод showFirstMessage для вывода сообщения о начале игры в чата игры
    showFirstMessage = (type) => {
        const text = logs[type].replace('[time]', getTime())
            .replace('[player1]', player1.name)
            .replace('[player2]', player2.name);
        const elem = `<p>${text}</p>` // создаем строку
        $chat.insertAdjacentHTML('afterbegin', elem);
    }

    // задаю метод start нашего класса для старта игры
    start = () => {
        // работаем с формой
        $formFight.addEventListener('submit', (event) => {
            event.preventDefault(); // останавливаем отправку данных на сервер в форме

            // компьютер играет за игрока
            // сделаем деструктуризацию объекта enemy
            const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
            // мы играем за первого игрока
            // сделаем деструктуризацию объекта player
            const {hit, defence, value} = playerAttack();
            /*
            Делаем проверку на удары и защиту. Если наш блок не равен удару компа, то от наших ХП отнимается value.
            И наоборот, если защита игрока не равна нашим ударам, то отнимает значение value игрока от ХП компа
             */
            if(defence !== hitEnemy) {
                player1.changeHP(valueEnemy);
                player1.renderHP();
                // Вызоваем функцию лога. Первый аргумент это ключ из объекта logs
                generateLogs('hit', player2, player1, valueEnemy)
            }
            if(defenceEnemy !== hit) {
                player2.changeHP(value);
                player2.renderHP();
                // Вызоваем функцию лога. Первый аргумент это ключ из объекта logs
                generateLogs('hit', player1, player2, value)
            }
            // вызываем нашу функцию результата раунда
            showRoundResult(player1, player2);
            /*
            Выводим результаты для того, чтобы сравнивать объект компа и игрока в консоль
             */
            console.log('####: мы ударяем в', hitEnemy, 'защищаем:', defenceEnemy, 'сила удара -', valueEnemy)
            console.log('####: он бьёт в', hit, 'защищает', defence, 'сила удара -', value)
        })
    }
}

export const game = new Game();
