const mix = require('laravel-mix');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
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


