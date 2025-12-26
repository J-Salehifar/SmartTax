// cases.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./cases.css'],
  templateUrl: './cases.html'
})
export class Cases {

  cases = signal<any[]>([]);
  loading = signal(true);
  predictions: { [key: number]: string } = {}; // نگهداری نتایج پیش‌بینی

  constructor(private api: ApiService) {
    // بارگذاری اولیه پرونده‌ها
    this.api.getCases().subscribe({
      next: (data) => {
        this.cases.set(data);
        this.loading.set(false);
        console.log('Cases loaded 👉', data);
      },
      error: (err: any) => {
        console.error('API ERROR ❌', err);
        this.loading.set(false);
      }
    });
  }

  predict(c: any) {
    if (this.predictions[c.id]) return; // اگر قبلاً پیش‌بینی شده بود، دوباره اجرا نشود

    this.api.predictCases(c).subscribe({
      next: (result: any) => {
        console.log('Prediction result 👉', result);
        this.predictions[c.id] =
          `Tax: ${result.predicted_tax}, Risk: ${result.risk_score}, Income: ${result.taxable_income}`;
      },
      error: (err: any) => console.error('Prediction error ❌', err)
    });
  }
}
