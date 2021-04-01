let game;
let splashScreen;
let gameScreen;
let gameOverScreen;

// Creates DOM elements from a string representation
// buildDom
function buildDom(htmlString) {
  //tempDiv lo creamos para tener un elemento HTML (div) sobre el que transformar
  //nuestro string (htmlString) a formato HTML usando innerHTML
  //los strings que contengan el HTML deven tener UN SOLO ELEMENTO PADRE
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  //console.log(“tempDiv.children”, tempDiv.children)
  return tempDiv.children[0];
}

// -- splash screen
function createSplashScreen() {
  //para un correcto tabulado del string, tabular de la línea 2 hasta el final
  splashScreen = buildDom(`
      <main>
        <h1>Eternal Enemies</h1>
        <button>Start</button>
      </main>
    `);
  //Una vez creado el elemento HTML con la función buildDom, cargamos ese HTML en la página principal
  document.body.appendChild(splashScreen);

  //seleccionamos el botón que hemos creado y le creamos un eventListener para después crear el jugo
  const startButton = splashScreen.querySelector("button");

  startButton.addEventListener("click", startGame);
}

function removeSplashScreen() {
  // remove() is the DOM method that removes the Node from the page
  splashScreen.remove();
  //console.log(splashScreen); //The value remains the same, but the code has been removed from the DOM.
}

// -- game screen
function createGameScreen() {
  //para un correcto tabulado del string, tabular de la línea 2 hasta el final
  gameScreen = buildDom(`
    <main class="game container">
        <header>
            <div class="lives">
                <span class="label">Lives:</span>
                <span class="value"></span>
            </div>

            <div class="score">
                <span class="label">Score:</span>
                <span class="value"></span>
            </div>
        </header>

        <div class="canvas-container">
            <canvas></canvas>
        </div>
    </main>
    `);

  document.body.appendChild(gameScreen);
  return gameScreen; //this we will explain later
}

function removeGameScreen() {
  gameScreen.remove();
}

// -- game over screen
function createGameOverScreen(score) {
  gameOverScreen = buildDom(`
    <main>
        <h1>GAME OVER</h1>
        <p>Your score: <span>${score}</span> </p>
        <button>Restart</button>
    </main>
    `);
    const button = gameOverScreen.querySelector("button");
    button.addEventListener("click", startGame)

    document.body.appendChild(gameOverScreen)
}
function removeGameOverScreen() {
    gameOverScreen.remove()
}

// -- Setting the game state - start or game over
function startGame() {
  removeSplashScreen();
  if(gameOverScreen){
      removeGameOverScreen();
  }
  createGameScreen();

  game = new Game(gameScreen);
  //game.gameScreen = gameScreen;
  game.start();
}

function endGame(score) {
  removeGameScreen();
  createGameOverScreen(score);
}

window.addEventListener("load", createSplashScreen);
