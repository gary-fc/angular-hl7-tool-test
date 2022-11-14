import {OnInit} from "@angular/core";

export function isOnInit(value: any): value is OnInit {
    const element = value as OnInit;

    return element.ngOnInit !== undefined;
}