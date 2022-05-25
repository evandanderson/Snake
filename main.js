const controlKeys = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]
const windowSize = 300
const increment = 3
let snake = [[138, 150], [141, 150], [144, 150], [147, 150], [150, 150]]
let direction = "Right"
let main = null
let isActive = false

function createSegment(left, top) {
    const newSegment = document.createElement("div")
    newSegment.className = "segment"
    newSegment.style.left = `${left}px`
    newSegment.style.top = `${top}px`
    main.appendChild(newSegment)
}

function createSnake() {
    snake.map((segment) => {
        createSegment(segment)
    })
}

function keyHandler(event) {
    if (controlKeys.indexOf(event.key) >= 0) {
        direction = event.key.slice(5)
    }
}

function startGame() {
    isActive = true
    createSnake()
    document.addEventListener('keydown', keyHandler)
    setInterval(moveSnake, 50)
}

function checkCollision(head) {
    if (snake.indexOf(head) >= 0 || !( 0 < head[0] < windowSize) || !( 0 < head[1] < windowSize)) {
        return true
    }
    else {
        return false
    }
}

function moveSnake() {
    const head = snake.at(-1)
    let [left, top] = head
    if (direction == "Up") {
        top -= increment
    }
    else if (direction == "Left") {
        left -= increment
    }
    else if (direction == "Down") {
        top += increment
    }
    else if (direction == "Right") {
        left += increment
    }

    if (!checkCollision([left, top])) {
        snake.push([left,top])
        createSegment(left, top)
        main.removeChild(main.firstElementChild)
    }
    else {
        // restartGame()
    }
}

document.body.onload = () => {
    main = document.getElementById("main")
    main.onclick = () => {
        isActive ? null : startGame()
    }
}