// Подключение модуля path для работы с путями в файловой системе
const path = require('path');
// Подключение плагина для автоматической генерации HTML-файла
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Подключение плагина для очистки директории вывода перед сборкой
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// Подключение плагина для извлечения CSS в отдельные файлы
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Экспорт конфигурации Webpack
module.exports = {
  // Точка входа для сборки
  entry: {main: './src/pages/index.js'},
  output: {
    // Указание пути для директории вывода файлов
    path: path.resolve(__dirname, 'dist'),
    // Название результирующего JavaScript-файла
    filename: 'main.js',
    // Указание базового пути для всех файлов
    publicPath: ''
  }, 
  // Режим сборки (разработка)
  mode: 'development',
  devServer: {
    // Указание директории для сервера
    static: path.resolve(__dirname, './dist'),
    // Включение сжатия файлов на сервере
    compress: true,
    // Указание порта для запуска сервера
    port: 8080,
    // Автоматическое открытие браузера при запуске сервера
    open: true
  },
  module: {
    rules: [
      {
        // Правило для обработки файлов JavaScript
        test: /\.js$/,
        // Использование babel-loader для транспиляции JavaScript
        use: 'babel-loader',
        // Исключение директории node_modules из обработки
        exclude: '/node_modules/'
      },
      {
        // Правило для обработки медиа-файлов и шрифтов
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        // Использование типа ресурса для обработки этих файлов
        type: 'asset/resource'
      },
      {
        // Правило для обработки файлов CSS
        test: /\.css$/,
        use: [
          // Использование плагина для извлечения CSS в отдельный файл
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // Указание количества загрузчиков для CSS
              importLoaders: 1
            }
          },
          // Использование postcss-loader для обработки CSS с PostCSS
          'postcss-loader'
        ]
      },
    ]
  },
  // Список плагинов, которые будут использоваться
  plugins: [
    // Плагин для генерации HTML-файла с подключением результатов сборки
    new HtmlWebpackPlugin({
      // Шаблон для генерируемого HTML-файла
      template: './src/index.html'
    }),
    // Плагин для очистки директории вывода перед новой сборкой
    new CleanWebpackPlugin(),
    // Плагин для извлечения CSS в отдельные файлы
    new MiniCssExtractPlugin()
  ]
}
