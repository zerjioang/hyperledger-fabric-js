# Changes from Official SDK

* Winston logging was replaced by js-logger
* No filesystem interactions allowed on browser code so next dependencies are removed: fs, fs-extra, kwal, watch
* GRPC dynamically created js files from .proto has been replaced by static .js files
