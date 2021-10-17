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
    }
}
const player2 = {
    player: 2,
    name: 'SUBZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ice ball', 'ice floor', 'ice arrow'],
    attack: function () {
        console.log(this.name + ' Fight...');
    }
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

function getRandomNumber() {
    return Math.ceil(Math.random() * 20);
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= getRandomNumber();
    if(player.hp <= 0){
        player.hp = 0;
    }
    $playerLife.style.width = player.hp + '%';
}

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' wins';
    $randomButton.disabled = true;

    return $winTitle;
}

// function playerLose(name) {
//     const $loseTitle = createElement('div', 'loseTitle');
//     $loseTitle.innerText = name + ' lose';
//
//     return $loseTitle;
// }

function getDraw() {
    const $draw = createElement('div', 'loseTitle');
    $draw.innerText = 'FIGHT AGAIN';
    $randomButton.disabled = true;

    return $draw;
}

 function getWinner(player, player) {
    return player1.hp === 0 && player2.hp === 0 ? $arenas.appendChild(getDraw()) : player1.hp > 0
        ? $arenas.appendChild(playerWin(player1.name)) : $arenas.appendChild(playerWin(player2.name));
}
$randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);
    if(player1.hp === 0 || player2.hp === 0) {
        return getWinner(player1, player2);
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
