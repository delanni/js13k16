
class Entity {

  constructor() {
      this.components = {};
      this.componentKeys = [];
  }

  addComponent(name, component){
    this.components[name] = component;
    this.componentKeys.push(name);
  }

  getComponent(name){
    return this.components[name];
  }

  removeComponent(name){
    var c = this.components[name];
    this.components[name] = null;
    this.componentKeys.drop(name);
    return c;
  }
}

module.exports = Entity;
