// функция для кнопки рестарта
export const createReloadButton = () => {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'RESTART';

    // по клику используем метод для перезагрузки страницы
    // $reloadButton.addEventListener('click', () => window.location.reload());
    $reloadButton.addEventListener('click', () => window.location.pathname = 'index.html');

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}
// функция для создания элементов, которая укрощает дублирование кода
export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
    }

    return $tag;
}
// создаём арену для вывода имя победителя и кнопки RESTART
export const $arenas = document.querySelector('.arenas');
