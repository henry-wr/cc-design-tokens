const YAML = require('yamljs');
const globby = require('globby');
const fs = require('fs-extra');
const path = require('path');
const styleDictionary = require('style-dictionary');

const convertStringValues = obj =>
  Object.keys(obj).reduce((acc, key) => {
    const item = obj[key];
    //check if item has a children key called 'value'
    const hasValueKey = !!item.value;
    const hasRgbKey = !!item.rgb;

    let resolvedValue;

    if (hasValueKey || hasRgbKey) {
      resolvedValue = item ;
    }

    //If item is just a string, add child node and set that string as the value
    else if (typeof item === 'string') {
      resolvedValue = {value: item };
    }
    
    //if item has children keys, run it through function again to drill down to the last node
    else {resolvedValue = convertStringValues(item);}

    return {
      ...acc,
      [key]: resolvedValue
    };
  }, {});

(async () => {
  await fs.remove('build');

  await fs.copy('properties', '.properties_json');

  const paths = await globby(['.properties_json/**/*.yml']);

  await Promise.all(
    paths.map(async p => {
      const data = YAML.parse(await fs.readFile(p, 'utf8'));

      // Map value fields to objects
      console.info(`Converting ${p} to JSON...\r`);

      const json = JSON.stringify(convertStringValues(data),null, '\t');
      
      // Write output
      const newP = path.join(
        path.dirname(p),
        path.basename(p, '.yml') + '.json'
      );

      console.info(`Writing ${newP}...`);

      await fs.writeFile(newP, json);
    })
  );

  console.info('Processing style-dictionary...');

  const sd = styleDictionary.extend('./config.json');

  sd.buildAllPlatforms();

  console.info('Removing build directory...');
  //await fs.remove('.properties_json');
})();