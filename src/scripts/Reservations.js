import { deleteData, getData, postData, sortByDate } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

const formatReservation = (res) => {
    const clowns = getData("clowns");
    const completions = getData("completions");
    
    const checkCompletion = completions.find(completion => completion.reservationId === res.id);

    if (!checkCompletion) {
    const formatClowns = (clown) => {
        return `<option value="${res.id}--${clown.id}">${clown.name}</option>`
    }

    return `
        <li class="reservationItem">
            <div class="reservationInfo">
                <div>${res.childName}</div>
                <div>${res.parentName}</div>
                <div>${res.address}</div>
                <div>${res.date}</div>
            </div>
            <div class="options">
                <select id="clownSelect" class="clowns">
                    <option value="">Choose</option>
                    ${clowns.map(clown => formatClowns(clown)).join("")}
                </select>
                <button class="button delete__button" id="deleteReservation--${res.id}">Delete</button>
            </div>
        </li>`
    }
}

export const Reservations = () => {
    const reservations = getData("reservations");
    sortByDate(reservations);

    return `
        <ul id="reservationList">
            <li class="headerItem">
                <div class="reservationInfo">
                    <div>Child's Name</div>
                    <div>Parent's Name</div>
                    <div>Address</div>
                    <div>Date</div>
                </div>
                <div class="options">
                    <div class="clowns">Clown</div>
                    
                </div>
            </li>
            ${reservations.map(reservation => formatReservation(reservation)).join("")}
        </ul>`;
}

mainContainer.addEventListener("click", e => {
    const clickTarget = e.target;

    if (clickTarget.id.startsWith("deleteReservation--")) {
        const [,resId] = clickTarget.id.split("--");
        deleteData("reservations", parseInt(resId));
    }
})

mainContainer.addEventListener("change", e => {
    const changeTarget = e.target;

    if (changeTarget.id === "clownSelect") {
        const [resId, clownId] = changeTarget.value.split("--")

        const completion = {
            reservationId: parseInt(resId),
            clownId: parseInt(clownId),
            date_created: Date.now()
        }

        postData("completions", completion);
    }
})