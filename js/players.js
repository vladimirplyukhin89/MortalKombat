class Player {
    constructor(props) {
        // console.log(props);

        this.player = props.player;
        this.name = props.name;
        this.weapon = props.weapon;
        this.hp = props.hp;
        this.img = props.img;

    }

    attack = () => {
        console.log(`${this.name} Fight!`);
    }

    changeHP = (value) => {
        this.hp -= value;
        if(this.hp <= 0) this.hp = 0;
    }

    elHP = () => {
        const $playerLife = document.querySelector(`.player${this.player} .life`);

        return $playerLife;
    }

    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

}

export const player1 = new Player({
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'katana', 'fire ball'],
})

export const player2 = new Player({
    player: 2,
    name: 'SUBZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ice ball', 'ice floor', 'ice arrow'],
})

