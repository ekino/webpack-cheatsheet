/*
 * Creates html version of itself and wraps it inside html page tags.
 * Finally opens it in the browser.
 */

import Highlights from 'highlights';
import fs from 'fs';
import path from 'path';
import childProcess from 'child_process';
import React, { Component } from 'react';

let code = fs.readFileSync('./webpack.config.js', 'utf-8');
let helper = './doc/helpers/DocHelper.js';
let exec = childProcess.exec;
let highlighter = new Highlights();

const MakeDoc = {
    // Highlight code and generate html with style reference included
    highlight: (code) => {
        let highlightedCode = highlighter.highlightSync({
            fileContents: code,
            scopeName:    'source.js'
        });
        return [
            "const DocHelper = {",
            "   getDocHtml: ()=>{",
            "       var result = '" + highlightedCode + "'",
            "       return result;",
            "   }",
            "};",
            "export default DocHelper;"
        ].join('\n');

    }
};

var js = MakeDoc.highlight(code);

// write DocHelper
fs.writeFileSync(helper, js);

export default MakeDoc;
