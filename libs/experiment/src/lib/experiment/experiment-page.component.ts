import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaskitoOptions } from '@maskito/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForOf } from '@angular/common';

enum ReceiverTypes {
  MASSAGE = 'MASSAGE',
  BEAUTY_MASTER = 'BEAUTY_MASTER',
}

function arrayForm() {
  return new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    house: new FormControl(null),
    apartment: new FormControl(null),
  });
}

@Component({
  selector: 'app-experiment-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],                //MaskitoDirective,
  templateUrl: './experiment-page.component.html',
  styleUrls: ['./experiment-page.component.scss'],
})
export class ExperimentPageComponent {
  dateInput: Required<MaskitoOptions>;
  phoneInput: Required<MaskitoOptions>;

  form = new FormGroup({
    type: new FormControl<ReceiverTypes>(ReceiverTypes.MASSAGE),
    name: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    anamnez: new FormControl(''),
    typeMassage: new FormControl(''),
    durationOfService: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(0),
    atmosphere: new FormControl(''),
    oil: new FormControl(''),
    addresses: new FormArray([arrayForm()]),
  });

  //protected readonly dateOptions = dateOptions;
  //protected readonly phoneOptions = phoneOptions;
  protected readonly SubmitEvent = SubmitEvent;
  protected readonly event = event;
  protected readonly ReceiverTypes = ReceiverTypes;

  allDurations = [
    { value: '30min', label: '30 минут' },
    { value: '45min', label: '45 минут' },
    { value: '60min', label: '60 минут' },
    { value: '90min', label: '90 минут' },
  ];
  filteredDurations = [...this.allDurations];

  constructor() {
    //Наложение маски на input
    this.dateInput = dateOptions;
    this.phoneInput = phoneOptions;

    this.form.controls.typeMassage.valueChanges.pipe(takeUntilDestroyed()).subscribe((val) => {
      console.log('Тип массажа:', val); // для отладки
      if (val === 'omt') {
        this.filteredDurations = this.allDurations.filter((option) => option.value === '90min');
        this.form.controls.durationOfService.setValue('');
      } else if (val === 'ms') {
        this.filteredDurations = this.allDurations.filter((option) => option.value === '45min');
        this.form.controls.durationOfService.setValue('');
      } else if (val === 'lm') {
        this.filteredDurations = this.allDurations.filter((option) => option.value === '45min');
        this.form.controls.durationOfService.setValue('');
      } else {
        this.filteredDurations = [...this.allDurations];
      }
      this.form.controls.durationOfService.updateValueAndValidity();
    });

    //Создание динамического валидатора

    this.form.controls.type.valueChanges.pipe(takeUntilDestroyed()).subscribe((val) => {
      if (val === ReceiverTypes.MASSAGE) {
        this.form.controls.name.setValidators([Validators.required]);
        this.form.controls.lastName.setValidators([Validators.required]);
        this.form.controls.phone.setValidators([
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ]);
        this.form.controls.durationOfService.setValidators([Validators.required]);
      } else {
        this.form.controls.name.clearValidators();
        this.form.controls.lastName.clearValidators();
        this.form.controls.phone.clearValidators();
        this.form.controls.durationOfService.clearValidators();
      }
      this.form.get('name')?.updateValueAndValidity();
      this.form.get('lastName')?.updateValueAndValidity();
      this.form.get('phone')?.updateValueAndValidity();
      this.form.get('durationOfService')?.updateValueAndValidity();
    });
  }

  addAddresses() {
    this.form.controls.addresses.push(arrayForm());
  }
  deliteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }
  // Прописываем, что при отправке формы(SubmitEvent), если форма будет не валидна присвоим два свойства, что
  //отметит input как не валидные и "тронутые"

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
  }
  protected readonly onsubmit = onsubmit;
}
