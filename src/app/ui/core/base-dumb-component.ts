import {Subject} from "rxjs";
import {isValidInjection} from "./valid-injection";
import {SmartComponent} from "./smart-component";
import {isOnInit} from "./is-on-init";
import {DumbComponent} from "./dumb-component";

export abstract class BaseDumbComponent<E, P1 = void, P2 = void, P3 = void, P4 = void> implements DumbComponent<E, P1, P2, P3, P4> {
    public subject: Subject<{ type: E, payload: any }>;

    private readonly _subClassConstructor: { length: number, name: string };
    private readonly _subClassNgOnInit!: Function;

    protected constructor() {
        this.subject = new Subject<{ type: E, payload: any }>();
        this._subClassConstructor = this.constructor;
        if (isOnInit(this)) {
            this._subClassNgOnInit = this.ngOnInit;
        }
        this._validate();
    }

    public init(): void {
        this.getSmartComponent().registerDumbComponent(this);
    }

    public emit(type: E, payload?: any): void {
        this.subject.next({type, payload});
    }

    private _validate(): void {

        if (isValidInjection(this)) {
            this._checkValidInjections(this.validInjection().toString());
        }

        if (!isValidInjection(this) && this._subClassConstructor.length > 0) {
            this._throwError('it should not inject services');
        }

        if (this._subClassNgOnInit) {
            this._throwError('it should not use ngOnInit');
        }
    }

    private _checkValidInjections(validInjections: string): void {
        if (this._subClassConstructor.hasOwnProperty('ctorParameters')) {
            const parameters = (this._subClassConstructor as any).ctorParameters();
            for (let i = 0; i < parameters.length; i++) {
                if (!validInjections.includes(parameters[i].type)) {
                    this._throwError(`${parameters[i].type} Is not a valid injection`);
                    break;
                }
            }
        }
    }

    private _throwError(reason: string): void {
        throw new Error(`Component "${this._subClassConstructor.name}" is a DumbComponent, ${reason}.`);
    }

    public abstract getSmartComponent(): SmartComponent<E, P1, P2, P3, P4>;
}