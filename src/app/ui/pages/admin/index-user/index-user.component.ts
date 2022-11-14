import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/domain/models/user/user';
import { GetUserUsecase } from 'src/app/domain/usecase/get-user-usecase';

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
  constructor(private _getUserUseCase: GetUserUsecase) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getUserList();
    
  }

  getUserList() {
    this._getUserUseCase.getUserList().subscribe((users) => {
      
      this.userList = users;
      this.dataSource = new MatTableDataSource<User>(this.userList);
    });
  }

  deleteUser(user_id: string, index: number) {
    this._getUserUseCase.deleteUser(user_id).subscribe(
      (response) => {
        this.userList.splice(index, 1);
        this.dataSource = new MatTableDataSource<User>(this.userList);
      },
      (error) => {}
    );
  }
}
