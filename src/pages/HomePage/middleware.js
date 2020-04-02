function removeHK(str){
  return JSON.stringify(str.replace(".HK", ""))

}
export function correlation_middleware(data) {
  // ag grid seems to could not read obj keys with ".HK"
  // javascript obj will auto sort int keys etc. 2800
  const columnOrder = data.map(obj => obj.index);
  data = data.map(obj => {
    let newObj = {};
    columnOrder.forEach(col => {
      const value = obj[col].toFixed(2);
      newObj[removeHK(col)] = value;
    });
    newObj = { " ": removeHK(obj.index), ...newObj };
    return newObj;
  });
  return data;
}
