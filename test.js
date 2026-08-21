/*************************ส่วนการประกาศ CLASS  GAME************************** */
class FindYourHatGame {
  constructor(field, startX = 0, startY = 0) {
    this.field = field;
    this.playerX = startX;
    this.playerY = startY;
    this.isGameOver = false;

    this.field[this.playerY][this.playerX] = "*";
  }

  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }

  moveUp() {
    this.field[this.playerY][this.playerX] = "░";
    this.playerY -= 1;
    if (this.playerY < 0) {
      console.log("\n 🚫 You went out of bounds! Game over.\n");
      this.isGameOver = true;
      return;
    }
    if (this.checkHat() || this.checkHole()) {
      return;
    }
    this.field[this.playerY][this.playerX] = "*";
  }

  moveDown() {
    this.field[this.playerY][this.playerX] = "░";
    this.playerY += 1;
    if (this.playerY >= this.field.length) {
      console.log("\n 🚫 You went out of bounds! Game over.\n");
      this.isGameOver = true;
      return;
    }
    if (this.checkHat() || this.checkHole()) {
      return;
    }
    this.field[this.playerY][this.playerX] = "*";
  }

  moveLeft() {
    this.field[this.playerY][this.playerX] = "░";
    this.playerX -= 1;
    if (this.playerX < 0) {
      console.log("\n 🚫 You went out of bounds! Game over.\n");
      this.isGameOver = true;
      return;
    } else {
      if (this.checkHat() || this.checkHole()) {
        return;
      }
      this.field[this.playerY][this.playerX] = "*";
    }
  }

  moveRight() {
    this.field[this.playerY][this.playerX] = "░";
    this.playerX += 1;
    if (this.playerX >= this.field[0].length) {
      console.log("\n 🚫 You went out of bounds! Game over.\n");
      this.isGameOver = true;
      return;
    } else {
      if (this.checkHat() || this.checkHole()) {
        return;
      }
      this.field[this.playerY][this.playerX] = "*";
    }
  }
  checkHat() {
    if (this.field[this.playerY][this.playerX] === "^") {
      console.log("\n 🎉 Found the hat! \n");
      this.isGameOver = true;
      return true;
    }
    return false;
  }
  checkHole() {
    if (this.field[this.playerY][this.playerX] === "O") {
      console.log("\n 💀 Fell into a hole, Game over.\n");
      this.isGameOver = true;
      return true;
    }
    return false;
  }

  exit() {
    console.log("\n You have exited the game.\n");
    return;
  }
}

function generateRandomField(rows, cols, holePercentage = 0.2) {
  // ตารางเปล่า default หลุม 20% ของพื้นที่ทั้งหมด
  const field = [];
  for (let i = 0; i < rows; i++) {
    field[i] = [];
    for (let j = 0; j < cols; j++) {
      field[i][j] = "░";
    }
  }

  const startX = Math.floor(Math.random() * cols);
  const startY = Math.floor(Math.random() * rows);

  const numHoles = Math.floor(rows * cols * holePercentage);
  let holesPlaced = 0;
  while (holesPlaced < numHoles) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);

    if ((x !== startX || y !== startY) && field[y][x] === "░") {
      field[y][x] = "O";
      holesPlaced++;
    }
  }
  let hatPlaced = false;
  while (!hatPlaced) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);

    if ((x !== startX || y !== startY) && field[y][x] === "░") {
      field[y][x] = "^";
      hatPlaced = true;
    }
  }

  return [field, startX, startY];
}

/*****************ประกาศ RL รออ่านค่าคีย์บอร์ด**************************/
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
/*****************รอค่าจากผู้ใช้*********************** */
function askForCommand() {
  rl.question(
    "Enter a command (Left[l], Right[r], Up[u], Down[d], Quit[q]): ",
    function (command) {
      command = command.trim().toLowerCase();
      if (command === "q") {
        console.log("\n Exiting the game.\n");
        rl.close();
        return;
      }
      console.clear();
      handleCommand(command);
      game.print();
      if (game.isGameOver) {
        rl.close();
        return;
      }
      askForCommand();
    },
  );
}
/********************จัดการค่าจากผู้ใช้******************************** */
function handleCommand(command) {
  if (command === "l") {
    game.moveLeft();
  } else if (command === "r") {
    game.moveRight();
  } else if (command === "u") {
    game.moveUp();
  } else if (command === "d") {
    game.moveDown();
  } else {
    console.log(
      "\n Please Enter Left[l], Right[r], Up[u], Down[d], or Quit[q]\n",
    );
  }
}

/*************************ส่วนการทำงาน*************************************************** */

const [randomField, startX, startY] = generateRandomField(8,8);
const game = new FindYourHatGame(randomField, startX, startY);
// กำหนดขนาดความกว้าง และความสูงของสนาม ใส่กลับไปใน CLASS เพื่อเริ่มเกม
console.clear();
console.log("Welcome to Find Your Hat Game!");
game.print();
askForCommand();
