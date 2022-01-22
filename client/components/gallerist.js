AFRAME.registerComponent('gallerist', {

    picture_frames: [],

    init: function () {
        this.picture_frames = this.get_picture_frame_ids();
        console.log(this.picture_frames);
        //request_nfts("ru39");
    },

    get_picture_frame_ids: function() {
        var scene_el = document.querySelector('a-scene');
        return scene_el.querySelectorAll('picture-frame');
    },

    request_nfts: function(room_code) {
        fetch("").then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`);
            }
            return response.json();
        }).then(data => {
            var processed_data = data;
            this.el.emit("picture-frame-1");
        }).catch(error => console.log(error));
    }
  });