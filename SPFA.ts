import {PriorityQueue} from "./PriorityQueue";
/**
 * Created by mlyskawi on 5/14/2017.
 */

export class SPFA{

    private static dist:Object;
    private static prev:Object;
    private static Q:PriorityQueue<any>;
    private static u: Object;



    public static findShortest(list,start, finish){
        this.Q = new PriorityQueue;
        this.dist ={};
        this.prev = {};
        this.dist[start] = 0;
        for (let i in list) {

            if(i != start){
                this.dist[i] = 999999999999;
                this.prev[i] = undefined;
            }
            this.Q.enqueue(i,this.dist[i]);

        }

        while(this.Q.length != 1){
            this.u = this.Q.dequeue();

        }
    }
}

