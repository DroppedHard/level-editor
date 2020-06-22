$(document).ready(function () {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
        45,    // kąt patrzenia kamery (FOV - field of view)
        window.innerWidth / window.innerHeight,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maksymalna renderowana odległość od kamery
    );
    let axes = new THREE.AxesHelper(500)
    scene.add(axes)
    var renderer = new THREE.WebGLRenderer();
    let plain = new Grid(500)
    scene.add(plain)
    let player = new Player()
    scene.add(player.getPlayerCont())
    renderer.setClearColor(0xffdbfc);
    renderer.setSize(window.innerWidth, window.innerHeight);

    let sphere = new THREE.Mesh(settings.lightSphereGeometry, settings.lightSphereMaterial);

    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();
    var clickedVect = new THREE.Vector3(0, 0, 0);
    var directionVect = new THREE.Vector3(0, 0, 0);
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
        camera.position.x = player.getPlayerCont().position.x
        camera.position.z = player.getPlayerCont().position.z + 200
        camera.position.y = player.getPlayerCont().position.y + 100
        camera.lookAt(player.getPlayerCont().position)
        if (directionVect != undefined) {
            if (Math.abs(player.getPlayerCont().position.x - sphere.position.x) > 2 || Math.abs(player.getPlayerCont().position.z - sphere.position.z) > 2) {
                player.getPlayerCont().translateOnAxis(directionVect, 1)
            }
        }
        renderer.render(scene, camera);
    }
    render();
    function rayCasting(event) {
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObject(plain);
        if (intersects.length > 0) {

            clickedVect = intersects[0].point

            directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
            sphere.position.x = clickedVect.x
            sphere.position.z = clickedVect.z
            scene.add(sphere)

            var angle = Math.atan2(
                player.getPlayerCont().position.clone().x - clickedVect.x,
                player.getPlayerCont().position.clone().z - clickedVect.z
            )
            player.getPlayerMesh().rotation.y = angle
            player.getPlayerAxes().rotation.y = angle - Math.PI
            return directionVect
        }
    }
})