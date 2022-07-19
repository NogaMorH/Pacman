'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🍩'


var gBoard
const gGame = {
    score: 0,
    isOn: false,
    isVictory: false,
    foodCounter: 0
}

function init() {
    resetGame()
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    printMat(gBoard, '.board-container')
}


function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCounter++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCounter--
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === 8 ||
                i === 8 && j === 1 ||
                i === 8 && j === 8) {
                board[i][j] = SUPER_FOOD
                gGame.foodCounter--
            }
        }
    }
    return board
}



function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff

    //DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function endGame() {
    // TODO
    clearInterval(gIntervalGhosts)
    if (!gGame.isVictory) renderCell(gPacman.location, '💀')
    gGame.isOn = false
    openModal()
}

function openModal() {
    var elModal = document.querySelector('.modal')
    const elMsg = elModal.querySelector('.msg')
    var msg
    if (gGame.isVictory) {
        msg = 'You won!'
        elModal.style.backgroundColor = 'green'
    } else {
        msg = 'Game over'
        elModal.style.backgroundColor = 'red'
    }
    elMsg.innerText = msg
    showElement('.modal')
}

function resetGame() {
    clearInterval(gIntervalGhosts)
    gGame.score = 0
    gGame.isOn = true
    gGame.foodCounter = 0
    updateScore(0)
    hideElement('.modal')
    gRemovedGhosts = []
}

