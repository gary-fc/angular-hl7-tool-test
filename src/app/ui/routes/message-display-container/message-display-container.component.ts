import {AfterViewInit, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppBaseSmartComponent} from "../../core/app-base-smart-component";
import {Field, IMessage, IPagination, Segment} from "../../../domain/models/message/IMessage";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatMenuTrigger} from "@angular/material/menu";
import {RecaptchaComponent} from "../../shared/recaptcha/recaptcha.component";
import {GetMessageUseCase} from "../../../domain/usecase/get-message-usecase";
import {GetGroupUsecase} from "../../../domain/usecase/get-group-usecase";
import {Store} from "@ngrx/store";
import {UserState} from "../../../infraestructure/driven-adapter/user-api/user.reducer";
import {ActivatedRoute} from "@angular/router";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {IUpdatedMessage} from "../../../domain/models/message/IUpdated-message";
import {MessageDisplayEvents} from "../../events/message-display/message_display.events";
import {environment} from "../../../../environments/environment";
import {UserSession} from "../../../domain/models/user/api/user-session";
import swal from "sweetalert2";

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

declare interface DataTable1 {
    headerRow: string[];
    dataRows: IMessage[];
}

declare interface DataTable2 {
    headerRow: string[];
    dataRows: Segment[];
}

declare const $: any;


@Component({
    selector: 'app-message-display-container',
    templateUrl: './message-display-container.component.html',
    styleUrls: ['./message-display-container.component.css']
})
export class MessageDisplayContainerComponent extends AppBaseSmartComponent<MessageDisplayEvents> implements OnInit, AfterViewInit, OnDestroy {

    public messagePagingTable?: DataTable1;
    public mainMessageTable?: DataTable2;
    public fields?: Field[];

    user: UserSession = {};
    group_id: string = "";
    selected_segment: string = "";

    //messages
    messages?: IMessage[];
    segments?: Segment[];


    selected_message_position?: number = 0;
    selected_segment_position?: number = 0;

    //table
    columnsTableSegment: string[] = [
        "position",
        "segment",
        "segment value",
    ];

    //search
    search?: string;
    flagSearch = false;

    columnsTableMessage: string[] = ["position", "message", "download"];
    columnsTableField: string[] = ["position", "title field", "field value"];

    dataSourceTableSegment: any;
    dataSourceTableMessage: any;
    dataSourceTableField: any;

    menuTopLeftPosition = {x: "0", y: "0"};

    //filtersFlags
    filterGetMessagesValue = false;
    filterGetMessagesValueData?: IMessage[];
    filterGetMessagesValueItem: any;

    //filtersMessages
    messagesPrincipal?: IMessage[];
    messagesPrincipalLength?: number;
    messagesSearchValue?: IMessage[];
    messagesFileterOne?: IMessage[];

    filters: any[] = [];

    //LOADING
    loading: boolean = true;

    //pagination
    pagination!: IPagination;
    page_size = 10;
    page_num = 1;

    pageEvent!: PageEvent;

    //news filters
    array_filters: any;

    horizontalPosition: MatSnackBarHorizontalPosition = "left";
    verticalPosition: MatSnackBarVerticalPosition = "bottom";

    @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger?: MatMenuTrigger;
    @ViewChild(MatMenuTrigger, {static: true})
    matMenuMessageTrigger?: MatMenuTrigger;

    @ViewChild(RecaptchaComponent, {static: true})
    recaptcha: RecaptchaComponent;

    @ViewChild(MatPaginator) paginator?: MatPaginator;

    recaptchaToken?: string;

    constructor(private _getMessageUseCase: GetMessageUseCase,
                private _getGroupUseCase: GetGroupUsecase,
                private _store: Store<UserState>,
                private _snackBar: MatSnackBar,
                private _route: ActivatedRoute,
                private _injector: Injector,
                private _cdr: ChangeDetectorRef) {
        super();
    }

    public ngOnInit(): void {
        this._initialize();
    }

    public ngAfterViewInit(): void {
        this.executeToken();
    }

    public ngOnDestroy(): void {
        this._finalize();
    }


