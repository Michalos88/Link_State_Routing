import {LSP} from "./LSP";
/**
 * Created by mlyskawi on 5/14/2017.
 */
/*

The router class should contain a function/method named something similar to receivePacket
that should take as its only argument an instance of the link state packet class.
A router that receives an LSP should first decrement the LSP's TTL.
Next, the receiving router should discard the LSP and not use its information,
    if either (1) the TTL has reached zero,
    or (2) the receiving router has already seen an LSP from the same originating router with a sequence number higher than or equal to the sequence number in the received LSP.
If the LSP is not discarded, its information should be compared to the receiving router’s connectivity graph and the LSP should be sent out (in the form of function calls) to all directly connected routers except the one on which it was received.

The router class should also contain a function named something similar to originatePacket that takes no arguments. ]
This function will perform two functions.
It should cause the router to generate an LSP packet based on the current state of the network as it understands it,
 and send it to all directly connected routers.
 Before it sends the packet, however, it should also increment a "tick" counter and consider
 if there are any directly connected routers from which it has not received a packet in 2 ticks.
  If that occurs, the router should alter its graph to reflect that the cost of the link to the other router is now infinity
   (or some arbitrarily huge number that you choose to represent infinity, if your language does not have a special
   infinity value.).

Each router should maintain a "routing table" consisting of <network, cost, outgoing link> triples.
 If connectivity has changed (as indicated by a received link state packet),
 the receiving router should run Dijkstra’s all-pairs shortest-path algorithm on its updated connectivity graph
  to re-compute its routing table of <network, cost, outgoing link> triples. Outgoing link means the directly
  connected router to which this router would send data in order to route the data using the shortest path.
   It does not mean the destination router or the (Consider the advantages and disadvantages of implementing
    the graph using an adjacency matrix or using an adjacency list.)
*/




class router{
    public id: number;
    public graph_adj_lists: any;
    public network : string;
    public cost: number;
    public tick : number;
    public started :boolean;
    public packetsqn :any;
    /*public receivedFROM : number;*/

    constructor(){
        this.id = null;
        this.started = true;
        this.graph_adj_lists = {};
        this.packetsqn = {};
        /*this.receivedFROM = null;*/
    }

    public receivePacket(pack:LSP){
        if(this.started){
            pack.TTL = pack.TTL-1;
            if (pack.TTL != 0){
                if (this.packetsqn[pack.id] != undefined){
                    if(this.packetsqn[pack.id] < pack.sqn){
                        this.packetsqn[pack.id] = pack.sqn; // updating highest packet sqn
                        this.comparePackets(pack);

                    }
                    else{
                        console.log("DISCARDED")
                    }

                }
                else{
                    this.packetsqn[pack.id] = pack.sqn;// updating highest packet sqn
                    console.log('new pack sqn2')

                }

            }
        }
    }


    private comparePackets(packet:LSP){
        //Recreate packet org network from LSP list data
        if (packet.list == undefined){
            console.log("Error: LSP list is empty");
            return false
        }
        else{
            for(let x in packet.list){
                ;


            }
        }
    }



    // private adjListRow(data: LSP){
    // this.header = header;
    // this.temp = [];
    // this.addArc = function (value) {
    //     this.temp.push(value)
    // };
    // this.get = function (key) {
    //     return this.temp[key];
    //
    // };
    // this.len = function () {
    //     return this.temp.length;
    // }}


}


let packer = new LSP();
packer.id = 123;
packer.sqn = 1;
packer.list[4] = 5;
packer.list[55] = 6;
packer.list[100] = 3;
// console.log(packer.list);
let route = new router();
route.receivePacket(packer);
console.log(route.packetsqn);
/*
console.log(packer.TTL);
console.log(packer.sqn);
*/

let packer2 = new LSP();
packer2.id = 123;
packer2.sqn = 4;
packer2.list[4] = 4;
packer2.list[55] = 5;
packer2.list[100] = 3;
route.receivePacket(packer2);
console.log(route.packetsqn);

let packer3 = new LSP();
packer3.id = 123;
packer3.sqn = 3;
packer3.list[4] = 99;
packer3.list[55] = 5;
packer3.list[100] = 3;
route.receivePacket(packer3);
console.log(route.packetsqn);