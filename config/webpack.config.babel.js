// console.log(' -> Run file in directory:', __dirname);
// process.exit(0); // Ця штука вбиває приложуху і завершу процес) Без еррорів)
// Якщо передати НУЛЬ

/* Запусти тепер скріпт npm run front:dev
// Є?
// є
// __dirname - питання є?
    - зрозміло
    - Мув ту лайн: 70
*/
import webpack from 'webpack'
import path from 'path'


import HTMLWebpackPlugin from 'html-webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

/*

    - Ти тут?
    - так
    - Це ті мінімальні модулі, що нам зараз треба будуть
      установиш їх? Є питання?
    - встановив
    - Всі? (Встановлювати так: npm i <модуль1 модульN> -D)
    - я зазвичай по одному встановлював) Буду знати що і через пробіл можна
    - Бачу! Гуд!
        "copy-webpack-plugin": "^4.6.0",
        "extract-text-webpack-plugin": "^3.0.2",
        "html-webpack-plugin": "^3.2.0",
        "path": "^0.12.7"
    
    
    - Ще треба лоадери, але ладно) Поки давай мінімалку зафігачимо)
    - що далі? давай
*/

export default ({mode='production'}) => {
    
    console.log(' -> MODE::', mode)

    const isDev = mode === 'development',
        isProd = !isDev
    
    // Тут все ясно? 
    // hash це для боротьби з кешом
    // `${__dirname це для  тут тут
    // Це для того, щоб точно знайти місце файлу. Дивись  гуд
    
    let extractCSS = new ExtractTextPlugin({
        disable: false,
        allChunks: true,
        filename: 'static/style/css-[name].css?v=[chunkhash]',
    })
    
    let extractLESS = new ExtractTextPlugin({
        filename: '[name].css?v=[chunkhash]',
        disable: false,
    })
    
    return {
        mode,
        entry: {
            index: './client/src/index.js', // index - це name тут ясно
            // Ти будеш робити папку src?
            // є
            // Запускаємо)
            // Запусти в прод і подивись, а потім так само в дев!
            // Гуд) Бачу що вже робиш)))))
        },
        output: {
            publicPath: '/',
            // можна кеш записати прямо у ім'я [name]-[hash].js
            // але це нам трішки ускладнить процес)))
            // Хоча в реальному проекті так треба)
            // Тут все понятно?
            // так
            filename: isDev
                ? '[name].js?v=[hash]'
                : '[name]-[hash].js',
            path: `${__dirname}/../client/dist`,
            chunkFilename: '[name].bundle.js',
        },
        /*
            - Це понятно що і навіщо?
            - компілим в папку діст
            - Вгорі так!
              А в низу?
            - понятн
            - Це ми записуємо соурсмапи, якщо ми в дев режимі і не пишемо в прод
            - 
            - Гуд! Створюємо 'index')
            - index ж є в статік
        */
        devtool: isDev? 'cheap-inline-module-source-map': false,
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { 'modules': false }],
                            // ['es2015', { 'modules': false }],
                            // 'stage-0',
                        ]
                    }
                }],
                exclude: /node_modules/
            }, {
                // CSS
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader?minimize',/* 'css-loader?minimize'*//*, 'postcss-loader'*/ ]),
            }, {
                // LESS
                test: /\.less$/,
                use: extractLESS.extract({
                    use: [/*{
                        loader: 'vue-style-loader',
                    },*/ {
                        loader: 'css-loader',
                    }, {
                        loader: 'less-loader', 
                        options: {
                            paths: [
                                path.resolve(__dirname, '..', 'client', 'src', 'less'),
                                path.resolve(__dirname, '..', 'node_modules'),
                            ],
                        },
                    }],
                    fallback: 'style-loader'
                })
            }, {
                // Тут треба сконфіжити паг, лесс і навіть js
                test: /\.pug$/,
                // use: [{
                //     loader: 'pug-plain-loader',
                // }],
                oneOf: [
                    // this applies to <template lang="pug"> in Vue components
                    {
                        resourceQuery: /^\?vue/,
                        use: ['pug-plain-loader']
                    },
                    // this applies to pug imports inside JavaScript
                    {
                        // Постав ще цей лоадер 'raw-loader'
                        use: ['raw-loader', 'pug-plain-loader']
                    }
                ],
            }, {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader'
                        },
                        babel: {
                            babelrc: false,
                            presets: ['@babel/preset-env', { 'modules': false }],
                            // plugins: ['@babel/plugin-transform-destructuring', ['@babel/plugin-proposal-object-rest-spread', { 'useBuiltIns': true }]],
                        },
                    },
                }/*, 'babel-loader'*/],
            }],
        },
        plugins: [
            
            
            // Знаєш, що це?
            //  про що? те що вище?
            //  режими дев прод
            // Що з ними робиться? І для чого? 
            //  
            new webpack.DefinePlugin({
                isDev,
                isProd,
                name: JSON.stringify(`Misha::${__dirname}`),// Хз, що це я зробив? шукаєш де я
                // Го в індекс.js
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            
            // І це ти мабуть вже здогадався))
            // так
            new CopyWebpackPlugin([{
                to: `${__dirname}/../client/dist`,
                from: `${__dirname}/../client/static`,
            }]),
            
            
            new HTMLWebpackPlugin({
                path: `${__dirname}/../client/dist`,
                // filename: 'index.html',
                template: 'client/src/index.pug',
            }),
            
            extractCSS,
            extractLESS,
            
            new VueLoaderPlugin(),
            
        ],
        resolve: {
            extensions: ['*', '.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                // docRoot: __dirname + '/../../document root',
                // app: `${__dirname}/app`,
            },
            // modules: [
            //     'node_modules',
            //     path.resolve(__dirname, 'src'),
            // ],
        },
    }
}