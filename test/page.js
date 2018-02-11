var nunjucks = require('nunjucks');
var path = require('path');
var FileMinifyLoader = require(path.join(__dirname, '..')).FileMinifyLoader;
var assert = require('assert');
var opts = {
    // FileSystemLoader
    noCache: false,
};
var viewPath = path.join(__dirname, 'views');
var loader = new FileMinifyLoader(viewPath, opts);
var env = new nunjucks.Environment(loader);

describe("page.html view", () => {
    it("default settings", () => {
        assert.equal(
            env.render(path.join(viewPath,'page.html'), { title: 'Page title', description:'Page description','stylesheets':["/assets/style.css"],'javascripts':["/assets/main.js"], 'bodyClass':'myBodyClass' }),
            '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Page title</title><meta name="description" content="Page description">  <link rel="stylesheet" type="text/css" href="/assets/style.css">   <script type="text/javascript" src="/assets/main.js"></script>  <style type="text/css">body{color:red}</style></head><script type="text/javascript">var toto="";console.log(toto)</script><body  class="myBodyClass"  >  sample body  </body></html>',
        );
    });
});