game.Inventory.InvSlot = {
  init: function(id) {
    this.id = id;
  },

  getContent: function() {
    return this.item;
  },
  setContent: function(item) {
    this.item = item;
  },
};

