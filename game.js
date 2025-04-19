const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = getRandomFoodPosition();
let score = 0;
let gameInterval = setInterval(updateGame, 100);

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;
    if ((key === "ArrowUp" || key === "w") && direction !== "DOWN") direction = "UP";
    else if ((key === "ArrowDown" || key === "s") && direction !== "UP") direction = "DOWN";
    else if ((key === "ArrowLeft" || key === "a") && direction !== "RIGHT") direction = "LEFT";
    else if ((key === "ArrowRight" || key === "d") && direction !== "LEFT") direction = "RIGHT";
}

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

function updateGame() {
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === "UP") head.y -= box;
    else if (direction === "DOWN") head.y += box;
    else if (direction === "LEFT") head.x -= box;
    else if (direction === "RIGHT") head.x += box;

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = "Очки: " + score;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head, snake)) {
        clearInterval(gameInterval);
        alert("Гра закінчена! Ваш рахунок: " + score);
        location.reload();
    }
    snake.unshift(head);
    drawGame();

}

function collision(head, array) {
    return array.some(segment => segment.x === head.x && segment.y === head.y);
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "lime";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
}