const canvas = document.getElementById("canvas");
const add_chair =document.getElementById("add_chair");


let button = [];
button.push(add_chair);
var context = canvas.getContext('2d');

var srcs = [];

var isDragging = false;
var isSelecting = false;
var dragTarget = null; // ドラッグ対象の画像の添え字
var clickTarget = null;

var mode = null;
var angle_init =0;
var angle_now =0;
var images = [];
var pos_initX = [0];
var pos_initY = [0];
images.push(new Image());
console.log(images);
images.at(-1).src = './images/armchair.png';
for(var i in images){
    images[i].addEventListener('load', function() {
                        var x = 0;
                        var y = 0;
                        var w = 150;
                        var h = 150;
                        for (var j in images) {
                            // 画像を描画した時の情報を記憶（Imageのプロパティに突っ込むのはちょっと反則かもだけど）
                            images[j].drawOffsetX = x;
                            images[j].drawOffsetY = y;
                            images[j].drawWidth   = w;
                            images[j].drawHeight  = h;
        
                            // 画像を描画
                            context.drawImage(images[j], x, y, w, h);
                            x += 50;
                            y += 70;
        
        }
    }, false);
}


add_chair.addEventListener('click', () => {
    images.push(new Image());
    images.at(-1).src = './images/armchair.png';
    x=(images.length-1)*50;
    y=(images.length-1)*70;

    console.log(images.at(-1));
    
    images.at(-1).drawOffsetX = x;
    images.at(-1).drawOffsetY = y;
    images.at(-1).drawWidth   = 150;
    images.at(-1).drawHeight  = 150;
    x=images[images.length-1].drawOffsetX;
    y=images[images.length-1].drawOffsetY;
    w=images[images.length-1].drawWidth;
    h=images[images.length-1].drawHeight;
    context.drawImage(images[images.length-1], x, y, w, h);
});

var mouseUp = function(e) {
    isDragging = false;
};

// canvasの枠から外れた
var mouseOut = function(e) {

    mouseUp(e);
}

// ドラッグ中
var mouseMove = function(e) {
    // ドラッグ終了位置
    var posX = parseInt(e.clientX - canvas.offsetLeft);
    var posY = parseInt(e.clientY - canvas.offsetTop);
    // console.log(pos_initX);
  

    if (isDragging) {
        // canvas内を一旦クリア
        context.clearRect(0, 0, canvas.width, canvas.height);

        var x = 0;
        var y = 0;
        var w = 150;
        var h = 150;
        for (var i in images) {
            if (i == dragTarget) {
                x = posX - images[i].drawWidth / 2;
                y = posY - images[i].drawHeight / 2;

                // ドラッグが終了した時の情報を記憶
                images[i].drawOffsetX = x;
                images[i].drawOffsetY = y;
            } else {
                x = images[i].drawOffsetX;
                y = images[i].drawOffsetY;
            }
            w = images[i].drawWidth;
            h = images[i].drawHeight;

            // 画像を描画
            context.drawImage(images[i], x, y, w, h);
        }
    }
}


// ドラッグ開始
var mouseDown = function(e) {
    // ドラッグ開始位置
    var posX = parseInt(e.clientX - canvas.offsetLeft);
    var posY = parseInt(e.clientY - canvas.offsetTop);

    for (var i = images.length - 1; i >= 0; i--) {
        // 当たり判定（ドラッグした位置が画像の範囲内に収まっているか）
        if (posX >= images[i].drawOffsetX &&
            posX <= (images[i].drawOffsetX + images[i].drawWidth) &&
            posY >= images[i].drawOffsetY &&
            posY <= (images[i].drawOffsetY + images[i].drawHeight)
        ) {
          dragTarget = i;
          isDragging = true;
          break;
        }
    }
}

var mouseClick = function(e) {
    // ドラッグ開始位置
    var posX = parseInt(e.clientX - canvas.offsetLeft);
    var posY = parseInt(e.clientY - canvas.offsetTop);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i in images){
        x=images[i].drawOffsetX;
        y=images[i].drawOffsetY;
        w=images[i].drawWidth;
        h=images[i].drawHeight;
        context.drawImage(images[i], x, y, w, h);
    }

    for (var i = images.length - 1; i >= 0; i--) {
        
        // 当たり判定（ドラッグした位置が画像の範囲内に収まっているか）
        if (posX >= images[i].drawOffsetX &&
            posX <= (images[i].drawOffsetX + images[i].drawWidth) &&
            posY >= images[i].drawOffsetY &&
            posY <= (images[i].drawOffsetY + images[i].drawHeight)
        ) {
          clickTarget = i;
          isSelecting = true;
          context.lineWidth = 3;
          context.strokeStyle = '#f00';
          context.strokeRect(images[i].drawOffsetX-5,images[i].drawOffsetY-5,images[i].drawWidth+10,images[i].drawHeight +10);
          break;
        }
    }
}

canvas.addEventListener('mousedown', function(e){mouseDown(e);}, false);
canvas.addEventListener('mousemove', function(e){mouseMove(e);}, false);
canvas.addEventListener('mouseup',   function(e){mouseUp(e);},   false);
canvas.addEventListener('mouseout',  function(e){mouseOut(e);},  false);
canvas.addEventListener('click',  function(e){mouseClick(e);},  false);