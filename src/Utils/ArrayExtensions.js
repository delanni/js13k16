
Array.prototype.drop = function (element) {
  var idx = this.indexOf(element);
  if (idx>-1){
    this.splice(idx,1);
  }
};
