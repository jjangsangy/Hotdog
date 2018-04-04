import * as tf from '@tensorflow/tfjs';
import {
  loadFrozenModel
} from '@tensorflow/tfjs-converter';

import {
  IMAGENET_CLASSES
} from './imagenet_classes';

const MODEL_URL = 'https://sanghan.xyz/hotdog/models/optimized_model.pb';
const WEIGHTS_URL = 'https://sanghan.xyz/hotdog/models/weights_manifest.json';
const INPUT_NODE_NAME = 'input';
const OUTPUT_NODE_NAME = 'MobilenetV1/Predictions/Reshape_1';
const PREPROCESS_DIVISOR = tf.scalar(255 / 2);

const IMAGE_SIZE = 224;
const TOPK_PREDICTIONS = 5;

let mobilenet;
const mobilenetDemo = async () => {
  status('Loading model...');

  mobilenet = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);

  // Warmup the model. This isn't necessary, but makes the first prediction faster
  mobilenet.execute({
    input: tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])
  }).dispose();

  const imageElement = document.getElementById('image');

  if (imageElement.complete && imageElement.naturalHeight !== 0) {
    predict(imageElement);
    imageElement.style.display = '';
  } else {
    imageElement.onload = () => {
      predict(imageElement);
      imageElement.style.display = '';
    }
  }

  document.getElementById('file-container').style.display = '';
};

/**
 * Given an image element, makes a prediction through mobilenet returning the
 * probabilities of the top K classes.
 */
async function predict(imgElement) {
  status('Predicting...');

  const startTime = performance.now();
  const input = tf.fromPixels(imgElement);
  const preprocessedInput = tf.div(tf.sub(input.asType('float32'), PREPROCESS_DIVISOR), PREPROCESS_DIVISOR);
  const reshapedInput = preprocessedInput.reshape([1, ...preprocessedInput.shape]);
  const dict = {};
  dict[INPUT_NODE_NAME] = reshapedInput;
  const logits = await mobilenet.execute(dict, OUTPUT_NODE_NAME);

  // Convert logits to probabilities and class names.
  const classes = await getTopKClasses(logits, TOPK_PREDICTIONS);
  const totalTime = performance.now() - startTime;
  status(`Done in ${Math.floor(totalTime)}ms`);

  // Show the classes in the DOM.
  showResults(imgElement, classes);
}


/**
 * Computes the probabilities of the topK classes given logits by computing
 * softmax to get probabilities and then sorting the probabilities.
 * @param logits Tensor representing the logits from MobileNet.
 * @param topK The number of top predictions to show.
 */
export async function getTopKClasses(logits, topK) {
  const values = await logits.data();

  const valuesAndIndices = [];
  for (let i = 0; i < values.length; i++) {
    valuesAndIndices.push({
      value: values[i],
      index: i
    });
  }
  valuesAndIndices.sort((a, b) => {
    return b.value - a.value;
  });
  const topkValues = new Float32Array(topK);
  const topkIndices = new Int32Array(topK);
  for (let i = 0; i < topK; i++) {
    topkValues[i] = valuesAndIndices[i].value;
    topkIndices[i] = valuesAndIndices[i].index;
  }

  const topClassesAndProbs = [];
  for (let i = 0; i < topkIndices.length; i++) {
    topClassesAndProbs.push({
      className: IMAGENET_CLASSES[topkIndices[i]],
      probability: topkValues[i]
    })
  }
  return topClassesAndProbs;
}

function pushElement(c) {
  const row = document.createElement('div');
  row.className = 'row';

  const classElement = document.createElement('div');
  classElement.className = 'cell';
  row.appendChild(classElement);

  const pElement = document.createElement('p');
  classElement.appendChild(pElement);
  if (c.className.startsWith('hotdog')) {
    pElement.setAttribute('class', 'bg-danger');
  }
  pElement.innerText = c.className;

  const probsElement = document.createElement('div');
  probsElement.className = 'cell';
  probsElement.innerText = c.probability.toFixed(3);
  row.appendChild(probsElement);
  return row;
}

function showResults(imgElement, classes) {
  const predictionContainer = document.createElement('div');
  const imgContainer = document.createElement('div');
  const probsContainer = document.createElement('div');

  predictionContainer.className = 'pred-container';
  imgContainer.appendChild(imgElement);
  predictionContainer.appendChild(imgContainer);


  for (let i = 0; i < classes.length; i++) {
    probsContainer.appendChild(pushElement(classes[i]));
  }
  predictionContainer.appendChild(probsContainer);

  predictionsElement.insertBefore(
    predictionContainer, predictionsElement.firstChild);
}

const filesElement = document.getElementById('files');
filesElement.addEventListener('change', evt => {
  let files = evt.target.files;
  // Display thumbnails & issue call to predict each image.
  for (let i = 0, f; f = files[i]; i++) {
    // Only process image files (skip non image files)
    if (!f.type.match('image.*')) {
      continue;
    }
    let reader = new FileReader();
    const idx = i;
    // Closure to capture the file information.
    reader.onload = e => {
      // Fill the image & call predict.
      let img = document.createElement('img');
      img.src = e.target.result;
      img.width = IMAGE_SIZE;
      img.height = IMAGE_SIZE;
      img.setAttribute('class', 'img-thumbnail');
      img.onload = () => predict(img);
    };

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
});

const demoStatusElement = document.getElementById('status');
const status = msg => demoStatusElement.innerText = msg;

const predictionsElement = document.getElementById('predictions');

mobilenetDemo();