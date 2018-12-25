const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const cheerio = require('react-native-cheerio'); // eslint-disable-line import/no-extraneous-dependencies

function BookmarkletPlugin() {

}

BookmarkletPlugin.prototype.apply = (compiler) => {
  const production = (compiler.options.mode === 'production');
  compiler.hooks.compilation.tap('BookmarkletPlugin', (compilation) => {
    HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
      'BookmarkletPlugin', (data, cb) => {
        if (data.outputName !== 'go.html') {
          return cb(null, data);
        }
        const html = compilation.assets[data.outputName].source();
        const $ = cheerio.load(html);
        const cssUrls = $('link').map((i, el) => $(el).attr('href')).get();
        const jsUrls = $('script').map((i, el) => $(el).attr('src')).get();
        let result = '';
        result += cssUrls.map(url => `
          var l = document.createElement('link');
          l.href = '${(production) ? 'https://smq.moe' : 'https://localhost:5000'}${url}';
          document.head.appendChild(l);
        `).join('\n');
        result += jsUrls.map(url => `
          var s = document.createElement('script');
          s.src = '${(production) ? 'https://smq.moe' : 'https://localhost:5000'}${url}';
          document.head.appendChild(s);
        `).join('\n');
        compilation.assets['go.js'] = { // eslint-disable-line
          source: () => result,
          size: () => result.length,
        };
        return cb(null, data);
      },
    );
  });
};

module.exports = BookmarkletPlugin;
