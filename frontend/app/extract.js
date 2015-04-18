export default function(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();

    reader.onload = function(e) {
      resolve(e.target.result);
    };

    reader.onabort = reader.onerror = function() {
      reject(Error('Couldn\'t read file'));
    };

    reader.readAsText(file, 'ISO-8859-1');
  });
};
