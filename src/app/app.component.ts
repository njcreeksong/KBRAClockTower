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
    context.fillText("XII", x - 20, y - 10);

  }

  onSubmit() {
    let startTime = this.model.start_time.split(":", 2);
    let endTime = this.model.end_time.split(":", 2);
    this.model.totalChimes = this.calculateTotalChimes(startTime, endTime);
  }

  calculateTotalChimes(startTime: string[], endTime: string[]): number {
    let startHour = Number(startTime[0]);
    let startMinute = Number(startTime[1]);

    if (startMinute > 0) {
      startHour++;
    }

    let endHour = Number(endTime[0]);
    let endMinute = Number(endTime[1]);

    console.log(startHour);
    console.log(startMinute);

    console.log(endHour);
    console.log(endMinute);

    let totalChimes = 0;

    let f = (x, y) => ~-x % 12 - ~(x - y && f(x % 24 + 1, y));

    if (startHour == endHour) {
      totalChimes = (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12) * 2;
    }
    else {
      totalChimes = f(startHour, endHour);
    }

    return totalChimes;
  }
}
