document.addEventListener("DOMContentLoaded", function () {
    const holes = document.querySelectorAll(".hole");
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    const scoreDisplay = document.getElementById("score");
    var overlay = document.getElementById('overlay');

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
            document.getElementById('overlay').classList.remove('hidden');
            overlay.addEventListener('click', toggleOverlay);
            document.getElementById('scoreDisplay').innerHTML = "Number of  boobs squeezed: " + score;
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
        document.getElementById('gameactive').classList.remove('hidden');
        document.getElementById('gameinactive').classList.add('hidden');
        endButton.disabled = false;
        delay = 1000;
        startInterval();
    }
    function startInterval() {
        if (gameOver) {
            return;
        }
        comeout();
        if(delay >=650){
        delay -=6;
        }
        else {delay=650;}
        moletimeout = setTimeout(startInterval, delay); // Schedule the next interval
    }

    function endGame() {
        clearTimeout(moletimeout);
        gameOver = true;
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        document.getElementById('gameinactive').classList.remove('hidden');
        document.getElementById('gameactive').classList.add('hidden');
        startButton.disabled = false;
        endButton.disabled = true;
    };
    function toggleOverlay() {
        document.getElementById('overlay').classList.add('hidden');
        overlay.removeEventListener('click', toggleOverlay);
    }

    startButton.addEventListener("click", startGame);
    endButton.addEventListener("click", endGame);
});
