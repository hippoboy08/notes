import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, input: string, fieldName?: string): any {
    if (value.length === 0) {
      return []
    }
    if (!input) {
      return value
    }
    const words = input.trim().split(' ')

    /* Remove highlighted tags before any processing*/
    value = value.map(item => {
      if (item[fieldName || 'content'].match(/<[^>]+>/gm))
        item[fieldName || 'content'] = item[fieldName || 'content'].replace(/<[^>]+>/gm, '')
      return item;
    })
    let result = value
    words.map(word => {
      const re = new RegExp(word, 'g');
      result = value.map((item) => {
        const matchWord = item[fieldName || 'content'].match(re)
        // console.log(matchWord)
        //this will match the values and add the highlight tag for it
        item[fieldName || 'content'] = item[fieldName || 'content'].replace(re, "<span class='highlight'>" + word + "</span>")
        return item
      });
    })
    return result;
  }

}
