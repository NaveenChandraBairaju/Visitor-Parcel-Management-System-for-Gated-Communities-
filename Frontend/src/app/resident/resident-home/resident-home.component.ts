import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VisitorService } from '../../services/visitor.service';
import { ParcelService } from '../../services/parcel.service';
import { ActivityService, Activity } from '../../services/activity.service';
import { AuthService } from '../../services/auth.service';
import { AnnouncementService, Announcement } from '../../services/announcement.service';

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
  recentActivities: Activity[] = [];
  announcements: Announcement[] = [];

  constructor(
    private visitorService: VisitorService,
    private parcelService: ParcelService,
    private activityService: ActivityService,
    private authService: AuthService,
    private announcementService: AnnouncementService
  ) {
    // Get logged-in user's data
    this.userName = this.authService.getUserName();
    this.residentFlat = this.authService.getUserFlat();

    this.visitorService.visitors$.subscribe(list => {
      const myVisitors = list.filter(v => v.flatNumber === this.residentFlat);
      this.pendingVisitors = myVisitors.filter(v => v.status === 'waiting').length;
      this.todayVisitors = myVisitors.filter(v => v.date === 'Today').length;
    });

    this.parcelService.parcels$.subscribe(list => {
      this.pendingParcels = list.filter(p => p.flatNumber === this.residentFlat && p.status === 'Pending').length;
    });

    this.activityService.activities$.subscribe(() => {
      this.recentActivities = this.activityService.getRecent(5, this.residentFlat);
    });

    // Get announcements for residents
    this.announcementService.announcements$.subscribe(list => {
      this.announcements = list.filter(a => 
        a.audience === 'All Residents' || a.audience === 'Residents Only'
      ).slice(0, 3);
    });
  }

  getActivityIcon(type: Activity['type']): string {
    const icons: Record<Activity['type'], string> = {
      visitor_approved: 'check_circle',
      visitor_rejected: 'cancel',
      visitor_entered: 'login',
      visitor_exited: 'logout',
      parcel_received: 'inventory_2',
      parcel_collected: 'check_circle'
    };
    return icons[type];
  }

  getActivityClass(type: Activity['type']): string {
    if (type.includes('approved') || type.includes('entered') || type.includes('collected')) return 'approved';
    if (type.includes('rejected')) return 'rejected';
    if (type.includes('parcel')) return 'parcel';
    return 'entry';
  }
}
