let fighters = true;
const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
const $enemyPlayer = document.querySelector('.enemy__player');

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');

    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());

    let imgSrc = null;
    createEmptyPlayerBlock();

    //let imgSrcEnemy = null;


    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');
        console.log(el);
        console.log(img);

        el.addEventListener('mousemove', () => {
            if (imgSrc === null && fighters === true) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc && fighters === true) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
            // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
            // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
            // но это уже будет в нашем классе Game когда мы инициализируем игроков.
            localStorage.setItem('player1', JSON.stringify(item));
            localStorage.setItem('player2', JSON.stringify(item));


            el.classList.add('active');
            fighters = false;
            $parent.style.pointerEvents = 'none';

            // функция инициализации противника
            async function initEnemy() {
                localStorage.removeItem('player2');

                const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());

                //let imgSrc = null;
                createEmptyPlayerBlock();
                let imgSrcEnemy = null;

                players.forEach(item => {
                    const el = createElement('div', ['character', `div${item.id}`]);
                    const img = createElement('img');
                    console.log(el);
                    console.log(img);

                    el.addEventListener('mousemove', () => {
                        if (imgSrcEnemy === null && fighters === true) {
                            imgSrcEnemy = item.img;
                            const $img = createElement('img');
                            $img.src = imgSrcEnemy;
                            $enemyPlayer.appendChild($img);
                        }
                    });

                    el.addEventListener('mouseout', () => {
                        if (imgSrcEnemy && fighters === true) {
                            imgSrcEnemy = null;
                            $enemyPlayer.innerHTML = '';
                        }
                    });
                })

            }
            setInterval(() => {
                initEnemy();
            }, 1000);

            setTimeout(() => {
                window.location.pathname = 'arenas.html';
            }, 4500);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();