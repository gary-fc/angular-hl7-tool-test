import {DumbComponent} from "./dumb-component";

export interface SmartComponent<E, P1 = void, P2 = void, P3 = void, P4 = void> {

    handleDumbMessage(type: E, payload: any): void;

    notify(param1: P1, param2: P2, param3: P3, param4: P4): void;

    registerDumbComponent(component: DumbComponent<E, P1, P2, P3, P4>): void;

    destroy(): void;
}