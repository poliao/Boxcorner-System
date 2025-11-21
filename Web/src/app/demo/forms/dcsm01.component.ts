// angular import
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from 'src/app/services/auth.service';

interface Employee {
  id: string;
  name: string;
  company: string;
  departmentUnit: string;
  lineOfWork: string;
  division: string;
  section: string;
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
export class Dcsm01Component implements AfterViewInit {
  loginForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'company', 'departmentUnit', 'lineOfWork', 'division', 'section'];
  dataSource = new MatTableDataSource<Employee>([
    { id: '000000', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000-000', name: 'นาย NA NA', company: 'บริษัท เพื่อนแท้ เงินด่วน (บุรีรัมย์) จำกัด', departmentUnit: '-', lineOfWork: '-', division: '-', section: '-' },
    { id: '000001', name: 'นาย ณัฐกิตติ์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ เงินด่วน (นครราชสีมา) จำกัด', departmentUnit: '-', lineOfWork: 'B : สายงานธุรกิจองค์กร', division: '-', section: '-' },
    { id: '0000002', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000004', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000040', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '00001200', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000r00', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '00002300', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '00003200', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },{ id: '000000', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '00002100', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000300', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000100', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000200', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },{ id: '000000', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000400', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '00004500', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000200', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0001000', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000200', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '0000300', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },{ id: '000000', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },
    { id: '00001300', name: 'นาย วุฒิศิลป์ จรัสบวรพันธ์', company: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', departmentUnit: 'บริษัท เพื่อนแท้ แคปปิตอล จำกัด', lineOfWork: 'CEO : ประธานเจ้าหน้าที่บริหาร', division: '-', section: '-' },

  ]);

  getDisplayedColumns(): string[] {
    if (window.innerWidth <= 900) {
      return ['id', 'name', 'company'];
    } else if (window.innerWidth <= 1200) {
      return ['id', 'name', 'company', 'lineOfWork'];
    }
    return this.displayedColumns;
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // เชื่อมต่อ Paginator กับ DataSource
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add(){
    this.router.navigate(['/Dcsm01Detail']);
  }

  goToDetail(employeeId: string) {
    this.router.navigate(['/Dcsm01Detail', employeeId]);
  }
}
