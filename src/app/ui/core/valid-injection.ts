export const isValidInjection = (value: any): value is ValidInjection => {
    return (value as ValidInjection).validInjection !== undefined;
};

export interface ValidInjection {
    validInjection(): any[];
}