class Grid {
    constructor() {
        let size = settings.wymPlaszczyzny
        var geometry = new THREE.PlaneBufferGeometry(size, size, size / 50, size / 50);
        geometry.clearGroups();
        geometry.addGroup(0, Infinity, 0);
        geometry.addGroup(0, Infinity, 1);

        var materials = [settings.plainMaterial1, settings.plainMaterial2];

        var plane = new THREE.Mesh(geometry, settings.plainMaterial2);
        plane.rotation.x = Math.PI / 2;
        plane.position.y -= 5;
        plane.rotation.y = Math.PI;
        plane.receiveShadow = true
        return plane
    }
}