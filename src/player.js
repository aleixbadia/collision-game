class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    //Pasamos el valor de las vidas del jugador para así augmentar el dinamismo de nuestro juego
    this.lives = lives;
    //
    this.size = 100;
    // Posicionaremos a nuestro jugador a la mitad de la pantalla. Para eso debemos colocarlo en
    // medio del la altura del canvas menos el tamaño del propio jugador
    this.x = 50;
    this.y = this.canvas.height / 2 - this.size / 2;
    //gestionaremos la dirección de nuestro jugador con los numeros 1, 0, -1 (multiplicamos speed por direction)
    this.direction = 0;
    //
    this.speed = 5;
  }

  setDirection(direction) {
    // +1 down -1 up
    if (direction === "up") {
      this.direction = -1;
    }
    // después de un condicional, si solo hay una línea de codigo, no hace falta poner  {}
    else if (direction === "down") this.direction = 1;
  }

  updatePosition() {
    // esto actualiza la posición de nuestro jugador
    this.y += this.direction * this.speed;
  }

  handleScreenCollision() {
    const screenTop = 0;
    const screenBottom = this.canvas.height;

    const playerTop = this.y;
    const playerBottom = this.y + this.size;

    if (playerBottom >= screenBottom) this.setDirection("up");
    else if (playerTop <= screenTop) this.setDirection("down");
  }

  removeLife() {
    this.lives -= 1;
  }

  draw() {
    this.ctx.fillStyle = "#66D3FA";
    //fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  didCollide(enemy) {
    //seleccionamos los 4 laterales del jugador
    const playerLeft = this.x;
    const playerRight = this.x + this.size;
    const playerTop = this.y;
    const playerBottom = this.y + this.size;

    //seleccionamos los 4 laterales del enemigo
    const enemyLeft = enemy.x;
    const enemyRight = enemy.x + enemy.size;
    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + enemy.size;

    //comprobamos si el enemigo ha entrado dentro del jugador por cualquiera de los 4 lados
    const crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;
    const crossRight = enemyRight >= playerLeft && enemyRight <= playerRight;
    const crossBottom = enemyBottom >= playerTop && enemyBottom <= playerBottom;
    const crossTop = enemyTop <= playerBottom && enemyTop >= playerTop;

    //solo cuando 1 condición de verticalidad y 1 de horizontalidad se cumplen, podemos considerar que nuestros
    //cuadrados han colisionado
    if ((crossLeft || crossRight) && (crossTop || crossBottom)){
        return true;
    } else {
        return false
    }


  }
}
