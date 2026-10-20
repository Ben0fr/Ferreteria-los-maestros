module.exports = function (config) {
  config.set({
    frameworks: ['vite', 'jasmine'],
    plugins: [
      'karma-vite',
      'karma-jasmine',
      'karma-edge-launcher',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-jasmine-html-reporter'
    ],
    files: [
      { pattern: 'src/**/*.spec.jsx', type: 'module', watched: false, served: false },
      { pattern: 'src/**/*.spec.js', type: 'module', watched: false, served: false }
    ],
    vite: {
      config: {
        server: { fs: { allow: ['.'] } }
      },
      coverage: {
        include: ['src/**/*.{js,jsx}'],
        exclude: ['src/**/*.spec.{js,jsx}', 'src/main.jsx'],
        extension: ['.js', '.jsx']
      }
    },
    client: {
      clearContext: false
    },
    reporters: ['progress', 'coverage', 'kjhtml'],
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'text' }
      ]
    },
    browsers: ['Chrome'],
    singleRun: false
  });
};
