import phina from 'phina.js';
import 'scenes/index.js'; // sceneをまとめてロード
import * as config from 'config';

/* globalizeはどこかで一度でも実行していれば有効 */
// phina.globalize();

phina.main(function() {
  var app = phina.game.GameApp({
    startLabel: 'main',
    width: config.SCREEN_WIDTH,
    height: config.SCREEN_HEIGHT,
    assets: config.ASSETS,
    fps: config.FPS,
  });

  // app.enableStats();
  app.run();
});