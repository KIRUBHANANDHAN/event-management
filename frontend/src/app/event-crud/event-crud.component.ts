import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventServiceService } from '../../services/event-service.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-crud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './event-crud.component.html',
  styleUrl: './event-crud.component.scss'
})
export class EventCrudComponent {
  eventForm: any = FormGroup;
  isEdit = false;
  eventId: string | null = null;

  state: any;


  @Output() eventAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private eventService: EventServiceService,
    private router: Router
  ) {

    const nav = this.router.getCurrentNavigation();
    this.state = nav?.extras.state as { event?: any };
  }


  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['']
    });

    console.log('state data', this.state);

    if (this.state) {
      this.isEdit = true;
      this.eventId = this.state.id;
      this.updateForm(this.state.id);
    }


  }

  updateForm(eventData: any) {
    const formattedDate = this.formatDate(eventData.date);
    this.eventForm.patchValue({
      title: eventData.title,
      date: formattedDate,
      location: eventData.location,
      description: eventData.description
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  submit() {

    if (this.eventForm.invalid) return;

    if (this.isEdit && this.eventId) {
      this.eventService.updateEvent(this.eventId, this.eventForm.value).subscribe(() => {
        // alert('Event updated successfully!');
        this.router.navigate(['/events']);
      });
    } else {
      this.eventService.addEvent(this.eventForm.value).subscribe(() => {
        console.log('Event Added!');
        this.eventForm.reset();
        // this.eventAdded.emit();
        this.router.navigate(['/events']);
      });
    }
  }


}
