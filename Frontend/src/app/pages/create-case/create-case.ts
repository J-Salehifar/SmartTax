import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-create-case',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-case.html',
  styleUrls: ['./create-case.css']
})
export class CreateCase {
  
  formData = {
    name: '',
    national_id: '',
    income: 0,
    description: ''
  };


  loading = false;
  message = '';


  constructor(private api: ApiService, private router: Router) {}


  submitForm() {
    this.loading = true;


    this.api.createCases(this.formData).subscribe({
      next: (res) => {
        this.message = 'پرونده با موفقیت ثبت شد!';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/dashboard']), 800);
      },
      error: (err) => {
        this.message = 'خطا در ثبت پرونده';
        this.loading = false;
      }
    });
  }
}
