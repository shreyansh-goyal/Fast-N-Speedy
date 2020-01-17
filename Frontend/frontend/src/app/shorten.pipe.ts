import {PipeTransform, Pipe} from "@angular/core";
@Pipe({
    name:'shorten'
})
export class ShortenPipe implements PipeTransform{
    transform(value:any)
    {   

        if(value.length>15)
        return value.substr(0,15)+"..."
        else
        return value;
    }
}