function launchSnakeGame(container, colors, onGameOver) {
    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    canvas.width = 400;
    canvas.height = 300;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let snake, food, direction, score, gameInterval;

    function resetGame() {
        snake = [{ x: 8, y: 6 }];
        direction = { x: 1, y: 0 };
        score = 0;
        generateFood();
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
    }

    function handleKeyPress(event) {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }
        const key = event.key.toLowerCase();
        if (key === "q") {
            gameOver(true);
            return;
        }
        const goingUp = direction.y === -1, goingDown = direction.y === 1, goingRight = direction.x === 1, goingLeft = direction.x === -1;
        if (key === "arrowup" && !goingDown) direction = { x: 0, y: -1 };
        if (key === "arrowdown" && !goingUp) direction = { x: 0, y: 1 };
        if (key === "arrowleft" && !goingRight) direction = { x: -1, y: 0 };
        if (key === "arrowright" && !goingLeft) direction = { x: 1, y: 0 };
    }

    function gameLoop() {
        let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        if (head.x < 0) head.x = (canvas.width / gridSize) - 1;
        if (head.x * gridSize >= canvas.width) head.x = 0;
        if (head.y < 0) head.y = (canvas.height / gridSize) - 1;
        if (head.y * gridSize >= canvas.height) head.y = 0;
        if (isSelfCollision(head)) return gameOver(false);
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            generateFood();
        } else {
            snake.pop();
        }
        drawGame();
    }
    
    function isSelfCollision(head) {
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) return true;
        }
        return false;
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colors.foodColor;
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        ctx.fillStyle = colors.snakeColor;
        snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize));
    }
    
    function gameOver(wasQuit) {
        clearInterval(gameInterval);
        document.removeEventListener('keydown', handleKeyPress);
        onGameOver(score, canvas, wasQuit);
    }

    resetGame();
    drawGame();
    document.addEventListener('keydown', handleKeyPress);
    gameInterval = setInterval(gameLoop, 120);
}