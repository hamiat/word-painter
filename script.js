const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')
const url = "https://random-word-api.herokuapp.com/word?number=1"
const textArea = document.querySelector('#insertText')
const colorBox = document.querySelector('#base')


canvas.width = "600"
canvas.height = "400"
ctx.lineJoin = "round"
ctx.lineCap = "round"
ctx.strokeStyle = "#16a0a5" 


fetch(url).then(res => res.json()).then(data => textArea.innerHTML = data)



function changeColor() {
    let color = this.value;
    ctx.strokeStyle = color    
}

colorBox.addEventListener('change', changeColor)
textArea.addEventListener('change', changeColor)


let isDrawing = false;
let lastX = 0;
let lastY = 0;



function draw(e) {

if(!isDrawing) return //stop the fn from running when the mouse is now down (isDrawing is false)

ctx.beginPath()
//start from
ctx.moveTo(lastX, lastY)
//go to
ctx.lineTo(e.offsetX, e.offsetY)

ctx.stroke()
ctx.lineWidth = 5
//update to where the mouse now is
lastX = e.offsetX
lastY = e.offsetY
 
}

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
}

canvas.addEventListener('mousedown', startDrawing)

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDrawing = false)
canvas.addEventListener('mouseout', () => isDrawing = false)