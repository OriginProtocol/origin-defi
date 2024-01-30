import fse from 'fs-extra';
import path from 'path';
import * as prettier from 'prettier';

/**
 * The generateABITsFiles function is a Node.js script that automates the generation of TypeScript
 * files from JSON ABI files. It reads JSON ABI files from an input directory, converts them into
 * format, and writes the resulting TypeScript files to an output directory. This function is
 * designed to be used in a build or development environment to keep ABI information in sync with
 * smart contract changes.
 *
 * INPUT_DIR: The directory where JSON ABI files are located.
 * OUTPUT_DIR: The directory where the generated TypeScript ABI files will be written.
 */

const INPUT_DIR = './libs/shared/contracts/abi-json';
const OUTPUT_DIR = './libs/shared/contracts/src/abis';

(async function () {
  console.log('Start generating ABI ts files');
  fse.emptyDirSync(path.resolve(`${OUTPUT_DIR}`));
  const files = fse.readdirSync(INPUT_DIR);
  const config = await prettier.resolveConfig(path.resolve('.prettierrc'), {
    useCache: false,
  });
  for (const fileJson of files) {
    try {
      const file = fse.readJSONSync(path.resolve(`${INPUT_DIR}/${fileJson}`));
      const filename = fileJson.replace('.json', '');
      const content = `// DO NOT EDIT - GENERATED\nexport const ${filename}ABI = ${JSON.stringify(
        file,
      )} as const;`;
      const formatted = await prettier.format(content, {
        ...config,
        parser: 'typescript',
      });
      fse.writeFileSync(
        path.resolve(`${OUTPUT_DIR}/${filename}.ts`),
        formatted,
      );
      console.log(`Generated: ${filename}.ts from ${fileJson}`);
    } catch (e) {
      console.error(`ERROR Generating from ${fileJson}\n${e.message}`);
      process.exit(1);
    }
  }
  console.log(
    `ABI generation complete, ${files.length} files created in ${path.resolve(
      OUTPUT_DIR,
    )}`,
  );
  process.exit(0);
})();
