let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

canvas.width  = 500;
canvas.height = 500;

ctx.strokeRect(25, 25, 450, 450);

ctx.strokeRect(50, 50, 400, 400);
ctx.fillStyle = 'black';
ctx.fillRect(50, 50, 400, 400);
for (i = 0; i < 8; i += 2) {
  for (j = 0; j < 8; j += 2) {
    ctx.clearRect(50 + i * 50, 50 + j * 50, 50, 50);
    ctx.clearRect(50 + (i + 1) * 50, 50 + (j + 1) * 50, 50, 50);
  }
}

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
let fig = {
    b: 'img/bishop.svg',
    k: 'img/king.svg',
    kn: 'img/knight.svg',
    p: 'img/pawn.svg',
    q: 'img/queen.svg',
    r: 'img/rook.svg',
    b_w: 'img/bishop-w.svg',
    k_w: 'img/king-w.svg',
    kn_w: 'img/knight-w.svg',
    p_w: 'img/pawn-w.svg',
    q_w: 'img/queen-w.svg',
    r_w: 'img/rook-w.svg',
};

function getLetter(arr, b, a, flag = true) {
    let step = 50;
    for (let i = 0; i < arr.length; i++) {
        let letter = arr[i];
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(letter, a, b);
        if (flag) {
            a += 50;
        } else {
            b += 50
        } 
    }
}

getLetter(letters, 470, 70);
getLetter(letters, 42, 70);
getLetter(numbers, 80, 32, false);
getLetter(numbers, 80, 457, false);




function getSoldier(img, val) {
    for (let i = 1; i <= 8; i++) {
        let image = new Image();
        image.src = img;
        image.onload = () => {
            ctx.drawImage(image, i * 50, val);
        }    
    }
}

function getFigure(img, arr, color = true) {
    let posY = 50;
    if (!color) posY = 400;
    let image = new Image();
    image.src = img;
    
    image.onload = () => {
        for (let i = 0; i < arr.length; i++) {
            ctx.drawImage(image, arr[i], posY);            
        } 
    }
 
}

getFigure(fig.r,[50, 400]);
getFigure(fig.r_w, [50, 400], false);
getFigure(fig.kn, [110, 360]);
getFigure(fig.kn_w, [110, 360], false);
getFigure(fig.b, [150, 300]);
getFigure(fig.b_w, [150, 300], false);
getFigure(fig.q, [200]);
getFigure(fig.q_w, [200], false);
getFigure(fig.k, [250]);
getFigure(fig.k_w, [250], false);

getSoldier(fig.p, 100);
getSoldier(fig.p_w, 350);


