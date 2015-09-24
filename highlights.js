/*
 * Creates html version of itself and wraps it inside html page tags.
 * Finally opens it in the browser.
 */

var Highlights  = require('highlights'),
    fs          = require('fs'),
    path        = require('path'),
    exec        = require('child_process').exec,
    styles      = 'output.css',
    code        = fs.readFileSync('./webpack.config.js', 'utf-8'),
    htmlFile    = './doc/output.html',
    highlighter = new Highlights();
// Highlight code and generate html with style reference included
function highlight(code) {

    var highlightedCode = highlighter.highlightSync({
        fileContents: code,
        scopeName:    'source.js'
    });

    return [
        '<!DOCTYPE HTML>',
        '<html>',
        '<head>',
        '   <meta http-equiv="content-type" content="text/html; charset=utf-8"/>',
        '   <title>Page of Self</title>',
        ' <link rel="stylesheet" href="' + styles + '" type="text/css" media="screen" charset="utf-8" />',
        '</head>',
        '<body>',
        '</body>',
        '</html'
    ].join('\n');
}

var html = highlight(code);

// write html page
fs.writeFileSync(htmlFile, html);

exec('open ' + htmlFile);
