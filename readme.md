# CC Design tokens

## Source tokens
Source token can be found in `properties`.

## Generated artifacts
Generated files can be found in `build/{type}`
||Type||Path||
|CSS| build/css/_variables.css|
|SCSS| build/scss/_variables.scss|

## Build process
At the moment the project is configured to generate `css` and `scss` files. 
The build config is set in `config.json`.

To generate build artifacts run `style-dictionary build` in terminal.

## References
This project uses Amazon Style Dictionary. For more info visit (https://amzn.github.io/style-dictionary/)
