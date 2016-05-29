module.exports = {
    entry: './index.js',
    output: {
        filename: './dist/tabs.microlib-2.0.0.js',
        sourceMapFilename: './dist/tabs.microlib-2.0.0.map',
        library: 'es6Boilerplate',
        libraryTarget: 'umd'
    },
    module: {
        preLoaders: [{
            test: /\.js$/, // include .js files
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            loader: 'jshint-loader'
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    jshint: {
        'node': true,
        'browser': true,
        'esnext': true,
        'bitwise': false,
        'camelcase': false,
        'curly': false,
        'eqeqeq': true,
        'immed': true,
        'latedef': true,
        'newcap': true,
        'noarg': true,
        'quotmark': 'single',
        'regexp': true,
        'undef': true,
        'unused': true,
        'strict': true,
        'trailing': true,
        'smarttabs': false,
        'globals': {},
        'predef': [
            'define',
            'require',
            'exports',
            'module',
            'describe',
            'before',
            'beforeEach',
            'after',
            'afterEach',
            'it',
            'inject',
            'expect',
            'spyOn'
        ],
        'indent': 4,
        'devel': true,
        'noempty': true,
        'maxlen': 0
    }
};
