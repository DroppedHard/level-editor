class Ui {
    constructor(level, scene, camera, renderer) {
        let wys = $("<input>")
            .attr({
                type: "range",
                id: "wys",
                min: 0,
                max: settings.wysHexa * 1.5,
                name: "wys",
                step: 0.2,
                value: settings.wysHexa
            })
            .on("input", () => {
                level.lights.forEach(e => {
                    e.position.y = wys.val()
                })
                renderer.render(scene, camera)
            })
        $("body").append(wys)

        let jasn = $("<input>")
            .attr({
                type: "range",
                id: "jasn",
                min: 0,
                max: 2,
                name: "jasn",
                step: 0.02,
                value: settings.pointLightIntensivity
            })
            .on("input", () => {
                level.lights.forEach(e => {
                    e.children[0].intensity = jasn.val()
                })
                renderer.render(scene, camera)
            })
        $("body").append(jasn)
    }
}