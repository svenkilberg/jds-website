import hero from "../components/hero.js";
import * as stats from "../components/stats.js";
import about from "../components/about.js";

function layout() {
    return /*html*/ `
    
    ${ hero() }
    
    ${ stats.layout() }
    
    ${ about() }
    
    `;
}

function afterRender() {
    stats.afterRender();
}

export default { layout, afterRender };