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
npm install protobufjs [--save --save-prefix=~]
```