class Item {
    constructor() {
        let container = new THREE.Object3D()
        let geometry = settings.itemGeometry
        let material = settings.itemMaterial
        let item = new THREE.Mesh(geometry, material)
        container.add(item) 
        return container
    }
}