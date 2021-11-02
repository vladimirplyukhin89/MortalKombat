import { getRandomNumber, getTime } from './utils.js';
// import { player1, player2 } from './players.js'

// создаём чат
export const $chat = document.querySelector('.chat');
// переменная лога боя
export const logs = {
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