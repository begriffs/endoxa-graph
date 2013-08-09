'use strict';
if (typeof define !== 'function') {
  /* jshint latedef:false */
  var define = require('amdefine')(module);
}

define(function() {
  var self = {
    empty: function(directed) {
      if(typeof directed !== 'boolean') {
        directed = true;
      }
      return { nvertices: 0, nedges: 0, edges: {}, degree: {}, directed: directed };
    },

    insertEdge: function(G, x, y) {
      G.edges[x] = {
        weight: null,
        y: y,
        next: G.edges[x]
      };
      G.degree[x] = (G.degree[x] || 0) + 1;
      G.nedges++;
    },

    inspect: function(G) {
      var result = {};
      for(var i = 0; i < G.nvertices; i++) {
        var p = G.edges[i], ar = [];
        while(p) {
          ar.push(p.y);
          p = p.next;
        }
        result[i] = ar;
      }
      return result;
    },

    dfs: function dfs(G, v, processors) {
      var time = 0, dfs0,
        search = {
          discovered: {},
          entryTime: {},
          exitTime: {},
          processed: {},
          parent: {},
          finished: false
        };

      processors             = processors             || {};
      processors.processEdge = processors.processEdge || function() {};
      processors.vertexEarly = processors.vertexEarly || function() {};
      processors.vertexLate  = processors.vertexLate  || function() {};

      dfs0 = function(G, v) {
        var p, y;
        if(search.finished) {
          return;
        }

        search.discovered[v] = true;
        time++;
        search.entryTime[v] = time;

        processors.vertexEarly(search, v);
        p = G.edges[v];

        while(p) {
          y = p.y;
          if(!search.discovered[y]) {
            search.parent[y] = v;
            processors.processEdge(search, v, y);
            dfs0(G, y);
          } else if(!search.processed[y] || G.directed) {
            processors.processEdge(search, v, y);
          }
          p = p.next;
        }
        processors.vertexLate(search, v);
        time++;
        search.exitTime[v] = time;
        search.processed[v] = true;

        return search;
      };

      dfs0(G, v);
      return search;
    },

    findCycle: function(G) {
      var cycleFinder = function(search, x, y) {
        if(search.parent[x] !== y) {
          search.cycle = [y, x];
          search.finished = true;
        }
      };
      return self.dfs(G, 0, { processEdge: cycleFinder }).cycle;
    }
  };
  return self;
});
