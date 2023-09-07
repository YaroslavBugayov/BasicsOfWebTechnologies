const fields = {
    name: { element: document.getElementById("name"), validation: /^[A-Z][a-z]+\s[A-Z][a-z]+$/g },
    group: { element: document.getElementById("group"), validation: /^[A-Z][A-Z]-[0-9][0-9]$/g },
    idCard: { element: document.getElementById("id-card"), validation: /^[A-Z][A-Z]\s№[0-9]{6}$/g },
    email: { element: document.getElementById("email"), validation: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g },
    birthDate: { element: document.getElementById("birth-date"), validation: null }
}

const button = document.getElementById("button")
const wrapper = document.getElementById("wrapper")

button.addEventListener("click", buttonClick)

function validateField(field) {
    let isValid;
    isValid = field.validation
        ? field.element.value.match(field.validation)
        : field.element.value !== ""
    field.element.style.border = isValid ? "medium solid green" : "medium solid red"
    return isValid
}

function checkFields() {
    let res = true
    for (const key in fields) {
        if (!validateField(fields[key])) {
            res = false
        }
    }
    return res
}

function buttonClick() {
    if (checkFields()) {
        const container = document.createElement("div");
        container.className = "container"

        const fieldNames = ["Name", "Group", "Id-card", "Birth date", "Email"]
        const values = [fields.name.element.value, fields.group.element.value, fields.idCard.element.value,
            fields.birthDate.element.value, fields.email.element.value]

        for (let i = 0; i < fieldNames.length; i++) {
            const resultElement = document.createElement("p")
            resultElement.innerText = `${fieldNames[i]}: ${values[i]}`
            resultElement.className = "element"
            container.appendChild(resultElement)
        }

        wrapper.appendChild(container)
    }
}