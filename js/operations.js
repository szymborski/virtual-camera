function rotateCamera(direction) {
    function rotateRight(vertice) {
        vertice.x = (vertice.x * Math.cos(scene.rotateStep) - vertice.y * Math.sin(scene.rotateStep));
        vertice.y = (vertice.x * Math.sin(scene.rotateStep) + vertice.y * Math.cos(scene.rotateStep));
    }

    function rotateLeft(vertice) {
        vertice.x = (vertice.x * Math.cos(scene.rotateStep) - vertice.y * Math.sin(-scene.rotateStep));
        vertice.y = (vertice.x * Math.sin(-scene.rotateStep) + vertice.y * Math.cos(scene.rotateStep));
    }

    function rotateUp(vertice) {
        vertice.y = (vertice.y * Math.cos(scene.rotateStep) - vertice.z * Math.sin(-scene.rotateStep));
        vertice.z = (vertice.y * Math.sin(-scene.rotateStep) + vertice.z * Math.cos(scene.rotateStep));
    }

    function rotateDown(vertice) {
        vertice.y = (vertice.y * Math.cos(scene.rotateStep) - vertice.z * Math.sin(scene.rotateStep));
        vertice.z = (vertice.y * Math.sin(scene.rotateStep) + vertice.z * Math.cos(scene.rotateStep));
    }

    let rotateFunction;
    if (direction === "left") rotateFunction = rotateLeft;
    if (direction === "right") rotateFunction = rotateRight;
    if (direction === "up") rotateFunction = rotateUp;
    if (direction === "down") rotateFunction = rotateDown;

    scene.objects.forEach(obj => {
        obj.vertices.forEach(vertice => rotateFunction(vertice))
    })
    scene.render()

}

function translate(direction) {
    if (direction === "right" || direction === "up" || direction === "stepDown") step = scene.moveStep
    if (direction === "left" || direction === "down" || direction === "stepUp") step = -scene.moveStep
    // horizontal
    if (direction === "left" || direction === "right") {
        scene.objects.forEach(object => {
            object.vertices.forEach(vertice => vertice.x += step)
        })
    } else if (direction === "down" || direction === "up") { //  vertical
        scene.objects.forEach(object => {
            object.vertices.forEach(vertice => vertice.y += step)
        })
    } else if (direction === "stepUp" || direction === "stepDown") {
        scene.objects.forEach(object => {
            object.vertices.forEach(vertice => vertice.z += step)
        })
    }
    scene.render()
}

function zoomIn() {
    scene.distance += scene.distanceStep;
    scene.render()
}

function zoomOut() {
    if (scene.distance <= scene.distanceStep) return;
    scene.distance -= scene.distanceStep;
    scene.render()
}
