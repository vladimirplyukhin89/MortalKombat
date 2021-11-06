import { createElement, $arenas } from './create.js'

export default class Player {
    constructor(props) {

        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;

    }

    attack = () => {
        console.log(`${this.name} Fight!`);
    }

    changeHP = (value) => {
        this.hp -= value;
        if (this.hp <= 0) this.hp = 0;
    }

    elHP = () => {
        const $playerLife = document.querySelector(`.player${this.player} .life`);

        return $playerLife;
    }

    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

    createPlayer = (playerObj) => {
        // сделаем деструктуризацию входного объекта
        const { name, img, hp, player } = playerObj;
        // создаем див, куда будем добавлять значения из входного объекта
        const $player1 = createElement('div', `player${player}`); // номер игрока
        const $progressbar = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $character = createElement('div', 'character');
        const $img = createElement('img');

        $life.style.width = `${hp}%`; // школа жизни зависит от ХП
        $img.src = img; // Картинка выбранного игрока из входного объекта
        $name.innerText = name; // имя игрока

        // добавим всё это на страницу
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $player1.appendChild($progressbar);
        $player1.appendChild($character);
        $character.appendChild($img);

        $arenas.appendChild($player1);
    }

}

