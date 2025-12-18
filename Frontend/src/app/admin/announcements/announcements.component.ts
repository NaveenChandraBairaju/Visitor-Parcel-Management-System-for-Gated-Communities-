import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AnnouncementService, Announcement } from '../../services/announcement.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent {
  announcement = { title: '', message: '', priority: 'normal' as const, audience: 'all' };
  announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncementService) {
    this.announcementService.announcements$.subscribe(list => {
      this.announcements = list;
    });
  }

  get highPriorityCount() {
    return this.announcements.filter(a => a.priority === 'high').length;
  }

  get recentCount() {
    return this.announcements.length; // In real app, filter by date
  }

  submitAnnouncement() {
    if (this.announcement.title && this.announcement.message) {
      const audienceMap: Record<string, string> = {
        'all': 'All Residents',
        'residents': 'Residents Only',
        'security': 'Security Guards'
      };
      this.announcementService.addAnnouncement({
        title: this.announcement.title,
        message: this.announcement.message,
        priority: this.announcement.priority,
        audience: audienceMap[this.announcement.audience]
      });
      this.clearForm();
    }
  }

  clearForm() {
    this.announcement = { title: '', message: '', priority: 'normal', audience: 'all' };
  }

  deleteAnnouncement(item: Announcement) {
    this.announcementService.deleteAnnouncement(item.id);
  }
}
