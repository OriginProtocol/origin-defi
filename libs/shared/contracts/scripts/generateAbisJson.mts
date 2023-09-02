import fse from 'fs-extra';
import path from 'path';
import deployOutput from '../src/network.mainnet.json' assert { type: 'json' };

const OUTPUT_DIR = './libs/shared/contracts/abi-json';

(async function () {
  console.log('Start generating ABI Json files');

  Object.entries(deployOutput.contracts).map(([filename, { abi }]) => {
    try {
      fse.writeJsonSync(
        path.resolve(`${OUTPUT_DIR}/${filename}.json`),
        abi,
        {},
      );

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
