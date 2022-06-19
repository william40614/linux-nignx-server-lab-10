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
        JSONdata.data_array.push(data_tmp);
        await editdata.writedata(addr,JSON.stringify(JSONdata));
        res.status(201);
        res.end();
    }
});

app.get('/key/:key', bodyParser, async function(req,res){
    console.log("get/key/key1");
    await editdata.getdata(addr).then(dat => {
        JSONdata = JSON.parse(dat);
    });
    console.log(req.params['key']);
    _find = false;
    for( i=0; i<JSONdata.data_array.length;i++){
        if(JSONdata.data_array[i].key == req.params['key']){
            res.status(200);
            var data_tmp = {};
            data_tmp[req.params['key']] = JSONdata.data_array[i].value;
            res.send(data_tmp);
            res.end();
            _find = true;
            break;
        }
    }
    if(_find == false){
        res.status(404);
        res.send("{}");
        res.end();
    }
});

app.get('/key', bodyParser, async function(req,res){
    console.log("get/key");
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

app.put('/key/:key', bodyParser, async function(req,res){
    console.log("put");
    await editdata.getdata(addr).then(dat => {
        JSONdata = JSON.parse(dat);
    });
    _find = false;
    console.log(req.params['key']);
    for( i=0; i<JSONdata.data_array.length;i++){
        if(JSONdata.data_array[i].key == req.params['key']){
            console.log(req.body.value);
            JSONdata.data_array[i].value = req.body.value;
            await editdata.writedata(addr,JSON.stringify(JSONdata));
            res.status(200);
            res.end();
            _find = true;
            break;
        }
    }
    if(_find == false){
        var data_tmp = {
            "key" :req.params['key'],
            "value" : req.body.value
        }
        JSONdata.data_array.push(data_tmp);
        await editdata.writedata(addr,JSON.stringify(JSONdata));
        res.status(201);
        res.end();
    }
});

app.delete('/key/:key', bodyParser, async function(req,res){
    console.log("delete");
    await editdata.getdata(addr).then(dat => {
        JSONdata = JSON.parse(dat);
    });
    for( i=0; i<JSONdata.data_array.length;i++){
        if(JSONdata.data_array[i].key == req.params['key']){
            var removed = JSONdata.data_array.splice(i,1);
            break;
        }
    }
    await editdata.writedata(addr,JSON.stringify(JSONdata));
    res.status(200);
    res.end();
});

app.listen(port, () => {
    console.log(`server app listening at http://localhost:${port}`)
});
