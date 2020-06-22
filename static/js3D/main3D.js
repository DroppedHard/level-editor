$(document).ready(function () {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
        45,    // kąt patrzenia kamery (FOV - field of view)
        window.innerWidth / window.innerHeight,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maksymalna renderowana odległość od kamery
    );
    var renderer = new THREE.WebGLRenderer();
    let plain = new Grid(500)
    scene.add(plain)
    let hex3d = new Hex3D(2, 3)
    scene.add(hex3d.cont)

    var axesHelper = new THREE.AxesHelper( 500 );
    scene.add( axesHelper );

    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });
    var x = 0, y = 0;

    var heartShape = new THREE.Shape();

    heartShape.moveTo(x + 5, y + 5);
    heartShape.moveTo(x + 16, y + 7);
    heartShape.moveTo(0, 0);

    var geometry = new THREE.ShapeGeometry(heartShape);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer.setClearColor(0xffdbfc);
    renderer.setSize(window.innerWidth, window.innerHeight);

    $("#root").append(renderer.domElement);

    camera.position.set(100, 100, 100)
    camera.lookAt(scene.position)

    renderer.render(scene, camera);
})
