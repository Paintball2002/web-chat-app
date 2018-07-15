var isRealString = (str) =>{
  return typeof str === "string" && str.trim().length > 0;
}

var isRealNum = (num) =>{
  return typeof num === "number";
}

module.exports = {isRealString, isRealNum};
