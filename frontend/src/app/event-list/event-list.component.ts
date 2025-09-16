import { Component } from '@angular/core';
import { EventServiceService } from '../../services/event-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatPaginator
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  events: any[] = [];

  paginatedEvents: any[] = [];

  pageSize = 2;
  currentPage = 0;
  searchTerm: string = '';
  filteredEvents: any[] = [];

  constructor(
    private eventService: EventServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term)
    );

    this.currentPage = 0; 
    this.updatePaginatedEvents();
  }

  loadEvents() {

    this.eventService.getEvents().subscribe((res: any) => {
      console.log('events list', res);
      if (res.success && res.data) {
        this.events = res.data;
        //on add,listing all data
         this.filteredEvents = [...this.events];
      }
      this.updatePaginatedEvents();

    });

  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedEvents();
  }

  updatePaginatedEvents() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);
  }


  onEdit(event: any) {

    this.router.navigate(['/add'], { state: { id: event } });
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(`${id}`).subscribe(() => {
        this.loadEvents();
      });
    }
  }

}
