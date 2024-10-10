import "./../../../css/modules/stats.css";
import StatsCard from "./statsCard.js";

const UL_CLASSNAME = 'carousel';

const BASE_SCROLL_SPEED = 2;

function afterRender() {

    // Allows user to drag each carousel.
    document.querySelectorAll(`.${ UL_CLASSNAME }`)
        .forEach((ul) => {

            let hold = false;
            let currentX = 0;
            let previousX = currentX;
            let direction = 0;

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

}

function layout() {
    return /*HTML*/ `
    <div id="stats">
    
        <ul class="${ UL_CLASSNAME }">
            <li class="carousel-item">
                ${ StatsCard({ title: "Members", avg: 24, total: 500 }) }
            </li>
            <li class="carousel-item">
                ${ StatsCard({ title: "New members", avg: 24, total: 500 }) }
            </li>
            <li class="carousel-item">
                ${ StatsCard({ title: "Messages", avg: 24, total: 500 }) }
            </li>
             <li class="carousel-item">
                ${ StatsCard({ title: "Solved questions", avg: 24, total: 500 }) }
            </li>
        </ul>
        
    </div>
    `;
}

export { afterRender, layout };