// ! Factories and Methods
const GameBoard = (() => {
    let gameGrid = document.querySelector('#game-grid')
    let gameState = 'X'
    let moveCounter = 0
    // * there is something about this that connects the values; updating one value updates all in the column
    // let gameArray = new Array(3).fill(new Array(3).fill(0)) 
    // * initializing this way does not result in the error with array and fill 
    let gameArray = [[null, null, null],[null, null, null],[null, null, null]] 
    
    // reset grid
    const resetGrid = (() => {
        gameArray = [[null, null, null],[null, null, null],[null, null, null]] 
        // gameArray = new Array(3).fill([new Array(3).fill(0)])
        moveCounter = 0
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
        // create new array for each col
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

        // win cons
        // for(let x = 0; x > 3; x++){
        //     // vertical win con: 0,0 - 1,0 - 2,0
        //     if (gameArray[x][0] == gameArray[x][1] && gameArray[x][1] == gameArray[x][2] && gameArray[x][0] == gameArray[x][2] && gameArray[x][0] != null){
        //         return selectWinner(gameArray[x][0])
        //     // horizontal win con: 0,0 - 0,1 - 0,2
        //     } else if (gameArray[0][x] == gameArray[1][x] && gameArray[1][x] == gameArray[2][x] && gameArray[0][x] == gameArray[2][x] && gameArray[0][x] != null){
        //         return selectWinner(gameArray[0][x])
        //     }
        // }
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
        // console.log('still no winner')
    }

    const selectWinner = (winner = 'tie') => {
        console.log(winner, 'is the winner')
        // todo end the game, don't allow any more turns
        squares = document.querySelectorAll('.gameSquare')
        // console.log(squares)
        for (x of squares){
            x.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
            }, true)
        }
    }
    
    // display grid
    // todo separate into create grid and update grid which would only update innerhtml instead of deleting and recreating the entire grid again
    const displayGrid = (() => {
        deleteGrid()
        for(let x = 0; x < gameArray.length; x++){
            for(let y = 0; y < gameArray[x].length; y++){
                elem = document.createElement('div')
                elem.className = 'gameSquare'
                elem.id = `${x},${y}`
                elem.innerHTML = gameArray[x][y]
                elem.addEventListener('click', (e) => {
                    if(gameArray[x][y] == null){
                        gameArray[x][y] = gameState
                        switchGameState()
                        displayGrid()
                        if(moveCounter >= 5) checkWinCon()
                    }
                }, true)
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

// todo find a way to only check solutions that between turns 5 and 9 ( 5 turns is earliest win)
// todo stop game after win
