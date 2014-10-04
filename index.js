var fs = require('fs')
  , glob = require('glob')
  , iconv = require('iconv-lite')
  , statement = require('./statement');

// TODO: stupid content encoding ...
iconv.extendNodeEncodings();

glob("import/*.txt", function(err, files) {
  if (err) throw err;

  files.forEach(function(file) {
  	fs.readFile(file, 'utf-8', function(err, data) {
  	  if (err) throw err;

  	  statement(data);
  	});
  });
});