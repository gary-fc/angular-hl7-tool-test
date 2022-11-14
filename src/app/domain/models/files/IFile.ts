export interface IFileResponse{
    success?: boolean;
    groups_currently?: number,
    messages_currently?: number,
    group_limit?: number,
    message_limit?: number,
    message?: string,
}