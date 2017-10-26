function rotateCamera(direction) {
    const rotations = {
        'right': function (vertice) {
            vertice.x = (vertice.x * Math.cos(scene.rotateStep) - vertice.y * Math.sin(scene.rotateStep))
            vertice.y = (vertice.x * Math.sin(scene.rotateStep) + vertice.y * Math.cos(scene.rotateStep))

        },
        'left': function (vertice) {
            vertice.x = (vertice.x * Math.cos(scene.rotateStep) - vertice.y * Math.sin(-scene.rotateStep))
            vertice.y = (vertice.x * Math.sin(-scene.rotateStep) + vertice.y * Math.cos(scene.rotateStep))
        },
        'up': function (vertice) {
            vertice.y = (vertice.y * Math.cos(scene.rotateStep) - vertice.z * Math.sin(-scene.rotateStep))
            vertice.z = (vertice.y * Math.sin(-scene.rotateStep) + vertice.z * Math.cos(scene.rotateStep))
        },
        'down': function (vertice) {
            vertice.y = (vertice.y * Math.cos(scene.rotateStep) - vertice.z * Math.sin(scene.rotateStep))
            vertice.z = (vertice.y * Math.sin(scene.rotateStep) + vertice.z * Math.cos(scene.rotateStep))
        }
    }

    scene.objects.forEach(obj => {
        obj.vertices.forEach(vertice => rotations[direction](vertice))
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
