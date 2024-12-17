// Подключение плагина для добавления вендорных префиксов в CSS
const autoprefixer = require('autoprefixer');
// Подключение плагина для минимизации CSS
const cssnano = require('cssnano');

// Экспорт конфигурации для плагинов PostCSS
module.exports = {
  // Список плагинов, которые будут использоваться в PostCSS
  plugins: [
    // Использование плагина для добавления вендорных префиксов
    autoprefixer,
    // Использование плагина для минимизации CSS с настройками по умолчанию
    cssnano({preset: 'default'})
  ]
};
