// import {Pipe, PipeTransform} from "@angular/core";
//
// @Pipe({
//   name: 'DatePipe',
//   standalone: true,
// })
//
//
//
// export class MoscowTimePipe implements PipeTransform {
//
//   transform(
//     value: string | Date | null | undefined,
//     format: Intl.DateTimeFormatOptions = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       timeZoneName: 'short'
//     }
//   ): string | null {
//     if (!value) {
//       return null;
//     }
//
//     // Преобразуем вход в Date
//     const date = new Date(value);
//
//     // Проверяем валидность даты
//     if (isNaN(date.getTime())) {
//       return null;
//     }
//
//     // Форматируем в часовом поясе Москвы
//     return new Intl.DateTimeFormat('ru-RU', {
//       ...format,
//       timeZone: 'Europe/Moscow'  // Ключевой параметр!
//     }).format(date);
//   }
// }
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'toMoscowTime'
})
export class ToMoscowTimePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Создаем объект Date из строки'
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    // Форматируем дату с учетом московского часового пояса
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    };

    return new Date(date.getTime() + 3 * 60 * 60 * 1000).toLocaleString('ru-RU', options);
  }
}

