import "./../../../css/modules/stats.css";
import StatsCard from "./statsCard.js";

const UL_CLASSNAME = 'carousel';
const BASE_SCROLL_SPEED = 1;

const statCards = [];
let cardsCreated = 0;

let intervalID;

function addCard(...cards) {
    cards.forEach((card, i) => {
        cardsCreated++;
        card.id = cardsCreated;
        statCards.push(card);
    })
}

function afterRender() {

    clearInterval(intervalID);

    // Allows user to drag each carousel.
    document.querySelectorAll(`.${ UL_CLASSNAME }`)
        .forEach((ul) => {

            let hold= false;
            let currentX= 0;
            let previousX= currentX;
            let direction= 0;

            ul.addEventListener('mousedown', (ev) => {
                hold = true;
                currentX = ev.clientX;
                previousX = ev.clientX;
            });
            ul.addEventListener('mouseup', (ev) => {
                hold = false;
                currentX = ev.clientX;
                previousX = ev.clientX;
            });
            ul.addEventListener('mousemove', (ev) => {
                currentX = ev.clientX;
                let deltaX = Math.abs(currentX - previousX);
                direction = (currentX > previousX) ? -1 : 1;
                if (hold) {
                    ul.scrollLeft += BASE_SCROLL_SPEED * deltaX * direction;
                }
                previousX = currentX;
            });
            ul.addEventListener('mouseleave', (ev) => {
               hold = false;
               currentX = ev.clientX;
               previousX = ev.clientX;
               direction = 0;
            });

        });

        statCards.forEach((statCard) => {
            statCard.afterRender();
        });

        intervalID = setInterval(() => {
            statCards.forEach((statCard) => {
                statCard.avg++;
                statCard.update();
            });
        }, 1000);

}

function layout() {

    let ul = `<ul class='${ UL_CLASSNAME }'>`;
    statCards.forEach((card) => {
        ul += `<li class="carousel-item">${ card.layout() }</li>`
    });
    ul += `</ul>`;

    return /*HTML*/ `<div id="stats">${ ul }</div>`;
}

function init() {
    addCard(
        new StatsCard({ title: "Members", avg: 24, total: 500 }),
        new StatsCard({ title: "New Members", avg: 22, total: 500 }),
        new StatsCard({ title: "Messages", avg: 21, total: 500 }),
        new StatsCard({ title: "Solved Questions", avg: 28, total: 500 }),
    );
}

export { init, afterRender, layout };