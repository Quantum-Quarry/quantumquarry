document.addEventListener("DOMContentLoaded", function () {
    const holes = document.querySelectorAll(".hole");
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");

    let timer;
    let score = 0;
    let countdown;
    let moleInterval;
    let gameOver = true;

    function comeout() {
        holes.forEach(hole => {
            hole.classList.remove('mole', 'enemy');
            hole.removeEventListener('click', handleMoleClick);
            hole.removeEventListener('click', handleEnemyClick);
        });

        let randomNum = Math.random();
        let randomHole = holes[Math.floor(Math.random() * holes.length)];

        if (randomNum < 0.25) {
            randomHole.classList.add('enemy');
            randomHole.addEventListener('click', handleEnemyClick);
        } else {
            randomHole.classList.add('mole');
            randomHole.addEventListener('click', handleMoleClick);
        }
    }

    function handleMoleClick() {
        if (!gameOver) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            this.classList.remove('mole');
            this.removeEventListener('click', handleMoleClick); // Remove event listener after clicking mole
        }
    }

    function handleEnemyClick() {
        if (!gameOver) {
            gameOver = true;
            alert('Gamer Over! You accidentally sucked my cock hahaxD!');
            endGame();
        }
    }

    function startGame() {
        if (!gameOver) {
            return;
        }

        gameOver = false;
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        timer = 60;
        timerDisplay.textContent = `Time: ${timer}s`;

        startButton.disabled = true;
        endButton.disabled = false;

        countdown = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Time: ${timer}s`;

            if (timer <= 0) {
                clearInterval(countdown);
                gameOver = true;
                alert(`Game Ended!\nNumber of boobies squeezed: ${score}`);
                startButton.disabled = false;
                endButton.disabled = true;
            }
        }, 1000);

        moleInterval = setInterval(() => {
            if (!gameOver) comeout();
        }, 1000);

        console.log("Game started");
    }

    function endGame() {
        clearInterval(countdown);
        clearInterval(moleInterval);
        gameOver = true;
        alert(`Game Ended!\nNumber of boobies squeezed: ${score}`);
        score = 0;
        timer = 60;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time: ${timer}s`;
        startButton.disabled = false;
        endButton.disabled = true;
    }

    startButton.addEventListener("click", startGame);
    endButton.addEventListener("click", endGame);
});
