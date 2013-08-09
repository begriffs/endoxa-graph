var EndoxaGraph = require('../module'),
  chai   = require('chai'),
  expect = chai.expect;

describe('EndoxaGraph', function() {
  var emptyGraph = EndoxaGraph.empty();

  describe('#findCycle()', function() {
    it('finds no cycles in an empty graph', function() {
      expect(EndoxaGraph.findCycle(emptyGraph)).to.be.undefined;
    });
    it('finds no cycles in a simple dag', function() {
      expect(EndoxaGraph.findCycle(
        EndoxaGraph.fromConnectionsList([ [0, 1], [1, 2] ])
      )).to.be.undefined;
    });
    it('finds a simple cycle', function() {
      expect(EndoxaGraph.findCycle(
        EndoxaGraph.fromConnectionsList([ [0,1], [1, 0] ])
      )).to.not.be.empty;
    });

    it('finds a longer cycle', function() {
      expect(EndoxaGraph.findCycle(
        EndoxaGraph.fromConnectionsList([ [0, 1], [1, 2], [2, 0] ])
      )).to.not.be.empty;
    });
  });

  describe('#toposort()', function() {
    it('responds with empty list for empty graph', function() {
      expect(EndoxaGraph.toposort(emptyGraph)).to.be.empty;
    });
    it('can put them in order', function() {
      expect(EndoxaGraph.toposort(
        EndoxaGraph.fromConnectionsList([ [0, 1], [0, 2] ])
      )).to.eql([0,1,2]);
    });
  });

});
