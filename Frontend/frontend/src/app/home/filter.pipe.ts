import {PipeTransform, Pipe} from "@angular/core";
@Pipe({
    name:"filter"
})
export class filterPipe implements PipeTransform{
    transform(value:any,search)
    {   

        let returnArr=[];
        if(search==undefined)
        return returnArr;
        for(let i of value)
        {
            if(i.Details.name.includes(search))
            {
                returnArr.push(i);
                continue;
            }
            for(let j of i.Details.foodTypeServed)
            {
                if(j.includes(search))
                {
                    returnArr.push(i);
                    break;
                }
            }
        }
        return returnArr;
    }
}