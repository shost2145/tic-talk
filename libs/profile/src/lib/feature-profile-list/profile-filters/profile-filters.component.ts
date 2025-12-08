import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {
  debounceTime,
  startWith,
  Subscription,
} from 'rxjs';
import {Store} from "@ngrx/store";
import {profileActions} from "../../../../data/store";
import {ProfileService} from "../../../../../data-access/src";


@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  store = inject(Store);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  searchFormSub!: Subscription;

  onChange(value: any): void {
  }

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),)
      .subscribe(formValue => {
        this.store.dispatch(profileActions.filterEvents({filters: formValue}))
        this.onChange({filters: formValue})

      });

  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe();
  }
}
