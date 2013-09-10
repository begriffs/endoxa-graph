'use strict';
if (typeof define !== 'function') {
  /* jshint latedef:false */
  var define = require('amdefine')(module);
}

define(['endoxa-core'], function(core) {
  /*jshint unused:vars */
  var list = core.list;

  function edgeClassification(search, x, y) {
    if(search.parent[y] === x) { return 'tree'; }
    if(search.discovered[y] && !search.processed[y]) { return 'back'; }
    if(search.processed[y] && search.entryTime[y] > search.entryTime[x]) { return 'forward'; }
    if(search.processed[y] && search.entryTime[y] < search.entryTime[x]) { return 'crossed'; }
    return 'unclassified';
  }

  var self = {
    empty: function(directed) {
      if(typeof directed !== 'boolean') {
        directed = true;
      }
      return { nvertices: 0, nedges: 0, edges: [], degree: [], directed: directed };
    },

    fromConnectionsList: function(list, directed) {
      var result = self.empty(directed);
      for(var i in list) {
        self.insertEdge(result, list[i][0], list[i][1]);
      }
      return result;
    },

    insertEdge: function(G, x, y) {
      G.edges[x] = list.cons({weight: null, y: y}, G.edges[x]);
      G.degree[x] = (G.degree[x] || 0) + 1;
      G.nedges++;
      G.nvertices = Math.max(G.nvertices, x, y);
    },

    inspect: function(G) {
      var result = {};
      for(var i = 0; i < G.nvertices; i++) {
        var p = G.edges[i], ar = [];
        while(p && p !== list.empty) {
          ar.push(p.head.y);
          p = p.tail;
        }
        result[i] = ar;
      }
      return result;
    },

    dfs: function dfs(G, v, processors, search) {
      var time = 0, dfs0;
      search = search || {
        discovered: [],
        entryTime: [],
        exitTime: [],
        processed: [],
        parent: [],
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

        while(p && p !== list.empty) {
          y = p.head.y;
          if(!search.discovered[y]) {
            search.parent[y] = v;
            processors.processEdge(search, v, y);
            dfs0(G, y);
          } else if(!search.processed[y] || G.directed) {
            processors.processEdge(search, v, y);
          }
          p = p.tail;
        }
        processors.vertexLate(search, v);
        time++;
        search.exitTime[v] = time;
        search.processed[v] = true;
      };

      dfs0(G, v);
      return search;
    },

    findCycle: function(G) {
      var cycleFinder = function(search, x, y) {
        if(edgeClassification(search, x, y) === 'back') {
          search.cycle = [y, x];
          search.finished = true;
        }
      };
      var t = self.dfs(G, 0, { processEdge: cycleFinder }).cycle;
      return t;
    },

    toposort: function(G) {
      if(!G.directed) {
        throw 'Cannot topologically sort an undirected graph';
      }

      var i,
        search,
        sorted = [],
        vertexLate = function(search, v) {
          sorted.unshift(v);
        },
        processEdge = function(search, x, y) {
          if(edgeClassification(search, x, y) === 'back') {
            throw 'unexpected cycle';
          }
        };

      for(i = 0; i < G.nvertices; i++) {
        if(!search || !search.discovered[i]) {
          search = self.dfs(G, i, { vertexLate: vertexLate, processEdge: processEdge }, search);
        }
      }

      return sorted;
    }
  };
  return self;
});
