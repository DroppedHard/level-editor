class Hex3D {
    constructor(d1, d2) {
        let radius = settings.hexRadius //wielkośc hexa
        let thicc = settings.hexRadius / 10
        let container = new THREE.Object3D()
        let geometry = new THREE.BoxGeometry(thicc, settings.wysHexa, radius + 1.7);
        let wall = new THREE.Mesh(geometry, settings.hexMaterial);
        wall.castShadow = true
        wall.receiveShadow = true
        for (let i = 0; i < 6; i++) {
            if (d1 == i || d2 == i) {
                let drzwi = new Doors3D()
                drzwi.position.x = Math.cos(i * Math.PI / 3) * radius / 1.155
                drzwi.position.z = Math.sin(i * Math.PI / 3) * radius / 1.155
                drzwi.position.y = -5 + settings.wysHexa / 2
                drzwi.rotation.y = -(Math.PI / 3) * i
                container.add(drzwi)
            } else {
                let side = wall.clone()
                side.position.x = Math.cos(i * Math.PI / 3) * radius / 1.155
                side.position.z = Math.sin(i * Math.PI / 3) * radius / 1.155
                side.position.y = -5 + settings.wysHexa / 2
                side.rotation.y = -(Math.PI / 3) * i
                container.add(side)
            }
        }
        let podGeo = new THREE.CylinderGeometry(radius, radius, settings.wysPodlogi, 6);
        let podloga = new THREE.Mesh(podGeo, settings.hexMaterial)
        podloga.position.y = -5 + settings.wysPodlogi / 2
        podloga.receiveShadow = true
        container.add(podloga)
        let obj = {
            cont: container,
            pod: podloga
        }
        return obj
    }
}