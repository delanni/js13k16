export class Component {
    private internalId: string;

  constructor(private id: string, private componentName: string) {
    this.id = id;
    this.componentName = componentName;
    // this.internalId = Random.uuid();
  }
}
