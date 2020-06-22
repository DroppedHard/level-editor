class Ally extends THREE.Object3D {

    constructor() {
        super()
        //
        this.mesh = new THREE.Mesh(
            new THREE.TorusGeometry(5, 3, 16, 100),
            new THREE.MeshNormalMaterial({})
        );
        this.add(this.mesh)
        this.type = "ally"
    }

}