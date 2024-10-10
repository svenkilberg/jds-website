import './../../../css/modules/hero.css';
import Button from './buttons.js';

export default function hero() {
    return /*HTML*/ `
    <div id="hero">
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
            
        </section>
    </div>
    `;
}