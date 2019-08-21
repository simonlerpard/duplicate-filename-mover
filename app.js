const fs = require('fs');
const path = require('path')
// const args = require('args')
//   .example('Move jpg and raw images to same directory if duplicate filename', '"C:\\Images_jpg\\" "C:\\Images_raw\\" "C:\\Images_moved_dup"')
//   .option('first', 'Directory to look for filnames (e.g. test.jpg)')
//   .option('second', 'Directory to compare filename with (e.g. test.raw)')
//   .option('target', 'Directory to move the matched files to')

// const flags = args.parse(process.argv)
// const subFlags = args.sub

if ((process.argv.length === 5 && process.argv[4] !== undefined)) {
  console.log("Please specify all required arguments. No more or no less.")
}

const a = (process.argv[2])
const b = (process.argv[3])
const t = (process.argv[4])


const compareA = path.normalize(a)
const compareB = path.normalize(b)
const target = path.normalize(t)

let filesA = []
let filesB = []
let tmpA = []
let tmpB = []

fs.readdirSync(compareA).forEach(file => { filesA.push(path.format({ dir: compareA, base: file })) })
fs.readdirSync(compareB).forEach(file => { filesB.push(path.format({ dir: compareB, base: file })) })

tmpA = filesA.filter(fileA => {
  let fileABasename = path.basename(fileA, path.extname(fileA))
  let filesB2 = filesB.filter(tmp => path.basename(tmp, path.extname(tmp)) === fileABasename).filter(tmp => path.basename(fileA) !== path.basename(tmp))
  if (filesB2.length < 1) {
    return false
  }
  tmpB = tmpB.concat(filesB2)
  return filesB2.length > 0
})

let move = tmpA.concat(tmpB)
if (move.length <= 0) {
  console.log("There's nothing to move.")
} else {
  console.log(`Moving ${move.length} files.`)
}

move.forEach(file => {
  let oldFile = file
  let newFile = path.resolve(target, path.basename(file))
  try {
    fs.renameSync(oldFile, newFile)
    console.log(`"${oldFile}" moved to "${newFile}"`)
  } catch (e) {
    console.log(`Failed to move "${oldFile}"`)
    console.error(e)
  }
})


/*



const basenameA = path.basename(compareA)
const basenameB = path.basename(compareB)
if (basenameA === basenameB) {
  console.log('File ' + basenameA + ' ignored - It has the same filename in both directories.')
}

console.log(compareA)
console.log(compareB)
console.log(target)



console.log("This is a test!")
*/
