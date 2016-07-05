var EndoxaGraph = require('../module'),
  chai   = require('chai'),
  assert   = chai.assert;

describe('EndoxaGraph', function() {
  'use strict';

  var emptyGraph = EndoxaGraph.empty();

  describe('#findCycle()', function() {
    it('finds no cycles in an empty graph', function() {
      assert.isUndefined(EndoxaGraph.findCycle(emptyGraph));
    });
    it('finds no cycles in a simple dag', function() {
      assert.isUndefined(EndoxaGraph.findCycle(
        EndoxaGraph.fromConnectionsList([ [0, 1], [1, 2] ])
      ));
    });
    it('finds a simple cycle', function() {
      assert.notDeepEqual(EndoxaGraph.findCycle(
        EndoxaGraph.fromConnectionsList([ [0,1], [1, 0] ])
      ), []);
    });

    it('finds a longer cycle', function() {
      assert.notDeepEqual(EndoxaGraph.findCycle(
        EndoxaGraph.fromConnectionsList([ [0, 1], [1, 2], [2, 0] ])
      ), []);
    });
  });

  describe('#toposort()', function() {
    it('responds with empty list for empty graph', function() {
      assert.deepEqual(EndoxaGraph.toposort(emptyGraph), []);
    });
    it('can put them in order', function() {
      assert.deepEqual(EndoxaGraph.toposort(
        EndoxaGraph.fromConnectionsList([ [0, 1], [0, 2] ])
      ), [0,1,2]);
    });
    it('orders a more complicated example', function() {
      assert.deepEqual(EndoxaGraph.toposort(
        EndoxaGraph.fromConnectionsList([
          [0, 1], [0, 2],
          [1, 3],
          [2, 5],
          [3, 4],
          [4, 5], [4, 6],
          [5, 6]
        ])
      ), [0,1,3,4,2,5,6]);
      // the particular solution is not unique, but it is valid
    });
    it('orders another complicated example', function() {
      assert.deepEqual(EndoxaGraph.toposort(
        EndoxaGraph.fromConnectionsList([
          [0, 1], [0, 2],
          [1, 3],
          [2, 1], [2, 4],
          [3, 5],
          [4, 5], [4, 6],
          [5, 7],
          [6, 7]
        ])
      ), [0,2,1,3,4,5,6,7]);
      // the particular solution is not unique, but it is valid
    });
    it('orders getting dressed example from the readme', function() {
      assert.deepEqual(EndoxaGraph.toposort(
        EndoxaGraph.fromConnectionsList([
          [0, 6],
          [1, 6],
          [2, 0], [2, 1],
          [3, 0], [3, 7],
          [4, 3], [4, 7],
          [5, 7]
        ])
      ), [5, 4, 3, 7, 2, 1, 0, 6]);
    });
    it('refuses to sort a cycle', function() {
      assert.throw(function () {
        EndoxaGraph.toposort(
          EndoxaGraph.fromConnectionsList([ [0,1], [1, 0] ])
        );
      });
    });
  });

  describe('#ALGO_NAME', function(){
    it('DESCRIPTION OF BEHAVIOR', function() {
      expect(EndoxaGraph.ALGO_NAME(
        EndoxaGraph.fromConnectionsList(
          /* 2D ARRAY:
          EACH CONNECTION IS 2-ELEMENT ARRAY
            e.g., [0,1]
          EACH CONNECTION LIST IS AN ARRAY
          OF THE 2-ELEMENT CONNECTIONS
            e.g., [[0,1],[1,2]]
          */
      )).to.eql(/*EXPECTED OUTPUT*/);
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
