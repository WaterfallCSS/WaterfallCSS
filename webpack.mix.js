let mix = require("laravel-mix");
require("laravel-mix-purgecss");

class WafterfallCSSExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:@\/]+/g) || [];
  }
}

mix.setPublicPath("/")
	.sass("sass/pool.scss", "css")
	.options({
		postCss: [
			require("autoprefixer")({
				browsers: [">0%"]
			}),
			require("postcss-discard-comments")({
				removeAll: true
			})
		],
		processCssUrls: false
	})
	.browserSync({
		proxy: "localhost:55754",
		port: 8000,
		files: ["css/*"]
	})
	.purgeCss({
		folders: ["*"],
		extensions: ["html"],
		extractors: [
			{
				extractor: WafterfallCSSExtractor,
				extensions: ["html"]
			}
		]
	})
	.version();
