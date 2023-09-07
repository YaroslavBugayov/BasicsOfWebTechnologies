const container = document.getElementById("container")
const palette = document.getElementById("palette")

const dimension = 6
const cellList = Array(dimension).fill(0).map(() => Array(dimension))
let counter = 0

for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
        const cell = document.createElement("div")
        cell.className = "cell"
        cell.innerText = counter.toString()
        cellList[i][j] = cell
        container.appendChild(cell)
        cell.addEventListener("mouseover", () => onClick(cell))
        cell.addEventListener("mouseout", () => setTimeout(() => clearCell(cell), 100))
        cell.addEventListener("dblclick", () => onDbClick(j))
        counter++
    }
}

function onClick(cell) {
    const r = getRandInt()
    const g = getRandInt()
    const b = getRandInt()
    cell.style = `
        background: rgb(${r}, ${g}, ${b});
        color: rgb(${255-r}, ${255-g}, ${255-b});
    `
}

function clearCell(cell) {
    cell.style = "background: white"
}

function onDbClick(col) {
    for (let i = col; i < dimension; i+=2) {
        for (let j = 0; j < dimension; j++) {
            cellList[j][i].style = `
                background: ${palette.value};
                color: white
            `
        }

    }

}

function getRandInt() {
    return Math.floor(Math.random() * 255)
}
