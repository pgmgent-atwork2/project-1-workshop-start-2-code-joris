window.addEventListener('load', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('tabindex', '0');
    canvas.focus();

    canvas.addEventListener('click', function() {
        canvas.focus();
    });

    const gridSize = 20;
    let snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }];
    let dx = gridSize; // moving right
    let dy = 0;
    let food = { x: 80, y: 80 };

    function drawSnakePart(snakePart) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snakePart.x, snakePart.y, gridSize, gridSize);
    }

    function drawSnake() {
        snake.forEach(drawSnakePart);
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            placeFood();
        } else {
            snake.pop();
        }
    }

    function changeDirection(event) {
        event.preventDefault();
        const keyPressed = event.keyCode;
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;
        const goingUp = dy === -gridSize;
        const goingDown = dy === gridSize;
        const goingRight = dx === gridSize;
        const goingLeft = dx === -gridSize;

        if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -gridSize;
            dy = 0;
        } else if (keyPressed === UP_KEY && !goingDown) {
            dy = -gridSize;
            dx = 0;
        } else if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = gridSize;
            dy = 0;
        } else if (keyPressed === DOWN_KEY && !goingUp) {
            dy = gridSize;
            dx = 0;
        }
    }

    function randomFood(min, max) {
        return Math.round((Math.random() * (max - min) + min) / gridSize) * gridSize;
    }

    function placeFood() {
        food = {
            x: randomFood(0, canvas.width - gridSize),
            y: randomFood(0, canvas.height - gridSize)
        };
    }

    function drawFood() {
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

    function clearCanvas() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function gameLoop() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        setTimeout(gameLoop, 150);
    }

    document.addEventListener('keydown', changeDirection);
    placeFood();
    gameLoop();
});
