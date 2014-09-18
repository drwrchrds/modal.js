$.Modal = function(el) {
  this.$el = $(el);
  
  this.showOverlay();
}

$.Modal.prototype.showModal = function() {
  this.$el.addClass('modal-show');
  this.$el.find('button.close-modal').one('click', this.hideOverlay.bind(this));
}

$.Modal.prototype.showOverlay = function() {
  this.$overlay = $('<div class="overlay"></div>');
  var $body = $('body');
  $body.append(this.$overlay);
  $body.addClass('modal-open');
  this.$overlay.append(this.$el);
  this.$overlay.one('click', this.hideOverlay.bind(this));
  setTimeout(this.showModal.bind(this), 0);
}

$.Modal.prototype.hideOverlay = function() {
  var that = this;
  var $body = $('body');
  this.$el.removeClass('modal-show');
  
  this.$el.one('transitionend', function() {
    $body.append(that.$el);
    that.$overlay.remove();    
    $body.removeClass('modal-open');
  });
}

$.fn.modal = function() {
  return this.each(function () {
    new $.Modal(this);
  });
}


