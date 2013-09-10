var graph  = require('../module'),
  list     = require('endoxa-core').list,
  chai     = require('chai'),
  assert   = chai.assert,
  claire   = require('claire'),
  data     = claire.data,
  PairList = data.Array(claire.sequence(data.Byte, data.Byte)),
  _        = require('lodash');

describe('EndoxaGraph', function() {
  'use strict';

  it('exists', function() {
    assert.isObject(graph);
  });

  describe('fromConnectionsList', function(){
    var g;
    it('has as many edges as pairs passed',
      claire.forAll(PairList).satisfy(function(pairs){
        g = graph.fromConnectionsList(pairs);
        assert.equal(g.nedges, pairs.length);
        return true;
      }).asTest()
    );

    it('has as many vertices as the max vertex passed',
      claire.forAll(PairList).satisfy(function(pairs){
        g = graph.fromConnectionsList(pairs);
        if(pairs.length){
          assert.equal(g.nvertices, _.max(_.flatten(pairs)));
        }
        else {
          assert.equal(g.nvertices, 0);
        }
        return true;
      }).asTest()
    );

    it('produces the right adjacency lists', function(){
      var pairs = [[0,1], [1,2], [1,3],[2,1], [3,0], [0, 4]];
      var g = graph.fromConnectionsList(pairs);
      _.each(pairs, function(pair) {
        assert(
          list.any(function(edge){return edge.y === pair[1];}, g.edges[pair[0]])
        );
      });
    });
  });
});
