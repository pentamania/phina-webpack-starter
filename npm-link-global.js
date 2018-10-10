/**
 * (dev)dependenciesにある依存パッケージを、
 * npm installで新規にインストールするのではなく、グローバルのパッケージを使う場合に実行
 * 存在しないパッケージは改めてグローバルインストールされる
 * ./node_modules下にはシンボリックリンクのみ
 */
const { exec } = require('child_process');
const pkg = require('./package.json');

let command = 'npm link ';
const dependencies = Object.assign({}, pkg.dependencies, pkg.devDependencies);
Object.keys(dependencies).forEach((packageName)=> {
  /* バージョン指定：version表記によっては勝手にアップデートされるのでやめとく */
  // var version = dependencies[packageName].replace(/^(\^|\~)/g, '');
  // command += `${packageName}@${version} `;
  command += `${packageName} `;
});

command = command.trim();
console.log("run:", command);
exec(command, (err, stdout, stderr)=> {
  if (err || stderr) {
    console.error("execエラー", err, stderr);
    // throw err || stderr;
    return;
  };

  console.log('npm packages linked');
});