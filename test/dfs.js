var EndoxaGraph = require('../module'),
  chai       = require('chai'),
  expect     = chai.expect;

describe('EndoxaGraph', function() {

  describe('#findCycle()', function() {
    it('finds no cycles in an empty graph', function() {
      var emptyGraph = EndoxaGraph.empty();
      expect(EndoxaGraph.findCycle(emptyGraph)).to.be.undefined;
    });
    it('finds a simple cycle', function() {
      simpleCycle = EndoxaGraph.empty();
      EndoxaGraph.insertEdge(simpleCycle, 0, 1);
      EndoxaGraph.insertEdge(simpleCycle, 1, 0);

      expect(EndoxaGraph.findCycle(simpleCycle)).to.not.be.empty;
    });

    it('finds a longer cycle', function() {
      longerCycle = EndoxaGraph.empty();
      EndoxaGraph.insertEdge(longerCycle, 0, 1);
      EndoxaGraph.insertEdge(longerCycle, 1, 2);
      EndoxaGraph.insertEdge(longerCycle, 2, 0);

      expect(EndoxaGraph.findCycle(longerCycle)).to.not.be.empty;
    });
  });

});
