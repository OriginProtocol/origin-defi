const fs = require('fs');
const path = require('path');

const getFiles = (path, ext = '.json') => fs
  .readdirSync(path)
  .filter((item) => item.includes(ext))
  .map((i, index) => ({
    id: index,
    filename: i,
    path: `${path}/${i}`,
  }));

const INPUT_DIR = './libs/shared/contracts/src/abis/json';
const OUTPUT_DIR = './libs/shared/contracts/src/abis';

(async function(){
  const files = getFiles(path.resolve(INPUT_DIR));
  await Promise.all(files.map(async (file) => {
    try {
      const { abi } = JSON.parse(fs.readFileSync(file.path, 'utf-8'));
      const cleanFileName = file.filename.replace('.json', '');
      fs.writeFileSync(
        path.resolve(`${OUTPUT_DIR}/${cleanFileName}.ts`),
        `// DO NOT EDIT - GENERATED
        export const ${cleanFileName}ABI = ${JSON.stringify(abi)} as const;`
      )
    } catch (e){
      console.error(e);
      console.log("There was an error processing file");
    }
  }))
}())
