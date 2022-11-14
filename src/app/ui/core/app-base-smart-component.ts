import {BaseSmartComponent, Scope} from "./base-smart-component";
import {Subject} from "rxjs";
import {ElementRef, Injector, Renderer2} from "@angular/core";

export abstract class AppBaseSmartComponent<E> extends BaseSmartComponent<E> {

    protected _unsubscribe: Subject<boolean>;

    protected constructor() {
        super();
        this._unsubscribe = new Subject<boolean>();
    }

    protected _elementRef(): ElementRef {
        return this.injector().get(ElementRef);
    }

    protected _renderer(): Renderer2 {
        return this.injector().get(Renderer2);
    }

    protected abstract injector(): Injector;

}