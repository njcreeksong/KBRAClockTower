import { Time } from "@angular/common";

export class TimeInterval {

  constructor(
    public start_time: string,
    public end_time: string,
    public totalChimes?: number
  ) { }

}
