var topN = require('..')
  , assert = require('assert')


var top20 = [ 45, 33, 28, 27, 24, 23, 20, 19, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12 ]
  , topSmall = [ 20, 12, 6, 5, 4, 3, 2, 1 ]
  , error = "Error: ENOENT, open \'test/nonExisting.txt\'"

describe("topN.getN", function() {
  var result

  it('should return the largest N numbers in a file', function() {
    topN.getN('test/test.txt', 20, function(err, res) {
      result = res
      assert.deepEqual(top20, result)
    })
  })

  it('should return as many numbers as it can if N is larger than the input', function() {
    topN.getN('test/testSmall.txt', 20, function(err, res) {
      result = res
      assert.deepEqual(topSmall, result)
    })
  })

  it('should handle empty files', function() {
    topN.getN('test/testEmpty.txt', 20, function(err, res) {
      result = res
      assert.deepEqual([], result)
    })
  })

  it('should handle non-existing files', function() {
    topN.getN('test/nonExisting.txt', 20, function(err, res) {
      result = err.toString()
      assert.deepEqual(error, result)
    })
  })
})

