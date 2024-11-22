import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyObject',
  standalone: true
})
export class EmptyObjectPipe implements PipeTransform {

  transform(value: any): boolean {
    return value!! && Object.keys(value).length === 0;
  }

}
