import { generateLogs } from './js.someLogs.js';
import { createElement, $arenas } from './create.js';
import Player from './players.js';
import { $formFight, enemyAttack, playerAttack } from './config.js';
import { showRoundResult } from './actions.js';


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

    getGifFight = () => {
        const img = createElement('img', 'fightgif');
        img.src = 'assets/fight.gif';
        const $h = document.querySelector('h2');
        $h.appendChild(img);

        setTimeout(() => {
            img.style.display = 'none';
        }, 1000)
    }

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

    // запрос для атаки врага
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
        this.getGifFight();
    }
}

// создаем переменную
const game = new Game();

export default game;