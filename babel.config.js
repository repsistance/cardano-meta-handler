module.exports = {
    plugins: [
        ["@babel/plugin-transform-modules-umd", {
        exactGlobals: true,
        globals: {
          index: 'cardanoMetaHandler'
        }
      }]
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  };
