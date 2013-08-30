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
    it('orders a more complicated example', function() {
      expect(EndoxaGraph.toposort(
        EndoxaGraph.fromConnectionsList([
          [0, 1], [0, 2],
          [1, 3],
          [2, 5],
          [3, 4],
          [4, 5], [4, 6],
          [5, 6]
        ])
      )).to.eql([0,1,3,4,2,5,6]);
      // the particular solution is not unique, but it is valid
    });
    it('orders another complicated example', function() {
      expect(EndoxaGraph.toposort(
        EndoxaGraph.fromConnectionsList([
          [0, 1], [0, 2],
          [1, 3],
          [2, 1], [2, 4],
          [3, 5],
          [4, 5], [4, 6],
          [5, 7],
          [6, 7]
        ])
      )).to.eql([0,2,1,3,4,5,6,7]);
      // the particular solution is not unique, but it is valid
    });
    it('orders getting dressed example from the readme', function() {
      expect(EndoxaGraph.toposort(
        EndoxaGraph.fromConnectionsList([
          [0, 6],
          [1, 6],
          [2, 0], [2, 1],
          [3, 0], [3, 7],
          [4, 3], [4, 7],
          [5, 7]
        ])
      )).to.eql([5, 4, 3, 7, 2, 1, 0, 6]);
    });
    it('refuses to sort a cycle', function() {
      expect(function () {
        EndoxaGraph.toposort(
          EndoxaGraph.fromConnectionsList([ [0,1], [1, 0] ])
        );
      }).to.throw();
    });
  });

  describe('#findShortestPath', function(){
    it('finds shortest path between 2 given vertices in a single-path example', function() {
      expect(EndoxaGraph.findShortestPath(1,4,
        EndoxaGraph.fromConnectionsList([
          [0,1],
          [1,2],
          [2,3],
          [3,4]
      ])).to.eql([1,2,3,4]);
    });

    it('finds shortest path between 2 given vertices in a multi-path example', function() {
      expect(EndoxaGraph.findShortestPath(1,4,
        EndoxaGraph.fromConnectionsList([
          [0,1],
          [1,2],
          [2,3],
          [3,4],
          [1,3]
      ])).to.eql([1,3,4]);
    });

    it('finds shortest path between 2 given vertices in a cycle example', function() {
      expect(EndoxaGraph.findShortestPath(1,5,
        EndoxaGraph.fromConnectionsList([
          [0,1],
          [1,2],
          [2,3],
          [3,4],
          [4,5],
          [5,0]
      ])).to.eql([1,0,5]);
    });
  });

});
