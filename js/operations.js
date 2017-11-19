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

    const translateVertice = (vertice, variable, step) => vertice[variable] += step

    const translations = {
        'up': (vertice) => translateVertice(vertice, 'y', scene.moveStep),
        'down': (vertice) => translateVertice(vertice, 'y', -scene.moveStep),
        'left': (vertice) => translateVertice(vertice, 'x', -scene.moveStep),
        'right': (vertice) => translateVertice(vertice, 'x', scene.moveStep),
        'stepUp': (vertice) => translateVertice(vertice, 'z', -scene.moveStep),
        'stepDown': (vertice) => translateVertice(vertice, 'z', scene.moveStep),
    }

    scene.objects.forEach(object => {
        object.vertices.forEach(vertice => translations[direction](vertice))
    })

    scene.render()
}

function zoomIn() {
    scene.distance += scene.distanceStep;
    scene.render()
}

function zoomOut() {
    // prevent too huge zoomOut
    if (scene.distance <= scene.distanceStep) return;
    scene.distance -= scene.distanceStep;
    scene.render()
}
