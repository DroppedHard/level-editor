var settings = {
    clearColor: 0xffdbfc,
    hexRadius: 30,
    wysHexa: 30,
    wysPodlogi: 3,
    wymPlaszczyzny: 500,
    hexMaterial: new THREE.MeshPhongMaterial({
        color: 0xe100ff

    }),
    itemMaterial: new THREE.MeshPhongMaterial({}),
    itemGeometry: new THREE.IcosahedronGeometry(5),
    playerMaterial: new THREE.MeshNormalMaterial({
        //color: 0xea00ff,
        //wireframe: true,
    }),
    playerGeometry: new THREE.BoxGeometry(10, 10, 10),
    playerSize: 30,
    plainMaterial1: new THREE.MeshBasicMaterial({
        color: 0xcff5ff,
        visible: true,
    }),
    plainMaterial2: new THREE.MeshBasicMaterial({
        color: 0xea00ff,
        wireframe: true,
        visible: true
    }),
    pointLightColor: 0xffffff,
    pointLightIntensivity: 1,
    lightSphereMaterial: new THREE.MeshNormalMaterial({}),
    lightSphereGeometry: new THREE.SphereGeometry(2, 32, 32),
    pointLightDistance: 10000,
    pointerSphereMaterial: new THREE.MeshNormalMaterial({ wireframe: true, }),
    pointerSphereGeometry: new THREE.SphereGeometry(2, 8, 8),
    modelScale: 0.2,
    modelSpeed: 0.6
}