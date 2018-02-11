var nunjucks = require('nunjucks');
var minify = require('html-minifier').minify;

var FileSystemLoader = nunjucks.FileSystemLoader;
var defaultMinifyOpts = {
	removeComments: true,
	collapseWhitespace: true,
	minifyJS: true,
	minifyCSS: true,
	ignoreCustomFragments: [/\{\%[^}]+\%\}/]
};

var FileMinifyLoader = FileSystemLoader.extend({
	init: function(searchPaths, opts) {
		if(opts && opts.minify) {
			this.minifyOpts = opts.minify;
		}
		else {
			this.minifyOpts = defaultMinifyOpts;
		}

		if (!this.minifyOpts.ignoreCustomFragments) {
			this.minifyOpts.ignoreCustomFragments = defaultMinifyOpts.ignoreCustomFragments;
		}

		FileSystemLoader.prototype.init.call(this, searchPaths, opts);
	},

	getSource: function(name) {
		var result = FileSystemLoader.prototype.getSource.call(this, name);

		if (!result) return null;

		result.src = minify(result.src, this.minifyOpts);
		return result;
	}
});

module.exports = FileMinifyLoader;