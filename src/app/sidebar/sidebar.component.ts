import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit{
    public isScreenSmall: boolean = false;

    constructor (private breakPointObserver: BreakpointObserver){
    }

    ngOnInit(): void{
      this.breakPointObserver
        .observe([Breakpoints.XSmall])
        .subscribe((state: BreakpointState)=> {
          this.isScreenSmall = state.matches;
        });
    }

}
