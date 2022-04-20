export const debounce = (fn: Function, delay: number) => {
  let timer: number | null = null
  return {
    fnDebounced: function (this: any, ...args: any[]) {
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
export const throttle = (fn: Function, delay: number) => {
  let isRun = false
  let timer: number | null = null
  return function (this: any, ...args: any[]) {
    if (isRun) return
    fn.apply(this, args)
    isRun = true
    timer = setTimeout(() => {
      isRun = false
    }, delay)
  }
}
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
  return regArray ? +regArray[0] : 0
}
export const getScroll = () => {
  return {
    scrollY: document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
    scrollX: document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft,
  }
}
