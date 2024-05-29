import { exec } from "child_process";

function convertFiles(path) {
    exec('pwd', (err, stdout, stderr) => {});

    const dir  = __dirname + "/../../models/";

    exec(`tensorflowjs_converter --input_format=keras '${dir}/${path}.h5' '${dir}/${path}'`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

function convertAllModels() {
    const models = ["efektiivsus_k4_1",
        "efektiivsus_k4_2",
        "efektiivsus_k4_3",
        "efektiivsus_k4_4",
        "likviidsus_k4_1",
        "likviidsus_k4_2",
        "likviidsus_k4_3",
        "likviidsus_k4_4",
        "struktuur_k4_1",
        "struktuur_k4_2",
        "struktuur_k4_3",
        "struktuur_k4_4",
        "tasuvus_k4_1",
        "tasuvus_k4_2",
        "tasuvus_k4_3",
        "tasuvus_k4_4",];
        

    models.forEach(model => {
        console.log(`Converting ${model}`);
        console.log(__dirname);
        convertFiles(model);
    });
}

convertAllModels();