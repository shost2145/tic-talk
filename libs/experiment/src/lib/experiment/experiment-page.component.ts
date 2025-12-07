import {AfterViewInit, ChangeDetectionStrategy, Component, inject, Renderer2, signal} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AsyncPipe, NgForOf} from '@angular/common';
import {phoneOptions} from '../mask'
import {MaskitoDirective} from "@maskito/angular";
import flatpickr from "flatpickr";
import {DadataService} from "../../../../data_acess/src/lib/data_acess";
import {debounceTime, from, map, switchMap, tap} from "rxjs";
import {DadataSuggestion} from "../../../../data_acess/src/lib/data_acess";


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
  imports: [ReactiveFormsModule, NgForOf, MaskitoDirective, AsyncPipe],
  templateUrl: './experiment-page.component.html',
  styleUrls: ['./experiment-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentPageComponent implements AfterViewInit {

  r2 = inject(Renderer2)
  #dadataService = inject(DadataService)
  isDropdownOpened = signal<boolean>(true)

  today = new Date().toISOString().split('T')[0]; // получение сегодняшней даты, приведение к строке и сепарирование
  disableInput(event: KeyboardEvent | ClipboardEvent) { //блокируем ручной ввод из-за случайных ошибок пользователя
    event.preventDefault();
  }


  initialFormState: any; // пустышка для получения изначального состояния формы

  form = new FormGroup({
    type: new FormControl<ReceiverTypes>(ReceiverTypes.MASSAGE),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16),]),
    anamnez: new FormControl(''),
    typeMassage: new FormControl(''),
    durationOfService: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(0),
    atmosphere: new FormControl(''),
    oil: new FormControl(''),
    package: new FormControl<boolean>(false),
    deliverySpeed: new FormControl<boolean>(false),
    addresses: new FormArray([arrayForm()]),
  });

  suggestions$ = this.form.controls.addresses.valueChanges.pipe(
    map((addresses: any[]) => addresses.map(address => address.city)),
    debounceTime(300),
    switchMap((cities: string[]) => {
      return from(cities).pipe(
        switchMap(city => this.#dadataService.getSuggestion(city).pipe(
          tap(res => {
            this.isDropdownOpened.set(!!res)
          })
        ))
      );
    })
  );


  onSuggestionPick(suggest: DadataSuggestion, addressIndex: number) {
    this.isDropdownOpened.set(false);
    const addressFormGroup = (this.form.controls.addresses as FormArray).at(addressIndex) as FormGroup;

    addressFormGroup.patchValue({
      city: suggest.data.city,
      street: suggest.data.street,
    }, {emitEvent: false});


  }


  protected readonly phoneOptions = phoneOptions;
  protected readonly ReceiverTypes = ReceiverTypes;

  allDurations = [
    {value: '30min', label: '30 минут'},
    {value: '45min', label: '45 минут'},
    {value: '60min', label: '60 минут'},
    {value: '90min', label: '90 минут'},
    {value: '0min', label: 'сначала выберите массаж'},

  ];

  filteredDurations = [...this.allDurations];

  constructor() {


    this.initialFormState = this.form.getRawValue() //получение первоначального состояния формы

    this.form.controls.typeMassage.valueChanges.pipe(takeUntilDestroyed()).subscribe((val) => {
      if (val === 'omt') {
        this.filteredDurations = this.allDurations.filter((option) => option.value === '90min');
        this.form.controls.durationOfService.setValue('');
      } else if (val === 'ms') {
        this.filteredDurations = this.allDurations.filter((option) => option.value === '45min' || option.value === '60min');
        this.form.controls.durationOfService.setValue('');
      } else if (val === 'lm') {
        this.filteredDurations = this.allDurations.filter((option) => option.value === '45min');
        this.form.controls.durationOfService.setValue('');
      } else if (val === 'am') {
        this.filteredDurations = this.allDurations.filter((option) => option.value === '30min' || option.value === '45min');
      } else {
        this.filteredDurations = this.allDurations.filter((option) => option.value === '0min');
      }
      this.form.controls.durationOfService.updateValueAndValidity();
    });


    // Создание динмического валидатора

    this.form.controls.type.valueChanges.pipe(takeUntilDestroyed()).subscribe((val) => {
      if (val === ReceiverTypes.MASSAGE) {
        this.form.controls.name.setValidators([Validators.required, Validators.minLength(2)]);
        this.form.controls.lastName.setValidators([Validators.required, Validators.minLength(2)]);
        this.form.controls.phone.setValidators([Validators.required, Validators.minLength(16), Validators.maxLength(16),]);
        this.form.controls.durationOfService.setValidators([Validators.required]);
      } else {
        this.form.controls.name.clearValidators();
        this.form.controls.lastName.clearValidators();
        this.form.controls.phone.clearValidators();
        this.form.controls.durationOfService.clearValidators();
      }
      this.form.controls.name.updateValueAndValidity();
      this.form.controls.lastName.updateValueAndValidity();
      this.form.controls.phone.updateValueAndValidity();
      this.form.controls.durationOfService.updateValueAndValidity();
    });

  }

  addAddresses() {
    this.form.controls.addresses.push(arrayForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {emitEvent: false});
  }


  // Прописываем, что при отправке формы(SubmitEvent), если форма будет не валидна присвоим два свойства, что
  //отметит input как не валидные и "тронутые"

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
    console.log(this.form.getRawValue());
  }

  cancellation() {
    this.form.patchValue(this.initialFormState)
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');


  }

  ngAfterViewInit() {
    flatpickr('#durationTime', {   // маска для времени запаси. Шаг час.
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
      minTime: '09:00',
      maxTime: '18:00'
    });
  }

}



