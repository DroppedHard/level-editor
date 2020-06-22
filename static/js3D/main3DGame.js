$(document).ready(function () {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
        45,    // kąt patrzenia kamery (FOV - field of view)
        window.innerWidth / window.innerHeight,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maksymalna renderowana odległość od kamery
    );
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    let plain = new Grid(500)
    scene.add(plain)

    var level = new Level3D(scene)
    var ui = new Ui(level, scene, camera, renderer)
    /* var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    }); */

    var model = new Model()
    model.loadModel("../model/tris.json", function (modeldata) {
        scene.add(modeldata)
    })

    let sphere = new THREE.Mesh(settings.pointerSphereGeometry, settings.pointerSphereMaterial);

    renderer.setClearColor(settings.clearColor);
    renderer.setSize(window.innerWidth, window.innerHeight);
    /* renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; */



    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();
    var clickedVect = new THREE.Vector3(0, 0, 0);
    var directionVect = new THREE.Vector3(0, 0, 0);
    var clock = new THREE.Clock();
    $("#root").on("mousedown", (event) => {
        directionVect = rayCasting(event)
        $("#root").on("mousemove", (event) => {
            directionVect = rayCasting(event)
        })
        $("#root").on("mouseup", () => {
            $("#root").off("mousemove")
        })
    })
    $("#root").append(renderer.domElement);

    function render() {
        requestAnimationFrame(render);
        camera.position.x = model.getModelCont().position.x
        camera.position.z = model.getModelCont().position.z + 20
        camera.position.y = model.getModelCont().position.y + 50
        camera.lookAt(model.getModelCont().position)
        if (directionVect != undefined) {
            if (model.meshModel) {
                if (Math.abs(model.getModelCont().position.x - sphere.position.x) > 1 || Math.abs(model.getModelCont().position.z - sphere.position.z) > 1) {
                    model.getModelCont().translateOnAxis(directionVect, settings.modelSpeed)
                    model.setAnimation("run")
                } else {
                    model.setAnimation("stand")
                }
                var delta = clock.getDelta();
                model.updateModel(delta)
            }
        }
        renderer.render(scene, camera);
    }
    render();
    function rayCasting(event) {
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(level.podlogi);
        if (intersects.length > 0) {

            clickedVect = intersects[0].point

            directionVect = clickedVect.clone().sub(model.getModelCont().position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
            sphere.position.x = clickedVect.x
            sphere.position.z = clickedVect.z
            scene.add(sphere)

            var angle = Math.atan2(
                model.getModelCont().position.clone().x - clickedVect.x,
                model.getModelCont().position.clone().z - clickedVect.z
            )
            model.getModelMesh().rotation.y = angle - Math.PI / 2
            return directionVect
        }
    }
})
