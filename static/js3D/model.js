class Model {

    constructor() {

        this.container = new THREE.Object3D()
        this.meshModel
        this.mixer = null
        this.animacja
    }
    loadModel = function (url, callback) {

        var loader = new THREE.JSONLoader();

        var modelMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("../model/homer.png"),
                morphTargets: true
            });
        loader.load(url, (geometry) => {
            let meshModel = new THREE.Mesh(geometry, modelMaterial)
            meshModel.name = "name";
            let a = settings.modelScale
            meshModel.scale.set(a, a, a);
            meshModel.position.y = a * 20
            this.mixer = new THREE.AnimationMixer(meshModel)
            this.meshModel = meshModel
            this.container.add(meshModel)

            callback(this.container);
        });
    }

    updateModel(delta) {
        if (this.mixer) this.mixer.update(delta)
    }

    setAnimation(str) {
        if (this.animacja != str) {
            this.mixer.uncacheRoot(this.meshModel)
        }
        this.animacja = str
        this.mixer.clipAction(str).play();
    }
    getModelCont() {
        return this.container
    }
    getModelMesh() {
        return this.meshModel
    }
}