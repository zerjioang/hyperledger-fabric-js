# Welcome to Hyperledger Fabric JS Bridge

## Directory structure
I choose the following directory structure:

```bash
+-- lib
|   +-- library.js
|   +-- library.min.js
+-- src
|   +-- index.js
+-- test
```

Where `src` contains the source files and `lib` the final compiled version. This means that the entry point of the library is the file under `lib` and not `src`.

## Generate the javascript prototypes and typescript declaration

Now, you can use the tools provided by the Protocol Buffer environment to automatically generate the object prototypes that you will use in your javascript code — for the Swagger + Express + Node.js backend — together with the typescript declaration file that you need to use the same prototypes as classes in your typescript code — for the Angular fronted. If you don’t know what is a declaration file, check out the documentation.

First of all, you will need to install `protobuf.js`. From the official website

```bash
npm install protobufjs --save --save-prefix=~
```

After that, give to it execution permissions with

```bash
chmod +x node_modules/protobufjs/cli/bin/pbjs
```

Once having execution permissions, lets start bashing :)

To get all `.proto` files use next hack:

```bash
echo $(find src/proto -type f)
```

To get all `.proto` files paths use next hack:

```bash
echo $(find src/proto -type d | sed 's/src/-p src/g')
```

To compile all proto files into proper `js` code use next hack:

```bash
pbjs -t static-module -w commonjs --es6 -r src/proto $(find src/proto -type d | sed 's/src/-p src/g') -o src/gen/vendor.js $(find src/proto -type f)
```

Make sure `pbjs` is added to your current `PATH`, otherwise you will need to use full path command:

```bash
node_modules/protobufjs/cli/bin/pbjs -t static-module -w commonjs --es6 -r src/proto $(find src/proto -type d | sed 's/src/-p src/g') -o src/gen/vendor.js $(find src/proto -type f)
```

This code will generate next example command:

```bash
pbjs
-t static-module
-w commonjs
--es6
-r src/proto
-p src/proto
-p src/proto/idemix
-p src/proto/discovery
-p src/proto/gossip
-p src/proto/common
-p src/proto/ledger
-p src/proto/ledger/rwset
-p src/proto/ledger/rwset/kvrwset
-p src/proto/orderer
-p src/proto/msp
-p src/proto/peer
-o src/gen/vendor.js
src/proto/idemix/idemix.proto
src/proto/discovery/protocol.proto
src/proto/.protoroot
src/proto/gossip/message.proto
src/proto/common/policies.proto
src/proto/common/collection.proto
src/proto/common/common.proto
src/proto/common/ledger.proto
src/proto/common/configuration.proto
src/proto/common/configtx.proto
src/proto/ledger/rwset/rwset.proto
src/proto/ledger/rwset/kvrwset/kv_rwset.proto
src/proto/orderer/ab.proto
src/proto/orderer/configuration.proto
src/proto/msp/identities.proto
src/proto/msp/msp_principal.proto
src/proto/msp/msp_config.proto
src/proto/peer/chaincode.proto
src/proto/peer/events.proto
src/proto/peer/proposal_response.proto
src/proto/peer/transaction.proto
src/proto/peer/query.proto
src/proto/peer/peer.proto
src/proto/peer/proposal.proto
src/proto/peer/configuration.proto
src/proto/peer/chaincode_event.proto
```

After successful execution a `ES6` compatible javascript file called `vendor.js` will be created in `src/gen`.