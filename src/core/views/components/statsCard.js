import "../../../css/statscard.css";

export default function StatsCard({ title, avg, total, label }) {
    return /*html*/ `
    <article class="stat-card">
        <h4 class="title">${ title }</h4>
        <p class="label">${ label ?? "Daily avg" }</p>
        <section>
            <p class="avg">${ avg }</p>
            <canvas height="50px" width="100px"></canvas>
        </section>
    </article>
    `;
}