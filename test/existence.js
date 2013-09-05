var graph  = require('../module')
  chai     = require('chai')
  assert   = chai.assert
  claire   = require('claire')
  data     = claire.data
  PairList = data.Array(claire.sequence(data.Byte, data.Byte))
  _        = require('lodash')
;

describe('EndoxaGraph', function() {
  it('exists', function() {
    assert.isObject(graph)
  });

  describe('fromConnectionsList', function(){
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
  });
});
