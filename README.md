# Hotdog Not Hotdog

Hotdog Not Hotdog app running in the browser with [tensorflow.js](https://github.com/tensorflow/tfjs) using a pretrained mobilenet model.

![hotdog][hotdog]

The mobilenet used in this example was ported from
[this](https://storage.cloud.google.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/weights_manifest.json)


# Mobilenet

In this example we utilize `MobileNet v1.1.0_224` which has a very high performance on imagenet relative model filesize. In comparison the filesize of the weights of [VGG-16](http://www.robots.ox.ac.uk/~vgg/research/very_deep/) is `528MB` whereas `MobileNet v1.1.0_224` which has similar performance is only `32.5MB`.

Model  | Million MACs | Million Parameters | Top-1 Accuracy| Top-5 Accuracy |
:----:|:------------:|:----------:|:-------:|:-------:|
[MobileNet v1.1.0_224](https://arxiv.org/abs/1704.04861)|569|4.24|70.9|89.9|
[AlexNet](https://arxiv.org/abs/1404.5997)|724|61|57.1|80.2|
[VGG-16](https://arxiv.org/abs/1409.1556)|155,000|138|73.0|91.2|
[Resnet-50](https://arxiv.org/abs/1512.03385)|3,900|25,500|75.99|92.98

![imagenet](https://github.com/tensorflow/models/raw/master/research/slim/nets/mobilenet_v1.png)

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