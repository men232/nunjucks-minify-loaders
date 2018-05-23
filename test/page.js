var nunjucks = require('nunjucks');
var path = require('path');
var FileMinifyLoader = require('..').FileMinifyLoader;
var assert = require('assert');
var opts = {
	// FileSystemLoader
	noCache: false,
};
var viewPath = path.join(__dirname, 'views');

describe('page.html view', () => {
	it('works using default settings', () => {
		var loader = new FileMinifyLoader(viewPath, opts);
		var env = new nunjucks.Environment(loader);

		assert.equal(
			env.render('page.html', { title: 'Page title', description:'Page description','stylesheets':["/assets/style.css"],'javascripts':["/assets/main.js"], 'bodyClass':'myBodyClass' }),
			'<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Page title</title><meta name="description" content="Page description">  <link rel="stylesheet" type="text/css" href="/assets/style.css">   <script type="text/javascript" src="/assets/main.js"></script>  <style type="text/css">body{color:red}</style></head><body  class="myBodyClass"  ><script type="text/javascript">var toto="";console.log(toto)</script>  sample body  </body></html>',
		);
	});

	it('is passing opts to html-minifier', () => {
		var loader = new FileMinifyLoader(viewPath, Object.assign({} , opts, {
			minify: {
				removeComments: false,
				collapseWhitespace: true,
				minifyJS: true,
				minifyCSS: true,
			},
		}));
		var env = new nunjucks.Environment(loader);

		assert.equal(
			env.render('page.html', { title: 'Page title', description:'Page description','stylesheets':["/assets/style.css"],'javascripts':["/assets/main.js"], 'bodyClass':'myBodyClass' }),
			'<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Page title</title><meta name="description" content="Page description">  <link rel="stylesheet" type="text/css" href="/assets/style.css">   <script type="text/javascript" src="/assets/main.js"></script>  <style type="text/css">body{color:red}</style></head><body  class="myBodyClass"  ><!--This is a comment--><script type="text/javascript">var toto="";console.log(toto)</script>  sample body  </body></html>',
		);
	});
});
