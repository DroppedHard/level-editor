class Light {
    constructor() {
        let container = new THREE.Object3D()
        let light = new THREE.PointLight(settings.pointLightColor, settings.pointLightIntensivity)
        light.castShadow = true


        light.shadow.camera.far = settings.pointLightDistance

        container.add(light)
        let geometry = settings.lightSphereGeometry
        let material = settings.lightSphereMaterial
        let sphere = new THREE.Mesh(geometry, material);
        container.add(sphere)
        return container
    }
}