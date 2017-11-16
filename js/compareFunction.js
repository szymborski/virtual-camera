function compareFaces (a, b) {// a-b returns 1, 3, 4
    function firstStep () {
        const maxAz = Math.max(...a.map(vertex => vertex.z))
        const maxBz = Math.max(...b.map(vertex => vertex.z))
        return maxAz - maxBz
    }

    return firstStep()
}
