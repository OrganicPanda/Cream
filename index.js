var fs = require('fs')
  , glob = require('glob')
  , iconv = require('iconv-lite')
  , statement = require('./statement')
  , detectEncoding = require('detect-character-encoding');

iconv.extendNodeEncodings();

glob('import/*.txt', function(err, files) {
  if (err) throw err;

  files.forEach(function(file) {
    var charset = detectEncoding(fs.readFileSync(file));

    fs.readFile(file, charset.encoding, function(err, data) {
      if (err) throw err;

      statement(data);
    });
  });
});