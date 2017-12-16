var path = require('path');

module.exports = {
    watch : true,
    entry : './public/js/app.js',
    output : {
        path : path.resolve(__dirname, './dist'),
        publicPath : './dist/',
        filename : 'build.js'
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test : /\.vue$/,
                loader : 'vue-loader',
                options : {
                    postcss : [require('postcss-cssnext')()]
                }
            },
            {
                test : /\.js$/,
                loader : 'babel-loader',
                exclude : /node_modules/
            },
            {
                test : /\.(png|jpg|gif|svg)$/,
                loader : 'file-loader',
                options : {
                    name : '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve : {
        alias : {
            'vue$' : 'vue/dist/vue.esm.js'
        },
        extensions : ['*', '.js', '.vue', '.json']
    },
    devtool : '#eval-source-map'
};
