var createReadStream = require('fs').createReadStream
  , readline = require('readline')
  , stream = require('stream')

function getN(file, n, callback)  {
  var result
    , contents = createReadStream(file)

  contents.on('error', function(error) {
    return callback(error)
  })

  var rl = readline.createInterface(contents, new stream)
    , nArray = new Array(n)
    , count = 0

  rl.on('line', function(line) {
    var number = parseInt(line)
    count++
    if(number){
      for(var i = n - 2; i >= 0; i--) {
        if(number > nArray[i] || typeof nArray[i] === 'undefined') {
          nArray[i + 1] = nArray[i]
          nArray[i] = number
      }
    }
  }
})

  rl.on('close', function() {
    if(count < n)
      return callback(null, nArray.slice(0, count))
    return callback(null, nArray)
  })
}

module.exports = {
  getN :  getN
}