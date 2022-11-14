import {Action} from "@ngrx/store";
import {ICurrentStatusRestriction} from "src/app/domain/models/user/ICurrentStatusRestriction";
import {GET_CURRENT_STATES_RESTRICTION} from "./group.action";


export interface GroupState {
    groups: ICurrentStatusRestriction;
}

export function groupReducer(
    state: ICurrentStatusRestriction = JSON.parse(localStorage.getItem("actual_state_groups")!),
    action: Action
) {
    switch (action.type) {
        case GET_CURRENT_STATES_RESTRICTION:
            state = JSON.parse(localStorage.getItem("actual_state_groups")!);
            return state;
    }
}
