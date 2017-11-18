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

function makeTests(faces) {

    let tests = [
        function firstTest(a, b) {
            const maxAx = Math.max(...a.map(vertex => vertex.x))
            const minBx = Math.min(...b.map(vertex => vertex.x))
            return maxAx < minBx
        },
        function secondTest(a, b) {
            const maxAy = Math.max(...a.map(vertex => vertex.y))
            const minBy = Math.min(...b.map(vertex => vertex.y))
            return maxAy < minBy
        },
        function thirdTest(a, b) {
            // a face plane equation:
            console.log(b, 'b')
            let bPlane = calculatePlaneEquation(b)
            console.log(bPlane, 'bPlane')
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
        function fifthTest() {
            return false // todo
        }
    ]

    function makeTests(faceA, faceB) {
        return (
            tests[0](faceA, faceB) ||
            tests[1](faceA, faceB) ||
            tests[2](faceA, faceB) ||
            tests[3](faceA, faceB) ||
            tests[4](faceA, faceB)
        )
    }

    // we have to run 5 tests, positive result for any means no swap
    // otherwise - if 5 tests are false swap faces and do tests again?
    for (let i = 0; i < faces.length; i++) {
        for (let j = 0; j < faces.length; j++) {
            if (makeTests(faces[i], faces[j])) {
                continue
            } else {
                const tmp = faces[i]
                faces[i] = faces[j]
                faces[j] = tmp
                if (makeTests(faces[i], faces[j]))
                    continue
                // case with no solution
                break
            }
        }
    }
}
