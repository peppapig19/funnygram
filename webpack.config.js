/* eslint-disable */
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx', // точка входа приложения   
    output: { // единственный файл, который будет использоваться браузером, со сборкой всех модулей приложения
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    target: 'web',
    devServer: {
        port: '9500', // порт сервера разработки
        static: ['./public'], // какие статические файлы вебпак будет обслуживать
        open: true,
        liveReload: true, // обнаружение изменений кода
        hot: true // обновлять модули без перезагрузки страницы
    },
    resolve: {
        // если у нескольких файлов одинаковое имя, но разные расширения, вебпак использует первое расширение в списке
        // это позволяет не указывать расширение при импорте
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // искомые расширения
                exclude: /node_modules/,
                use: 'ts-loader' // транспайлер
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s(a|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'] // загрузка стилей, затем внедрение их в DOM
            },
        ]
    }
}