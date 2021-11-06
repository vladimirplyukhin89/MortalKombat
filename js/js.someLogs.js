import { getRandomNumber, getTime } from './utils.js';
// import { player1, player2 } from './players.js'

// создаём чат
export const $chat = document.querySelector('.chat');
// переменная лога боя
export const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - мёртв',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - победитель',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил кулаком челюсть врага.',
        '[playerDefence] сдержал удар, как вдруг, неожиданно [playerKick] случайно сделал супер удар в противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] поставил блок, и внезапно неустрашимый [playerKick] отчаянно в прыжке выкинул хайкик в голову оппонента.',
        '[playerDefence] сделал оттяжку, но внезапно [playerKick] догнал его быстрой серией комбинацией с рук в голову и тело оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] ушёл от атаки, но внезапно [playerKick] обманув левым хуком, выкинул сильный правый боковой в открытую голову противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] сделал сильную удар ногой по рёбрам соперника.',
        '[playerDefence] поставил локтевой блок, но внезапно [playerKick] сделал свой фирменный котнтраудар и догнал соперника сильным майя гири в грудь',
        '[playerDefence] пытался что-то сказать, но жестокий [playerKick] размозжил рукой с локтя нос противника.',
        '[playerDefence] прижался к краю, как внезапно безумный [playerKick] с разворота, уранил оглушительный удар ногой сверху в левое плечо соперника.',
        '[playerDefence] поймал удар, но [playerKick]  не остановил атаку и в клинче коленом пробил грудь соперника, бросив на пол в кинце атаки.',
        '[playerDefence] пропустил сильный лоукик, а в это время беспощадный [playerKick] провёл свой фирменный бросок с серией острой атаки на земле.',
        '[playerDefence] увернулся, но внезапно [playerKick] стремительно набросил свою супер атаку и сломал челюсть противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар ногой, пробив блок оппонента.',
        '[playerDefence] поставил плотный блок, как вдруг, неожиданно [playerKick] сделал бросок оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] нанёс сильный удар по телу врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] уходя от удара нанёс сильнейший боковой справа и слева.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] схватил соперника и бросил на землю через себя.',
        '[playerKick] потерял момент и [playerDefence] поставил котнраблок на удар коленом по печени соперника.',
        '[playerKick] пошатнулся от удара [playerDefence] успел поставить блок на хайкик соперника.',
        '[playerKick] старался провести удар, но ловкий [playerDefence] ушел в сторону от удара и успел кинуть в догонку четкий кросс.',
        '[playerKick] замедлился и [playerDefence] успел блокировать удар в солнечное сплетение.',
        '[playerKick] не думая пошел в атаку, потому умный [playerDefence] прыгнул с летящим коленом вперёд и пошатнул врага.',
        '[playerKick] промахнулся и [playerDefence] на отходе провел серийную комбинацию по сопернику.'
    ],
    draw: 'Мы ещё встретимся!'
};

/*
 Cоздали функцию для логов с параметрами типа и двумя игроками.
  1й передаётся игрок, переданный в параметрах, бьёт; 2й передаётся игрок, переданный в параметрах, защищается
  В параметрах функции делаем 2 деструктуризации объектов player1 и player2
 */
export const generateLogs = (type, { name }, { name: playerName, hp }, value) => {
    const len = logs[type].length - 1; // переменная, кот. определяет длинну массива, кот. находится в значение объекта
    let text; // переменная для switch case;
    let elem; // для форматирования в строку и дальнейшим выводом на экран
    /*
    В переменную положим  результат из нашего лога. С помощью replace будем заменять playerKick и
    playerDefence на имя бьющего и защищающегося игрока.
    Так же взависимости от type подставляем значение из лога
     */
    switch (type) {
        // сообщения о начале игры, кот. выводится в чат игры
        case 'start':
            text = logs[type].replace('[time]', getTime())
                .replace('[player1]', name)
                .replace('[player2]', playerName);
            elem = `<p>${text}</p>`;
            break;
        // сообщение о ударе, кот. выводится в чат игры
        case 'hit':
            text = logs[type][getRandomNumber(len)]
                .replace('[playerKick]', playerName)
                .replace('[playerDefence]', name)
            elem = `<p>${getTime()} ${text} -${value} [${hp}/100]</p>`; // [${hp}/100] - деструктуризация player2

            break;
        // сообщение о защите, кот. выводится в чат игры
        case 'defence':
            text = logs[type][getRandomNumber(len)]
                .replace('[playerKick]', name)
                .replace('[playerDefence]', playerName);
            elem = `<p>${getTime()} ${text}</p>`;
        // метод для ничьей, кот. выводится в чат игры
        case 'draw':
            text = logs[type];
            elem = `${getTime()} ${text}`;
            break;
        // сообщение о ничьей, кот. выводится в чат игры
        case 'end':
            text = logs[type][getRandomNumber(len)]
                .replace('[playerWins]', name)
                .replace('[playerLose]', playerName);
            elem = `<p>${getTime()} ${text}</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', elem) // к чату добавим нашу строку сразу после открывающегося тега <p>
}