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
