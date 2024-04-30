window.addEventListener('load', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let snake;
    let dx;
    let dy;
    let food;
    let score;

    function initializeGame() {
        snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }];
        dx = gridSize; // moving right
        dy = 0; // not moving vertically
        food = { x: 80, y: 80 }; // initial food placement
        score = 0; // initial score
        placeFood(); // Make sure this is called to place the food initially
        document.getElementById('score').textContent = 'Score: ' + score;
        document.getElementById('gameOverModal').style.display = 'none'; // Hide game over modal on start
    }

    window.startGame = function() {
        initializeGame();
        gameLoop();
    };

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
            score += 10;
            document.getElementById('score').textContent = 'Score: ' + score;
            placeFood();
        } else {
            snake.pop();
        }
    }

    document.addEventListener('keydown', changeDirection);

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
        if (!checkGameOver()) {
            setTimeout(gameLoop, 150);
        } else {
            showGameOverModal();
        }
    }

    function showGameOverModal() {
        const modal = document.getElementById('gameOverModal');
        const message = document.getElementById('gameOverMessage');
        message.textContent = "Game over! Score: " + score;
        modal.style.display = "flex";
    }

    function checkGameOver() {
        const head = snake[0];
        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true;
            }
        }
        const hitLeftWall = head.x < 0;
        const hitRightWall = head.x > canvas.width - gridSize;
        const hitTopWall = head.y < 0;
        const hitBottomWall = head.y > canvas.height - gridSize;
        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    }

    function randomFood(min, max) {
        return Math.round((Math.random() * (max - min) + min) / gridSize) * gridSize;
    }

    initializeGame();
});
