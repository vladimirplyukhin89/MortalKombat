import { getRandomNumber } from './utils.js';

export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

export const ATTACK = ['head', 'body', 'foot'];    // массив куда наносим удар

/* удары противника. Возвращает объект в котором мы знаем
на сколько ХП ударил соперник
 */
export const enemyAttack = () => {
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
// создаем нашу форму ввиде радио баттон с полями ударов и защиты
export const $formFight = document.querySelector('.control');


// Аналогичная функция enemyAttack, где используем значения, выбранные из формы

export const playerAttack = () => {
    // наш объект ударов из radio button
    const attack = {};
    /*
        Проходимся циклом по форме и если item(radio button) включен и равен hit(удары),
        то записываем в объект значение value = выбранному значению
     */
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandomNumber(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }
    // возвращаем наш объект
    return attack;
}