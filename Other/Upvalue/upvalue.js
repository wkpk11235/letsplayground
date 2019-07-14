_idgen = function counter() {
    var i = 0;
    return function() {
        return i++;
    }
}();

LinkedValue = function(value){
    this._id = _idgen();
    this._links = {};
    this.value = value; //only intended for basic types like string or float
}
LinkedValue.prototype.link = function(lvalue, action){
    lvalue._links[this._id] = [this,action];
}
LinkedValue.prototype.set = function(value, updaterid){
    this.value = value;
    let tl = this._links;
    Object.keys(tl).forEach(function(id){
        if (id!=updaterid){
            tl[id][0].set(tl[id][1](value),this._id);
        }
    })
}
LinkedValue.prototype.toString = function(){return this.value.toString();}