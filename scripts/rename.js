var fs = require('fs');

var moduleName = 'tabs';
var version = '2.0.0';
var oldPath = __dirname + '/../dist/'+moduleName+'.microlib-'+version+'.js';
var newPath = __dirname + '/../dist/'+moduleName+'.microlib-'+version+'.min.js';

fs.createReadStream(oldPath).pipe(fs.createWriteStream(newPath));
