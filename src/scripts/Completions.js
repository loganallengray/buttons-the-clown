import { getData, deleteData, sortByDate } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

const formatCompletions = (comp) => {
    const reservations = getData("reservations");
    const clowns = getData("clowns");
    const compReservation = reservations.find(reservation => reservation.id === comp.reservationId);
    const compClown = clowns.find(clown => clown.id === comp.clownId);

    return `
    <li class="completionItem">
        <div class="reservationInfo">
            <div>${compReservation.childName}</div>
            <div>${compReservation.parentName}</div>
            <div>${compReservation.address}</div>
            <div>${compReservation.date}</div>
        </div>
        <div class="options">
            <div class="clowns">${compClown.name}</div>
            <button class="button delete__button" id="deleteCompletion--${compReservation.id}">Delete</button>
        </div>
    </li>
`
}

export const Completions = () => {
    const completions = getData("completions");
    sortByDate(completions);

    return `
        <ul id="completionList">
            ${completions.map(completion => formatCompletions(completion)).join("")}
        </ul>`;
}

mainContainer.addEventListener("click", e => {
    const clickTarget = e.target;

    if (clickTarget.id.startsWith("deleteCompletion--")) {
        const [, resId] = clickTarget.id.split("--");
        deleteData("reservations", parseInt(resId));
    }
})