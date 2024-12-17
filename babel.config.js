// Массив, содержащий пресеты для Babel, которые используются при транспиляции кода
const presets = [
  // Пресет для преобразования современного JavaScript в совместимый с различными браузерами
  ['@babel/preset-env', {
    // Указание целевых браузеров и их версий, с которыми нужно обеспечивать совместимость
    targets: {
      edge: '17',        // Поддержка Microsoft Edge версии 17
      ie: '11',          // Поддержка Internet Explorer версии 11
      firefox: '50',     // Поддержка Firefox версии 50
      chrome: '64',      // Поддержка Chrome версии 64
      safari: '11.1'     // Поддержка Safari версии 11.1
    },
    // Указание, что необходимые полифилы должны быть включены на основе точек входа
    useBuiltIns: "entry"
  }]
];

// Экспорт объекта с пресетами для Babel
module.exports = { presets };
