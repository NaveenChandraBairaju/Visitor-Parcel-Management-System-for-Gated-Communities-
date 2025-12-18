import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VisitorService } from '../../services/visitor.service';
import { ParcelService } from '../../services/parcel.service';

@Component({
  selector: 'app-resident-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './resident-home.component.html',
  styleUrl: './resident-home.component.css'
})
export class ResidentHomeComponent {
  userName = 'Resident';
  residentFlat = 'A-101';
  pendingVisitors = 0;
  pendingParcels = 0;
  todayVisitors = 0;

  constructor(
    private visitorService: VisitorService,
    private parcelService: ParcelService
  ) {
    this.visitorService.visitors$.subscribe(list => {
      const myVisitors = list.filter(v => v.flatNumber === this.residentFlat);
      this.pendingVisitors = myVisitors.filter(v => v.status === 'pending').length;
      this.todayVisitors = myVisitors.filter(v => v.date === 'Today').length;
    });

    this.parcelService.parcels$.subscribe(list => {
      this.pendingParcels = list.filter(p => p.flatNumber === this.residentFlat && p.status === 'Received').length;
    });
  }
}
