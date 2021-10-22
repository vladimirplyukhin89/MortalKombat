const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {   //
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];    // массив куда наносим удар

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'katana', 'fire ball'],
    attack: function() {
        console.log(this.name + ' Fight...');
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
        console.log(this.name + ' Fight...');
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
     const $player1 = createElement('div', 'player' + playerObj.player);
     const $progressbar = createElement('div', 'progressbar');
     const $life = createElement('div', 'life');
     const $name = createElement('div', 'name');
     const $character = createElement('div', 'character');
     const $img = createElement('img');

     $life.style.width = playerObj.hp + '%';
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
    const $playerLife = document.querySelector('.player' + this.player + ' .life');

    return $playerLife;
}
function renderHP() {
    this.elHP().style.width = this.hp + '%';
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
    $winTitle.innerText = name + ' wins';

    return $winTitle;
}

function getDraw() {
    const $draw = createElement('div', 'loseTitle');
    $draw.innerText = 'FIGHT AGAIN';

    return $draw;
}

 function getWinner(player, player) {
    return player1.hp === 0 && player2.hp === 0 ? $arenas.appendChild(getDraw()) : player1.hp > 0
        ? $arenas.appendChild(playerWin(player1.name)) : $arenas.appendChild(playerWin(player2.name));
}

// $randomButton.addEventListener('click', function () {
//     player1.changeHP(getRandomNumber(20));
//     player2.changeHP(getRandomNumber(20));
//     player1.renderHP();
//     player2.renderHP();
//     if(player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//
//         return getWinner(player1, player2);
//     }
// })

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

/* удары противника. Возвращает объект в котором мы знаем
на сколько ХП ударил соперник
 */
function enemyAttack() {
    const hit = ATTACK[getRandomNumber(3) - 1]   // переменная для атаки
    const defence = ATTACK[getRandomNumber(3) - 1]  // переменная для защиты
    console.log('####: hit', hit);
    console.log('####: defence', defence);

    return {
        value: getRandomNumber(HIT[hit]), // куда бьёт комп из объекта HIT
        hit,
        defence,
    }

}

$formFight.addEventListener('submit', function(event) {
    event.preventDefault();

    const enemy = enemyAttack();

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
    if(attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
        player2.renderHP();
    }
    if(enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }

    if(player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
        // $reloadButton.disabled = true;

       return getWinner(player1, player2);
    }
    console.log('####: мы', attack)
    console.log('####: он', enemy)
})
