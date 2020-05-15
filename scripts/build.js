const YAML = require('yamljs');
const globby = require('globby');
const fs = require('fs-extra');
const path = require('path');
const styleDictionary = require('style-dictionary');
const Color = require('tinycolor2');

//Import custom transform
const cssBoxShadow = require('./css-boxshadow');

const convertStringValues = obj =>
  Object.keys(obj).reduce((acc, key) => {
    const item = obj[key];
    const hasValueKey = !!item.value;
    const hasRgbKey = !!item.rgb;

    let resolvedValue;

    if (hasValueKey === false) {
      resolvedValue = item ;
    } 

    else if (typeof item === 'string') {
      resolvedValue = {value: item };
    }

    else {
      resolvedValue = convertStringValues(item);
    }

    return {
      ...acc,
      [key]: resolvedValue
    };
  }, {});

(async () => {
  //clean up temporary folder first
  await fs.remove('.properties_json');
  
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

  //Register custom transform
  styleDictionary.registerTransform(cssBoxShadow);
  
  //Register custom transform group
  styleDictionary.registerTransformGroup({
    name: 'custom/Web',
    transforms: [
      'attribute/cti',
      'name/cti/kebab',
      'size/rem',
      'color/css',
      'attribute/shadow'
    ]
  });

  const sd = styleDictionary.extend('./config.json');

  sd.buildAllPlatforms();

  console.info('Removing build directory...');
  //await fs.remove('.properties_json');
})();