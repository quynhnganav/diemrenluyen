const mix = require('laravel-mix');
const path = require('path');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

//  mix.webpackConfig({
//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: "static/css/[contenthash].css",
//             chunkFilename: "static/css/[contenthash].chunk.css",
//         })
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.css$/i,
//                 use: [MiniCssExtractPlugin.loader, 'css-loader'],
//             },
//         ],
//     },
// });

mix.js("resources/js/app.js", "public/js").react().version().extract()
mix.less('resources/js/app.less', 'public/css',{
    lessOptions: {
        javascriptEnabled: true
    }
});
mix.babelConfig({
    plugins: [
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "less" }]
    ]
})
// https://laravel-mix.com/docs/6.0/upgrade

mix.webpackConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js/"),
            assets: path.resolve(__dirname, "resources/js/assets"),
            "@components/*": path.resolve(__dirname, "resources/js/components/*"),
            constants: path.resolve(__dirname, "resources/js/constants"),
            helpers: path.resolve(__dirname, "resources/js/helpers"),
            modules: path.resolve(__dirname, "resources/js/modules"),
            services: path.resolve(__dirname, "resources/js/services"),
            router: path.resolve(__dirname, "resources/js/router"),
            core: path.resolve(__dirname, "resources/js/core"),
            "@store": path.resolve(__dirname, "resources/js/store"),
            "@context": path.resolve(__dirname, "resources/js/context"),
        }
    }
});


