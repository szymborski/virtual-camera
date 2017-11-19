function getFaceAvg (face) {
    let sum = 0
    face.forEach(vertex => {
        sum += Math.sqrt(vertex.x ** 2 + vertex.y ** 2 + vertex.z ** 2)
    })
    return sum / face.length
}

function simpleCompareFaces(a, b) {
    return getFaceAvg(b) - getFaceAvg(a)
}

function compareCubes(a, b) {
    function sumFacesAvg (previousValue, currentValue) {
        return previousValue + getFaceAvg(currentValue)
    }
    const sumA = a.faces.reduce(sumFacesAvg, 0) / a.faces.length
    const sumB = b.faces.reduce(sumFacesAvg, 0) / b.faces.length
    return sumB - sumA
}
