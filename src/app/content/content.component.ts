import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from './../_models/user';
import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AppComponent} from './../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import {NgXDonutChartSlice} from 'ngx-donutchart/ngx-donutchart.type';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit,  OnDestroy{
  
  currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

  isloginid ="";
  userid="";
  constructor(private router: Router,private app: AppComponent,private authenticationService: AuthenticationService,
    private userService: UserService) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
  }
  
  public map_ChartData = [
      ['Country', 'Users'],
      ['India', 8000],
      ['Singapore', 4000],
      ['Kenya', 3000],
      ['Thailand', 7000],
      ['United States', 5000]
  ];

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['select', 'name', 'email', 'phone'];
  selection = new SelectionModel<Element>(true, []);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}

deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers()
    });
}

private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    });
}

slices: NgXDonutChartSlice[] | any[] = [ // exported type
  {
    value: 50,
    color: '#A3A1FB'
  },
  {
    value: 10,
    color: '#5EE2A0'
  },
  {
    value: 20,
    color: '#FFA177'
  },
  {
    value: 5,
    color: '#FF6565'
  },
  {
    value: 15,
    color: '#FEC163'
  }
];

size = 170;
innerRadius = 65

  chartOptions = {
    scales: {
          xAxes: [{
            gridLines: {
          drawOnChartArea: false
        },
        categoryPercentage: 1.0,
        barPercentage: 1.0
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 15,
              min: 0,
              stepSize: 5
            },
            gridLines: {
              color: '#ccc',
              lineWidth: 2
            }
          }]
        },
        responsive: true,
  }

  labels =  ['', '', '', '', '', '', '', '', '', '', '', ''];

  chartData = [
    {
      label: '',
      data: [3, 5, 4, 3, 2, 5, 8] ,
      stack: '1'
    },
    {
      label: '',
      data: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
      stack: '1'
    }
  ];

  colors = [
    {
      backgroundColor: '#e5f3f9',
    },
    {
            backgroundColor: '#058dc7'
    }
  ]
  
  onChartClick(event) {
    console.log(event);
  }

}