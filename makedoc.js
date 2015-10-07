/*
* Creates html version of itself and wraps it inside html page tags.
* Finally opens it in the browser.
*/

import Highlights from 'highlights';
import process from 'process';
import fs from 'fs';

let fileName = process.argv[2];
let code = fs.readFileSync('./' + fileName, 'utf-8');
let helper = './doc/helpers/DocHelper.js';
let highlighter = new Highlights();


const MakeDoc    =     {
  // Highlight code and generate html with style reference included
  /*eslint-disable */
  highlight: () => {
    let highlightedCode = highlighter.highlightSync({
      fileContents: code,
      scopeName: 'source.js'
    });
    return [
      'const DocHelper = {',
      '   getDocHtml: ()=>{',
      '       var result = \'' + highlightedCode + '\'',
      '       return result;',
      '   }',
      '};',
      'export default DocHelper;'
    ].join('\n');
  }
  /*eslint-enable */
};

var js = MakeDoc.highlight(code);

// write DocHelper
fs.writeFileSync(helper, js);

export default MakeDoc;
