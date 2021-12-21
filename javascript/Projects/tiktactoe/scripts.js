// ! Factories and Methods
const GameBoard = (() => {
    let gameGrid = document.querySelector('#game-grid')
    let gameState = 'X'
    let moveCounter = 0
    let gameWinner = null
    // * there is something about this that connects the values; updating one value updates all in the column
    // let gameArray = new Array(3).fill(new Array(3).fill(0)) 
    // * initializing this way does not result in the error with array and fill 
    let gameArray = [[null, null, null],[null, null, null],[null, null, null]] 
    
    // reset grid
    const resetGrid = (() => {
        gameArray = [[null, null, null],[null, null, null],[null, null, null]] 
        // gameArray = new Array(3).fill([new Array(3).fill(0)])
        moveCounter = 0
        gameWinner = null
        gameState = 'X'
    })

    const deleteGrid = (x = undefined, y = undefined) => {
        // delete entire grid
        while(gameGrid.firstElementChild){
            gameGrid.removeChild(gameGrid.firstChild)
        }
    }

    const switchGameState = () => {
        moveCounter++
        // console.log(moveCounter)
        if (gameState != 'X'){
            gameState = 'X'
        } else {
            gameState = 'O'
        }
    }

    const checkWinCon = () => {
        // horizontal win condition
        for(const x of gameArray){
            if(x.filter(y => y == 'X').length == 3){
                return selectWinner('X')
            } else if(x.filter(y => y == 'O').length == 3){
                return selectWinner('O')
            }
        }
        // vertical win condition
        for(let x = 0; x < 3; x++){
            const test = []
            for(let y = 0; y < 3; y++){
                test.push(gameArray[y][x])
            }
            // console.log(test)
            if(test.filter(y => y == 'X').length == 3){
                return selectWinner('X')
            } else if(test.filter(y => y == 'O').length == 3){
                return selectWinner('O')
            }
        }

        // diagonal win con
        if (gameArray[0][0] == gameArray[1][1] && gameArray[1][1] == gameArray[2][2] && gameArray[0][0] == gameArray[2][2] && gameArray[0][0] != null){
            return selectWinner(gameArray[1][1])
        } else if (gameArray[2][0] == gameArray[1][1] && gameArray[1][1] == gameArray[0][2] && gameArray[0][2] == gameArray[2][0] && gameArray[2][0] != null){
            return selectWinner(gameArray[1][1])
        }

        // no winner still under turns
        else if (moveCounter > 8){
            return selectWinner()
        }
    }

    const selectWinner = (winner = 'tie') => {
        console.log(winner, 'is the winner')
        gameWinner = winner
    }
    
    // display grid
    const displayGrid = (() => {
        deleteGrid()
        for(let x = 0; x < gameArray.length; x++){
            for(let y = 0; y < gameArray[x].length; y++){
                elem = document.createElement('div')
                elem.className = 'gameSquare'
                elem.id = `${x},${y}`
                elem.innerHTML = gameArray[x][y]
                // only add event listener if there is no winner
                if(gameWinner == null){
                    elem.addEventListener('click', (e) => {
                        if(gameArray[x][y] == null){
                            gameArray[x][y] = gameState
                            switchGameState()
                            if(moveCounter >= 5) checkWinCon()
                            displayGrid()
                        }
                    }, true)
                }
                gameGrid.appendChild(elem)
            }
        }
    })
    return {resetGrid, displayGrid, gameArray, switchGameState, gameState}
})()

const Player = (name) => {
    // todo add player functionality
}

// ! Event Listeners
// new game button
document.querySelector('#new-game-button').addEventListener('click', (e) => {
    GameBoard.resetGrid()
    GameBoard.displayGrid()
})

GameBoard.displayGrid()

// ! UI TODOS
// todo display whose turn it is
// todo display winner

// ! STYLING TODOS
// todo add more distinction to when a player chooses a block
