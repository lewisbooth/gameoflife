
const  config = {
            blockSize: 10,    
            cellActiveColor: "#333",      
            cellInactiveColor: "#1a1a1a"       
        },

        game = document.getElementById('game'),
        canvas = game.getContext('2d'),
        blocksX = Math.floor(game.width / config.blockSize),
        blocksY = Math.floor(game.height / config.blockSize),
        totalBlocks = blocksX * blocksY,

        startButton = document.querySelector('#start'),
        stepButton = document.querySelector('#step'),
        pauseButton = document.querySelector('#pause'),
        randomButton = document.querySelector('#randomize'),
        gliderButton = document.querySelector('#glider'),
        resetButton = document.querySelector('#reset');

let     gridCurrent = new Array(),
        gridNext = new Array(),
        paused = false;

// Creates nested array for each cell including state indicator [x, y, state]
function initializeArray() {     
    for (x = 0; x < blocksX; x++) {
        gridNext[x] = new Array();
        gridCurrent[x] = new Array();
        for (y = 0; y < blocksY; y++) {
            gridNext[x][y] = new Array();
            gridCurrent[x][y] = new Array();
        }
    };
    for (x = 0; x < blocksX; x++) {
        for (y = 0; y < blocksY; y++) {
            gridNext[x][y] = 0;
            gridCurrent[x][y] = 0;
        }
    };
    drawGrid();
}

function randomizeArray() {
    for (x = 0; x < blocksX; x++) {
        for (y = 0; y < blocksY; y++) {
            gridCurrent[x][y] = Math.round(Math.random());
        }
    };
    drawGrid();
}

function drawGrid(once = true) {  
    for (x = 0; x < blocksX; x++) {
        for (y = 0; y < blocksY; y++) {
            // Check status
            if (gridCurrent[x][y] == 1 ? alive = true : alive = false);
            let posX = x * config.blockSize + 1;
            let posY = y * config.blockSize + 1;
            canvas.beginPath();
            // Create square with 1px padding
            canvas.rect(posX, posY, config.blockSize - 2, config.blockSize - 2);
            // Fill light/dark if alive/dead
            if (alive ? canvas.fillStyle = config.cellActiveColor : canvas.fillStyle = config.cellInactiveColor);
            canvas.fill();
            canvas.closePath();
        }
    };

    // Check if looping or stepping before calculating next frame
    if (!once) {setTimeout(calculateFrame), 500}
}

function calculateFrame(once = false) { 

    if (paused) {return};

    let alive, 
        neighbourCount,
        onRight = false, 
        onBottom = false, 
        onLeft = false, 
        onTop = false;
     
    for (x = 0; x < blocksX; x++) {
        for (y = 0; y < blocksY; y++) {

            gridNext[x][y] = gridCurrent[x][y];

            if (gridCurrent[x][y] == 1 ? alive = true : alive = false);

            if (x == (blocksX - 1) ? onRight = true : onRight = false);

            if (y == (blocksY - 1) ? onBottom = true : onBottom = false);
            
            if (x == 0 ? onLeft = true : onLeft = false);

            if (y == 0 ? onTop = true : onTop = false);

            neighbourCount = 0; 

            // Check right cell
            if (!onRight) {
                if (gridCurrent[x + 1][y] == 1) {
                    neighbourCount++;
                }
            }
            // Check bottom right cell
            if (!onRight && !onBottom) {
                if (gridCurrent[x + 1][y + 1] == 1) {
                    neighbourCount++;
                }
            }
            // Check bottom cell
            if (!onBottom) {
                if (gridCurrent[x][y + 1] == 1) {
                    neighbourCount++;
                }
            }
            // Check bottom left cell
            if (!onLeft && !onBottom) {
                if (gridCurrent[x - 1][y + 1] == 1) {
                    neighbourCount++;
                }
            }
            // Check left cell
            if (!onLeft) {
                if (gridCurrent[x - 1][y] == 1) {
                    neighbourCount++;
                }
            }
            // Check top left cell
            if (!onLeft && !onTop) {
                if (gridCurrent[x - 1][y - 1] == 1) {
                    neighbourCount++;
                }
            }
            // Check top cell
            if (!onTop) {
                if (gridCurrent[x][y - 1] == 1) {
                    neighbourCount++;
                }
            }
            // Check top right cell
            if (!onTop && !onRight) {
                if (gridCurrent[x + 1][y - 1] == 1) {
                    neighbourCount++;
                }
            }

            if (alive && neighbourCount < 2) {
                gridNext[x][y] = 0;
            } 
             if (alive && (neighbourCount == 2 || neighbourCount == 3)) {
                gridNext[x][y] = 1;
            } 
             if (alive && neighbourCount > 3) {
                gridNext[x][y] = 0;
            } 
             if (!alive && neighbourCount == 3) {
                gridNext[x][y] = 1;
            };

        }
    }
    for (x = 0; x < blocksX; x++) {
        for (y = 0; y < blocksY; y++) {
            gridCurrent[x][y] = gridNext[x][y];
        }
    }
    if (once ? drawGrid() : drawGrid(false));
}

function updateGrid(e) {
    var rect = game.getBoundingClientRect();
    var x = Math.floor(e.offsetX / 10);
    var y = Math.floor(e.offsetY / 10);
    console.log(x, y)
    if (gridCurrent[x][y] == 0) {
        gridCurrent[x][y] = 1;
    } else {
        gridCurrent[x][y] = 0;
    }
    console.log(gridCurrent[x][y])
    drawGrid();
}

startButton.addEventListener('click', function() {paused = false; calculateFrame(false)});
stepButton.addEventListener('click', function() {paused = false; calculateFrame(true)});
randomButton.addEventListener('click', randomizeArray);
resetButton.addEventListener('click', initializeArray);
pauseButton.addEventListener('click', function() {paused = true});
game.addEventListener('click', e => {updateGrid(e)});

initializeArray();
randomizeArray();

