 const  config = {
            blockSize: 10,    
            cellActiveColor: "#555",      
            cellInactiveColor: "#222"       
        },

        game = document.getElementById('game'),
        canvas = game.getContext('2d'),
        blocksX = Math.floor(game.width / config.blockSize),
        blocksY = Math.floor(game.height / config.blockSize),
        totalBlocks = blocksX * blocksY,

        startButton = document.querySelector('#start'),
        pauseButton = document.querySelector('#pause'),
        randomButton = document.querySelector('#randomize'),
        resetButton = document.querySelector('#reset');

let     gridCurrent = new Array(totalBlocks),
        gridNext = new Array(totalBlocks),
        paused = false;

// Creates 2D array with state indicator of 0 [x, y, state]
function initializeArray() {        
    let x = 0, y = 0;
    for (i = 0; i < totalBlocks; i++) {
        if (x == blocksX) {
            x = 0;
            y++;
        }        
        gridCurrent[i] = [x * config.blockSize, y * config.blockSize, 0];
        x++
    };
    gridNext = gridCurrent;
    drawGrid();
}

function randomizeArray() {
    gridCurrent.forEach(data => { 
        data[2] = Math.round(Math.random());
    });
    drawGrid();
}

function drawGrid() {   
    gridCurrent.forEach(data => { 
        canvas.beginPath();
        canvas.rect(data[0] + 1, data[1] + 1, config.blockSize - 2, config.blockSize - 2);
        if (data[2] == 0 ? canvas.fillStyle = config.cellInactiveColor : canvas.fillStyle = config.cellActiveColor);
        canvas.fill();
        canvas.closePath();
    });
}

function calculateFrame() {    
    drawGrid();
}

startButton.addEventListener('click', calculateFrame);
randomButton.addEventListener('click', randomizeArray);
resetButton.addEventListener('click', initializeArray);
pauseButton.addEventListener('click', function() {paused = true});

initializeArray();
randomizeArray();

