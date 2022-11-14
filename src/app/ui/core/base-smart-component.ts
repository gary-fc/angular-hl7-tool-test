import {MonoTypeOperatorFunction, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DumbComponent} from "./dumb-component";
import {SmartComponent} from "./smart-component";

export type Scope = (string | number);

export interface Scoped<T = { [key: string]: Scope }> {
    scopes: T;
}

export type ScopedPropsMap<T = void> = Props<T> & Scoped<{ [key: string]: Scope }>;

export function isScoped(value: any): value is Scoped {
    return (value as Scoped).scopes !== undefined;
}

export function WithScope<T = void>(): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalFn = descriptor.value;

        descriptor.value = function (type: string, payload: T) {
            const scopes: { [key: string]: Scope } | undefined = isScoped(this) ? this.scopes : undefined;
            const props: ScopedPropsMap<T> = {
                scopes: scopes as { [key: string]: Scope },
                payload
            };
            return originalFn.apply(this, [type, props]);
        };

        return descriptor;
    };
}

export interface Props<T> {
    payload: T;
}

export abstract class BaseSmartComponent<E, P1 = void, P2 = void, P3 = void, P4 = void> implements SmartComponent<E, P1, P2, P3, P4> {
    private _dumbComponent!: DumbComponent<E, P1, P2, P3, P4>;

    private readonly _unsubscribe$: Subject<void>;

    protected constructor() {
        this._unsubscribe$ = new Subject<void>();
    }

    handleDumbMessage(type: E, payload: any): void {
        throw new Error('Method not implemented.');
    }

    @WithScope()
    private _handleDumbMessage(type: E, payload: Props<any>): void {
        this.handleDumbMessage(type, payload);
    }

    public destroy(): void {
        if (this._unsubscribe$.isStopped) {
            return;
        }
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    public notify(param1: P1, param2: P2, param3: P3, param4: P4): void {
    }

    public registerDumbComponent(component: DumbComponent<E, P1, P2, P3, P4>): void {
        this._dumbComponent = component;
        this._listenDumbComponent();
    }

    protected untilComponentDestroy(): MonoTypeOperatorFunction<any> {
        return takeUntil(this._unsubscribe$);
    }

    private _listenDumbComponent(): void {
        this._dumbComponent.subject.pipe(this.untilComponentDestroy()).subscribe((data: { type: E, payload: any }) => {
            this._handleDumbMessage(data.type, data.payload);
        });
    }
}