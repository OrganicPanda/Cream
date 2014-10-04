var findSections = function(data) {
  var newLine = '\\r\\n'
    , newLineOrSpace = newLine + '\\s'
    , value = '\\s([^' + newLine + ']+)'
    , valueAndNewLine = value + '[' + newLineOrSpace + ']+'
    , structure = 'Date:' + valueAndNewLine + 
                  'Description:' + valueAndNewLine + 
                  'Amount:' + valueAndNewLine + 
                  'Balance:' + value
    , pattern = new RegExp(structure)
    , patterng = new RegExp(structure, 'g');

  var sections = data.match(patterng) || [];

  return sections.map(function(section) {
    var result = pattern.exec(section);

    if (result && result.length === 5) {
      var date = result[1].trim()
        , description = result[2].trim()
        , amount = result[3].trim()
        , balance = result[4].trim();

      return {
        date: date,
        description: description,
        amount: amount,
        balance: balance
      };
    } else {
      console.log('no match!', JSON.stringify(section));

      return null;
    }
  }).filter(function(section) {
    return section !== null;
  });
};

module.exports = function(data) {
  var sections = findSections(data);

  console.log('sections', sections);
};