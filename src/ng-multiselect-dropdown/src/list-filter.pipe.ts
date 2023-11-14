import { Pipe, PipeTransform } from '@angular/core';

import { ListItem } from './multiselect.model';

@Pipe({
    name: 'multiSelectFilter',
    pure: false
})
export class ListFilterPipe implements PipeTransform {
    transform(items: ListItem[], filter: ListItem): ListItem[] {
        if (!items || !filter) {
            return items;
        }
        return items.filter((item: ListItem) => this.applyFilter(item, filter));
    }

    applyFilter(item: ListItem, filter: ListItem): boolean {
        if (typeof item.text === 'string' && typeof filter.text === 'string') {
            return !(filter.text && item.text && item.text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').indexOf(filter.text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')) === -1);
        } else {
            return !(filter.text && item.text && item.text.toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').indexOf(filter.text.toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')) === -1);
        }
    }
}
