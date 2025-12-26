import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  // 🔥 Signals
  totalCases = signal(0);
  totalIncome = signal(0);
  totalTax = signal(0);
  growthPercent = signal(0);
  loaded = signal(false);

  private api = inject(ApiService);
  private platformId = inject(PLATFORM_ID);
  private revenueChart: any;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.api.getCases().subscribe({
      next: (cases: any[]) => {
        console.log('DASHBOARD CASES ✅', cases);

        // Basic stats
        this.totalCases.set(cases.length);
        const incomeSum = cases.reduce((s, c) => s + c.income, 0);
        const taxSum = cases.reduce((s, c) => s + c.tax_amount, 0);
        this.totalIncome.set(incomeSum);
        this.totalTax.set(taxSum);

        // Growth example calculation
        this.growthPercent.set(Math.floor(Math.random() * 20)); // demo value

        this.loaded.set(true);

        // Render chart
        setTimeout(() => this.renderChart(cases), 100);
      },
      error: (err) => {
        console.error('DASHBOARD ERROR ❌', err);
        this.loaded.set(true);
      }
    });
  }

  renderChart(cases: any[]) {
    const ctx: any = document.getElementById('revenueChart');
    if (!ctx) return;

    const labels = cases.map(c => `Case ${c.id}`);
    const data = cases.map(c => c.income);

    this.revenueChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Income per Case',
          data: data,
          backgroundColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true }
        }
      }
    });
  }
}
