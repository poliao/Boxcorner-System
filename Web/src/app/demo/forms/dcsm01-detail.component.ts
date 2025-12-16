import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// ต้อง import FormArray ด้วยครับ
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-docsystem',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dcsm01-detail.component.html',
  styleUrls: ['./dcsm01-detail.component.scss']
})
export class Dcsm01DetailComponent implements OnInit {
  
  docForm: FormGroup; // เปลี่ยนชื่อจาก loginForm เป็น docForm เพื่อให้สื่อความหมาย

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {
    // สร้าง Form โดยมีส่วนหัว และส่วนรายการสี (FormArray)
    this.docForm = this.fb.group({
      recipeId: [''],    // รหัสสูตรตั้งต้น
      jobId: [''],       // รหัสงาน
      jobName: [''],     // ชื่องาน
      updateDate: [''],  // วันที่อัพเดท
      updateBy: [''],    // พนักงานที่อัพเดตล่าสุด
      colors: this.fb.array([]) // สร้าง array เปล่าๆ สำหรับเก็บรายการสี
    });
  }

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');
    console.log('Employee ID:', employeeId);

    // เริ่มต้นให้มี Input สีโผล่มา 1 แถวเสมอ (ถ้าต้องการ)
    this.addColorItem();
  }

  // --- จัดการ FormArray (Colors) ---

  // Getter เพื่อให้เรียกใช้ใน HTML ได้ง่ายๆ (ชื่อตัวแปร colorForms)
  get colorForms(): FormArray {
    return this.docForm.get('colors') as FormArray;
  }

  // ฟังก์ชันสร้าง FormGroup ของแต่ละแถว
  createColorItem(): FormGroup {
    return this.fb.group({
      color: ['', Validators.required], // ใส่ Validators ได้ตามต้องการ
      weight: ['', Validators.required],
      lot: ['']
    });
  }

  // ฟังก์ชันเพิ่มแถวใหม่ (+)
  addColorItem() {
    this.colorForms.push(this.createColorItem());
  }

  // ฟังก์ชันลบแถว (Trash icon)
  removeColorItem(index: number) {
    this.colorForms.removeAt(index);
  }

  // --- Submit ---
  onSubmit() {
    console.log(this.docForm.value); // จะได้ข้อมูล JSON ทั้งหมดรวมถึง Array สี
  }
}