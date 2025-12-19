import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VisitorService } from '../../services/visitor.service';
import { ParcelService } from '../../services/parcel.service';
import { PreApproveService } from '../../services/pre-approve.service';
import { ActivityService, Activity } from '../../services/activity.service';
import { AnnouncementService, Announcement } from '../../services/announcement.service';

@Component({
  selector: 'app-security-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './security-home.component.html',
  styleUrl: './security-home.component.css'
})
export class SecurityHomeComponent {
  userName = 'Security Guard';
  todayVisitors = 0;
  todayParcels = 0;
  pendingEntry = 0;
  recentActivities: Activity[] = [];
  announcements: Announcement[] = [];

  constructor(
    private visitorService: VisitorService,
    private parcelService: ParcelService,
    private preApproveService: PreApproveService,
    private activityService: ActivityService,
    private announcementService: AnnouncementService
  ) {
    this.visitorService.visitors$.subscribe(() => {
      this.todayVisitors = this.visitorService.getTodayCount();
      this.pendingEntry = this.visitorService.getApprovedVisitors().length;
    });

    this.parcelService.parcels$.subscribe(() => {
      this.todayParcels = this.parcelService.getTodayCount();
    });

    this.activityService.activities$.subscribe(() => {
      this.recentActivities = this.activityService.getRecent(5);
    });

    // Get announcements for security
    this.announcementService.announcements$.subscribe(list => {
      this.announcements = list.filter(a => 
        a.audience === 'All Residents' || a.audience === 'Security Guards'
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
    if (type.includes('entered')) return 'entry';
    if (type.includes('exited')) return 'exit';
    if (type.includes('parcel')) return 'parcel';
    return 'entry';
  }
}
