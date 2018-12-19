import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
export interface PeriodicElement {
  totalListing: number;
  countries: string;
  expressTenancy: number;
  basicListing: number;
  eliteListing: number;
  premiumListing: number;
  premiumPlus: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {countries: 'India', totalListing: 5000, expressTenancy: 1500, basicListing: 2000, eliteListing: 2100, premiumListing: 3000, premiumPlus: 2300},
];
@Component({
  selector: 'app-listing-type',
  templateUrl: './listing-type.component.html',
  styleUrls: ['./listing-type.component.scss']
})
export class ListingTypeComponent{

  displayedColumns: string[] = ['select', 'countries', 'totalListing', 'expressTenancy', 'basicListing','eliteListing','premiumListing','premiumPlus'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}