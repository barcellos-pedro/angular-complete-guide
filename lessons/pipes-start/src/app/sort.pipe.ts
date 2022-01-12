import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform(array: any[], propName: string): any[] {
        return array.sort((a, b) => a[propName].localeCompare(b[propName]));
    }
}