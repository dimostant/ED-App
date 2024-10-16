import { Component, inject  } from '@angular/core';

import { User } from '../../class/user';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-display',
  standalone: true,
  imports: [],
  templateUrl: './users-display.component.html',
  styleUrl: './users-display.component.scss'
})
export class UsersDisplayComponent {
  userService = inject(UserService);
  router = inject(Router);

  users: User[] = [];

  currentPage: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  totalPages: number = 0; 

  constructor() {
    this.setArray();
  }

  onEdit(id: number | null) {
    if (id != null && id != undefined) {
      this.router.navigate(['UserForm'], { queryParams: { id: id } });
    } 
    else {
      alert("This entry might be deleted or some internal error might have occured. Please try again later.");
    }
  }

  onDelete(id: number | null) {
    if (id != null) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert("User deleted successfully");
          this.setArray();
        },
        error: (error) => { console.log(error); }
      });
    }
  }

  setArray(){
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.users = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (error) => { console.log(error); }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.setArray();
  }

  onView(id: number | null) {
    this.router.navigate(['UserDisplay'],{ queryParams: { id: id } });
  }

  reloadPage() {
    window.location.reload()
  }
}
