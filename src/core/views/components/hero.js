import './../../../css/modules/hero.css';
import Button from './buttons.js';
import comment from "../components/commentCard.js";
import {COLOR} from "../../config.js";

const HERO_ELEMENT_ID = "hero";
const HERO_CANVAS_ELEMENT_ID = "heroCanvas";

let heroElement;
let heroCanvasAnimationID = 0;
let canvas;
let ctx;

const cells = [];
let cellsX = 0;
let cellsY = 0;

const CELLS_EMIT_INTERVAL_MAX = 300;
const CELLS_EMIT_INTERVAL_MIN = 0;
let cellsEmitInterval = CELLS_EMIT_INTERVAL_MIN;
let cellsEmitIntervalCounter = 0;

function layout() {
    return /*HTML*/ `
    <div id="${ HERO_ELEMENT_ID }">
        <div id="comment-card-container"></div>
        <section>
            <h1>Swedens <span class="yellow">biggest</span> developer community</h1>
            ${ 
                Button.ankerPrimary
                (
            'Join the Community', 
            'join us button', 
            'https://discord.gg/wxpykrKJ', 
        'Link to the discord channel')
            }
            <canvas id="${ HERO_CANVAS_ELEMENT_ID }"></canvas>
        </section>
    </div>
    `;
}

function afterRender() {
    heroElement = document.getElementById(HERO_ELEMENT_ID);
    canvas = document.getElementById(HERO_CANVAS_ELEMENT_ID);
    ctx = canvas.getContext("2d");
    heroCanvasAnimationID = window.requestAnimationFrame(animate);

    renderCommentCards();

    canvas.width = heroElement.getBoundingClientRect().width;
    canvas.height = heroElement.getBoundingClientRect().height;

    window.onresize = () => {
        canvas.width = heroElement.getBoundingClientRect().width;
        canvas.height = heroElement.getBoundingClientRect().height;
        initCells();
    }

    initCells();

}

function renderCommentCards() {
    const commentCard = document.getElementById("comment-card-container");
    for (let i = 0; i<3; i++) {
        commentCard.innerHTML += comment.comment("../../../../public/avatar01.jpg", "Erik", "2024-09-02", "Måste jag dricka kaffe som utvecklare");
    }
    positionCommentCards();
}

function positionCommentCards() {
    const cards = document.querySelectorAll('.card-comment');
    cards.forEach( card => {
        let rngX = Math.floor(Math.random() * 100);
        let rngY = Math.floor(Math.random() * 100);
        let rngMinus = Math.random() > 0.5 ? '-' : '';
        setTimeout(() => {
            card.style.transform = `translate(${rngX}%, ${rngY}%)`;
            card.style.opacity = '1';
        }, 100);
    })
}

function animate() {
    heroCanvasAnimationID = window.requestAnimationFrame(animate);
    updateCanvas();
    drawCanvas();
}

function clearCanvas() {
    if (!ctx || !canvas) {
        return false;
    }
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function initCells() {

    cells.length = 0;

    const size = 50;
    let rows = heroElement.getBoundingClientRect().height / size;
    let columns = heroElement.getBoundingClientRect().width / size;

    let idAutoIncrement = 0;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {

            cellsX = x;
            cellsY = y;

            const cell = {};
            cell.id = ++idAutoIncrement;
            cell.size = size;
            cell.position = { x: size * x, y: size * y };
            cell.color = COLOR.LIGHT_GRAY;
            cell.fillOpacity = 0;

            cell.emit = function() {
                this.fillOpacity = 1;
            }

            cell.draw = function() {
                if (!ctx) return false;
                ctx.beginPath();
                ctx.rect(this.position.x, this.position.y, this.size, this.size);
                ctx.strokeStyle = this.color;
                ctx.fillStyle = `rgba(244,233,181,${this.fillOpacity -= 0.001})`;
                ctx.stroke();
                ctx.fill();
            }

            cells.push(cell);
        }
    }


}

function updateCanvas() {
    cellsEmitIntervalCounter++;
    if (cellsEmitIntervalCounter >= cellsEmitInterval) {
        cellsEmitInterval = Math.random() * (CELLS_EMIT_INTERVAL_MAX - CELLS_EMIT_INTERVAL_MIN) + CELLS_EMIT_INTERVAL_MIN;
        const randomCellIndex = Math.floor(Math.random() * cells.length - 1);
        const cell = cells[randomCellIndex];
        cell.emit();
        cellsEmitIntervalCounter = 0;
    }
}

function drawCanvas() {
    clearCanvas();

    // Grid
    cells.forEach((cell) => {
        cell.draw();
    });


}

export { layout, afterRender }