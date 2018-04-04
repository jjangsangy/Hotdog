# Hotdog Not Hotdog

Hotdog Not Hotdog app running in the browser with [tensorflow.js](https://github.com/tensorflow/tfjs) using a pretrained mobilenet model.

![hotdog][hotdog]

The mobilenet used in this example was ported from
[this](https://storage.cloud.google.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/weights_manifest.json)


# Mobilenet

In this example we utilize `MobileNet v1.1.0_224` which has a very high performance on imagenet relative to the model filesize. We care primarily of the size of the model weights as these will need to be downloaded client side to run inference on the browser. Once the model has been downloaded, it can be stored in cache to be reused in the future. In comparison the filesize of the weights of [VGG-16](http://www.robots.ox.ac.uk/~vgg/research/very_deep/) which has comparable performance is `528MB` whereas `MobileNet v1.1.0_224` is only `32.5MB`.

Here is a side by side comparison of some state of the art convolutional models.

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