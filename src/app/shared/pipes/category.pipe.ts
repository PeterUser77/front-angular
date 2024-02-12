import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): String {
    switch(value) {
      case 'front-end': return 'code';
      case 'back-end': return 'computer';
      case 'data-base': return 'storage';
      case 'full-stack': return 'phonelink';
    }

    return 'code';
  }

}
