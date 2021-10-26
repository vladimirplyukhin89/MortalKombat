// создаём стрелочную функцию для случайного числа
export const getRandomNumber = (max) => Math.ceil(Math.random() * max);

/*
Создаём функцию точного времени, которую потом выведем в лог
 */
export const getTime = () => {
    const date = new Date();
    // преобразуем чтобы возвращался 0 в начале, когда приходит 1 цифра.
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`)

    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;
    return time;
}

