AFRAME.registerComponent('gallerist', {

    picture_frames: [],

    init: function () {
        this.picture_frames = this.get_picture_frame_ids();
        console.log(this.picture_frames);
        this.request_nfts("ru39");
    },

    get_picture_frame_ids: function() {
        var scene_el = document.querySelector('a-scene');
        return Array.from(scene_el.querySelectorAll('[picture-frame]'))
                    .map(elem => elem.id);
    },

    request_nfts: function(room_code) {
        fetch("/get_trending_nfts").then((response) => {
            // indicates whether the response is successful (status code 200-299) or not
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        }).then(data => {
            for (let idx = 0; idx < this.picture_frames.length; idx++) {
                this.el.emit(this.picture_frames[idx] + "-load-nft", data[idx], true);
            }
        }).catch(error => console.log(error));
    }
  });