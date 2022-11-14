export interface BaseDumbComponent<E, P1 = void, P2 = void, P3 = void, P4 = void> {
    emit(type: E, payload: any): void;
}