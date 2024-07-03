const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const tileSize = 20;
const mapWidth = canvas.width / tileSize;
const mapHeight = canvas.height / tileSize;
let score = 0;
let lives = 3;

// Pac-Man variables
let pacMan = {
    x: 10,
    y: 10,
    dx: 0,
    dy: 0
};

// Ghost variables
const ghosts = [
    { x: 8, y: 8, dx: 1, dy: 0, color: 'red' },
    { x: 9, y: 8, dx: 1, dy: 0, color: 'pink' },
    { x: 10, y: 8, dx: 1, dy: 0, color: 'cyan' },
    { x: 11, y: 8, dx: 1, dy: 0, color: 'orange' }
];

// Map layout (1: wall, 0: pellet, 2: power pellet)
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Movement control
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        pacMan.dx = 0;
        pacMan.dy = -1;
    } else if (e.key === 'ArrowDown') {
        pacMan.dx = 0;
        pacMan.dy = 1;
    } else if (e.key === 'ArrowLeft') {
        pacMan.dx = -1;
        pacMan.dy = 0;
    } else if (e.key === 'ArrowRight') {
        pacMan.dx = 1;
        pacMan.dy = 0;
    }
});

function drawMap() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 1) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else if (map[row][col] === 0) {
                ctx.fillStyle = 'white';
                ctx.fillRect(col * tileSize + tileSize / 2 - 2, row * tileSize + tileSize / 2 - 2, 4, 4);
            } else if (map[row][col] === 2) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, tileSize / 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

function drawPacMan() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacMan.x * tileSize + tileSize / 2, pacMan.y * tileSize + tileSize / 2, tileSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacMan.x * tileSize + tileSize / 2, pacMan.y * tileSize + tileSize / 2);
    ctx.fill();
}

function drawGhosts() {
    ghosts.forEach(ghost => {
        ctx.fillStyle = ghost.color;
        ctx.beginPath();
        ctx.arc(ghost.x * tileSize + tileSize / 2, ghost.y * tileSize + tileSize / 2, tileSize / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function movePacMan() {
    const newX = pacMan.x + pacMan.dx;
    const newY = pacMan.y + pacMan.dy;
    if (newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight && map[newY][newX] !== 1) {
        pacMan.x = newX;
        pacMan.y = newY;
    }
}

function moveGhosts() {
    ghosts.forEach(ghost => {
        const newX = ghost.x + ghost.dx;
        const newY = ghost.y + ghost.dy;
        if (newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight && map[newY][newX] !== 1) {
            ghost.x = newX;
            ghost.y = newY;
        } else {
            ghost.dx = -ghost.dx;
            ghost.dy = -ghost.dy;
        }
    });
}

function checkCollision() {
    ghosts.forEach(ghost => {
        if (pacMan.x === ghost.x && pacMan.y === ghost.y) {
            lives--;
            resetGame();
        }
    });
}

function resetGame() {
    pacMan.x = 10;
    pacMan.y = 10;
    pacMan.dx = 0;
    pacMan.dy = 0;
    ghosts.forEach(ghost => {
        ghost.x = 8;
        ghost.y = 8;
        ghost.dx = 1;
        ghost.dy = 0;
    });
    if (lives === 0) {
        alert('Game Over');
        lives = 3;
        score = 0;
    }
}

function update() {
    movePacMan();
    moveGhosts();
    checkCollision();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPacMan();
    drawGhosts();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
