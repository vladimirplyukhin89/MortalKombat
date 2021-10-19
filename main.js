const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

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
    renderHP
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
    renderHP
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
    const $outHP = this.elHP();
    $outHP.style.width = this.hp + '%';
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $btn = createElement('button', 'button');
    $btn.innerText = 'RESTART';
    $reloadWrap.appendChild($btn);

    return $reloadWrap;
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


$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandomNumber(20));
    player2.changeHP(getRandomNumber(20));
    player1.renderHP();
    player2.renderHP();
    player1.elHP();
    player2.elHP();
    if(player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        $arenas.appendChild(createReloadButton());
        const $reloadBtn = document.querySelector('.reloadWrap .button');
        $reloadBtn.addEventListener('click', function () {
            window.location.reload();
        })
        return getWinner(player1, player2);
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
