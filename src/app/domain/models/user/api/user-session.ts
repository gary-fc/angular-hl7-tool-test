export interface UserSession {
    refresh?: string;
    access?: string;
    id?: string;
    name?: string;
    type_user?: number;
    csrf_token?: string;
    detail?: string;
    success?: boolean;
    groups?: IGroup[];
    config?: Config[];
}

export interface Config {
    model?: string;
    pk?: number;
    fields?: ConfigFields;
}

export interface ConfigFields {
    group_id?: number;
    group_name?: string;
    size_limit?: number;
    message_limit?: number;
    group_limit?: number;
}

export interface IGroup {
    model?: string;
    pk?: number;
    fields?: Fields;
}

export interface Fields {
    name?: string;
    permissions?: number[];
}