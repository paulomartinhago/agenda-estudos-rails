var path = require('path')
var webpack = require('webpack')

let rules = {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
                // other vue-loader options go here
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }
    ]
}

let resolve = {
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'config': path.resolve(__dirname, 'src/config'),
    }
}

let devServer = {
    historyApiFallback: true,
    noInfo: true
}

let performance = {
    hints: false
}

let devtool = '#eval-source-map'

module.exports = [
    {
        entry: {
            propostas: "./src/propostas/main.js"
        },
        output: {
            path: path.resolve(__dirname, './public/dist'),
            publicPath: '/public/dist/',
            filename: "[name]-bundle.js"
        },
        module: rules,
        resolve,
        devServer,
        performance,
        devtool
    },
    {
        entry: {
            integracao: "./src/propostas/integracao-depreciada.js"
        },
        output: {
            path: path.resolve(__dirname, './public/assets'),
            publicPath: '/public/assets/',
            filename: "integracao.js"
        },
        module: rules,
        resolve,
        devServer,
        performance,
        devtool
    },
    {
        entry: {
            integracao: "./src/propostas/integracao-depreciada.js"
        },
        output: {
            path: path.resolve(__dirname, './public/assets'),
            publicPath: '/public/assets/',
            filename: "integracao.min.js"
        },
        module: rules,
        resolve,
        devServer,
        performance,
        devtool
    },
    {
        entry: {
            'logins-seguradoras': "./src/propostas/logins-seguradoras.js"
        },
        output: {
            path: path.resolve(__dirname, './public/dist'),
            publicPath: '/public/dist/',
            filename: "[name]-bundle.js"
        },
        module: rules,
        resolve,
        devServer,
        performance,
        devtool
    }
]

if (process.env.NODE_ENV === 'production') {

    module.exports.forEach(item => {

        item.devtool = '#source-map'
        item.plugins = (item.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                compress: {
                    warnings: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ])

    })

}
