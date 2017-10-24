class Scene {
    constructor(ctx, objects, dx, dy) {
        // ctx - canvas context
        // objects - objects to render
        this.objects = objects
        this.ctx = ctx
        this.dx = dx
        this.dy = dy
        this.distance = 200
        this.distanceStep = 20
        this.rotateStep = 0.02
        this.moveStep = 20
    }

    project(M) {
        // M -> face
        // Distance between the camera and the plane
        let r = this.distance / M.y;
        // ignore points outside screen
        if (M.y < 0) return undefined;
        return new Vertex2D(r * M.x, r * M.z);
    }

    render() {
        // clear the previous frame
        this.ctx.clearRect(0, 0, 2 * this.dx, 2 * this.dy);

        this.objects.forEach(object => {
            object.faces.forEach(face => {
                this.ctx.beginPath();
                face.forEach((vertex, i) => {
                    let P = this.project(vertex);
                    if (P === undefined) return
                    let x = P.x + this.dx
                    let y = -P.y + this.dy
                    // if first vertex - move to start position
                    if (i === 0) this.ctx.moveTo(x, y)

                    this.ctx.lineTo(x, y);
                })
                this.ctx.closePath();
                this.ctx.stroke();
            })
        })
    }
}

