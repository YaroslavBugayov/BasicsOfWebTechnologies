const button = document.getElementById("button")
const inputField = document.getElementById("count")
const container = document.getElementById("container")

button.addEventListener("click", onClick)

async function onClick() {
    container.innerHTML = ""
    const count = inputField.value
    const profiles = await getProfiles(count)

    for (const profile of profiles) {
        const item = createProfile(profile)
        container.appendChild(item)
        console.log(item)
    }
}

async function getProfiles(count) {
    try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}`)
        const data = await response.json()
        return data.results
    } catch (error) {
        console.error(error)
    }
}

function createProfile(profile) {
    const div = document.createElement("div")
    div.className = "profile"
    const fields = [
        createImage(profile.picture.large),
        createText(`Name: ${profile.name.first} ${profile.name.last}`),
        createText(`Country: ${profile.location.country}`),
        createText(`Postcode: ${profile.location.postcode}`),
        createText(`Phone: ${profile.phone}`)
    ]

    for (const elem of fields) {
        div.appendChild(elem)
    }
    return div
}

function createText(text) {
    const p = document.createElement("p")
    p.innerText = text
    return p
}

function createImage(src) {
    const image = document.createElement("img")
    image.src = src
    return image
}