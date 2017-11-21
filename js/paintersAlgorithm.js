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

function calculateNormalVector(face) {
	let [ a, b, c ] = face,
		vec1 = new Vertex(b.x - a.x, b.y - a.y, b.z - a.z),
		vec2 = new Vertex(c.x - b.x, c.y - b.y, c.z - b.z),
		normalVector;

	normalVector = {
		x: vec1.y * vec2.z - vec1.z * vec2.y,
		y: vec1.z * vec2.x - vec1.x * vec2.z,
		z: vec1.x * vec2.y - vec1.y * vec2.x
	}

	return normalVector;
}

function eliminateInvisibleFaces(cube) {
 	let facesToShow = [],
		i = 0,
		facesLength = cube.faces.length;

	for (; i < facesLength; ++i) {
		let face = cube.faces[i],
			normalVector = calculateNormalVector(face),
			facePoint = face[3];

		if((facePoint.x * normalVector.x + facePoint.y * normalVector.y + facePoint.z * normalVector.z) < 0 )
			facesToShow.push(face);
	}

 	return facesToShow;
 }
