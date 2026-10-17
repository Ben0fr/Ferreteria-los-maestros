module.exports = function (config) {
  config.set({
    frameworks: ['vite', 'jasmine'],
    plugins: [
      'karma-vite',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage'
    ],
    files: [
      // served:false y watched:false son requeridos por karma-vite:
      // es Vite quien sirve y transforma los archivos de prueba (JSX)
      { pattern: 'src/**/*.spec.jsx', type: 'module', watched: false, served: false },
      { pattern: 'src/**/*.spec.js', type: 'module', watched: false, served: false }
    ],
    vite: {
      config: {
        server: { fs: { allow: ['.'] } }
      },
      // Instrumentación de cobertura (vite-plugin-istanbul viene incluido en karma-vite)
      coverage: {
        include: ['src/**/*.{js,jsx}'],
        exclude: ['src/**/*.spec.{js,jsx}', 'src/main.jsx'],
        extension: ['.js', '.jsx']
      }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'text' }
      ]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
