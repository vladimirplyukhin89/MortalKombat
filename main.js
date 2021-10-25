const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {   //
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];    // массив куда наносим удар

// переменная лога боя
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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
function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if(className) {
    $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObj) {
     // const $player1 = createElement('div', 'player' + playerObj.player);
     const $player1 = createElement('div', `player${playerObj.player}`);
     const $progressbar = createElement('div', 'progressbar');
     const $life = createElement('div', 'life');
     const $name = createElement('div', 'name');
     const $character = createElement('div', 'character');
     const $img = createElement('img');

     $life.style.width = `${playerObj.hp}%`;
     $img.src = playerObj.img;
     $name.innerText = playerObj.name;

     $progressbar.appendChild($life);
     $progressbar.appendChild($name);
     $player1.appendChild($progressbar);
     $player1.appendChild($character);

     $character.appendChild($img);

     return $player1;
}

function getRandomNumber(max) {
    return Math.ceil(Math.random() * max);
}

function changeHP(value) {
    this.hp -= value;
    if(this.hp <= 0) this.hp = 0;
}
function elHP() {
    const $playerLife = document.querySelector(`.player${this.player} .life`);

    return $playerLife;
}

function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

function createReloadButton() {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'RESTART';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = `${name} wins`;

    return $winTitle;
}

function getDraw() {
    const $draw = createElement('div', 'loseTitle');
    $draw.innerText = 'FIGHT AGAIN';

    return $draw;
}

/*
Функцию, кот. сравнивает ХП игроков и выводит победителя на экран и в лог боя
 */
 function getWinner(player, player) {
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

/* удары противника. Возвращает объект в котором мы знаем
на сколько ХП ударил соперник
 */
function enemyAttack() {
    const hit = ATTACK[getRandomNumber(3) - 1]   // переменная для атаки
    const defence = ATTACK[getRandomNumber(3) - 1]  // переменная для защиты
    // console.log('####: hit', hit);
    // console.log('####: defence', defence);

    return {
        value: getRandomNumber(HIT[hit]), // куда бьёт комп из объекта HIT
        hit,
        defence,
    }

}
/*
Аналогичная функция enemyAttack
 */
function playerAttack() {
    // наш объект ударов из radio button
    const attack = {};
    /*
        Проходимся циклом по форме и если item(radio button) включен и равен hit(удары),
        то записываем в объект значение value = выбранному значению
     */
    for(let item of $formFight) {
        if(item.checked && item.name === 'hit') {
            attack.value = getRandomNumber(HIT[item.value]);
            attack.hit = item.value;
        }
        if(item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }
    // возвращаем наш объект
    return attack;
}
/*
Добавляет функцию, которая показывает результат раунда
 */
function showRoundResult() {
    if(player1.hp === 0 || player2.hp === 0) {
        // создаём кнопку рестарта страницы
        createReloadButton();

        // при победе одного игрока убираем форму с экрана
        $formFight.style.display = 'none';
        // добавляем функцию, которая сравнивает ХП игроков и выводит победителя на экран
        return getWinner(player1, player2);
    }
}

/*
Создаём функцию точного времени, которую потом выведем в лог
 */
function getTime(){
    const date = new Date();
    // преобразуем чтобы возвращался 0 в начале, когда приходит 1 цифра.
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`)

    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;
    return time;
}

// Показываем сообщение о начале боя
function showFirstMessage(type) {
    const text = logs[type].replace('[time]', getTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
    const elem = `<p>${text}</p>` // создаем строку
    $chat.insertAdjacentHTML('afterbegin', elem); //  к чату добавим нашу строку сразу после открывающегося тега p
}
// Вызовем нашу функцию чтобы сразу получить в чат сообщение о бое
showFirstMessage('start');

// Создаём функцию последнего сообщения в лог боя и добавляем её в getWinner
// function showLastMessage(type, player, player) {
//     let text, elem; // переменные для switch case
//     switch (type) {
//         case 'end':
//             text = logs[type][getRandomNumber(logs[type].length - 1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
//             break;
//         case 'draw':
//             text = logs[type];
//             break;
//     }
//     elem = `<p>${text}</p>`;
//     $chat.insertAdjacentHTML('afterbegin', elem); //  к чату добавим нашу строку сразу после открывающегося тега p
// }

// console.log(last('end', player, player));
/*
 Cоздали функцию для логов с параметрами типа и двумя игроками.
  1й передаётся игрок, переданный в параметрах, бьёт; 2й передаётся игрок, переданный в параметрах, защищается
 */
function generateLogs(type, player, player, value) {
    const len = logs[type].length - 1; // переменная, кот. определяет длинну массива, кот. находится в значение объекта
    let text; // переменная для switch case;
    let elem; // для форматирования в строку и дальнейшим выводом на экран
    /*
    В переменную положим  результат из нашего лога. С помощью replace будем заменять playerKick и
    playerDefence на имя бьющего и защищающегося игрока.
    Так же взависимости от type подставляем значение из лога
     */
    // let text = logs[type][getRandomNumber(logs[type].length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
    switch(type) {
        case 'hit':
            text = logs[type][getRandomNumber(len)].replace('[playerKick]', player2.name).replace('[playerDefence]',player1.name)
            elem = `<p>${getTime()} ${text} -${value} [${player2.hp}/100]</p>`;
            break;
        case 'defence':
            text = logs[type][getRandomNumber(len)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            elem = `<p>${getTime()} ${text}</p>`;
        case 'draw':
            text = logs[type];
            elem = `${getTime()} ${text}`;
            break;
        case 'end':
            text = logs[type][getRandomNumber(len)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            elem = `<p>${getTime()} ${text}</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', elem) // к чату добавим нашу строку сразу после открывающегося тега <p>
}

$formFight.addEventListener('submit', function(event) {
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
    showRoundResult();
    /*
    Выводим результаты для того, чтобы сравнивать объект компа и игрока
     */
    console.log('####: мы', player)
    console.log('####: он', enemy)
})
