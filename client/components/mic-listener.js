AFRAME.registerComponent("mic-listener", {
    init: function () {
        var element = this.el;

        //X-button Pressed
        document.addEventListener("transcription", function (text) {
            console.log("updatevalue: " + text.target);
            element.setAttribute('value', text);
        });
    }
});