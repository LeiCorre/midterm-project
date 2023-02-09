export function getLuckyNum () {
    let num = Math.floor(Math.random() * 100);
    if (num === 0 ) {num++};
    return num;
}