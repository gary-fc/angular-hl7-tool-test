import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {User} from 'src/app/domain/models/user/user';
import {GetUserUsecase} from 'src/app/domain/usecase/get-user-usecase';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: User[];
}

declare const $: any;

@Component({
    selector: 'app-index-user',
    templateUrl: './index-user.component.html',
    styleUrls: ['./index-user.component.css'],
})
export class IndexUserComponent implements OnInit {
    displayedColumns: string[] = [
        'index',
        'name',
        'username',
        'email',
        'type',
        'view',
        'delete',
    ];
    userList: User[] = [];
    dataSource = new MatTableDataSource<User>(this.userList);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    public dataTable: DataTable;

    constructor(private _getUserUseCase: GetUserUsecase) {
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.getUserList();

    }

    getUserList() {
        this._getUserUseCase.getUserList().subscribe((users) => {
            this.userList = users;
            this.dataSource = new MatTableDataSource<User>(this.userList);
            this.dataTable = {
                headerRow: ['No.', 'Name', 'Username', 'Email', 'Type of user', 'Actions'],
                footerRow: ['No.', 'Name', 'Username', 'Email', 'Type of user', 'Actions'],

                dataRows: users
            };
        });
    }

    deleteUser(user_id: string, index: number) {
        this._getUserUseCase.deleteUser(user_id).subscribe(
            (response) => {
                this.userList.splice(index, 1);
                this.dataSource = new MatTableDataSource<User>(this.userList);
            },
            (error) => {
            }
        );
    }

    ngAfterViewInit() {
        $('#datatables').DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            }

        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function (e) {
            let $tr = $(this).closest('tr');
            if ($($tr).hasClass('child')) {
                $tr = $tr.prev('.parent');
            }

            var data = table.row($tr).data();
            e.preventDefault();
        });

        // Delete a record
        table.on('click', '.remove', function (e) {
            const $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        //Like record
        table.on('click', '.like', function (e) {
            e.preventDefault();
        });

        $('.card .material-datatables label').addClass('form-group');
    }
}
