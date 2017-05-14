/**
 * Created by mlyskawi on 5/14/2017.
 */

export class LSP{
    public id: number;
    public sqn: number;
    public TTL: number;
    public list: any;
    constructor(){
        this.id = null;
        this.sqn =null;
        this.TTL = 10;
        this.list = {};
    }

}