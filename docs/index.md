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