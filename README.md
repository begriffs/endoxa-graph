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

On the **developer** side

```sh
    # command line (use "sudo" if necessary)
    npm install
    
    # install grunt (use "sudo" if necessary)
    npm install -g grunt-cli
    
    # make sure everything installed correctly
    grunt test
```

### contribute tests
In the *endoxa-graph/test/dfs.js* file, you can add tests for features you'd like to see implemented. The tests generally follow the format shown below:

```js
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
```

Keep in mind that your proposed feature/algorithm called `EndoxaGraph.ALGO_NAME()` could use different parameters, not just `EndoxaGraph.fromConnectionsList()`. Also, the expected result does not necessarily need to use `.to.eql()`.

When adding test cases, create a pull request to the *endoxa-graph:unimplemented_tests* branch. **Do not** create a new pull request to the *master* branch if you are only adding test cases.

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

<p align="center">
  <img src="illustration/endoxa-js.png" alt="EndoxaJS Logo" />
</p>
