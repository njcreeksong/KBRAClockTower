import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { TimeInterval } from './time-interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Clock Tower Bell Counter';
  startTime: Time = { hours: 0, minutes: 0 };
  endTime: Time = { hours: 0, minutes: 0 };
  model = new TimeInterval("", "", 0);

  ngOnInit() {
    let canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    let context = canvas.getContext('2d');
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radiusOuter = 180;

    context.beginPath();
    context.arc(centerX, centerY, radiusOuter, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();

    let radiusInner = 120;
    let circumference = (2 * Math.PI * radiusInner);
    let oneTwelfth = (circumference / 12);

    context.beginPath();
    context.arc(centerX, centerY, radiusInner, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();

    let radiusForPositioningNumerals = radiusOuter - 50;
    let x = centerX;
    let y = centerY - radiusForPositioningNumerals;

    context.font = "30px Verdana";

    //u = scosθ + tsinθ and v=−ssinθ + tcosθ.

    let negativeX = (x * -1);
    let u = x * Math.cos(30) + y * Math.sin(30);
    let v = negativeX * Math.sin(30) + y * Math.cos(30);

    //context.fillText("I", (u-x), v);

    context.fillText("I", centerX + radiusForPositioningNumerals - 50, centerY - ((oneTwelfth * 2)));
    context.fillText("II", centerX + radiusForPositioningNumerals - 10, centerY - (oneTwelfth));
    context.fillText("III", centerX + radiusForPositioningNumerals + 10, centerY);
    context.fillText("IV", centerX + radiusForPositioningNumerals, centerY + (oneTwelfth));
    context.fillText("V", centerX + radiusForPositioningNumerals - 30, centerY + (oneTwelfth * 2));
    context.fillText("VI", centerX - 10, centerY + radiusForPositioningNumerals + 30);
    context.fillText("VII", centerX - radiusForPositioningNumerals, centerY + (oneTwelfth * 2));
    context.fillText("VIII", centerX - radiusForPositioningNumerals - 40, centerY + (oneTwelfth));
    context.fillText("IX", centerX - radiusForPositioningNumerals - 40, centerY);
    context.fillText("X", centerX - radiusForPositioningNumerals - 10, centerY - (oneTwelfth));
    context.fillText("XI", centerX - radiusForPositioningNumerals + 40, centerY - ((oneTwelfth * 2)));
    context.fillText("XII", x - 20, y-10);

  }

  onSubmit() {
    let startHour = this.model.start_time.split(":", 2);
    let endHour = this.model.end_time.split(":", 2);
    this.model.totalChimes = this.calculateChimes(true,startHour) + this.calculateChimes(false,endHour);

  }

  calculateChimes(isStartTime: boolean, theTime: string[]): number {
    let hour = Number(theTime[0]);
    let minute = Number(theTime[1]);

    if (isStartTime && minute > 0) {
      return 0;
    }

    if (hour === 0 || hour === 12) {
      return 12;
    }
    else {
      return (hour % 12);
    }
  }

}
