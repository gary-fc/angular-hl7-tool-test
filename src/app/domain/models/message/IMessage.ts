export interface IMessageResponse {
    messages?: IMessage[];
    pagination?: IPagination;
}

export interface IPagination {
    page_size?: number;
    page_num?: number;
    countDocuments?: number;
    countPages?: number;
}

export interface IMessage {
    _id?: ID;
    id?: number;
    message?: string;
    segments?: Segment[];
    user_id?: string;
    group_id?: string;
}

export interface ID {
    $oid?: string;
}

export interface Segment {
    segment?: string;
    fields?: Field[];
    title_segment?: string;
}

export interface Field {
    field?: string;
    components?: Component[];
    position?: string;
    index?: string;
}

export interface Component {
    index?: string;
    component?: string;
    field_index?: string;
    position?: string;
    subcomponents?: Subcomponent[];
}

export interface Subcomponent {
    subcomponent?: string;
    segment?: string;
    position?: string;
}
