class Scene {
    constructor({ctx, objects, canvasWidthMiddle, canvasHeightMiddle}) {
        // ctx - canvas context
        // objects - objects to render
        this.objects = objects
        this.ctx = ctx
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.fillStyle = 'rgba(0, 150, 255, 1)';
        this.canvasWidthMiddle = canvasWidthMiddle
        this.canvasHeightMiddle = canvasHeightMiddle
        this.distance = 200
        this.distanceStep = 20
        this.rotateStep = 0.02
        this.moveStep = 20
    }

    project(M) {
        // M -> face
        // r -> distance between the camera and the plane
        let r = this.distance / M.y
        // ignore points outside screen
        if (M.y < 0) return
        return new Vertex2D(r * M.x, r * M.z)
    }

    drawFace(face) {
        // get array with four vertex and draw face
        this.ctx.beginPath()
        face.forEach((vertex, i) => {
            let P = this.project(vertex)
            if (P === undefined) return
            let x = P.x + this.canvasWidthMiddle
            let y = -P.y + this.canvasHeightMiddle

            // if first vertex - move to start position
            if (i === 0) {
                this.ctx.moveTo(x, y);
                return;
            }
            this.ctx.lineTo(x, y)
        })
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.fill()
    }

    render() {
        // clear the previous frame
        this.ctx.clearRect(0, 0, 2 * this.canvasWidthMiddle, 2 * this.canvasHeightMiddle)

        this.objects.forEach(object => {
            console.log('before', object.faces.map(face => face.map(vertex => vertex.z)))
            object.faces.sort(compareFaces)
            console.log('after', object.faces.map(face => face.map(vertex => vertex.z)))
            makeTests(object.faces)
            object.faces.forEach(face => this.drawFace(face))

            // proper order
            // this.drawFace(object.faces[2])
            // this.drawFace(object.faces[1])
            // this.drawFace(object.faces[4])
            // this.drawFace(object.faces[5])
            // this.drawFace(object.faces[3])
            // this.drawFace(object.faces[0])
        })
    }
}

