/* js2exe.js */
const { exec } = require('pkg')
const filename = process.argv[2] || 'main.js'
exec([ filename, '--target', 'node10-macos-x64', '--output', 'app-macos-x64']).then(function() {
    console.log('MacOS build done!')
}).catch(function(error) {
    console.error(error)
})
exec([ filename, '--target', 'node10-win-x64', '--output', 'app-win-x64.exe']).then(function() {
    console.log('Windows build done!')
}).catch(function(error) {
    console.error(error)
})
