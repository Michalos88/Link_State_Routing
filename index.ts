/**
 * Created by mlyskawi on 5/14/2017.
 */


import * as fs from 'fs';
import * as path from 'path';




fs.readFile(path.join(__dirname,"infile"+".dat"),"utf-8", (err, file) => {
    if (err) console.error("An error occurred while opening the file!", err);
    else
    {
        let temp = file.split("\n");
        for (let i =0; i<temp.length; i++){
            let line = temp[i].split(/\s+/);
            if (i==0 && line[0]==''){
                let link = Number(line[1]);
                if(line[2] != ''){
                    let cost = Number(line[2])
                }
                else {
                    let cost = 1;
                }
            }
            else {
                if (line[0]== ""){
                    let link = Number(line[1]);
                    if(line[2] != ''){
                        let cost = Number(line[2])
                    }
                    else {
                        let cost = 1;
                    }

                }
                else{
                    let id = Number(line[0]);
                    let network_name = line[1];
                    if(line[2] != ''){
                        let cost = Number(line[2])
                    }
                    else {
                        let cost = 1;
                    }
                }
            }


        }





    }
});