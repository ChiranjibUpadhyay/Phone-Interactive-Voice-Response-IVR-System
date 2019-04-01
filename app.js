const express=require('express');
const app=express();
const converter=require('xml-js');

app.set('view engine','ejs');

var times=0;
app.get('/',function(req,res){
  res.set({'Content-Type':'text/xml'});
  if(req.query.event=='NewCall'){
    var site="<?xml version='1.0' encoding='UTF-8'?><response><collectdtmf l='4' t='#' o='5000'><playtext>Press 1 for Male 2 for Female</playtext></collectdtmf></response>";
    var converted=converter.xml2js(site, {compact: true, spaces: 4});
    times+=1;
  }
  else if(req.query.event=='GotDTMF' && times!=0){
    console.log(req);
    if(req.query.data==1 && times==1){
      var site ="<?xml version='1.0' encoding='UTF-8'?><response><collectdtmf l='4' t='#' o='5000'><playtext>Press 1 if you are above 21 or else press 2</playtext></collectdtmf></response>";
      var converted=converter.xml2js(site, {compact: true, spaces: 4});
      times+=1;
    }
    else if(req.query.data==2 && times==1){
      var site ="<?xml version='1.0' encoding='UTF-8'?><response><collectdtmf l='4' t='#' o='5000'><playtext>Press 1 if you are above 18 or else press 2</playtext></collectdtmf></response>";
      var converted=converter.xml2js(site, {compact: true, spaces: 4});
      times+=1;
    }
    else if(req.query.data==1 && times==2){
      var site ="<?xml version='1.0' encoding='UTF-8'?><response><playtext>You are an Adult</playtext><hangup/></response>";
      var converted=converter.xml2js(site, {compact: true, spaces: 4});
      times+=1;
    }
    else if(req.query.data==2 && times==2){
      var site ="<?xml version='1.0' encoding='UTF-8'?><response><playtext>Minors are not allowed</playtext><hangup/></response>";
      var converted=converter.xml2js(site, {compact: true, spaces: 4});
      times+=1;
    }
    else{
      var site ="<response><hangup/></response>";
      var converted=converter.xml2js(site, {compact: true, spaces: 4});
      times=0;
    }
  }
  else{
    var site ="<response><hangup/></response>";
    var converted=converter.xml2js(site, {compact: true, spaces: 4});
    times=0;
  }
  res.send(site);
})
app.listen(3000,function(){
  console.log("You are listenning on port 3000");
})
