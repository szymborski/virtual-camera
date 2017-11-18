function compareFaces (a, b) {// a-b returns 1, 3, 4
    function firstStep () {
        const maxAz = Math.max(...a.map(vertex => vertex.z))
        const maxBz = Math.max(...b.map(vertex => vertex.z))
        return maxBz - maxAz
    }
    return firstStep()
}

function compareFacesTests (a, b) {
    let tests = [
        function firstTest() {
            const maxAx = Math.max(...a.map(vertex => vertex.x))
            const minBx = Math.min(...b.map(vertex => vertex.x))
            return maxAx < minBx
        },
        function secondTest() {
            const maxAy = Math.max(...a.map(vertex => vertex.y))
            const minBy = Math.min(...b.map(vertex => vertex.y))
            return maxAy < minBy
        },
        function thirdTest() {
            return 0 // todo
        },
        function fourthTest() {
            return 0 // todo
        },
        function fifthTest() {
            return 0 // todo
        }
    ]

    let result = -1
    // we have to run 5 tests, positive result for any means no swap
    // otherwise - if 5 tests are false swap faces and do tests again?
    tests.forEach(test => {
        if (test())
            result = 0
    })

    if (result === -1) {
        // swap variables and do tests again
        [a,b] = [b,a];
        tests.forEach(test => {
            if (test())
                result = 0
        })
        if (result === 0)
            return -1 // swap in this case
    }

    return result
}
