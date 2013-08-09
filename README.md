## do things with graphs

[![Build Status](https://travis-ci.org/endoxajs/endoxa-graph.png)](https://travis-ci.org/endoxajs/endoxa-graph)

On the **server** side

```sh
    # command line
    npm install endoxa-graph
```

```js
    // javascript code
    var EndoxaGraph = require('endoxa-graph');
    // have fun
```

On the **client** side

```sh
    # command line
    bower install endoxa-graph
```

```js
    // javascript code
    require(['endoxa-graph'], function(EndoxaGraph) {
      // have fun
    });
```

### do things in the right order

When you get dressed you have to do some things before others.

![Getting Dressed](illustration/getting-dressed.png "Getting Dressed")

OK, so what order should you do it? Ask endoxa:

```js
    EndoxaGraph.toposort(
      EndoxaGraph.fromConnectionsList([
        [0, 6],
        [1, 6],
        [2, 0], [2, 1],
        [3, 0], [3, 7],
        [4, 3], [4, 7],
        [5, 7]
      ])
    );
    // -> [5, 4, 3, 7, 2, 1, 0, 6]
```
![Dressing Order](illustration/dressing-order.png "Dressing Order")

## About EndoxaJS

Endoxa means *established wisdom*. This collection of modules form an
elegant base for JavaScript functional programming on both the client
and server. The idea is that abstractions need to prove themselves in
substantial code, and this library works backwards from interesting
algorithms to the abstract nonsense that makes it beautiful.
