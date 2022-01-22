AFRAME.registerComponent('shelf', {
    schema: {
      id: {default: 'none'},
    },

    shelf_count: 4,

    product_inventory: new Map(),
    vacancies: [],

    init: function () {
        // TODO: start call to load products
        // this should be a call to the API with a callback that does the actual
        // loading into the scene once all the products to load are known and 
        // the assets are loaded

        this.add_product ('product1', 1, 1, 1);
    },

    shelf_index_to_position: function (row, column, rank) {
        var bottom_shelf_height = 0.15;
        var shelf_spacing = 0.5;
        var left_offset = -1.4; // TODO: base on width
        var product_spacing = 0.2;
        var depth_offset = 0.125;
        if (rank == 0) {
            depth_offset = -0.125;
        }
        var height = bottom_shelf_height + shelf_spacing * row;
        var horizontal_offset = left_offset + product_spacing * column;
        return { x: horizontal_offset, y: height, z: depth_offset };
        //{ x: 1, y: 1.26, z: 0.125}
    },

    add_product: function (product_id, row, column, rank) {
        if (this.product_inventory.has(product_id)) {
            // remove obejct here
        }

        product_height = 0.24;
        
        var new_product = document.createElement('a-box');
        var position = this.shelf_index_to_position(1, 1, 1);
        position.y = position.y + product_height / 2;
        new_product.setAttribute('position', position);
        new_product.setAttribute('scale', { x: 0.2, y: 0.24, z: 0.15 });
        new_product.setAttribute('color', '#AA3399');
        new_product.setAttribute('grabbable');
        new_product.setAttribute('id', product_id);

        this.product_inventory.set(product_id, new_product);

        this.el.appendChild(new_product);
    }
  });

/*
AFRAME.registerComponent('shelf', {
    schema: {
      id: {default: 'none'},
    },

    shelf_count = 4,

    products: new Map(),
    vacancies: [],


    init: function () {
        // TODO: initialize the positions array with all possible positions

        // TODO: start call to load products
        // this should be a call to the API with a callback that does the actual
        // loading into the scene once all the products to load are known and 
        // the assets are loaded

        this.add_product ('product1', 1, 1, 0)
    },

    shelf_index_to_position: function (row, column, rank) {
        var bottom_shelf_height = 0.15;
        var shelf_spacing = 0.5;
        var left_offset = -1.4; // TODO: base on width
        var product_spacing = 0.2;
        var depth_offset = 0.125;
        if (rank == 0) {
            depth_offset = -0.125;
        }
        var height = bottom_shelf_height + shelf_spacing * row;
        var horizontal_offset = left_offset + product_spacing * column;
        return { x: 0.3, y: 1, z: 0.2 };
        return { x: horizontal_offset, y: height, z: depth_offset };
    },

    add_product: function (product_id, row, column, rank) {
        if (this.products.has(product_id)) {
            // remove object here
        }
        
        var new_product = document.createElement('a-box');
        //var position = this.shelf_index_to_position(row, column, rank);
        new_product.setAttribute('position', { x: 0.3, y: 1, z: 0.2 });
        new_product.setAttribute('scale', { x: 2.2, y: 2.24, z: 2.15});
        new_product.setAttribute('color', '#AA3399');
        //new_product.setAttribute('grabbable');
        new_product.setAttribute('id', product_id);

        this.product_ids.set(product_id, new_product);

        this.el.appendChild(new_product);
    }
  });
*/