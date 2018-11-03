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
// import VueLoaderPlugin from 'vue-loader/lib/plugin'
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
        plugins: [
            
            
            // Знаєш, що це?
            new webpack.DefinePlugin({
                isDev,
                isProd,
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            
            // І це ти мабуть вже здогадався))
            // так
            new CopyWebpackPlugin([{
                to: `${__dirname}/../client/dist`,
                from: `${__dirname}/../client/static`,
            }]),
            
        ],
    }
}