    public handleDumbMessage(type: MessageDisplayEvents, payload: any) {
        switch (type) {
            case MessageDisplayEvents.DOWNLOAD_MESSAGE:
                this._downloadMessage(payload)
                break;
            case MessageDisplayEvents.DOWNLOAD_ALL_MESSAGES:
                this._downloadAllMessage();
                break;
            case MessageDisplayEvents.SELECT_SEGMENT:
                this._clickPrincipal(payload.payload);
                break;
            case MessageDisplayEvents.SAVE_VALUE:
                this._saveValue(payload);
                break;
            case MessageDisplayEvents.SEND_FILTER:
                this._buildFilter(payload);
                break;
            case MessageDisplayEvents.SEND_FREE_TEXT_FILTER:
                this._buildFreeTextFilter(payload);
                break;
            case MessageDisplayEvents.REMOVE_FILTER:
                this._removeFilter(payload);
                break;
            case MessageDisplayEvents.REMOVE_ALL_FILTERS:
                this._removeAllFilters();
                break;
            case MessageDisplayEvents.SELECT_MESSAGE:
                this._selectMessage(payload)
                break;
        }
    }

    private _selectMessage(payload: any): void {
        this.selected_message_position = payload.payload;
        this.segments = this.messages![payload.payload].segments;
        this.mainMessageTable = {
            headerRow: ["No.", "Segment", "Segment value"],
            dataRows: this.segments,
        };
        this.fields = this.segments![0].fields;
        this.selected_segment = this.segments![0].title_segment!;
        this.dataSourceTableSegment = this.segments;
        this.dataSourceTableField = this.fields;
    }

    private _downloadMessage(payload: any): void {
        let url = `${environment.url_back}/app/message/messages/download_message_with_id?group_id=${this.group_id}&user_id=${this.user.id}&id=${payload.payload}`;
        window.open(url, "_blank");
    }

    private _downloadAllMessage(): void {
        let url = this._getGroupUseCase.downloadGroupMessages(
            this.user.id!,
            this.group_id
        );
        window.open(url, "_blank");
    }

    private _removeFilter(payload: any): void {
        swal.fire({title: 'Please wait', allowOutsideClick: false, allowEscapeKey: false})
        swal.showLoading()
        this.array_filters.filters = this.array_filters.filters.filter((value, index) => {
            return index !== payload.payload;
        })
        this.filters = this.filters.filter((value, index) => {
            return index !== payload.payload;
        });
        this.resetToken();
    }

    private _removeAllFilters(): void {
        this.array_filters.filters = [];
        this.filters = [];
        this.resetToken();
    }

    private _buildFreeTextFilter(payload: any): void {
        swal.fire({title: 'Please wait', allowOutsideClick: false, allowEscapeKey: false})
        swal.showLoading()
        let json_filter = {
            free_text_search: {
                value: payload.payload,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "free_text_search"
            },
        };

        this.array_filters.filters.push(json_filter);
        this.filters.push({value: payload.payload, index: "Text", name: "free_text_search"});
        this.resetToken();

    }

    private _buildFilter(payload: any): void {
        swal.fire({title: 'Please wait', allowOutsideClick: false, allowEscapeKey: false})
        swal.showLoading()
        console.log("asdasdasda")
        switch (payload.payload.name_filter) {
            case 'search_by_field_value':
                this.array_filters.filters.push(this._buildFilterSearchByFieldValue(payload));
                this.filters.push({
                    value: payload.payload.item.content.value,
                    name: "search_by_field_value",
                    index: payload.payload.item.content.index,
                    position: "a"
                });
                break;
            case 'search_by_component_value':
                this.array_filters.filters.push(this._buildFilterSearchByComponentValue(payload));
                this.filters.push({
                    value: payload.payload.item.content.value,
                    name: "search_by_component_value",
                    index: payload.payload.item.content.index,
                });
                break;
            case 'search_by_subcomponent_value':
                this.array_filters.filters.push(this._buildFilterSearchBySubComponentValue(payload));
                this.filters.push({
                    value: payload.payload.item.content.value,
                    name: "search_by_subcomponent_value",
                    index: payload.payload.item.content.index,
                });
                break;
            case 'free_text_search':
                this.array_filters.filters.push(this._buildFilterSearchByFreeText(payload));
                this.filters.push({
                    value: payload.payload.item.content.value,
                    name: "free_text_search",
                    index: payload.payload.item.content.index,
                });
                break;
            case 'search_by_value_segment':

                this.array_filters.filters.push(this._buildFilterSearchByValueSegment(payload));
                this.filters.push({
                    value: payload.payload.item.content.value,
                    name: "search_by_value_segment",
                    index: payload.payload.item.content.index,
                });
                break;
        }
        this.resetToken();
    }

