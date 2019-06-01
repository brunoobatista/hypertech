import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'routerArray'
})
export class RouterArrayPipe implements PipeTransform {

  transform(routerPath: any, params?: string | number[]): string | number[] {
    let arrayPath = routerPath.split('/');
    let finalPath = '';

    let paramIndex = 0;

    for (let i = 0; i < arrayPath.length; i++) {
      if (arrayPath[i].length > 0) {
        let path = '/';
        if (arrayPath[i].indexOf(':') === 0) {
          path += params[paramIndex++];
        } else {
          path += arrayPath[i];
        }
        finalPath += path;
      }
    }

    return finalPath;
  }

}
