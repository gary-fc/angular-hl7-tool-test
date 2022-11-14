import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseDumbComponent} from "../../../../core/base-dumb-component";
import {MessageDisplayEvents} from "../../../../events/message-display/message_display.events";
import {SmartComponent} from "../../../../core/smart-component";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {Field, IPagination} from "../../../../../domain/models/message/IMessage";
import {MatMenuTrigger} from "@angular/material/menu";

interface FieldNode {
    value: string;
    segment: string;
    field_index: string;
    position: string;
    index: string;
    children?: any[];
}

interface ExampleFlatNode {
    value: string;
    segment: string;
    field_index: string;
    position: string;
    index: string;
    expandable: boolean;
    level: number;
}

@Component({
    selector: 'app-field-tree-segment',
    templateUrl: './field-tree-segment.component.html',
    styleUrls: ['./field-tree-segment.component.css']
})
export class FieldTreeSegmentComponent extends BaseDumbComponent<MessageDisplayEvents> implements AfterViewInit, OnChanges {

    @Input() public smartComponent: SmartComponent<MessageDisplayEvents>;
    @Input() public fields?: Field[];
    @Input() public selected_segment: string = "";
    @Input() public pagination: IPagination;

    menuTopLeftPosition = {x: "0", y: "0"};

    @ViewChild(MatMenuTrigger) matMenuTrigger?: MatMenuTrigger;
    @ViewChild(MatMenuTrigger) matMenuMessageTrigger?: MatMenuTrigger;

    getSmartComponent(): SmartComponent<MessageDisplayEvents> {
        return this.smartComponent;
    }

    constructor() {
        super();
        this.fields = [];
    }

    ngAfterViewInit(): void {
        super.init();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.buildTreeField();
    }

    buildTreeField() {
        const TREE_DATA: FieldNode[] = [];
        this.fields!.forEach((element, index) => {
            if (element.components!.length > 0) {
                let components = [];
                element.components.forEach((component) => {
                    if (component.subcomponents.length > 0) {
                        let subcomponents = []
                        component.subcomponents.forEach((subcomponent) => {
                            subcomponents.push({
                                value: subcomponent.subcomponent
                                    ? subcomponent.subcomponent
                                    : null,
                                segment: this.selected_segment,
                                field_index: component.field_index,
                                position: subcomponent.position,
                                index: component.index,
                            })
                        })
                        components.push({
                            value: component.component
                                ? component.component
                                : null,
                            segment: this.selected_segment,
                            field_index: component.field_index,
                            position: component.position,
                            index: component.index,
                            children: [...subcomponents]
                        })
                    } else {
                        components.push({
                            value: component.component
                                ? component.component
                                : null,
                            segment: this.selected_segment,
                            field_index: component.field_index,
                            position: component.position,
                            index: component.index
                        })
                    }
                });
                TREE_DATA.push({
                    value: element.field!,
                    field_index: element.position!,
                    position: element.position!,
                    segment: this.selected_segment,
                    index: element.index!,
                    children: [...components],
                });
            } else {
                TREE_DATA.push({
                    value: element.field!,
                    segment: this.selected_segment,
                    field_index: element.position!,
                    position: element.position!,
                    index: element.index!,
                });
            }
        });

        this.dataSource.data = TREE_DATA;
    }

    private _transformer = (node: FieldNode, level: number) => {
        return {
            value: node.value,
            segment: node.segment,
            position: node.position,
            field_index: node.field_index,
            index: node.index,
            level: level,
            expandable: !!node.children && node.children.length > 0,
        };
    };

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        (node) => node.level,
        (node) => node.expandable
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    onRightClick(event: MouseEvent, item: any) {
        // preventDefault avoids to show the visualization of the right-click menu of the browser
        event.preventDefault();

        // we record the mouse position in our object
        this.menuTopLeftPosition.x = event.clientX + "px";
        this.menuTopLeftPosition.y = event.clientY + "px";

        // we open the menu
        // we pass to the menu the information about our object
        this.matMenuTrigger.menuData = {item: item};

        // we open the menu
        this.matMenuTrigger?.openMenu();
        this.disableButtons(item);
    }

    check(e: any) {
        let tecla = document.all ? e.keyCode : e.which;

        //Backspace key to delete, always allows it
        if (tecla == 8) {
            return true;
        }

        // Input pattern, in this case it only accepts numbers and letters
        let patron = /[A-Za-z0-9]/;
        let tecla_final = String.fromCharCode(tecla);
        return patron.test(tecla_final);
    }

    saveValue(item: any) {
        let inputSelect = document.getElementById(
            item.content.index + "-input"
        ) as HTMLInputElement;
        const payload = {input: inputSelect, item: item}
        this.emit(MessageDisplayEvents.SAVE_VALUE, payload)
    }

