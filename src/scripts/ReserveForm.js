import { postData } from "./dataAccess.js";

export const ReserveForm = () => {
    return `
        <div class="field">
			<label class="label" for="parentName">Parent Name</label>
			<input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
			<label class="label" for="childName">Child Name</label>
			<input type="text" name="childName" class="input" />
        </div>
        <div class="field">
			<label class="label" for="childCount">Party Attendee Count</label>
			<input type="number" name="childCount" class="input" />
        </div>
        <div class="field">
			<label class="label" for="address">Address</label>
			<input type="text" name="address" class="input" />
        </div>
        <div class="field">
			<label class="label" for="date">Party Date</label>
			<input type="date" name="date" class="input" />
        </div>
        <div class="field">
			<label class="label" for="partyLength">Party Length (hours)</label>
			<input type="number" name="partyLength" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Reservation</button>
    `
}

document.addEventListener("click", e => {
	const clickTarget = e.target;

	if (clickTarget.id === "submitRequest") {
		// Get what the user typed into the form fields
		const userParentName = document.querySelector("input[name='parentName']").value;
		const userChildName = document.querySelector("input[name='childName']").value;
		const userChildCount = document.querySelector("input[name='childCount']").value;
		const userAddress = document.querySelector("input[name='address']").value;
		const userDate = document.querySelector("input[name='date']").value;
		const userPartyLength = document.querySelector("input[name='partyLength']").value;

		// Make an object out of the user input
		const dataToSendToAPI = {
			parentName: userParentName,
			childName: userChildName,
			childCount: userChildCount,
			address: userAddress,
			date: userDate,
			partyLength: userPartyLength
		}

		// Send the data to the API for permanent storage
		postData("reservations", dataToSendToAPI);
	}
})