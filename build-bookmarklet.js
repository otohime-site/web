const fsPromises = require('fs').promises;
const cheerio = require('react-native-cheerio'); // eslint-disable-line import/no-extraneous-dependencies

async function build() {
  const content = await fsPromises.readFile('./build/go.html', 'utf8');
  const $ = cheerio.load(content);
  const cssUrl = $('link').attr('href');
  const runtimeUrl = $('script').eq(0).attr('src');
  const jsUrl = $('script').eq(1).attr('src');
  const goJsContent = `
var l = document.createElment('link');
l.rel = 'stylesheet';
l.href = 'https://smq.moe${cssUrl}';
document.appendChild(l);
var s1 = document.createElement('script');
s1.src = 'https://smq.moe${runtimeUrl}';
document.appendChild(s1);
var s2 = document.createElement('script');
s2.src = 'https://smq.moe${jsUrl}';
document.appendChild(s2);
  `;
  await fsPromises.writeFile('./build/go.js', goJsContent);
  await fsPromises.unlink('./build/go.html');
  console.log('Written go.js!'); // eslint-disable-line no-console
}

build();
