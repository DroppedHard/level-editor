class Doors3D {
    constructor() {
        let radius = settings.hexRadius //wielkośc hexa
        let thicc = settings.hexRadius / 10

        let container = new THREE.Object3D()
        let geometry = new THREE.BoxGeometry(thicc, settings.wysHexa, (radius + 1.7) / 3);
        let wall = new THREE.Mesh(geometry, settings.hexMaterial);
        wall.castShadow = true;
        wall.receiveShadow = true;
        let wall2 = wall.clone()
        wall.position.z = (radius + 1.7) / 3
        wall2.position.z = -(radius + 1.7) / 3
        container.add(wall)
        container.add(wall2)
        return container
    }
}