import { $formFight, playerAttack, HIT, ATTACK, enemyAttack } from './js/config.js';
import Player from './js/players.js';
import { $arenas, createElement } from './js/create.js';
import { logs, generateLogs, $chat } from './js/js.someLogs.js';
import { showRoundResult } from './js/actions.js';


let player1;
let player2;

class Game {
    // метод для звука защиты
    getAudioDefence = () => {
        const body = new Audio('assets/sounds/defence.mp3');
        body.autoplay = true;
        return body;
    }

    // метод для звука удара
    getAudioHit = () => {
        const body = new Audio('assets/sounds/hit.mp3');
        body.autoplay = true;
        return body;
    }
    // Слово FIGHT
    getAudioWord = () => {
        const body = new Audio('assets/sounds/fight.mp3');
        body.autoplay = true;
        return body;
    }
    // Гифка Fight
    //getWordFight = () => {
    //    const img = createElement('img', 'fightWord');
    //    img.src = 'assets/fight.gif';
    //    console.log(typeof img);
    //    return $arenas.appendChild(img);
    //}

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
        return result;
    }

    fight = async () => {
        const {
            player1: { hit: hitPlayer, defence: defencePlayer, value },
            player2: { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy }
        } = await this.getEnemyAttack();
    }

    start = async () => {
        // передаю наших игроков со страницы выбора(index.html) на поле боя
        const player = await this.getPlayer();
        const enemyPlayer = await this.getEnemyPlayer();
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
        });
        player2 = new Player({
            // ложим пришедшего игрока с сервера и дополняем его
            ...p2,
            player: 2,
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
                generateLogs('hit', player2, player1, valueEnemy);
                // вызовем метод удара по нам
                this.getAudioHit();
            } else {
                // метод защиты
                this.getAudioDefence();
            }

            if (defenceEnemy !== hitPlayer) {
                player2.changeHP(value);
                player2.renderHP();
                // Вызоваем функцию лога. Первый аргумент это ключ из объекта logs
                generateLogs('hit', player1, player2, value);
                // Звук нашего удара
                setTimeout(() => {
                    this.getAudioHit();

                }, 250)
            } else {
                // звук нашей защиты
                setTimeout(() => {
                    this.getAudioDefence();
                }, 250)
            }

            // вызываем нашу функцию результата раунда
            showRoundResult(player1, player2);
            /*
            Выводим результаты для того, чтобы сравнивать объект компа и игрока в консоль
             */
            console.log('####: он ударяет в', hitEnemy, ',', 'защищает:', defenceEnemy, 'сила удара -', valueEnemy)
            console.log('####: мы бьём в', hitPlayer, ',', 'защищаем', defencePlayer, 'сила удара -', value)
        })
        this.getAudioWord();
        this.fight();
        //this.getWordFight();
    }
}

// создаем переменную
const game = new Game();

// Начинаем игру с помощью метода start у нашего класса game
game.start();
//game.getWordFight();