let scene;

(function () {
    // Fix the canvas width and height
    let canvas = document.getElementById('cnv')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    let canvasWidthMiddle = canvas.width / 2
    let canvasHeightMiddle = canvas.height / 2

    // Objects style
    let ctx = canvas.getContext('2d')
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)'

    let objects = [
        // Cube(center, edgeLength)
        new Cube(new Vertex(-150, 900, 0),      200),
        new Cube(new Vertex(150, 400, 0),       200),
        new Cube(new Vertex(-400, 700, 0),         200)
    ]

    scene = new Scene(ctx, objects, canvasWidthMiddle, canvasHeightMiddle)
    // First render
    scene.render()
})();
