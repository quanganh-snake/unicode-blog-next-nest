/* eslint-disable @typescript-eslint/no-explicit-any */
import slugify from "slugify"

export const slugifyUtil = (str: string) => {
  return slugify(str, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: "vi",
    trim: true,
  })
}

export const generateSlugWithId = (title: string, id: number) => {
  return `${slugifyUtil(title)}-i.${id}`
}

export const getIdFromSlug = (slug: string) => {
  const idFromSlug = slug.split('-i.')[1]
  return parseInt(idFromSlug)
}

export const debounce = (n: number, fn: (...params: any[]) => any, immed: boolean = false) => {
  let timer: number | undefined = undefined;
  return function (this: any, ...args: any[]) {
    if (timer === undefined && immed) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), n);
    return timer;
  }
};