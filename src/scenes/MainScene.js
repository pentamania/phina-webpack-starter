import phina from 'phina.js';
import ph from 'shorthand';

export var Mainscene = phina.define('MainScene', {
  superClass: phina.display.DisplayScene,

  init: function(options) {
    this.superInit(options);
    this.backgroundColor = '#A3FCFC';

    ph.Label()
      .setPosition(this.gridX.center(),this.gridY.span(5))
      .addChildTo(this)
    ;

    this.player = ph.Sprite("player")
      .setPosition(this.gridX.center(),this.gridY.center())
      .addChildTo(this)
    ;
  },

  update: function(app) {
    var p = app.pointer;
    if (p.getPointing()) {
      this.player.setPosition(p.x, p.y);
    }
  },
});
