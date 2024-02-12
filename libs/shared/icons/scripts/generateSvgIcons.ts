import * as changeCase from 'change-case';
import fse from 'fs-extra';
import path from 'path';
import * as prettier from 'prettier';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { isNilOrEmpty } from '../../utils/src';

const INPUT_FOLDER = './libs/shared/icons/src';
const OUTPUT_FILE = 'generated.tsx';

const generateFile = async (folderPath: string, prefix = '', suffix = '') => {
  const files = await fse.readdir(folderPath);

  let imports = ``;
  let content = ``;
  let pascalCaseName = '';
  for (const file of files) {
    const { base, ext, name } = path.parse(file);

    if (ext !== '.svg') {
      continue;
    }

    pascalCaseName = changeCase.pascalCase(name, {
      mergeAmbiguousCharacters: true,
    });
    imports += `import ${pascalCaseName}Svg from './${base}?react';`;
    content += `export const ${prefix}${pascalCaseName}${suffix} = (props: SvgIconProps) => (
      <SvgIcon        
        {...props}
        component={${pascalCaseName}Svg}
        inheritViewBox
      />
    );    
    `;
    console.log(`Generated ${prefix}${pascalCaseName}${suffix}`);
  }

  const config = await prettier.resolveConfig(path.resolve('.prettierrc'), {
    useCache: false,
  });
  const formatted = await prettier.format(
    `import { SvgIcon } from '@mui/material';\n${imports}\nimport type { SvgIconProps } from '@mui/material';\n${content}`,
    {
      ...config,
      parser: 'typescript',
    },
  );

  return formatted;
};

(async function () {
  console.log('Start generating icons');
  const folders = await fse.readdir(INPUT_FOLDER);

  if (isNilOrEmpty(folders)) {
    console.error(`Folder empty, no file generated`);
    process.exit(1);
  }

  try {
    for (const folder of folders) {
      let file = '';
      const curr = path.resolve(path.join(INPUT_FOLDER, folder));
      if (!fse.statSync(curr).isDirectory()) {
        continue;
      }

      if (folder === 'fa') {
        const faLight = path.resolve(path.join(curr, 'light'));
        file = await generateFile(faLight, 'Fa', 'Light');
        await fse.writeFile(path.join(faLight, OUTPUT_FILE), file);
        console.log(
          `Icon file generated at ${path.join(faLight, OUTPUT_FILE)}`,
        );

        const faRegular = path.resolve(path.join(curr, 'regular'));
        file = await generateFile(faRegular, 'Fa', 'Regular');
        await fse.writeFile(path.join(faRegular, OUTPUT_FILE), file);
        console.log(
          `Icon file generated at ${path.join(faRegular, OUTPUT_FILE)}`,
        );
      } else {
        file = await generateFile(curr);
        await fse.writeFile(path.join(curr, OUTPUT_FILE), file);
        console.log(`Icon file generated at ${path.join(curr, OUTPUT_FILE)}`);
      }
    }
  } catch (e) {
    console.error(
      `ERROR Generating ${path.resolve(OUTPUT_FILE)}\n${e.message}`,
    );
    process.exit(1);
  }

  console.log(`Icon files generated for folder ${INPUT_FOLDER}`);
  process.exit(0);
})();
