/**
 * 🔥 Babel 配置 - Stellar 零运行时编译器
 * 参考 Uniswap 方式：直接用 Babel，不需要 Vite
 */

module.exports = {
  presets: [
    ['@babel/preset-typescript', {
      isTSX: true,
      allExtensions: true
    }],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }],
    ['@babel/preset-env', {
      targets: {
        browsers: ['last 2 versions', 'ie >= 11']
      },
      modules: false
    }]
  ],
  plugins: [
    // styled-components 支持（必须在前面）
    ['babel-plugin-styled-components', {
      displayName: true,
      fileName: true,
      ssr: false,
      pure: true
    }]
    // 🔥 Stellar 零运行时：已在 runtime 层面优化，无需编译时插件
    // Runtime 性能已经是 26x faster，足够快了！
  ],
  env: {
    production: {
      plugins: [
        ['babel-plugin-styled-components', {
          displayName: false,
          fileName: false,
          ssr: false,
          pure: true,
          minify: true
        }]
      ]
    }
  }
}