    disableButtons(item: any) {
        if (item.content.expandable) {
            document.getElementById("edit_value")?.setAttribute("disabled", "");
        }
        if (item.content.level == 0) {
            document
                .getElementById("search_filter_by_component_value")
                ?.setAttribute("disabled", "");
            document
                .getElementById("search_filter_by_subcomponent_value")
                ?.setAttribute("disabled", "");
        }
        if (item.content.level == 1) {
            document
                .getElementById("search_filter_by_field_value")
                ?.setAttribute("disabled", "");
            document
                .getElementById("search_filter_by_subcomponent_value")
                ?.setAttribute("disabled", "");
        }
    }

    editValue(item: any) {
        let field_value = document.getElementById(item.content.index)?.childNodes[0]
            .childNodes[2] as HTMLElement;
        let input = document.getElementById(item.content.index)?.childNodes[0]
            .childNodes[3] as HTMLElement;
        let btnSave = document.getElementById(item.content.index)?.childNodes[0]
            .childNodes[4] as HTMLElement;
        let btnCancel = document.getElementById(item.content.index)?.childNodes[0]
            .childNodes[5] as HTMLElement;

        field_value.classList.toggle("hide-edit");
        input.classList.toggle("hide-edit");
        btnSave.classList.toggle("hide-edit");
        btnCancel.classList.toggle("hide-edit");
    }

    cancelEdit(item: any) {
        let field_value = document.getElementById(item.content.index)?.childNodes[0]
            .childNodes[2] as HTMLElement;
        let input = document.getElementById(item.content.index)?.childNodes[0]
            .childNodes[3] as HTMLElement;
        let btnSave = document.getElementById(item.content.index)?.childNodes[0]
            .childNodes[4] as HTMLElement;
        let btnCancel = document.getElementById(item.content.index)?.childNodes[0]
            .childNodes[5] as HTMLElement;

        field_value.classList.toggle("hide-edit");
        input.classList.toggle("hide-edit");
        btnSave.classList.toggle("hide-edit");
        btnCancel.classList.toggle("hide-edit");
    }

    search_filter_by_field_value(item: any) {
        const payload = {
            item: item, name_filter: "search_by_field_value"
        };
        this.emit(MessageDisplayEvents.SEND_FILTER, payload)
    }

    search_filter_by_component_value(item: any) {
        const payload = {
            item: item, name_filter: "search_by_component_value"
        };
        this.emit(MessageDisplayEvents.SEND_FILTER, payload)
        // let value: string = item.content.value;
        // let json_filter = {
        //     search_by_component_value: {
        //         value: value,
        //         segment: item.content.segment,
        //         position: item.content.position,
        //         user_id: this.user.id,
        //         group_id: this.group_id,
        //         name_filter: "search_by_component_value",
        //     },
        // };
        // this.array_filters.filters.push(json_filter);
        // this.filters.push({
        //     value: value,
        //     name: "search_by_component_value",
        //     index: item.content.index,
        // });
        // this.send_filters();
    }

    search_filter_by_subcomponent_value(item: any) {
        const payload = {
            item: item, name_filter: "search_by_subcomponent_value"
        };
        this.emit(MessageDisplayEvents.SEND_FILTER, payload)
        // let value: string = item.content.value;
        // let json_filter = {
        //     search_by_subcomponent_value: {
        //         value: value,
        //         segment: item.content.segment,
        //         position: item.content.position,
        //         user_id: this.user.id,
        //         group_id: this.group_id,
        //         name_filter: "search_by_subcomponent_value",
        //     },
        // };
        // this.array_filters.filters.push(json_filter);
        // this.filters.push({
        //     value: value,
        //     name: "search_by_subcomponent_value",
        //     index: item.content.index,
        // });
        // this.send_filters();
    }

    free_text_search_filter_with_rigth_click(item: any) {
        const payload = {
            item: item, name_filter: "free_text_search"
        };
        this.emit(MessageDisplayEvents.SEND_FILTER, payload)
        // let value = item.content.value;
        // let json_filter = {
        //     free_text_search: {
        //         value: value,
        //         user_id: this.user.id,
        //         group_id: this.group_id,
        //         name_filter: "free_text_search",
        //     },
        // };
        // this.array_filters.filters.push(json_filter);
        // this.filters.push({value: value, name: "free_text_search"});
        // this.send_filters();
    }

    search_filter_by_value_segment(item: any) {
        const payload = {
            item: item, name_filter: "search_by_value_segment"
        };
        this.emit(MessageDisplayEvents.SEND_FILTER, payload)
        // let value: string = item.content.value;
        // let json_filter = {
        //     search_by_value_segment: {
        //         value: value,
        //         segment: item.content.segment,
        //         user_id: this.user.id,
        //         group_id: this.group_id,
        //         name_filter: "search_by_value_segment",
        //     },
        // };
        // this.array_filters.filters.push(json_filter);
        // this.filters.push({
        //     value: value,
        //     name: "search_by_value_segment",
        //     index: item.content.index,
        // });
        // this.send_filters();
    }

}
