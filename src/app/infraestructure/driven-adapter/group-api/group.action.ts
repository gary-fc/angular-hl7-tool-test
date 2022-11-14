import {Action} from '@ngrx/store';

export const GET_CURRENT_STATES_RESTRICTION = '[Group] Get Groups';

export class GetCurrentStatesRestrictionAction implements Action {
    readonly type = GET_CURRENT_STATES_RESTRICTION;
}
