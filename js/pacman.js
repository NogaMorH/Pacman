'use strict'
const PACMAN = '😷'

var gPacman
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }


    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.foodCounter--
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        setTimeout(cancelSuperMode, 5000)
    }

    // DONE: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        console.log('(gPacman.isSuper):', (gPacman.isSuper))
        if (!gPacman.isSuper) {
            endGame()
            return
        } else {
            removeGhost(nextLocation)
        }

        if (nextCell === FOOD) {
            updateScore(1)
            gGame.foodCounter--
            if (gGame.foodCounter === 0) {
                gGame.isVictory = true
                endGame()
            }
        }

    }

    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation // {i:2 ,j:3}
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // DONE: update the DOM
    renderCell(gPacman.location, PACMAN)

}

// function addPower(nextCell, nextLocation) {

// }

function getNextLocation(eventKeyboard) {
    // TODO: figure out nextLocation

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;

        default:
            break;
    }
    return nextLocation
}

function cancelSuperMode() {
    gPacman.isSuper = false
    reviveGhosts()
}