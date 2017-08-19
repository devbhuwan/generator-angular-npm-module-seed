import fs from 'fs';
import path from 'path';

const outputFolder = "./dist";
const sourceFolder = "src";

function isIgnoreExtensions(source) {
  let extension = path.extname(source);
  return extension === '.ts' ||
    extension === '.map' ||
    extension === '.js';
}

function copyFileSync(source, target) {

  let targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }
  if (isIgnoreExtensions(source))
    return;

  console.log("Source=" + source + ",Target=" + target);
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target, extension) {
  let files = [];

  //check if folder needs to be created or integrated
  let targetFolder = path.join(target, path.basename(source)).replace(sourceFolder, '').replace('//', '/');
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      let curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

const copyPlugin = function (options) {
  return {
    ongenerate() {
      const targDir = path.dirname(options.target);
      if (!fs.existsSync(targDir)) {
        fs.mkdirSync(targDir);
      }
      copyFolderRecursiveSync(options.src, options.target);
    }
  };
};

export default {
  entry: outputFolder + '/index.js',
  dest: outputFolder + '/bundles/<%= projectName %>.umd.js',
	sourceMap: false,
	format: 'umd',
	moduleName: 'ng.<%= projectName %>',
	globals: {
		'@angular/core': 'ng.core',
		'@angular/common': 'ng.common',
		'rxjs/Observable': 'Rx',
		'rxjs/ReplaySubject': 'Rx',
		'rxjs/add/operator/map': 'Rx.Observable.prototype',
		'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
		'rxjs/add/observable/fromEvent': 'Rx.Observable',
		'rxjs/add/observable/of': 'Rx.Observable'
	},
  plugins: [
    copyPlugin({
      src: './' + sourceFolder,
      target: outputFolder
    })
  ]
}
