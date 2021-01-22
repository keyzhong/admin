// 判断空对象
export const isEmptyObj = function (obj) {
  return !Object.keys(obj).length
}
// 2. JSON.stringify(obj) == "{}"
// 3. for(var key in obj) {return false;}
// 4. Object.getOwnPropertyNames
