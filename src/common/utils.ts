export const debounce = (fn: Function, delay: number) => {
    let timer: number | null = null
    return function (this: any, ...args: any[]) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
}
export const throttle=(fn: Function, delay: number)=>{
    let isRun=false
    let timer:number|null=null
    return function(this:any,...args:any[]){
        if(isRun) return
        fn.apply(this,args)
        isRun=true
        timer=setTimeout(()=>{
            isRun=false
        },delay)
    }
}