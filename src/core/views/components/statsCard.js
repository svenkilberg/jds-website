import "../../../css/statscard.css";
import {COLOR, FONT} from "../../config.js";

const CANVAS_KEY = "stat_card_canvas_";
const FONT_SIZE = 24;
const FONT_WEIGHT = "600";

export default class StatsCard {

    id;

    title;
    avg = 0;
    total;
    label;

    canvas;
    ctx;

    constructor({id, title, avg, total, label} = {}) {
        this.id = id;
        this.title = title;
        this.avg = avg;
        this.total = total;
        this.label = label;
    }

    layout() {
        return /*html*/ `
            <article class="stat-card">
                <h4 class="title">${ this.title }</h4>
                <p class="label">${ this.label ?? "Daily avg" }</p>
                <section>
                    <p class="avg">${ this.avg }</p>
                    <canvas id="${ CANVAS_KEY + this.id }" height="50px" width="100px">
                    </canvas>
                </section>
            </article>
        `;
    }

    afterRender() {
        this.canvas = document.getElementById(CANVAS_KEY+this.id);
        this.ctx = this.canvas.getContext("2d");
        this.update();
    }

    update() {
        if (!this.canvas || !this.ctx) {

            return false;
        }
        this._draw();
    }

    _draw() {
        this._clear();
        this.ctx.font = `${FONT_WEIGHT} ${FONT_SIZE}px ${ FONT.ENCODE_SANS }`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = COLOR.DARK_GREEN;
        this.ctx.fillText(`+${ this.avg } st`, this.canvas.width / 2, this.canvas.height / 2);
    }
    
    _clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}