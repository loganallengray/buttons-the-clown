import { ReserveForm } from "./ReserveForm.js";
import { Reservations } from "./Reservations.js";
import { Completions } from "./Completions.js";

export const ButtonsTheClown = () => {
    return `
        <h1 id="header">Buttons the Clown Party Service</h1>
        <section id="reserveForm">
            <h2>Reservation Form</h2>
            <article class="reserveContent">
                ${ReserveForm()}
            </article>
        </section>
        <section id="reserveTable">
            <h2>Reservations</h2>
            <article class="reserveContent" id="reserveListContainer">
                ${Reservations()}
                ${Completions()}
            </article>
        </section>`
}