import {Component, forwardRef, inject, OnInit, signal} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, switchMap, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {DadataService, DadataSuggestion} from "../../../../../../data-access/src";



@Component({
  selector: 'lib-address-input',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,

  ],
  templateUrl: './address-input.html',
  styleUrl: './address-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInput)
    }
  ]
})
export class AddressInput implements ControlValueAccessor, OnInit {
  innerSearchControl = new FormControl();
  #dadataService = inject(DadataService);


  isDropdownOpened = signal<boolean>(true)

  addressForm = new FormGroup({
    city: new FormControl(""),
    street: new FormControl(""),
    building: new FormControl("")
  })


  suggestions$ = this.innerSearchControl.valueChanges
    .pipe(
      debounceTime(300),
      switchMap(val => {
        return this.#dadataService.getSuggestion(val)
          .pipe(
            tap(res => {
              this.isDropdownOpened.set(!!res.length)
              if (res.length === 0) {           // Условие необходимо для дебага, так как сигнал при затирании запроса не активизируется с новым.
                this.isDropdownOpened.set(true)
              }
            })
          );
      })
    )

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })


  }

  setDisabledState?(isDisabled: boolean): void {

  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn


  }

  onChange(value: any): void {
  }

  onTouched(): void {
  }


  onSuggestionPick(suggest: DadataSuggestion) {
    this.isDropdownOpened.set(false)
    this.innerSearchControl.patchValue(suggest.data.city,
      {
        emitEvent: false
      })
    this.onChange(suggest.data.city);
    this.addressForm.patchValue({
      city: suggest.data.city,
      street: suggest.data.street,
      building: suggest.data.house
    }, {emitEvent: false});

    this.saveFormData();
  }

  saveFormData(): void {
    const formData = this.addressForm.value;
    localStorage.setItem('addressForm', JSON.stringify(formData));
  }

  ngOnInit() {
    const saveData = localStorage.getItem('addressForm')
    if (saveData) {
      const parsedData = JSON.parse(saveData);
      this.addressForm.patchValue(parsedData);
    }
    this.addressForm.valueChanges.subscribe((formData) => {
      localStorage.setItem('addressForm', JSON.stringify(formData));

    })
  }
}
