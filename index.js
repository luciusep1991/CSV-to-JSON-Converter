const csv = require('csvtojson');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).options({
    input: {
        describe: 'Path to the source CSV file',
        type: 'string',
        demandOption: true
    },
    output: {
        describe: 'Path where the converted JSON file will be saved',
        type: 'string',
        demandOption: true
    }
}).argv;

const convertCsvToJson = async (inputPath, outputPath) => {
    try {
        const jsonArray = await csv().fromFile(inputPath);
        fs.writeFileSync(outputPath, JSON.stringify(jsonArray, null, 2), 'utf-8');
        console.log(`Converted JSON has been saved to ${outputPath}`);
    } catch (error) {
        console.error('Error converting CSV to JSON:', error);
    }
};

convertCsvToJson(argv.input, argv.output);
