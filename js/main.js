var scene;

(function () {
    // Fix the canvas width and height
    var canvas = document.getElementById('cnv')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    var dx = canvas.width / 2
    var dy = canvas.height / 2

    // Objects style
    var ctx = canvas.getContext('2d')
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)'

    var objects = [
        // Cube(center, edgeLength)
        new Cube(new Vertex(-150, 900, 0),      200),
        new Cube(new Vertex(150, 400, 0),       200),
        new Cube(new Vertex(-400, 700, 0),         200)
    ]

    scene = new Scene(ctx, objects, dx, dy)
    // First render
    scene.render()
})();
