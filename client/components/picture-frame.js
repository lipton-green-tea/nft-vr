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
        this.el.appendChild(this.image_el);
        this.image_el.setAttribute('id', this.el.id + '-image');
        this.image_el.setAttribute('src', "https://static.vecteezy.com/system/resources/previews/001/826/248/non_2x/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg");
        this.image_el.setAttribute('width', 0.8);
        this.image_el.setAttribute('height', 0.8);
        this.image_el.setAttribute('position', "0 0 0.02");
        console.log("set");

        // add event listener for new NFTs
        this.el.sceneEl.addEventListener(this.el.id + '-load-nft', this.load_nft);

        // init frame borders
        this.left_border = document.createElement('a-box');
        this.el.appendChild(this.left_border);
        this.left_border.setAttribute('scale', "0.08 1.5 0.08");
        this.left_border.setAttribute('position', "-0.54 0 0.02");
        this.left_border.setAttribute('color', '#964B00');

        this.right_border = document.createElement('a-box');
        this.el.appendChild(this.right_border);
        this.right_border.setAttribute('scale', "0.08 1.5 0.08");
        this.right_border.setAttribute('position', "0.54 0 0.02");
        this.right_border.setAttribute('color', '#964B00');
        
        this.top_border = document.createElement('a-box');
        this.el.appendChild(this.top_border);
        this.top_border.setAttribute('scale', "1.16 0.08 0.08");
        this.top_border.setAttribute('position', "0 0.79 0.02");
        this.top_border.setAttribute('color', '#964B00');
        
        this.bottom_border = document.createElement('a-box');
        this.el.appendChild(this.bottom_border);
        this.bottom_border.setAttribute('scale', "1.16 0.08 0.08");
        this.bottom_border.setAttribute('position', "0 -0.79 0.02");
        this.bottom_border.setAttribute('color', '#964B00');
    },

    load_nft: function (event) {
        console.log(event.detail.url);
        console.log(this.image_el);
        this.image_el.setAttribute('src', "https://d35vxokfjoq7rk.cloudfront.net/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/178-0.png?d=800");
        this.image_el.setAttribute('width', 0.8);
        this.image_el.setAttribute('height', 0.8);
    }
  });
