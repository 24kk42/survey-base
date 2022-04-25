/* eslint-disable eqeqeq */
/* export const isEqual = (json1, json2) => {
  if(!json1) json1 = {}; 
  if(!json2) json2 = {}; 
  const keys1 = Object.keys(json1);
  const keys2 = Object.keys(json2);
  let bool = true;
  console.log(JSON.stringify(json1));
  console.log(JSON.stringify(json2));
   if(keys1.length !== keys2.length) {
    return false;
  }
  keys1.forEach((key, index) => {
    let obj1 = json1[key];
    let obj2 = json2[key];
    isPrimitive(obj1) && (obj1 = obj1.toString());
    isPrimitive(obj2) && (obj2 = obj2.toString());
    if(obj1 === null || obj1 === undefined) {
      obj1 = "";
    }
    if(obj2 === null || obj2 === undefined) {
      obj2 = "";
    }
    // if(Array.isArray(obj1) && Array.isArray(obj2)) {
    //   console.log(obj1);
    //   console.log(obj2);
    //   for(let i = 0; i < obj1.length; i++) {
    //     bool = isEqual(obj1[i], obj2[i]);
    //     if(bool === false) return;
    //   }
    // }
    // console.log(JSON.stringify(obj1));
    // console.log(JSON.stringify(obj2));
    if(JSON.stringify(obj1) !== JSON.stringify(obj2)) {
      bool = false;
      return;
    }
  }) 
  return bool;
} */

export function isEqual (obj1, obj2) {
  //Loop through properties in object 1
  for (var p in obj1) {
    //Check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
  
    switch (typeof (obj1[p])) {
      //Deep compare objects
      case 'object':
        if (!isEqual(obj1[p], obj2[p])) return false;
        break;
      //Compare function code
      case 'function':
        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
        break;
      //Compare values
      default:
        if (obj1[p] != obj2[p]) return false;
    }
  }
  
  //Check object 2 for any extra properties
  for (var e in obj2) {
    if (typeof (obj1[e]) == 'undefined') return false;
  }
  return true;
}

export const hasItems = (json) => {
  const keys = Object.keys(json);
  let bool = false;
  keys.forEach((key) => {
    const arr = json[key];
    if(arr.length > 0) {
      bool = true;
      return;
    }
  })
  return bool;
}

function isPrimitive(test) {
  return test !== null && test !== undefined && test !== Object(test);
}