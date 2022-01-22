AFRAME.registerComponent('product', {
    schema: {
      product_url: {default: ''},
    },

    products: new Map(),

    init: function () {
        // TODO: start call to load products
        // this should be a call to the API with a callback that does the actual
        // loading into the scene once all the products to load are known and 
        // the assets are loaded
    }
  });