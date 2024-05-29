const tf = require('@tensorflow/tfjs');
const tfn = require("@tensorflow/tfjs-node");

// Defining inputs, actually fetched from the database
var result2 = [];
var input1 = 0.2;
var input2 = 0.4;
var input3 = 0.3;
var input4 = 0.2;
var input5 = 0.4;
var input6 = 0.5;
var input7 = 0.8;
var input8 = 0.9;
var input9 = 0.3;
var input10 = 0.5;
var input11 = 0.5;
var input12 = 0.4;
var input13 = 0.5;
var input14 = 0.5;
var input15 = 0.4;
var input16 = 0.8;
var input17 = 0.5;
var input18 = 0.3;
var input19 = 0.6;
var input20 = 0.5;
var input21 = 0.8;
var input22 = 0.66;
var input23 = 0.76;
var input24 = 0.54;
var input25 = 0.33;
var input26 = 0.4;
var input27 = 0.66;
var input28 = 0.3;
var input29 = 0.2;
var input30 = 0.3;
var input31 = 0.43;
var input32 = 0.23;
var input33 = 0.44;
var input34 = 0.65;
var input35 = 0.34;
var input36 = 0.2;
var input37 = 0.1;
var input38 = 0.65;
var input39 = 0.65;
var input40 = 0.34;
var input41 = 0.23;
var input42 = 0.45;
var input43 = 0.76;
var input44 = 0.52;
var input45 = 0.3;
var input46 = 0.21;
var input47 = 0.32;
var input48 = 0.54;
var input49 = 0.87;
var input50 = 0.33;
var input51 = 0.54;
var input52 = 0.34;
var input53 = 0.43;
var input54 = 0.22;
var input55 = 0.76;
var input56 = 0.66;
var input57 = 0.33;
var input58 = 0.22;
var input59 = 0.56;
var input60 = 0.77;
var input61 = 0.89;
var input62 = 0.44;
var input63 = 0.34;
var input64 = 0.33;

async function performPrediction() {
	// async is necessary, otherwise the models won't be loaded in time
	// convert the inputs to a tensor
	const testVal = await tf.tensor2d([input1, input2, input3, input4, input5, input6, input7, input8, input9, input10, input11,
		input12, input13, input14, input15, input16, input17, input18, input19, input20, input21, input22, input23, input24, input25,
		input26, input27, input28, input29, input30, input31, input32, input33, input34, input35, input36, input37, input38, input39,
		input40, input41, input42, input43, input44, input45, input46, input47, input48, input49, input50, input51, input52, input53,
		input54, input55, input56, input57, input58, input59, input60, input61, input62, input63, input64], [1, 64]);
	// load the model
	const loadedModel3 = await tf.loadLayersModel('file://models/MAA64/MAA64_1_1_likviidsus_k4_1.json');
	// make a prediction
	const prediction = await loadedModel3.predict(testVal);
	// make the prediction readable and display it
	const values = prediction.dataSync();
	const arr = Array.from(values);
	prednormal = arr[0];
	const puitmodel3predict = (prednormal).toFixed(2);
	console.log("Prediction", puitmodel3predict);
}

performPrediction();