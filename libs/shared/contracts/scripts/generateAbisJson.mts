import fse from 'fs-extra';
import path from 'path';
import deployOutput from '../src/network.mainnet.json' assert { type: 'json' };

/**
 * The generateABIJsonFiles function is a Node.js script that automates the generation of JSON ABI 
 * files from a provided configuration file. It extracts ABI data from the configuration file and 
 * writes individual JSON ABI files for each contract into an output directory.
 * 
 * deployOutput: The configuration file that contains contract information, including ABI data. 
 * OUTPUT_DIR: The directory where the generated JSON ABI files will be written.
 */

const OUTPUT_DIR = './libs/shared/contracts/abi-json';

(async function () {
  console.log('Start generating ABI Json files');

  Object.entries(deployOutput.contracts).forEach(([filename, { abi }]) => {
    try {
      fse.writeJsonSync(path.resolve(`${OUTPUT_DIR}/${filename}.json`), abi);

      console.log(`Generated: ${filename}.json`);
    } catch (e) {
      console.error(`ERROR Generating Json Abis\n${e.message}`);
      process.exit(1);
    }
  });
  console.log(
    `ABI Json generation complete, ${
      Object.keys(deployOutput.contracts).length
    } files created from ${path.resolve(
      '../src/network.mainnet.json',
    )} in ${path.resolve(OUTPUT_DIR)}`,
  );
  process.exit(0);
})();
