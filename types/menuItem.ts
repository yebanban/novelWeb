interface MenuItem{
    itemName:string,
    clickMe:(payload:MouseEvent)=>void,
    id:number,
    selected:boolean
}