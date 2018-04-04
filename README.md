# Hotdog Not Hotdog

Hotdog Not Hotdog app running in the browser with [tensorflow.js](https://github.com/tensorflow/tfjs) using a pretrained mobilenet model.

![hotdog][hotdog]

The mobilenet used in this example was ported from
[this](https://storage.cloud.google.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/weights_manifest.json)


# Install
Install node packages
```sh
$ npm install
```

# Watch
Prototype app on `http://localhost:1234`
```sh
$ npm run watch
```

# Build
This generates files in the dist directory

```sh
$ npm run build
```

[hotdog]: ./app/images/jinyang.jpeg