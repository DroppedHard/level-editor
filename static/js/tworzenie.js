class Tworzenie {
    constructor() {
        //this.czyZmieniono()
        this.hexy = []
        this.type = "walls"
        this.poprzBt = $("")
        this.levels = []
        this.nowaPlansza()
        this.loadLevels()
        this.triggers()
    }
    loadLevels() {
        $.ajax({
            url: "/loadLevels", // url post-a na serwerze
            data: { a: 1 }, // przykładowe dane
            type: "POST",
            success: (data) => {
                this.levels = data
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    triggers() {
        $("#rozm").on("change", () => {
            $("#kod").html("")
            this.nowaPlansza()
        })
        $("#zap").on("click", () => {
            this.zapis()
        })
        $("#odcz").on("click", () => {
            this.odczyt()
        })
        $("#walls").on("click", () => {
            this.chgType("walls")
            $("#walls").css("border", "2px solid red")
            this.poprzBt.css("border", "1px solid black")
            this.poprzBt = $("#walls")
        })
        $("#enemy").on("click", () => {
            this.chgType("enemy")
            $("#enemy").css("border", "2px solid red")
            this.poprzBt.css("border", "1px solid black")
            this.poprzBt = $("#enemy")
        })
        $("#tres").on("click", () => {
            this.chgType("treasure")
            $("#tres").css("border", "2px solid red")
            this.poprzBt.css("border", "1px solid black")
            this.poprzBt = $("#tres")
        })
        $("#light").on("click", () => {
            this.chgType("light")
            $("#light").css("border", "2px solid red")
            this.poprzBt.css("border", "1px solid black")
            this.poprzBt = $("#light")
        })
    }
    nowaPlansza() {
        this.hexy = []
        let wym = $("#rozm").val()
        $('#prawo').html("")
        for (let x = 0; x < wym; x++) {
            for (let z = 0; z < wym; z++) {
                hex = new Hex(x, z, 0, 0, undefined)
            }
        }
    }
    zapis() {
        let wym = $("#rozm").val()
        let obj = {
            wym: wym,
            tab: this.hexy
        }
        $.ajax({
            url: "/handlePost", // url post-a na serwerze
            data: obj, // przykładowe dane
            type: "POST",
            success: (data) => {
                this.levels = data
                alert("zapisano na serwerze")
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    odczyt() {
        let tlo = $("<div>")
            .attr("id", "tlo")
            .on("click", () => {
                $("#tlo").remove()
                $("#menu").remove()
            })
        $("body").append(tlo)

        let menu = $("<div>").attr("id", "menu")
        this.levels.forEach(e => {
            let opcja = $("<a>")
                .html("<hr>" + JSON.stringify(e).replace("[", "[<br>") + "<hr>")
                .on("click", () => {
                    if (e.tab != undefined) {
                        e.tab.forEach(el => {
                            el.x = parseInt(el.x)
                            el.z = parseInt(el.z)
                            el.id = parseInt(el.id)
                            el.dirOut = parseInt(el.dirOut)
                            el.dirIn = parseInt(el.dirIn)
                        })
                    }
                    this.zaladuj(e)
                })
            menu.append(opcja)
        })
        $("body").append(menu)
    }
    zaladuj(obj) {
        $("#rozm").val(obj.wym)
        $("#kod").html("<code>" + JSON.stringify(obj) + "</code>")
        tworz.hexy = obj.tab
        $('#prawo').html("")
        for (let x = 0; x < obj.wym; x++) {
            for (let z = 0; z < obj.wym; z++) {
                let dodano=false
                obj.tab.forEach(e => {
                    if (e.x == x && e.z == z) {
                        hex = new Hex(x, z, e.dirOut, e.type, e.id)
                        dodano=true
                    }
                }) 
                if (!dodano) {
                    hex = new Hex(x, z, 0, 0, undefined)
                }
            }
        }
        $("#tlo").remove()
        $("#menu").remove()
    }
    chgType(type) {
        this.type = type
    }
}