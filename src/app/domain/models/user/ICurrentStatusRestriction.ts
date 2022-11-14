export interface ICurrentStatusRestriction {
    groups_currently?:   number;
    messages_currently?: number;
    group_limit?:        number;
    message_limit?:      number;
    size_limit?: number;
}