let scene;


// Fix the canvas width and height
const canvas = document.getElementById('cnv')
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight
const canvasWidthMiddle = canvas.width / 2
const canvasHeightMiddle = canvas.height / 2

// Objects style
let ctx = canvas.getContext('2d')
ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)'

let objects = [
    // Cube(center, edgeLength)
    // new Cube(new Vertex(-150, 900, 0), 200),
    new Cube(new Vertex(150, 400, 0), 200),
    // new Cube(new Vertex(-400, 700, 0), 200)
]

scene = new Scene({ctx, objects, canvasWidthMiddle, canvasHeightMiddle})

scene.render()
