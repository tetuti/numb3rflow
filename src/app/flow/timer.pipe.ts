import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'timer'})
export class TimerPipe implements PipeTransform {
    transform(value: number): string {
        let displayAs = (value/100).toFixed(2)
        return `${displayAs}`
    }
}