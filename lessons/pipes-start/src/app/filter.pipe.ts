import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // (caution!) whenever the data changes angular will update the pipe
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], filterString: string, propName: string): unknown {
    if (array.length === 0 || filterString.trim() === '') {
      return array;
    }
    
    return array.filter(item => item[propName].toLowerCase().includes(filterString.toLowerCase()));
  }

}
