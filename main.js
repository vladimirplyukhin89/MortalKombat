import { $formFight, playerAttack, HIT, ATTACK, enemyAttack } from './js/config.js';
import Player from './js/players.js';
import { $arenas } from './js/create.js';
import { logs, generateLogs, $chat } from './js/js.someLogs.js';
import { showRoundResult } from './js/actions.js';


let player1;
let player2;

class Game {
    // запрос для выбора нашего персонажа
    getPlayer = async () => {
        // используем fetch(это промис), для отправки и получения ответа от сервера
        const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
            .then(res => res.json());
        // json - javascript object notion
        return body;
    }
    // подобный запрос для выбора персонажа противника
    getEnemyPlayer = async () => {
        const enemyBody = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
            .then(res => res.json());
        return enemyBody;
    }
    // запрос для
    getEnemyAttack = async ({ hit, defence } = playerAttack()) => {
        const body = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        });
        let result = await body.json();
        // console.log(result);
        return result;
    }

    fight = async () => {
        const {
            player1: { hit: hitPlayer, defence: defencePlayer, value },
            player2: { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy }
        } = await this.getEnemyAttack;
    }

    start = async () => {
        // передаю наших игроков со страницы выбора(index.html) на поле боя
        const player = await this.getPlayer();
        const enemyPlayer = await this.getEnemyPlayer();
        // console.log(this.getEnemyPlayer, this.getPlayer)
        let p1 = JSON.parse(localStorage.getItem('player1'));
        let p2 = enemyPlayer;
        /*
        дождёмся ответа от нашего сервера чтобы после в переменной вывести на страницу выбор нашего игрока
        this потому что вызываем из нашего класса
         */
        player1 = new Player({
            // ложим пришедшего игрока с сервера и дополняем его
            ...p1,
            player: 1,
            // rootSelector: 'arenas',
        });
        player2 = new Player({
            // ложим пришедшего игрока с сервера и дополняем его
            ...p2,
            player: 2,
            // rootSelector: 'arenas',
        });
        // Выводим наших игроков на экран через метод createPlayer класса Player
        $arenas.append(player1.createPlayer(player1));
        $arenas.append(player2.createPlayer(player2));
        // Показываем сообщение о начале боя с помощью метода showFirstMessage у класса game
        generateLogs('start', player1, player2);

        // работаем с формой
        $formFight.addEventListener('submit', (event) => {
            event.preventDefault(); // останавливаем отправку данных на сервер в форме
            // компьютер играет за игрока
            // сделаем деструктуризацию объекта enemy
            const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemyAttack();
            // мы играем за первого игрока
            // сделаем деструктуризацию объекта player
            const { hit: hitPlayer, defence: defencePlayer, value: value } = playerAttack();
            /*
            Делаем проверку на удары и защиту. Если наш блок не равен удару компа, то от наших ХП отнимается value.
            И наоборот, если защита игрока не равна нашим ударам, то отнимает значение value игрока от ХП компа
             */
            if (defencePlayer !== hitEnemy) {
                player1.changeHP(valueEnemy);
                player1.renderHP();
                // Вызоваем функцию лога. Первый аргумент это ключ из объекта logs
                generateLogs('hit', player2, player1, valueEnemy)
            }
            if (defenceEnemy !== hitPlayer) {
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
            console.log('####: он бьёт в', hitPlayer, 'защищает', defencePlayer, 'сила удара -', value)
        })
        this.fight;
    }
}

// создаем переменную
const game = new Game();

// Начинаем игру с помощью метода start у нашего класса game
game.start();