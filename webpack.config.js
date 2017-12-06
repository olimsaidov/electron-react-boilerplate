const path = require('path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const wb = require('webpack-blocks');
const electron = require('electron');
const proc = require('child_process');

const window = wb.createConfig([
  wb.customConfig({
    target: 'electron',
    externals: Object.keys(require('./package').dependencies || {}).concat([
      "desktop-capturer",
      "electron",
      "ipc",
      "ipc-renderer",
      "remote",
      "web-frame",
      "clipboard",
      "crash-reporter",
      "native-image",
      "screen",
      "shell"])}),
  wb.env('development', [
    wb.entryPoint([
      'webpack/hot/signal?SIGUSR2',
      'react-hot-loader/patch']),
    wb.customConfig({
      watch: true,
      watchOptions: {
        ignored: /build/}}),
    wb.addPlugins([
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      {apply(compiler) {
        compiler.plugin("done", () => {
          if (this.child)
            this.child.kill('SIGUSR2');
          else {
            this.child = proc.spawn(electron, ['build/index.js'], {stdio: 'inherit'});
            this.child.on('exit', process.exit)}})}}]),
    wb.sourceMaps()]),
  wb.entryPoint('./src/window.js'),
  wb.setOutput({
    libraryTarget: 'commonjs2',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')}),
  wb.babel(),
  wb.match('*.global.css', [
    wb.css()]),
  wb.match(/^((?!\.global).)*\.css$/, [
    wb.css.modules({
      localIdentName: '[folder]-[local]-[hash:4]'})]),
  wb.match(['*.gif', '*.jpg', '*.png'], [
    wb.file()]),
  wb.setEnv({
    NODE_ENV: 'development'}),
  wb.addPlugins([
    new Html({
      filename: 'window.html',
      template: 'src/window.html'})]),
  wb.env('production', [
    wb.uglify(),
    wb.addPlugins([
      new webpack.LoaderOptionsPlugin({minimize: true})])])]);

const index = wb.createConfig([
  wb.customConfig({
    target: 'electron',
    node: {
      __dirname: false,
      __filename: false},
    externals: Object.keys(require('./package').dependencies || {})}),
  wb.entryPoint('./src/index.js'),
  wb.setOutput({
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')}),
  wb.babel(),
  wb.setEnv({
    NODE_ENV: 'development'}),
  wb.env('production', [
    wb.uglify(),
    wb.addPlugins([
      new webpack.LoaderOptionsPlugin({minimize: true})])])]);

module.exports = [window, index];
