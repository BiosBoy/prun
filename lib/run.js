require('dotenv').config({silent: true});

var spawn = require('child_process').spawn;

module.exports = function run(script, callback) {

    var argv = process.argv.splice(3);
    var command = (typeof script === 'string' ? script : script.command) + ' ' + argv.join(' ');

    script.env = script.env || {};

    var env = {};
    Object.assign(env, process.env, script.env);

    var sh = 'sh', shFlag = '-c';
    if (process.platform === 'win32') {
        sh = 'cmd';
        shFlag = '/c';
        command = '"' + command.trim() + '"';
    }

    //console.log('to be executed:', command);
    spawn(sh, [shFlag, command], {
        env: env,
        windowsVerbatimArguments: process.platform === 'win32',
        stdio: 'inherit'
    }).on('close', callback);
};