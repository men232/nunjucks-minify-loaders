var nunjucks = require('nunjucks');
var minify = require('html-minifier').minify;

var FileSystemLoader = nunjucks.FileSystemLoader;
var defaultMinifyOpts = {
	removeComments: true,
	collapseWhitespace: true,
	minifyJS: true,
	minifyCSS: true,
	ignoreCustomFragments: [/{([%#])[^]+?\1}/, /{{[^]+?}}/],
	trimCustomFragments: true,
};

class FileMinifyLoader extends FileSystemLoader {
	constructor(searchPaths, opts) {
		super(searchPaths, opts);
		if (opts && opts.minify) {
			this.minifyOpts = opts.minify;
		} else {
			this.minifyOpts = defaultMinifyOpts;
		}

		if (!this.minifyOpts.ignoreCustomFragments) {
			this.minifyOpts.ignoreCustomFragments = defaultMinifyOpts.ignoreCustomFragments;
		}
	}

	getSource(name) {
		var result = super.getSource(name);

		if (!result) return null;

		result.src = minify(result.src, this.minifyOpts);
		return result;
	}
}

module.exports = FileMinifyLoader;
