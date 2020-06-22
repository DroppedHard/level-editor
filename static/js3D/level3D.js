class Level3D {
    constructor(scene) {
        this.scene = scene
        this.getData()
        this.lights = []
        this.podlogi = []
    }
    getData() {
        $.ajax({
            url: "/loadLevels", // url post-a na serwerze
            data: { a: 1 }, // przykładowe dane
            type: "POST",
            success: (data) => {
                if (data.length > 0) {
                    this.tworzLevel(data)
                } else {
                    alert("Utwórz jakiś poziom i zapisz na serwerze!")
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    tworzLevel(data) {
        let scene = this.scene
        let nr = prompt("Który chcesz poziom? Jest " + data.length + " poziomów")
        if (nr > data.length || nr <= 0 || nr === "") {
            this.tworzLevel(data)
        } else {
            let wym = data[nr - 1].wym
            let container = new THREE.Object3D()
            this.ustawDirIn(data[nr - 1].tab)
            data[nr - 1].tab.forEach((e, i) => {
                let hexik = new Hex3D(parseInt(e.dirOut), parseInt(e.dirIn))
                let hex = hexik.cont
                this.podlogi.push(hexik.pod)
                if (e.z % 2 == 0) {
                    hex.position.x = -parseInt(e.x) * settings.hexRadius * 1.73163
                    hex.position.z = parseInt(e.z) * settings.hexRadius * 1.5
                } else {
                    hex.position.x = - parseInt(e.x) * settings.hexRadius * 1.73163 - settings.hexRadius / 1.155
                    hex.position.z = parseInt(e.z) * settings.hexRadius * 1.5
                }
                switch (e.type) {
                    case "light":
                        let light = new Light()
                        light.position.x = hex.position.x
                        light.position.z = hex.position.z
                        light.position.y = settings.wysHexa
                        this.lights.push(light)
                        container.add(light)
                        break;
                    case "treasure":
                        let item = new Item()
                        item.position.x = hex.position.x
                        item.position.z = hex.position.z
                        item.position.y = settings.wysPodlogi - 0.7
                        container.add(item)
                        break;
                    default:
                        break;
                }
                container.add(hex)
            });
            switch (wym % 2) {
                case 0:
                    break;
                case 1:
                    break;
            }
            container.position.x = -0.866 * settings.hexRadius
            container.position.x += 0.866 * (2 * wym + 1) * settings.hexRadius / 2
            container.position.z = settings.hexRadius
            container.position.z -= (2 + (wym - 1) * 1.5) * settings.hexRadius / 2
            scene.add(container)
        }
    }
    ustawDirIn(tab) {
        tab.forEach(el => {
            tab.forEach(e => {
                switch (el.z % 2) {
                    case 0:
                        switch ((parseInt(e.x) - parseInt(el.x)) + "|" + (parseInt(e.z) - parseInt(el.z)) + ";" + e.dirOut) {
                            case "-1|-1;2":
                                el.dirIn = 5
                                break;
                            case "-1|0;3":
                                el.dirIn = 0
                                break;
                            case "-1|1;4":
                                el.dirIn = 1
                                break;
                            case "0|1;5":
                                el.dirIn = 2
                                break;
                            case "1|0;0":
                                el.dirIn = 3
                                break;
                            case "0|-1;1":
                                el.dirIn = 4
                                break;
                            default:
                                break;
                        }
                        break;
                    case 1:
                        switch ((parseInt(e.x) - parseInt(el.x)) + "|" + (parseInt(e.z) - parseInt(el.z)) + ";" + e.dirOut) {
                            case "0|-1;2":
                                el.dirIn = 5
                                break;
                            case "-1|0;3":
                                el.dirIn = 0
                                break;
                            case "0|1;4":
                                el.dirIn = 1
                                break;
                            case "1|1;5":
                                el.dirIn = 2
                                break;
                            case "1|0;0":
                                el.dirIn = 3
                                break;
                            case "1|-1;1":
                                el.dirIn = 4
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }

            })
        })
    }

}

