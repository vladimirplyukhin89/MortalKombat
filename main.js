const player1 = {
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'katana', 'fire ball'],
    attack: function() {
        console.log(this.name + ' Fight...');
    }
}
const player2 = {
    name: 'SUBZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ice ball', 'ice floor', 'ice arrow'],
    attack: function () {
        console.log(this.name + ' Fight...');
    }
}
const $arenas = document.querySelector('.arenas');

function createPlayer(playerName, player) {
     const $player1 = document.createElement('div');
     $player1.classList.add(playerName);

     const $progressbar = document.createElement('div');
     $progressbar.classList.add('progressbar');

     const $life = document.createElement('div');
     $life.classList.add('life');
     $life.style.width = player.hp + '%';
     $progressbar.appendChild($life);

     const $name = document.createElement('div');
     $name.classList.add('name');
     $name.innerText = player.name;
     $progressbar.appendChild($name);
     $player1.appendChild($progressbar);

     const $character = document.createElement('div');
     $character.classList.add('character');

     const $img = document.createElement('img');
     $img.src = player.img;
     $character.appendChild($img);

     $player1.appendChild($character);
     $arenas.appendChild($player1);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