    private _buildFilterSearchByFieldValue(payload: any): any {
        return {
            search_by_field_value: {
                value: payload.payload.item.content.value,
                segment: payload.payload.item.content.segment,
                position: payload.payload.item.content.position,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "search_by_field_value",
            },
        };
    }

    private _buildFilterSearchByComponentValue(payload: any): any {
        return {
            search_by_component_value: {
                value: payload.payload.item.content.value,
                segment: payload.payload.item.content.segment,
                position: payload.payload.item.content.position,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "search_by_component_value",
            },
        };
    }

    private _buildFilterSearchBySubComponentValue(payload: any): any {
        return {
            search_by_subcomponent_value: {
                value: payload.payload.item.content.value,
                segment: payload.payload.item.content.segment,
                position: payload.payload.item.content.position,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "search_by_subcomponent_value",
            },
        };
    }

    private _buildFilterSearchByFreeText(payload: any): any {
        return {
            free_text_search: {
                value: payload.payload.item.content.value,
                segment: payload.payload.item.content.segment,
                position: payload.payload.item.content.position,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "free_text_search",
            },
        };
    }

    private _buildFilterSearchByValueSegment(payload: any): any {
        return {
            search_by_value_segment: {
                value: payload.payload.item.content.value,
                segment: payload.payload.item.content.segment,
                position: payload.payload.item.content.position,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "search_by_value_segment",
            },
        };
    }


    private _saveValue(payload: any): void {
        if (payload.payload.item.content.level == 0) {
            this.fields![payload.payload.item.content.position - 1].field = payload.payload.input.value;
            let new_segment_value = this.fields!.map((f) => f.field).join("|");
            new_segment_value = new_segment_value.substring(1);
            new_segment_value = payload.payload.item.content.segment + new_segment_value;
            this.messages![this.selected_message_position!].segments![
                this.selected_segment_position!
                ].segment = new_segment_value;
            this.updateMessage();
        }
        if (payload.payload.item.content.level == 1) {
            this.fields![payload.payload.item.content.field_index - 1].components![
            payload.payload.item.content.position - 1
                ].component = payload.payload.input.value;
            let field = this.fields![payload.payload.item.content.field_index - 1].field as string;
            let split_field = field.split("^");
            split_field[payload.payload.item.content.position - 1] = payload.payload.input.value;
            let new_value = split_field.join("^");
            this.fields![payload.payload.item.content.field_index - 1].field = new_value;
            let new_segment_value = this.fields!.map((f) => f.field).join("|");
            if (this.selected_segment_position! == 0) {
                new_segment_value = new_segment_value.substring(1);
                new_segment_value = payload.payload.item.content.segment + new_segment_value;
            } else {
                new_segment_value = payload.payload.item.content.segment + "|" + new_segment_value;
            }
            this.messages![this.selected_message_position!].segments![
                this.selected_segment_position!
                ].segment = new_segment_value;
            this.updateMessage();
        }
        if (payload.payload.item.content.level == 2) {
            this.fields![payload.payload.item.content.field_index - 1].components![
            payload.payload.item.content.position - 1
                ].component = payload.payload.input.value;
        }
    }

    protected injector(): Injector {
        return this._injector;
    }

