class Hex {
    constructor(x, z, nr, typ, id) {
        this.dlugosc = 50
        this.x = x
        this.z = z
        this.id
        this.numer = nr
        this.el
        this.tworzHex()
        this.setType(typ, id)
    }
    setType(type, id) {
        if (typeof (type) == "string") {
            this.id = id
            this.el.css("background", "url(\"gfx/hex-0.png\") center center / cover no-repeat")
            this.el.css("transform", "rotate(" + this.numer * 60 + "deg)")
            this.el.html("<div>" + this.numer + "</div>")
        }
    }
    tworzHex() {
        let hex = $("<div>")
        hex.width(this.dlugosc * 2.32).height(this.dlugosc * 2)
        if (this.z % 2 == 1) {
            hex.css("top", (this.x * 2 * this.dlugosc + this.dlugosc) * 1.1 + "px")
        } else {
            hex.css("top", (this.x * 2.2 * this.dlugosc) + "px")
        }
        hex.css("left", (this.z * 1.91 * this.dlugosc) + "px")
        hex.attr("class", "hex")
        hex.on("click", () => {
            this.klik()
        })
        this.el = hex
        $("#prawo").append(hex)
    }
    klik() {
        this.dodajDane()
        this.pokazObj()
        this.el.css("background", "url(\"gfx/hex-0.png\") center center / cover no-repeat")
        this.el.css("transform", "rotate(" + this.numer * 60 + "deg)")
        if (this.numer >= 5) {
            this.el.html("<div>" + this.numer + "</div>")
            this.numer = 0
        } else {
            this.el.html("<div>" + this.numer + "</div>")
            this.numer++
        }

    }
    dodajDane() {
        let dane = {
            x: this.x,
            z: this.z,
            id: tworz.hexy.length,
            dirOut: this.numer,
            dirIn: this.getDirIn(this.numer),
            type: tworz.type
        }
        let znaleziono = false
        tworz.hexy.forEach(e => {
            if (e.x == dane.x && e.z == dane.z) {
                e.dirOut = this.numer
                e.dirIn = this.getDirIn(this.numer)
                e.type = tworz.type
                znaleziono = true
            }
        })
        if (!znaleziono)
            tworz.hexy.push(dane)
    }
    pokazObj() {
        let wym = $("#rozm").val()
        let obj = {
            wym: wym,
            tab: tworz.hexy
        }
        $("#kod").html("<code>" + JSON.stringify(obj) + "</code>")
    }
    getDirIn(dirOut) {
        switch (dirOut) {
            case 0:
                return 3
            case 1:
                return 4
            case 2:
                return 5
            case 3:
                return 0
            case 4:
                return 1
            case 5:
                return 2
        }
    }
}