import {ChangeDetectionStrategy, Component, effect, inject, ViewChild} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {ProfileHeaderComponent} from '../ui';
import {ProfileService} from '../../../../data_acess/src/lib/data_acess';
import {AvatarUploadComponent} from '../ui';
import {StackInput} from "../../../../common-ui/src/lib/common-ui/components/stack-input/stack-input";
import {AddressInput} from "../../../../common-ui/src/lib/common-ui/components/adres-input/address-input";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent, StackInput, AddressInput],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
    city: [''],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    firstValueFrom(
      //@ts-ignore,
      this.profileService.patchProfile({
        ...this.form.value,
      })
    );
  }


}
