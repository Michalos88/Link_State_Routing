
/**
 * Created by mlyskawi on 4/2/2017.
 */

export class PriorityQueue<T>{

    private arr: any[];

    constructor(arr?: any[]) {
        this.arr = arr || [];
    }


    private object: any;


    public enqueue(value: T, priority: T,) {

        function  Obejct (value, priority){
            this.priority = priority;
            this.value = value;

        }

        this.object = new Obejct (value,priority);


        if (this.arr.length == 0){
            this.arr.push(null);
            this.arr.push(this.object);
        }
        else{
            this.arr.push(this.object);
            let i = this.arr.length-1;
            let sorting = null;
            while (sorting != 0){
                sorting = 0;
                if (i != 1){
                    if (this.arr[i].priority < this.arr[Math.floor(i/2)].priority){
                        sorting++;
                        let temp = this.arr[Math.floor(i/2)];
                        this.arr[Math.floor(i/2)] = this.arr[i];
                        this.arr[i] = temp;
                        i = Math.floor(i/2);
                    }
                    if (i != 1){
                        if (this.arr[i].priority < this.arr[i-1].priority){
                            sorting++;
                            let temp = this.arr[i-1];
                            this.arr[i-1] = this.arr[i];
                            this.arr[i] = temp;
                            i = i-1;
                        }
                    }
                }


            }

        }


    }

    private temp :any;

    public dequeue() {
        this.temp = this.arr.splice(1, 1);
        let i = 1;
        let sorting = null;
        while (sorting != 0) {
            sorting = 0;
            if(i < this.arr.length/2){
                if (this.arr[i].priority > this.arr[2*i].priority){
                    sorting++;
                    let a = this.arr[2*i];
                    this.arr[2*i] = this.arr[i];
                    this.arr[i] = a;
                    i = 2*i;
                }
                if(i < (this.arr.length/2)-1){
                    if (this.arr[i].priority > this.arr[2*i+1].priority){
                        sorting++;
                        let a = this.arr[2*i+1];
                        this.arr[2*i+1] = this.arr[i];
                        this.arr[i] = a;
                        i = 2*i;
                    }
                }
            }
        }


        return this.temp[0];
    }


    public get peek(): T {
        return this.arr[1];
    }

    public get end():T {
        return this.arr[this.arr.length-1];
    }


    public get length() {return this.arr.length;}

    public clean() {this.arr = [];}

    public show(i){return this.arr[i]}


}


/*
let dupa = new PriorityQueue();
dupa.enqueue(2,1);
dupa.enqueue(88,100);
dupa.enqueue(1,3);
console.log(dupa.dequeue());
*/
