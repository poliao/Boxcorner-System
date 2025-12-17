import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Import PageEvent
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from 'src/app/services/auth.service';
import { Dcsm01Service } from 'src/app/demo/forms/dcsm01.service'; // Import Service
import { LoadingService } from '../loadingservice/loading';

// ปรับ Interface ให้ตรงกับข้อมูลจริงจาก Java (Recipe)
interface Recipe {
  recipeid: string;
  jobid: string;
  jobname: string;
  updateby: string;
}

@Component({
  selector: 'app-docsystem',
  imports: [
    RouterModule, 
    ReactiveFormsModule, 
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './dcsm01.component.html',
  styleUrls: ['./dcsm01.component.scss']
})
export class Dcsm01Component implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  
  displayedColumns: string[] = ['recipeid', 'jobid', 'jobname', 'updateby'];
  dataSource = new MatTableDataSource<Recipe>([]);
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private dcsm01Service: Dcsm01Service ,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {

    this.loadData();
    
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.loadData();
    });
  }

  loadData() {
    this.loadingService.show();
    this.dcsm01Service.getAllRecipes(this.filterValue, this.pageIndex, this.pageSize)
      .subscribe({
        next: (response: any) => {
          this.dataSource.data = response.content;
          this.totalElements = response.totalElements;
          this.loadingService.hide();
        },
        error: (err) => {
          console.error('Error loading data', err);
          this.loadingService.hide();
        }
      });
      
  }

  getDisplayedColumns(): string[] {
    if (window.innerWidth <= 900) {
      return ['recipeid', 'jobid', 'jobname'];
    }
    return this.displayedColumns;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterValue = value.trim();
    
    // เมื่อค้นหา ให้กลับไปหน้าแรกสุด
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    
    // โหลดข้อมูลใหม่ตามคำค้นหา
    this.loadData();
  }

  add(){
    this.router.navigate(['/Dcsm01Detail']);
  }

  goToDetail(id: string) {
    this.router.navigate(['/Dcsm01Detail', id]);
  }
}