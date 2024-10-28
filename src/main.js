import "./css/style.css";
import app from "./core/app.js";
import {COLOR} from "./core/config.js";

/**
 * The "main" function of this application.
 */
window.onload = () => {

    const root = document.getElementById('app');

    if (!root) {
        console.error("Could not find the root element");
        return false;
    }

    app.init(root);

    app.run();
};