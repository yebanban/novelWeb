interface MenuItem{
    itemName:string,
    clickMe:Function,
    id:string,
    selected:boolean
    canDelete:boolean
}
interface Menu {
    name: string
    logo: string
    menuItems?: MenuItem[]
    duration?: number
}