    private _initialize(): void {
        this.getUserState();
        this.getIdGroup();
        this.array_filters = {
            filters: [],
            user_id: this.user.id,
            group_id: this.group_id!,
            page_size: this.page_size,
            page_num: this.page_num,
        };

        this.messagePagingTable = {
            headerRow: ["No.", "Message", "Download"],
            dataRows: [],
        };
        this.mainMessageTable = {
            headerRow: ["No.", "Segment", "Segment value"],
            dataRows: [],
        };

        $("#datatables").DataTable({
            pagingType: "full_numbers",
            lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, "All"],
            ],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            },
        });

        const table = $("#datatables").DataTable();
        this.buildPager();

        // Edit record
        table.on("click", ".edit", function (e) {
            let $tr = $(this).closest("tr");
            if ($($tr).hasClass("child")) {
                $tr = $tr.prev(".parent");
            }

            var data = table.row($tr).data();
            alert(
                "You press on Row: " +
                data[0] +
                " " +
                data[1] +
                " " +
                data[2] +
                "'s row."
            );
            e.preventDefault();
        });

        // Delete a record
        table.on("click", ".remove", function (e) {
            const $tr = $(this).closest("tr");
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        //Like record
        table.on("click", ".like", function (e) {
            alert("You clicked on Like button");
            e.preventDefault();
        });

        $(".card .material-datatables label").addClass("form-group");

        $(".datatables_info").addClass("remove");
    }

    private _finalize(): void {

    }

    private _clickPrincipal(segmentIndex: number) {
        this.selected_segment_position = segmentIndex;
        this.segments = this.messages![0].segments;
        this.fields = this.segments![segmentIndex].fields;
        this.selected_segment = this.segments![segmentIndex].title_segment!;
        // Array.from(document.getElementsByClassName("segments")).forEach(
        //     (segment) => {
        //         segment.classList.remove("active");
        //     }
        // );
        // document
        //     .getElementById("segment-" + i.toString())
        //     ?.classList.toggle("active");
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

    getUserState() {
        this.user = JSON.parse(localStorage.getItem('auth'));
    }

    getIdGroup() {
        this._route.params.subscribe((params) => {
            this.group_id = params.group_id;
        });
    }

    send_filters() {
        this._getMessageUseCase
            .getFiltersMessages(
                this.array_filters,
                this.user.id!,
                this.group_id,
                this.page_num,
                this.page_size,
                this.recaptchaToken
            )
            .subscribe((messages) => {
                if (messages.messages.length > 0) {
                    swal.close()
                    this.pagination = messages.pagination!;
                    this.messagesPrincipal = messages.messages;
                    this.messagesPrincipalLength = this.messagesPrincipal!.length;
                    this.messages = messages.messages;
                    this.segments = this.messages![0].segments;
                    this.fields = this.segments![0].fields;
                    this.selected_segment = this.segments![0].title_segment!;
                    this.dataSourceTableMessage = this.messagesPrincipal;
                    this.dataSourceTableSegment = this.segments;
                    this.dataSourceTableField = this.fields;
                    this.messagePagingTable = {
                        headerRow: ["No.", "Message", "Download"],
                        dataRows: messages.messages,
                    };
                    this.mainMessageTable = {
                        headerRow: ["No.", "Segment", "Segment value"],
                        dataRows: this.segments,
                    };
                } else {
                    this.messagePagingTable = {
                        headerRow: ["No.", "Message", "Download"],
                        dataRows: [],
                    };
                    this.mainMessageTable = {
                        headerRow: ["No.", "Segment", "Segment value"],
                        dataRows: [],
                    };
                    this.fields = []
                    this._showSwal(
                        "success-message",
                        "No messages found",
                        "The search criteria was not found"
                    ).then(() => {
                        this.array_filters.filters = this.array_filters.filters.filter((value, index) => {
                            return index !== (this.array_filters.filters.length - 1);
                        })
                        this.filters = this.filters.filter((value, index) => {
                            return index !== (this.filters.length - 1);
                        });
                        this.resetToken();
                    });
                }
                this.buildPager();
            });
    }

    clickMessages(i: number) {
        this.selected_message_position = i;
        this.segments = this.messages![i].segments;
        this.mainMessageTable = {
            headerRow: ["No.", "Segment", "Segment value"],
            dataRows: this.segments,
        };
        this.fields = this.segments![0].fields;
        this.selected_segment = this.segments![0].title_segment!;
        this.dataSourceTableSegment = this.segments;
        this.dataSourceTableField = this.fields;
        document
            .getElementById("message-" + i.toString())
            ?.classList.toggle("active");
    }

    searchValue() {
        this._getMessageUseCase
            .getSearchMessages(this.user.id!, this.group_id, this.search!)
            .subscribe((messages) => {
                this.messagesSearchValue = messages;
                this.messages = this.messagesSearchValue;
                this.segments = this.messages[0].segments;
                this.fields = this.segments![0].fields;
                this.dataSourceTableMessage = this.messages;
                this.dataSourceTableSegment = this.segments;
                this.dataSourceTableField = this.fields;
                this.flagSearch = true;
            });
    }

    replaceValue(value: string) {
        let special_character_1 = "^";
        let special_character_2 = "~";
        let special_character_3 = "&";

        let value1 = value?.replace(special_character_1, "\\^");
        let value2 = value1?.replace(special_character_2, "\\~");
        let value3 = value2?.replace(special_character_3, "\\&");
        return value3;
    }

    cleanSearch() {
        this.flagSearch = false;
        this.messages = this.messagesPrincipal;
        this.segments = this.messages![0].segments;
        this.fields = this.segments![0].fields;
        this.dataSourceTableMessage = this.messages;
        this.dataSourceTableSegment = this.segments;
        this.dataSourceTableField = this.fields;
    }

    loadfilterGetMessagesValue($event: any) {
        this.filterGetMessagesValueData = $event;
        this.messages = this.filterGetMessagesValueData;
        this.segments = this.messages![0].segments;
        this.fields = this.segments![0].fields;
        this.dataSourceTableMessage = this.messages;
        this.dataSourceTableSegment = this.segments;
        this.dataSourceTableField = this.fields;
    }

    free_text_search_filter() {
        // let value = this.replaceValue(this.search!)
        let json_filter = {
            free_text_search: {
                value: this.search,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "free_text_search",
            },
        };
        this.array_filters.filters.push(json_filter);
        this.filters.push({value: this.search, name: "free_text_search"});
        this.send_filters();
    }

    free_text_search_filter_with_rigth_click(item: any) {
        let value = item.content.value;
        let json_filter = {
            free_text_search: {
                value: value,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "free_text_search",
            },
        };
        this.array_filters.filters.push(json_filter);
        this.filters.push({value: value, name: "free_text_search"});
        this.send_filters();
    }

    search_filter_by_value_segment(item: any) {
        let value: string = item.content.value;
        let json_filter = {
            search_by_value_segment: {
                value: value,
                segment: item.content.segment,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "search_by_value_segment",
            },
        };
        this.array_filters.filters.push(json_filter);
        this.filters.push({
            value: value,
            name: "search_by_value_segment",
            index: item.content.index,
        });
        this.send_filters();
    }

    search_filter_by_field_value(item: any) {
        let value: string = item.content.value;
        let json_filter = {
            search_by_field_value: {
                value: value,
                segment: item.content.segment,
                position: item.content.position,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "search_by_field_value",
            },
        };
        this.array_filters.filters.push(json_filter);
        this.filters.push({
            value: value,
            name: "search_by_field_value",
            index: item.content.index,
        });
        this.send_filters();
    }

    search_filter_by_component_value(item: any) {
        let value: string = item.content.value;
        let json_filter = {
            search_by_component_value: {
                value: value,
                segment: item.content.segment,
                position: item.content.position,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "search_by_component_value",
            },
        };
        this.array_filters.filters.push(json_filter);
        this.filters.push({
            value: value,
            name: "search_by_component_value",
            index: item.content.index,
        });
        this.send_filters();
    }

    search_filter_by_subcomponent_value(item: any) {
        let value: string = item.content.value;
        let json_filter = {
            search_by_subcomponent_value: {
                value: value,
                segment: item.content.segment,
                position: item.content.position,
                user_id: this.user.id,
                group_id: this.group_id,
                name_filter: "search_by_subcomponent_value",
            },
        };
        this.array_filters.filters.push(json_filter);
        this.filters.push({
            value: value,
            name: "search_by_subcomponent_value",
            index: item.content.index,
        });
        this.send_filters();
    }

    remove_filter(index: number) {
        this.array_filters.filters.splice(index, 1);
        this.filters.splice(index, 1);
        this.send_filters();
    }

    getServerData(page: any) {
        this.page_num = page;
        this.page_size = this.page_size;
        this.array_filters["page_size"] = this.page_size;
        this.array_filters["page_num"] = this.page_num;
        this.send_filters();
    }

    change(event?: any) {
        if (
            event.target.value > this.pagination?.countPages! ||
            event.target.value < 1
        ) {
            this.errorAudio();
            this._snackBar.open("Page number exceeded", "Close", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        } else {
            this.paginator!.pageIndex = event.target.value - 1;
            this.page_num = event.target.value;
            this.array_filters["page_num"] = this.page_num;
            this.send_filters();
            this.successAudio();
            this._snackBar.open("Success", "Close", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }

    successAudio() {
        let audio = new Audio();
        audio.src = "assets/audios/success.mp3";
        audio.load();
        audio.play();
    }

    errorAudio() {
        let audio = new Audio();
        audio.src = "assets/audios/error.mp3";
        audio.load();
        audio.play();
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

    updateMessage() {
        let new_message = this.messages![
            this.selected_message_position!
            ].segments?.map((value) => {
            return value.segment?.replace("\\", "\\");
        }).join("\r");
        let updated_message_json: IUpdatedMessage = {
            user_id: this.user.id,
            group_id: this.group_id,
            message_id: this.messages![this.selected_message_position!].id,
            message_oid: this.messages![this.selected_message_position!]._id?.$oid,
            message: new_message,
        };
        this._getMessageUseCase
            .updateMesssage(updated_message_json)
            .subscribe((response) => {
                if (response.success) {
                    this.successAudio();
                    this._snackBar.open("Success", "Close", {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                    });
                }
            });
    }

    buildPager() {
        // <li class="paginate_button page-item "><a href="#" aria-controls="datatables" data-dt-idx="3" tabindex="0" class="page-link">2</a></li>
        let paginator = document.getElementsByClassName(
            "pagination"
        )[0] as HTMLElement;
        paginator.innerHTML = "";
        let previous = document.createElement("li");
        previous.classList.add("paginate_button");
        previous.classList.add("page-item");
        previous.classList.add("previous");
        let a_previous = document.createElement("a");
        a_previous.classList.add("page-link");
        a_previous.innerText = "Previous";
        previous.appendChild(a_previous);

        let next = document.createElement("li");
        next.classList.add("paginate_button");
        next.classList.add("page-item");
        next.classList.add("next");
        let a_next = document.createElement("a");
        a_next.classList.add("page-link");
        a_next.innerText = "Next";
        next.appendChild(a_next);

        paginator.appendChild(previous);

        for (let index = 0; index < this.pagination?.countPages; index++) {
            let li = document.createElement("li");
            let a_li = document.createElement("a");
            a_li.setAttribute("id", `${index + 1}`);
            // (page)="getServerData($event)"
            a_li.addEventListener("click", (e: any) => {
                Array.from(document.querySelectorAll(".page-item")).forEach(function (
                    page
                ) {
                    page.classList.remove("active");
                });
                this.getServerData(e.target.id);
                a_li.parentElement.classList.toggle("active");
            });
            if (index == 0) {
                li.classList.add("paginate_button");
                li.classList.add("page-item");
                li.classList.add("active");
                a_li.classList.add("page-link");
                a_li.innerText = `${index + 1}`;
                li.appendChild(a_li);
                paginator.appendChild(li);
            } else {
                li.classList.add("paginate_button");
                li.classList.add("page-item");
                a_li.classList.add("page-link");
                a_li.innerText = `${index + 1}`;
                li.appendChild(a_li);
                paginator.appendChild(li);
            }
        }
        paginator.appendChild(next);
    }

    executeToken() {
        this.recaptcha.execute();
    }

    resetToken() {
        this.recaptcha.reset();
        this.executeToken();
    }

    getToken(token: string) {
        this.recaptchaToken = token
        this.send_filters();
    }

    private _showSwal(type, title, text) {
        if (type == "success-message") {
            return swal.fire({
                title: title,
                text: text,
                buttonsStyling: false,
                customClass: {
                    confirmButton: "btn btn-info",
                },
                icon: "error",
            });
        }
    }

}
