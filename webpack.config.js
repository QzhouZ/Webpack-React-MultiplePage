var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_dir = path.join(__dirname, './node_modules/');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取所有入口文件
var getEntry = function(globPath) {
    var entries = {
        vendor: ['jquery','react','react-dom','./src/app'] // 类库
    };
    glob.sync(globPath).forEach(function(entry) {
        var pathname = entry.split('/').splice(-2).join('/').split('.')[0];
        entries[pathname] = [entry];
    });
    console.log(entries);
    return entries;
};
// 判断是否是在当前生产环境
var isProduction = process.env.NODE_ENV === 'production';
var entries = getEntry('./src/view/*/*.jsx');
var chunks = Object.keys(entries);
module.exports = {
    entry: entries,
    output: {
        path: path.join(__dirname, './dist'),
        filename: isProduction ?'js/[name].[hash:8].js':'js/[name].js',
        publicPath: '/dist/',
        chunkFilename: 'chunk/[name].chunk.js'
    },
    module: {
        noParse:[
            /*path.join(node_dir,'./react/dist/react.min.js'),
            path.join(node_dir,'./jquery/dist/jquery.min.js'),
            path.join(node_dir,'./react-dom/dist/react-dom.min.js')*/
        ],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            },
            exclude: node_dir
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }, {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'url?limit=8192&name=img/[hash:8].[ext]'
        }, {
            //文件加载器，处理文件静态资源
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file?limit=10000&name=fonts/[hash:8].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
            mod: node_dir
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery', // 使jquery变成全局变量,不用在自己文件require('jquery')了
            jQuery: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        // 类库统一打包生成一个文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: isProduction ? 'js/vendor.[hash:8].js':'js/vendor.js',
            minChunks: 3 // 提取使用3次以上的模块，打包到vendor里
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin(isProduction ? 'css/[name].[hash:8].css':'css/[name].css')
    ],
    devtool: isProduction ? null : 'source-map'
};
// 生成HTML文件
chunks.forEach(function(pathname) {
    if (pathname == 'vendor') {
        return;
    }
    var conf = {
        title: 'My App',
        filename: isProduction? '../view/' + pathname + '.html' : pathname + '.html',
        template: './src/template.html',
        inject: 'body',
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    };
    if (pathname in module.exports.entry) {
        conf.chunks = ['vendor', pathname];
        conf.hash = false;
    }
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});

