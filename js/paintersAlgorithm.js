function compareFaces(a, b) {// a-b returns 1, 3, 4
    const maxAz = Math.max(...a.map(vertex => vertex.z))
    const maxBz = Math.max(...b.map(vertex => vertex.z))
    return maxBz - maxAz
}

function calculatePlaneEquation(face) {
    let A = face[0],
        B = face[1],
        C = face[2]

    let coefficients = {
        a: (B.y - A.y) * (C.z - A.z) - (C.y - A.y) * (B.z - A.z),
        b: (B.z - A.z) * (C.x - A.x) - (C.z - A.z) * (B.x - A.x),
        c: (B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)
    }
    coefficients.d = -(coefficients.a * A.x + coefficients.b * A.y + coefficients.c * A.z)
    return coefficients
}

function fixFacesOrder(faces) {
    function checkForOverlap(a, b, func) {
        const minA = Math.min(...a.map(func))
        const maxA = Math.max(...a.map(func))
        const minB = Math.min(...b.map(func))
        const maxB = Math.max(...b.map(func))

        // check if two compartments overlap
        if (minA === minB || maxA === maxB)
            return true
        if (minA < minB) {
            return maxA > minB
        } else {
            return maxB > minA
        }
    }

    let tests = [
        function firstTest(a, b) {
            return !checkForOverlap(a, b, vertex => vertex.x)
        },
        function secondTest(a, b) {
            return !checkForOverlap(a, b, vertex => vertex.y)
        },
        function thirdTest(a, b) {
            let bPlane = calculatePlaneEquation(b)
            let result = true
            a.forEach(vertex => {
                let equation = bPlane.a * vertex.x + bPlane.b * vertex.y + bPlane.c * vertex.z + bPlane.d
                if (equation >= 0)
                    result = false
            })
            return result
        },
        function fourthTest(a, b) {
            let aPlane = calculatePlaneEquation(a)
            let result = true
            b.forEach(vertex => {
                let equation = aPlane.a * vertex.x + aPlane.b * vertex.y + aPlane.c * vertex.z + aPlane.d
                if (equation >= 0)
                    result = false
            })
            return result
        },
        function fifthTest(a, b) {
            // create projection to xy plane and check if a and b are in contact
            let result = true
            let borders = {
                xMin: Math.min(...b.map(vertex => vertex.x)),
                xMax: Math.max(...b.map(vertex => vertex.x)),
                yMin: Math.min(...b.map(vertex => vertex.y)),
                yMax: Math.max(...b.map(vertex => vertex.y))
            }
            a.forEach(vertex => {
                if (vertex.x < borders.xMin || vertex.x > borders.xMax || vertex.y < borders.yMin || vertex.y > borders.yMax)
                    return
                result = false
            })
            return result
        }
    ]

    function makeTests(faceA, faceB) {
        let result = false
        tests.forEach(test => result = result || test(faceA, faceB))
        return result
    }

    // we have to run 5 tests, positive result for any means no swap
    // otherwise - if 5 tests are false swap faces and do tests again
    for (let i = 0; i < faces.length; i++) {
        for (let j = 0; j < faces.length; j++) {
            // if (i === j) continue
            if (!makeTests(faces[i], faces[j])) {
                // swap
                [faces[i], faces[j]] = [faces[j], faces[i]]
                if (makeTests(faces[i], faces[j]))
                    continue
                // case with no solution
                console.log('Pair impossible to order', faces[i], faces[j])
                break
            }
        }
    }
}
