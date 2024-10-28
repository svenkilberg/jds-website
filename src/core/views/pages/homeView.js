import * as Hero from "../components/hero.js";
import * as stats from "../components/stats.js";
import about from "../components/about.js";

function layout() {

    stats.init();

    return /*html*/ `
    
    ${ Hero.layout() }
    
    ${ stats.layout() }
    
    ${ about() }
    
    `;
}

function afterRender() {
    stats.afterRender();
    Hero.afterRender();
}

export default { layout, afterRender };