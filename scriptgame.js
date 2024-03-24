document.addEventListener( 
	"DOMContentLoaded", function () { 
	const holes = 
		document.querySelectorAll(".hole"); 
	const startButton = 
		document.getElementById("startButton"); 
	const endButton = 
		document.getElementById("endButton"); 
	const scoreDisplay = 
		document.getElementById("score"); 
	const timerDisplay = 
		document.getElementById("timer"); 

	let timer; 
	let score = 0; 
	let countdown; 
	let moleInterval; 
	const moleImages = ['mole1.jpg', 'mole2.jpg', 'mole3.jpg', 'mole4.jpg', 'mole5.jpg'];
	// Set the initial state to game over 
	let gameOver = true; 

    function comeout() {
        holes.forEach(hole => {
            hole.classList.remove('mole', 'enemy');
            hole.removeEventListener('click', handleMoleClick);
            hole.removeEventListener('click', handleEnemyClick);
        });
    
        let randomNum = Math.random();
        let randomHole = holes[Math.floor(Math.random() * 9)];
    
        if (randomNum < 0.2) {
            randomHole.classList.add('enemy');
            randomHole.addEventListener('click', handleEnemyClick);
        } else {
            // Randomly select a mole image
            let randomImage = moleImages[Math.floor(Math.random() * moleImages.length)];
            
            // Set the background image of the mole
            randomHole.style.backgroundImage = `url(${randomImage})`;
            randomHole.classList.add('mole');
            randomHole.addEventListener('click', handleMoleClick);
        }
    }
    function handleEnemyClick() {
        if (!gameOver) {
            gameOver = true;
            alert('Game Over faggot! sucked my cock off hahaha xD');
            endGame();
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
                alert(`Game Ended!\nNumber of boobies squeezed ${score}`);
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
        alert(`Game Ended!\nNumber of boobies squeezed ${score}`);
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
