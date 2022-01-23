AFRAME.registerComponent("input-listen", {
    init: function () {
        //X-button Pressed
        this.el.addEventListener("transcription", function (text) {
            this.el.setAttribute('value', text);
        });
    }
});