let puzzle = document.querySelector('.puzzle')
let cellsAmount = 20
let puzzleDivs = []
let draggableDivs = []
let cells = document.querySelector('.cells')
let modal = document.querySelector('.modal')
let modalText = document.querySelector('.modal-text')
let modalBtn = document.querySelector('.modal-btn')
let attempt = document.querySelector('.attempt')
let finalImg = document.querySelector('.final-img')
let inputFile = document.getElementById('input-file')
let randomBtn = document.querySelector('.random-btn')
//   let createElments();

function toggleVisablity(id) {
    if (document.getElementById(id).style.visibility == "visible") {
      document.getElementById(id).style.visibility = "hidden";
    } else {
      document.getElementById(id).style.visibility = "visible";
    }
  }  

function createElments() {
    for (let index = 0; index < cellsAmount; index++) {
        const puzzleDiv = document.createElement('div')
        puzzleDiv.setAttribute('data-index', index)
        puzzle.append(puzzleDiv)
        puzzleDivs.push(puzzleDiv)

        const draggableDiv = document.createElement('div')
        draggableDiv.setAttribute('data-index', index)
        draggableDiv.setAttribute('draggable', true)
        draggableDivs.push(draggableDiv)
    }
}

const leftPositions = [0, 6, 12, 18, 24]
const topPositions = [0, 4, 8, 12]

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
}

function shufflePositions() {
    return shuffle(leftPositions)
        .map((leftPosition) => {
            return shuffle(topPositions).map((topPosition) => [leftPosition, topPosition])
        })
        .reduce((positions, item) => [...positions, ...item])
}

function bgPositions() {
    return topPositions
        .map((topPosition) => {
            return leftPositions.map((leftPosition) => [topPosition, leftPosition])
        })
        .reduce((positions, item) => [...positions, ...item])
}

function addDraggableDivs() {

    let Positions = bgPositions()
    let shufflePosition = shufflePositions()

    draggableDivs.forEach((div, i) => {
        div.style.backgroundImage = 'url("../public/img/Ativo10.png")'
        cells.append(div)
        div.style.backgroundPosition = `-${Positions[i][1]}vw -${Positions[i][0]}vw`
        div.style.left = `${shufflePosition[i][0]}vw`
        div.style.top = `${shufflePosition[i][1]}vw`
    })
}

let selected = 0
let points = { correct: 0, wrong: 0 }

function dragDropEvents() {

    draggableDivs.forEach((draggableDiv, i) => {
        draggableDiv.addEventListener('dragstart', (e) => {
            selected = e.target
            console.log(selected)
            console.log('dragstart')
        })
        puzzleDivs[i].addEventListener('dragover', (e) => {
            e.preventDefault()
            console.log('dragover')
        })
        puzzleDivs[i].addEventListener('drop', () => {
            if (puzzleDivs[i].children.length === 0) {
                selected.style.top = 0
                selected.style.left = 0
                selected.style.border = 'none'
                console.log(selected)
                puzzleDivs[i].append(selected)

                if (selected.dataset.index === puzzleDivs[i].dataset.index) {
                    points.correct = 0
                    puzzleDivs.forEach((div) => {
                        div.firstElementChild &&
                            div.dataset.index === div.firstElementChild.dataset.index &&
                            points.correct++
                    })
                } else {
                    points.wrong++
                }
                console.log(points)

                if (points.correct === cellsAmount) {
                    modal.style.cssText = 'opacity: 1; visibility: visible;'
                    attempt.textContent = points.wrong
                    modalBtn.onclick = () => location.reload()
                }
            }
        })
        puzzleDivs[i].addEventListener('dragenter', (e) => {
            puzzleDivs[i].classList.add('active')
        })
        puzzleDivs[i].addEventListener('dragleave', (e) => {
            console.log('leave')
            puzzleDivs[i].classList.remove('active')
        })
    })
}

createElments();
addDraggableDivs();
dragDropEvents();
