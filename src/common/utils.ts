
export const removeFLSpaces = (s: string): string => {
  return s.replace(/^\s*(.+?)\s*$/, `$1`)
}
export const countWords = (words: string): number => {
  words = removeFLSpaces(words)
  let wordArray = words.split(/[\s\n]+/)
  let count = 0
  for (let word of wordArray) {
    word = word.replace(/[\x00-\xff]+/g, 'm')
    count += word.length
  }
  return count
}
export const getOrder = (title: string): number => {
  let regArray = /(?<=第)\d+(?=章)/.exec(title)
  return regArray ? +regArray[0] : -1
}
export const getScroll = () => {
  return {
    scrollY: document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
    scrollX: document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft,
  }
}

//可以得到未知的可变参数函数的参数类型列表，用于给封装函数做类型提示
type Params<T extends (...args: unknown[]) => unknown> = T extends (...args: infer P) => unknown ? P : never
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer P ? P : never
export const throttle= <T extends (...args:unknown[])=>any>(fn: T, delay: number) => {
  let isRun = false
  let timer: number | null = null
  const throttleFn = function (this: any, ...args: Params<T>) {
    if (isRun) return
    isRun = true
    timer = setTimeout(() => {
      isRun = false
    }, delay)
    fn.apply(args)
  }
  return throttleFn
}
export const debounce= <T extends (...args:any[])=>any>(fn: T, delay: number) => {
  let timer: number | null = null
  return {
    fnDebounced: function (this: any, ...args: Params<T>) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
      
    },
    clearTime: function () {
      if (timer) clearTimeout(timer)
    },
  }
}


