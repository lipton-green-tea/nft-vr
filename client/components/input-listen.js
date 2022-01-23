AFRAME.registerComponent("input-listen", {
    init: function () {
        //X-button Pressed
        this.el.addEventListener("xbuttondown", function (e) {
            this.emit("teleportstart");
        });

        //X-button Released
        this.el.addEventListener("xbuttonup", function (e) {
            this.emit("teleportend");
        });

        //Y-button Pressed
        this.el.addEventListener("ybuttondown", function (e) {
            this.emit("recordstart");
        });

        //Y-button Released
        this.el.addEventListener("ybuttonup", function (e) {
            this.emit("recordend");
        });

    }
});