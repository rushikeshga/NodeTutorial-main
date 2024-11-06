var http = require('http');
var fs = require('fs');
var url = require('url')

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var myurl = url.parse(req.url, true);
  // console.log(myurl)
  // console.log(url)
  if(myurl.pathname != '/favicon.ico'){
    var logText = `request received at: ${new Date()}  path: ${myurl.pathname} query id: ${myurl.query.id}pass: ${myurl.query.pass}\n`
    fs.appendFile('log.txt',logText,((req,res)=>{
      console.log("log added successfully")
    }))
    console.log(req.method)
  }
  
  
  switch(myurl.pathname){
    case `/`:res.end('Home page!');
    break;
    case `/about`:res.end('about page!');
    break;
    // case `/favicon.ico`: res.end('favicon.ico');
    // break;
    default:
      res.end("Not found")

  }
  // console.log(req.headers)
  
}).listen(8080,()=>console.log("server started successfully"));