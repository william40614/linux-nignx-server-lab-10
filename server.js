const port = 5000;
const express = require('express');
const bodyParser = require('body-parser').json();//解析,用req.body獲取post參數
const editdata = require('./editdata.js');
const addr = './data.json';
const app = express();

//var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/key', bodyParser, async function(req,res){
    //console.log('encode ' + unescape(req.body.data));
    //console.log(req.body.data);
    //console.log(req.body.key);
    JSONdata = "";
    await editdata.getdata(addr).then(dat => {
        JSONdata = JSON.parse(dat);
    });
    var data_tmp = {};
    re_flag = false;
    for( i=0; i < JSONdata.length; i++){
        if(JSONdata.data_array[i].key == req.body.key){
            re_flag = true;
            res.status(400);
            res.end();
            break;
        }
    }
    if(re_flag == false){
        data_tmp.key = req.body.key;
        data_tmp.value = req.body.value;
        JSONdata.data_array.push(data_tmp);
        res.status(201);
        res.end();
        await editdata.writedata(addr,JSON.stringify(JSONdata));
    }
});

app.listen(port, () => {
    console.log(`server app listening at http://localhost:${port}`)
});
