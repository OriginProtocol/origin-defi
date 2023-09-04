import fse from 'fs-extra';
import path from 'path';
import * as prettier from 'prettier';
import deployOutput from '../src/network.mainnet.json' assert { type: 'json' };

/**
 * The generateContractsConfig function is a Node.js script that automates the generation of a 
 * configuration file for wagmi friendly contracts config. It reads contract information from 
 * a provided configuration file, constructs a TypeScript module with contract data, and writes 
 * it to an output file. 
 * 
 * IMPORTANT: The generated configs aren't exported as-is, the purpose of this script is to create
 * helper config items to copy/paste in libs/shared/contracts/src/contracts.ts. It is frequent for 
 * contracts to use the Proxy address and the Implementation ABI, the need to be paired in contracts.ts
 * 
 * deployOutput: The configuration file that contains contract information, including contract addresses.
 * OUTPUT_FILE: The file where the generated contract configuration will be written.
 */

const OUTPUT_FILE = './libs/shared/contracts/src/contracts-generated.ts';

(async function () {
  console.log('Start generating wagmi contracts files');
  fse.removeSync(path.resolve(OUTPUT_FILE));

  let content = `import { mainnet } from 'wagmi/chains';`;

  Object.keys(deployOutput.contracts).forEach((name) => {
    content += `import { ${name}ABI } from './abis/${name}';`;
  });

  content += `export const contracts = { mainnet: {`;

  Object.entries(deployOutput.contracts).forEach(([name, { address }]) => {
    content += `${name}: { address: '${address}', chainId: mainnet.id, abi: ${name}ABI, name: '${name}' },`;
  });

  content += `}} as const;`;

  try {
    const config = await prettier.resolveConfig(path.resolve('.prettierrc'), {
      useCache: false,
    });
    const formatted = await prettier.format(content, {
      ...config,
      parser: 'typescript',
    });
    fse.writeFileSync(path.resolve(OUTPUT_FILE), formatted);
  } catch (e) {
    console.error(
      `ERROR Generating ${path.resolve(OUTPUT_FILE)}\n${e.message}`,
    );
    process.exit(1);
  }

  console.log(
    `Contract config file generation complete, ${
      Object.keys(deployOutput.contracts).length
    } config created in ${path.resolve(OUTPUT_FILE)} from ${path.resolve(
      '../src/network.mainnet.json',
    )}`,
  );
  process.exit(0);
})();
