/**
 * Created by mlyskawi on 5/14/2017.
 */


import * as fs from 'fs';
import * as path from 'path';
import {router} from "./Router";




function main(){
    fs.readFile(path.join(__dirname,"infile"+".dat"),"utf-8", (err, file) => {
        let base = undefined;
        if (err) console.error("An error occurred while opening the file!", err);
        else
        {
            let temp = file.split("\n");
            let newRouter = undefined;
            base = {};
            for (let i =0; i<temp.length; i++){
                let line = temp[i].split(/\s+/);
                if (i==0 && line[0]==''){
                    newRouter = new router;
                    newRouter.id = Number(line[1]);
                    newRouter.network=line[2];
                    if(line[3] != ''){
                        newRouter.cost = Number(line[3])
                    }
                    else {
                        newRouter.cost = 1;
                    }
                }
                else {
                    if (line[0]== ''){
                        let link = Number(line[1]);
                        newRouter.myNeighbours[link] ={};
                        if(line[2] != null && line[2] != ''){
                            newRouter.myNeighbours[link] = Number(line[2]);
                        }
                        else {
                            newRouter.myNeighbours[link] = 1;
                        }

                    }
                    else{
                        base[newRouter.id] = newRouter;
                        newRouter = new router;
                        newRouter.id = Number(line[0]);
                        newRouter.network = line[1];
                        if(line[2] != ''){
                            newRouter.cost = Number(line[2])
                        }
                        else {
                            newRouter.cost = 1;
                        }
                    }

                }
                if(i==temp.length-1){
                    base[newRouter.id] = newRouter;
                }

            }


        }

        console.log(base);
    });
}
