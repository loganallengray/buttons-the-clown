const mainContainer = document.querySelector("#container");

const applicationState = {
    requests: []
}

const API = "http://localhost:8088"

// take a parameter and take it from json, put it into applicationState
// (clowns, reservations, completions)
export const fetchData = (data) => {
    return fetch(`${API}/${data}`)
        .then(response => response.json())
        .then(
            (dataItems) => {
                applicationState[data] = dataItems;
            }
        )
}

// send data to json database
// (clowns, reservations, completions)
export const postData = (data, userData) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    }

    return fetch(`${API}/${data}`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            // Runs custom event to re-render page
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// delete data from json database
export const deleteData = (data, id) => {
    return fetch(`${API}/${data}/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// take a parameter and get it from the application state
export const getData = (data) => {
    return applicationState[data].map(dataItems => ({ ...dataItems }));
}

export const sortByDate = (arr) => {
    const sorter = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    arr.sort(sorter);
}