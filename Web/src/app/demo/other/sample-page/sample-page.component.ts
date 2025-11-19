import { Component } from '@angular/core';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { CardComponent } from '../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-sample-page',
  imports: [CardComponent],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent {

  constructor(private sweetAlert: SweetAlertService) {}

  showSuccess() {
    this.sweetAlert.success('สำเร็จ!', 'การดำเนินการเสร็จสิ้น');
  }

  showError() {
    this.sweetAlert.error('เกิดข้อผิดพลาด!', 'กรุณาลองใหม่อีกครั้ง');
  }

  showWarning() {
    this.sweetAlert.warning('คำเตือน!', 'กรุณาตรวจสอบข้อมูล');
  }

  showInfo() {
    this.sweetAlert.info('ข้อมูล', 'นี่คือข้อมูลสำคัญ');
  }

  showConfirm() {
    this.sweetAlert.confirm('ยืนยันการลบ?', 'คุณต้องการลบข้อมูลนี้หรือไม่?')
      .then((result) => {
        if (result.isConfirmed) {
          this.sweetAlert.success('ลบแล้ว!', 'ข้อมูลถูกลบเรียบร้อยแล้ว');
        }
      });
  }
}