/**
 * Created by mlyskawi on 5/14/2017.
 */


import * as fs from 'fs';
import * as path from 'path';
import {router} from "./Router";
import * as rl from 'readline';

main();

export function main(){
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
            menu(base);





        }


    });
}



function menu(base){
    let r1 = rl.createInterface(process.stdin, process.stdout);
    let Mmenu = "";
    //TODO: MENU!!!!
    r1.question(Mmenu, input => {
        let temp = input.split("");
        switch(temp[0]){
            case "C":
                for(let x in base){
                    if(base[x].started){
                        let packet = base[x].originatePacket();
                        for (let y in base[x].myNeighbours){
                            if(base[y].started){
                                let d = base[y].receivePacket(packet);
                                console.log(d.TTL);
                                if(d.TTL>0){
                                    for(let g in d.to ){
                                        if (base[g].started){
                                            base[g].receivePacket(d)
                                        }

                                    }
                                }
                            }



                        }
                    }


                }
                r1.close();

                return menu(base);

            case "Q":
                r1.close();
                break;
            case "P":
                let table = base[temp[1]].routing;
                for(let i in table){
                    let output ="";
                    let name = base[i].network;
                    let comma = ", ";
                    output=output+name+comma+table[i].cost+comma+table[i].out+"\n";
                    console.log(output);
                }
                r1.close();
                return(menu(base));
            case "S":
                base[temp[1]].started = false;
                r1.close();
                return(menu(base));
            case "T":
                base[temp[1]].started = true;
                r1.close();
                return(menu(base));
        }
    });
}
