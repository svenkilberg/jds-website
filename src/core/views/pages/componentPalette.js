import "../../../css/component-palette.css";
import button from "../components/buttons.js";
import comment from "../components/commentCard.js";

function layout() {
    return /*html*/ `
    <section class="component-palette">
        <h1>Component Palette</h1>

        <section class="comments-container">
            <h2>Comments</h2>
            ${comment.comment("../../../../public/avatar01.jpg", "Erik", "2024-09-02", "Måste jag dricka kaffe som utvecklare")}          
        </section>

        <section class="comments-container">
            ${comment.comment("../../../../public/avatar02.jpg", "Leiya", "2024-09-02", "Det var en gång en liten fågel, ja en fågel, han bodde på landet o roger hette han")}
          
        </section>
    
        <section>
            <p>Demonstrates a button</p>
            ${button.buttonPrimary("Join the Community", "btn-join-community")}
        </section>
    </section>
    `;
}

function afterRender() {
    button.afterRender( "btn-join-community", () => {
        alert("button clicked"); 
    });
}

export default { layout, afterRender };