# Nunjucks minifier loader
Simple module to passing source from loader via HTML minifier.

# Installation
`npm install nunjucks-minify-loaders`

# Using
```js
var nunjucks = require('nunjucks');
var FileMinifyLoader = require('nunjucks-minify-loaders').FileMinifyLoader

var opts = {
    // FileSystemLoader
    watch: true
    noCache: false

    // html-minifier
    minify: {
        removeComments: true,
        minifyJS: true,
    }
};

var loader = new FileMinifyLoader('./views', opts);
var env = new nunjucks.Environment(loader);

// Now every loaded templates from ./views will be handled via html-minifier
```


### [More about HTML-minifier](https://github.com/kangax/html-minifier)