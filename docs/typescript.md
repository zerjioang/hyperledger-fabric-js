Next step is the conversion of typescript files (ts) to Javascript (js)
To do so, it is neccesary to install typescript using NPm

```bash
npm install typescript
```

After that, there are several dependencies using inside *.ts files that needs to be resolved. Dependency resolution is done via:
```bash
npm install long bytebuffer
```

You can also run

```bash
npm install --save-dev @types/long @types/bytebuffer
```

to use the definitions in development.

## Using Webpack

Since we are using webpack for compilation, this process can be automated following next steps:

Webpack integration is pretty simple. You can use awesome-typescript-loader, a TypeScript loader, combined with source-map-loader for easier debugging. Simply run

```bash
npm install awesome-typescript-loader source-map-loader
```	

and merge in options from the following into your webpack.config.js file:

```js
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // Other options...
};
```