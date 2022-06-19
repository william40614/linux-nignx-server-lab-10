const fs = require('fs');
module.exports = {
    getdata: function(dat_addr){
        return new Promise( (resolve , reject) => {
            fs.readFile(dat_addr , (err , data) => {
                if(err)
                    reject("err");
                else
                    resolve(data);
            });
        });
    } , 

    writedata: async function(dat_addr , file){
        return await new Promise( (resolve , reject) => {
            fs.writeFile(dat_addr , file , (err , data) => {
                if(err)
                    reject(err);
                else
                    resolve(data);
            })
        }).then(dat => {
            //console.log("write success");
        } , error => {
            console.log("editdata.js(write_data): 資料寫入失敗");
        })
    }
}