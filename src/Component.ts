import {ComponentKey} from "./ComponentKey";

export class Component<T> {

    private internalId: string;
    private _value: T;
    private defaultValue: T;
    public readonly name: string;  
    private _hasValue: boolean;

    constructor(private id: string, private componentKey: ComponentKey<T>, value: T = null) {
        if (value === null) {
            this._hasValue = false;
        } else {
            this._hasValue = true;
        }

        this.name = componentKey.componentName;
        this.defaultValue = componentKey.defaultValue;
    }

    public clear(): void {
        this._hasValue = false;
        this._value = undefined;
    }

    get value(): T {
        if (this.hasValue) {
            return this.value;
        } else {
            return this.defaultValue;
        }
    }

    set value(value:T) {
        this._value = value;
        this._hasValue = true;
    }

    get hasValue(): boolean {
        return this._hasValue;
    }
}
