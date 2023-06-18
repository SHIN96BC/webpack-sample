import './app.css';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
    <img src="${nyancat}" />`;
});

// console.log(process.env.NODE_ENV);
// console.log(TWO);

console.log(VERSION);
console.log(PRODUCTION);
console.log(MAX_COUNT);
console.log(api.domain);