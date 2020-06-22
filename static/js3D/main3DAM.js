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
    var ally = new Ally()
    ally.position.x = 100
    ally.rotation.y = 1
    scene.add(ally)
    renderer.setClearColor(0xffdbfc);
    renderer.setSize(window.innerWidth, window.innerHeight);

    let sphere = new THREE.Mesh(settings.lightSphereGeometry, settings.lightSphereMaterial);

    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();
    var clickedVect = new THREE.Vector3(0, 0, 0);
    var directionVect = new THREE.Vector3(0, 0, 0);
    var allyDirVect = new THREE.Vector3(0, 0, 0);
    var allies = []
    $("#root").on("mousedown", (event) => {
        let obj = rayCasting(event)
        //if (obj.player === undefined) {
        console.log(obj)
        directionVect = obj.player
        //}
        if (obj.ally === undefined) {
            allyDirVect = obj.ally
        }
        $("#root").on("mousemove", (event) => {
            let obj = rayCasting(event)
            directionVect = obj.player
            allyDirVect = obj.ally
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
        allies.forEach(e => {
            e.translateOnAxis(allyDirVect, 1)
        });
        renderer.render(scene, camera);
    }
    render();
    function rayCasting(event) {
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        //console.log(intersects[0].object.parent.type)
        if (intersects.length > 0) {
            if (intersects[0].object.parent.type == "ally") {
                console.log("ally")
                allies.push(intersects[0].object.parent)
                intersects[0].object.parent.type = "ally-attached"
            } else {
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
            }
        }
        let obj = {
            ally: allyDirVect,
            player: directionVect
        }
        return obj
    }
})