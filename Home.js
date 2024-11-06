let math= require('./math.js');
let date = require('./secFile.js');
var fs = require('fs');
let os= require('os');


console.log(math.sub(2,3));
console.log(date.myDateTime());

// const data = fs.readFileSync('demo.txt', 'utf8');
// console.log(data);
fs.readFile('demo.txt',"utf8", function(err, data) {
  console.log("hghhfghfhg",data);
  // return res.end();
});

fs.writeFile('demo2.txt', 'heelo world', (err, data)=>{
  console.log(data);
})

// let l= fs.writeFileSync('demo3.txt', "this is updated demo3");
 fs.appendFileSync('demo3.txt', "updated demo3\n");
 fs.mkdirSync('tree1/tree2',{recursive:true})
 console.log(fs.statSync('demo2.txt'));

 console.log("cpus lenth:"+os.cpus().length)
