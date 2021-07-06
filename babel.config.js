module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ['@babel/transform-runtime'],
    presets: ['@babel/preset-env', '@babel/react', '@babel/preset-typescript'],
  };
};
