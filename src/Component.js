var Random = require("./Utils/Random");

class Component {

  constructor(id, componentName) {
    this.id = id;
    this.componentName = componentName;
    this.internalId = Random.uuid();
  }
}

module.exports = Component;
