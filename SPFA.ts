import {PriorityQueue} from "./PriorityQueue";
/**
 * Created by mlyskawi on 5/14/2017.
 */

export class SPFA{

    private static dist:Object;
    private static prev:Object;
    private static Q:PriorityQueue<any>;
    private static u: Object;
    private static alt : number;



    public static findShortest(list,start,cost){
        this.Q = new PriorityQueue;
        this.dist ={};
        this.prev = {};
        this.dist[start] = cost;
        this.Q.enqueue(start,this.dist[start]);
        for (let i in list) {

            if(i != start){
                this.dist[i] = 999999999999;
                this.prev[i] = undefined;
            }
            // this.Q.enqueue(i,this.dist[i]);

        }

        while(this.Q.length != 1){
            this.u = this.Q.dequeue();

            for(let x in list[this.u['value']]){
                this.alt = this.dist[this.u['value']] + list[this.u['value']][x];
                // console.log(this.alt);
                if (this.alt < this.dist[x]){
                    this.dist[x] = this.alt;
                    this.prev[x] = this.u['value'];
                    this.Q.enqueue(x,this.alt);
                }
            }

        }
        return(this.dist)
    }
}

