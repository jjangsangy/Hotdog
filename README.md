# Hotdog Not Hotdog

Hotdog Not Hotdog app running in the browser with [tensorflow.js](https://github.com/tensorflow/tfjs) using a pretrained mobilenet model.

![hotdog][hotdog]

The mobilenet used in this example was ported from
[this](https://storage.cloud.google.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/weights_manifest.json)


# Mobilenet

In this example we utilize `mobilenet v1.0.224` which has a very high performance on imagenet relative model filesize. In comparison the filesize of the weights of [VGG-16](http://www.robots.ox.ac.uk/~vgg/research/very_deep/) is `528MB` whereas `mobilenet v1.0.224` which has similar performance is only `32.5MB`.

![imagenet](https://github.com/tensorflow/models/raw/master/research/slim/nets/mobilenet_v1.png)

Model  | Million MACs | Million Parameters | Top-1 Accuracy| Top-5 Accuracy |
:----:|:------------:|:----------:|:-------:|:-------:|
[MobileNet_v1_1.0_224](http://download.tensorflow.org/models/mobilenet_v1_2018_02_22/mobilenet_v1_1.0_224.tgz)|569|4.24|70.9|89.9|

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