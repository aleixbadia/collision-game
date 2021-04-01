class Game {
  constructor(gameScreen) {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.player = null;
    this.gameIsOver = false;
    this.gameScreen = gameScreen;
    this.score = 0;
    this.livesElement = undefined;
    this.scoreElement = undefined;
  }

  // Create `ctx`, a `player` and start the Canvas loop
  start() {
    // Save references to the score and lives elements
    this.livesElement = this.gameScreen.querySelector(".lives .value");
    this.scoreElement = this.gameScreen.querySelector(".score .value");

    // Get and create the canvas and it's context
    this.canvas = this.gameScreen.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Set the canvas dimensions
    this.canvasContainer = this.gameScreen.querySelector(".canvas-container");
    this.containerWidth = this.canvasContainer.clientWidth;
    this.containerHeight = this.canvasContainer.clientHeight;
    this.canvas.setAttribute("width", this.containerWidth);
    this.canvas.setAttribute("height", this.containerHeight);

    this.player = new Player(this.canvas, 5);

    // addEventListener, al ser un método asíncrono, ejecuta su callback function en el scope de window.
    // para evitar perder la referéncia a "this", usamos una arrow function.
    // document.body.addEventListener("keydown", (event) => {
    //   if (event.key === "ArrowUp") this.player.setDirection("up");
    //   else if (event.key === "ArrowDown") this.player.setDirection("down");
    // });

    // Los nombres utilizados para callback functions empiezan por handle
    function handleKeyDown(event) {
      if (event.key === "ArrowUp") this.player.setDirection("up");
      else if (event.key === "ArrowDown") this.player.setDirection("down");
    }
    const boundHandleKeyDown = handleKeyDown.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);

    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      //1. ACTUALIZAR los estados del jugador y los enemigos
      // -- 1.0 Nuestro jugador ya esta creado en la función start
      // -- 1.1 Crear enemigos en posiciones aleatorias con una frecuencia aleatoria
      if (this.enemies.length < 10) {
        if (Math.random() > 0.95) {
          const randomY = Math.floor((this.canvas.height - 20) * Math.random());
          const newEnemy = new Enemy(this.canvas, randomY, 5);
          this.enemies.push(newEnemy);
        }
      }

      // -- 1.2 Comprobar si el jugador ha colisionado con algún enemigo
      this.checkCollisions();
      // -- 1.3 Actualizar la posición del jugador
      this.player.updatePosition();
      this.player.handleScreenCollision();
      // -- 1.4 Mover a todos los enemigos y filtrar a los que se queden fuera
      //Dado que el método filter recorre el array, lo aprovechamos para que también mueva a los enemigos
      this.enemies = this.enemies.filter((enemy) => {
        enemy.updatePosition();
        return enemy.isInsideScreen();
      });
      //2. LIMPIAR CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //3. DIBUJAR DE NUEVO EL CANVAS CON LAS POSICIONES ACTUALIZADAS EN EL PASO 1
      this.player.draw();
      this.enemies.forEach((enemy) => {
        enemy.draw();
      });
      //4. ROMPER EL LOOP EN CASO DE GAME OVER (LIVES <= 0)
      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }
      //5. ACTUALIZAR PUNTUACIÓN Y VIDAS que mostramos por pantalla (HTML)
      this.updateGameStats();
    };
    loop();
  }
  checkCollisions() {
    //this.enemies contiene todos los enemigos que hemos ido creando durante el juego.
    //iteramos sobre este array para comprobar si cada uno de los enemigos ha colisionado con el player
    this.enemies.forEach((enemy) => {
      if (this.player.didCollide(enemy)) {
        this.player.removeLife();
        console.log("lives", this.player.lives);

        //mover el enemigo fuera de la pantalla
        enemy.x = 0 - enemy.size;

        if (this.player.lives === 0) {
          this.gameOver();
        }
      }
    });
  }
  gameOver() {
    this.gameIsOver = true;
    endGame(this.score);
  }
  updateGameStats() {
    this.score += 10;
    this.livesElement.innerHTML = this.player.lives;
    this.scoreElement.innerHTML = this.score;
  }
}
