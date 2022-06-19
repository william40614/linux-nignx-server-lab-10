const port = 5000;
const express = require('express');
const bodyParser = require('body-parser').json();//解析,用req.body獲取post參數
const editdata = require('./editdata.js');
const addr = './data.json';
const app = express();

//var urlencodedParser = bodyParser.urlencoded({ extended: false });
let JSONdata = {};

app.post('/key', bodyParser, async function(req,res){
    console.log("post");
    //console.log('encode ' + unescape(req.body.data));
    //console.log(req.body.data);
    //console.log(req.body.key);
    await editdata.getdata(addr).then(dat => {
        JSONdata = JSON.parse(dat);
    });
    console.log(req.body);
    re_flag = false;
    for( i=0; i < JSONdata.data_array.length; i++){
        if(JSONdata.data_array[i].key == req.body.key){
            re_flag = true;
            res.status(400);
            res.end();
            break;
        }
    }
    if(re_flag == false){
        var data_tmp = {
            "key" : req.body.key,
            "value" : req.body.value
        }
        //JSONdata[JSONdata_l] = JSONdata[JSONdata_l] || [];           // <========
        JSONdata.data_array.push(data_tmp);
        //JSONdata = JSON.stringify(temp);
        await editdata.writedata(addr,JSON.stringify(JSONdata));
        res.status(201);
        res.end();
    }
});

app.get('/key/:key', bodyParser, async function(req,res){
    console.log("get/key/key1");
    //console.log('encode ' + unescape(req.body.data));
    //console.log(req.body.data);
    //console.log(req.body.key);
    //console.log(req.body);
    await editdata.getdata(addr).then(dat => {
        JSONdata = JSON.parse(dat);
    });
    console.log(req.params['key']);
    _find = false;
    for( i=0; i<JSONdata.data_array.length;i++){
        if(JSONdata.data_array[i].key == req.params['key']){
            res.status(200);
            res.send(JSONdata.data_array[i].value);
            res.end();
            _find = true;
            break;
        }
    }
    if(_find == false){
        res.status(404);
        res.end();
    }
});

app.get('/key', bodyParser, async function(req,res){
    console.log("get/key");
    //console.log('encode ' + unescape(req.body.data));
    //console.log(req.body.data);
    //console.log(req.body.key);
    await editdata.getdata(addr).then(dat => {
        JSONdata = JSON.parse(dat);
    });
    var tmp = [];
    for( i=0; i<JSONdata.data_array.length;i++){
        tmp.push(JSONdata.data_array[i].key);
    }
    res.status(200);
    res.send(tmp);
    res.end();
});

/*app.put('/key/key', bodyParser, async function(req,res){
    //console.log('encode ' + unescape(req.body.data));
    //console.log(req.body.data);
    //console.log(req.body.key);
    await editdata.getdata(addr).then(dat => {
        JSONdata = JSON.parse(dat);
    });
    _find = false;
    for( i=0; i<JSONdata.data_array.length;i++){
        if(JSONdata,data_array[i].key == req.body.key){
            JSONdata,data_array[i].value = req.body.value;
            res.status(200);
            res.end();
            _find = true;
            break;
        }
    }
    if(_find == false){
        res.status(201);
        res.end();
    }
});*/

/*app.delete('/key/key', bodyParser, async function(req,res){
    //console.log('encode ' + unescape(req.body.data));
    //console.log(req.body.data);
    //console.log(req.body.key);
    await editdata.getdata(addr).then(dat => {
        JSONdata = JSON.parse(dat);
    });
    for( i=0; i<JSONdata.data_array.length;i++){
        if(JSONdata,data_array[i].key == req.body.key1){
            res.status(200);
            res.send(JSONdata,data_array[i].value);
            res.end();
            break;
        }
    }
});*/

app.listen(port, () => {
    console.log(`server app listening at http://localhost:${port}`)
});
