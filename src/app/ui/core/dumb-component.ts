import {Subject} from 'rxjs';
import {BaseDumbComponent} from './dumb-component-handler';

export interface DumbComponent<E, P1 = void, P2 = void, P3 = void, P4 = void> extends BaseDumbComponent<E, P1, P2, P3, P4> {
    subject: Subject<{ type: E, payload: any }>;
}