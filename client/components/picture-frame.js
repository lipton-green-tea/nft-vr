AFRAME.registerComponent('picture-frame', {

    image_el: null,
    background_el: null,

    init: function () {
        // init background
        this.background_el = document.createElement('a-box');
        this.el.appendChild(this.background_el);
        this.background_el.setAttribute('color', '#FFFFFF');
        this.background_el.setAttribute('id', this.el.id + '-image');
        this.background_el.setAttribute('scale', '1 1.5 0.01');
        this.background_el.setAttribute('position', '0 0 0');

        // init image
        this.image_el = document.createElement('a-image');
        this.image_el.id = this.el.id + '-image';
        this.image_el.src = "https://static.vecteezy.com/system/resources/previews/001/826/248/non_2x/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg";
        this.image_el.setAttribute('width', 0.8);
        this.image_el.setAttribute('height' = 0.8);
        this.image_el.position = "0 0 0.02";
        this.el.appendChild(this.image_el);

        // // init frame borders
        // this.left_border = document.createElement('a-box');
        // this.left_border.scale = "1 0.08 0.08";
        // this.left_border.position = "-0.79 0 0.02";
        // this.top_border = document.createElement('a-box');


        //this.el.addEventListener(this.el.id, this.load_nft);
    }

    // load_nft: function (info) {
    //     this.image_el.src = info.url;
    //     this.image_el.width = 0.8;
    //     this.image_el.height = 0.8;
    // }
  });
