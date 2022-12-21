import { fetchData } from "./dataAccess.js"
import { ButtonsTheClown } from "./ButtonsTheClown.js"

const mainContainer = document.querySelector("#container");

const render = () => {
    fetchData("reservations")
        .then(() => fetchData("clowns"))
        .then(() => fetchData("completions"))
        .then(
            () => {
                mainContainer.innerHTML = ButtonsTheClown()
            }
        )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)