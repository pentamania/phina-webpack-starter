/**
 * phinaクラスへのショートハンド
 * phina.globalizeしたくないが、namespaceを省略したい場合
 * （例）
 * import ph from 'phinaShortHand';
 * phina.display.DisplayScene => ph.DisplayScene
 */
import * as phina from 'phina.js';

let g = {};
phina.forIn(function(key, value) {
  var ns = key;

  if (typeof value !== 'object') return;

  value.forIn(function(key, value) {
    g[key] = value;
  });
});

export default Object.freeze(g);