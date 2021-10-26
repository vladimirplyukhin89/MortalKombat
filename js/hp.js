export function changeHP(value) {
    this.hp -= value;
    if(this.hp <= 0) this.hp = 0;
}
export function elHP() {
    const $playerLife = document.querySelector(`.player${this.player} .life`);

    return $playerLife;
}

export function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}