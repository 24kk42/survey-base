export function lengthOf(formData) {
  if(!formData || !formData.values()) {
    return null;
  }
  let i = 0;
  for (let value of formData.values()) {
    i++;
  }
  return i;
}

export function isEqual(fd1, fd2) {
  let arr1 = [];
  let arr2 = [];
  for (let value of fd1.entries()) {
    arr1.push(value[0]);
    arr1.push(value[1]?.name);
  }
  for (let value of fd2) {
    arr2.push(value[0]);
    arr2.push(value[1]);
  }
  return JSON.stringify(arr1?.sort()) === JSON.stringify(arr2?.sort()); 
}