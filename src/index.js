/* eslint-disable no-console */
import { writeFile, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { template } from './template.js';

async function main() {
  try {
    // use this because ESM doesn't come with __dirname
    const dir = dirname(fileURLToPath(import.meta.url));
    // create path to elements folder
    const elements = join(dir, `elements`);
    // get list of files in elements
    const files = await readdir(elements);
    // map over list and dynamically import. Use Promise all since maping with an async function returns an array of promises
    const data = await Promise.all(
      files.map(async (file) => {
        const module = await import(`./elements/${file}`);
        console.log(`imported ${file}`);
        return module[Object.keys(module)[0]];
      })
    );
    const colors = Object.assign({}, ...data);
    template.colors = colors;
  } catch (error) {
    console.log(`Something went wrong importing the elements ${error}`);
  }
  try {
    await writeFile(
      `./themes/Rmaki Code-color-theme.json`,
      JSON.stringify(template)
    );
  } catch (error) {
    console.log(`Something went wrong writing the manifest ${error}`);
  }
}

main();
