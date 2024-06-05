document.addEventListener("DOMContentLoaded", function () {
    const holes = document.querySelectorAll(".hole");
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    const scoreDisplay = document.getElementById("score");

    let score = 0;
    let gameOver = true;
    let moletimeout;
    let delay;

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
        startButton.disabled = true;
        document.getElementById('endButton').classList.remove('hidden');
        endButton.disabled = false;
        delay = 1000;
        startInterval();
    }
    function startInterval() {
        if (gameOver) {
            return;
        }
        comeout();
        if(delay >=310){
        delay -=10; // Decrease delay by 5%
        }
        else {delay=310;}
        moletimeout = setTimeout(startInterval, delay); // Schedule the next interval
    }

    function endGame() {
        clearTimeout(moletimeout);
        gameOver = true;
        alert(`Game Ended!\nNumber of boobies squeezed: ${score}`);
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        startButton.disabled = false;
        document.getElementById('endButton').classList.add('hidden');
        endButton.disabled = true;
    }

    startButton.addEventListener("click", startGame);
    endButton.addEventListener("click", endGame);
});
