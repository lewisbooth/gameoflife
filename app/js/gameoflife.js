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
        stepButton = document.querySelector('#step'),
        pauseButton = document.querySelector('#pause'),
        randomButton = document.querySelector('#randomize'),
        gliderButton = document.querySelector('#glider'),
        resetButton = document.querySelector('#reset');

let     gridCurrent = new Array(totalBlocks),
        gridNext = new Array(totalBlocks),
        paused = false;

// Creates nested array for each cell including state indicator [x, y, state]
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
    gridNext = [...gridCurrent];
    drawGrid();
}

function randomizeArray() {
    // Fills grid with noise
    gridCurrent.forEach(data => { 
        random = Math.round(Math.random() * 10);
        if (random > 8) {
            data[2] = 1
        } else { 
            data[2] = 0 
        }
    });
    gridNext = [...gridCurrent];
    drawGrid();
    paused = true;
}

function gliderLayout() {
    gridCurrent.forEach(data => {
        data[2] = 1;
    })
    drawGrid();
}

function drawGrid(once = true) {   
    gridCurrent = [...gridNext];
    gridCurrent.forEach(data => { 
        canvas.beginPath();
        // Create square with 1px padding
        canvas.rect(data[0] + 1, data[1] + 1, config.blockSize - 2, config.blockSize - 2);
        // Fill light/dark if alive/dead
        if (data[2] == 0 ? canvas.fillStyle = config.cellInactiveColor : canvas.fillStyle = config.cellActiveColor);
        canvas.fill();
        canvas.closePath();
    });
    if (!once) {setTimeout(calculateFrame, 20)}
}

function calculateFrame(once = false) { 

    if (paused) {return};

    let alive, 
        aliveNext,
        neighbourCount,
        r,
        br,
        b,
        bl,
        l,
        tl,
        t,
        tr,
        addEventListener,
        onRight = false, 
        onBottom = false, 
        onLeft = false, 
        onTop = false;
     
    for (i = 0; i < totalBlocks; i++) {

        r = 0;
        br = 0;
        b = 0;
        bl = 0;
        l = 0;
        tl = 0;
        t = 0;
        tr = 0;

        neighbourCount = 0; 

        if (parseInt(gridCurrent[i][2]) == 0) {
            alive = false
        } else {
            alive = true
        }

        if (gridCurrent[i][0] == (blocksX - 1) * config.blockSize) {
            onRight = true
        } else {
            onRight = false
        };

        if (gridCurrent[i][1] == (blocksY - 1) * config.blockSize) {
            onBottom = true
        } else {
            onBottom = false
        };

        if (gridCurrent[i][0] == 0) {
            onLeft = true
        } else {
            onLeft = false
        };

        if (gridCurrent[i][1] == 0) {
            onTop = true
        } else {
            onTop = false;
        };

        // Check right cell
        if (!onRight) {
            if (gridCurrent[i + 1][2]) {
                neighbourCount += gridCurrent[i + 1][2]
                r += gridCurrent[i + 1][2]
            }
        }
        // Check bottom right cell
        if (!onRight && !onBottom) {
            if (Number.isInteger(gridCurrent[i + blocksX + 1][2])) {
                neighbourCount += gridCurrent[i + blocksX + 1][2];
                br += gridCurrent[i + blocksX + 1][2];
            }
        }
        // Check bottom cell
        if (!onBottom) {
            if (Number.isInteger(gridCurrent[i + blocksX][2])) {
                neighbourCount += gridCurrent[i + blocksX][2];
                b += gridCurrent[i + blocksX][2];
            }
        }
        // Check bottom left cell
        if (!onLeft && !onBottom ) {
            if (Number.isInteger(gridCurrent[i + blocksX - 1][2])) {
                neighbourCount += gridCurrent[i + blocksX - 1][2];
                bl += gridCurrent[i + blocksX - 1][2];
            }
        }
        // Check left cell
        if (!onLeft) {
            if(Number.isInteger(gridCurrent[i - 1][2])) {
                neighbourCount += gridCurrent[i - 1][2];
                l += gridCurrent[i - 1][2];
            }
        }
        // Check top left cell
        if (!onLeft && !onTop) {
            if(Number.isInteger(gridCurrent[i - blocksX - 1][2])) {
                neighbourCount += gridCurrent[i - blocksX - 1][2];
                tl += gridCurrent[i - blocksX - 1][2];
            }
        }
        // Check top cell
        if (!onTop) {
            if(Number.isInteger(gridCurrent[i - blocksX][2])) {
                neighbourCount += gridCurrent[i - blocksX][2];
                t += gridCurrent[i - blocksX][2];
            }
        }
        // Check top right cell
        if (!onTop && !onRight) {
            if(Number.isInteger(gridCurrent[i - blocksX + 1][2])) {
                neighbourCount += gridCurrent[i - blocksX + 1][2];
                tr += gridCurrent[i - blocksX + 1][2];
            }
        }

        if (alive && neighbourCount < 2) {
            aliveNext = false;
        } else if (alive && neighbourCount == 2) {
            aliveNext = true;
        } else if (alive && neighbourCount == 3) {
            aliveNext = true;
        } else if (alive && neighbourCount > 3) {
            aliveNext = false;
        } else if (!alive && neighbourCount == 3) {
            aliveNext = true;
        } else { aliveNext = false };

        if (aliveNext) {
            gridNext[i][2] = 1;
        } else {
            gridNext[i][2] = 0;
        }

        console.log(i, `Alive: ${alive}  neighbourCount: ${neighbourCount}`, r, br, b, bl, l, tl, t, tr, aliveNext)

    }
    if (once ? drawGrid() : drawGrid(false));
}

startButton.addEventListener('click', function() {paused = false; calculateFrame(false)});
stepButton.addEventListener('click', function() {paused = false; calculateFrame(true)});
randomButton.addEventListener('click', randomizeArray);
gliderButton.addEventListener('click', gliderLayout);
resetButton.addEventListener('click', initializeArray);
pauseButton.addEventListener('click', function() {paused = true});

initializeArray();
randomizeArray();

