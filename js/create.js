export const createReloadButton = () => {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'RESTART';

    $reloadButton.addEventListener('click', () => window.location.reload());

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

export const createPlayer = (playerObj) => {
    // сделаем деструктуризацию входного объекта
    const {name, img, hp, player} = playerObj;
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

    return $player1;
}

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
    }

    return $tag;
}
// создаём арену для вывода имя победителя и кнопки RESTART
export const $arenas = document.querySelector('.arenas');