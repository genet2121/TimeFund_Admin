import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Column } from '../../core/model/tablecolumn.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import tablePermission from '../../core/model/tablepermissions.mode';
import { CrudService } from '../../core/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import {MatSort, Sort, } from '@angular/material/sort';
import { HelperService } from '../../core/services/helper.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() tableTitle: string = '';
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() DeleteAction: (element: any) => void = () => {};
  @Input() EditAction: (element: any) => void = () => {};
  @Input() ViewAction: (element: any) => void = () => {};
  @Input() AssignRoleAction: (element: any) => void = () => {};
  @Input() PageChangeAction: (element: any) => void = () => {};
  @Input() allowedActions?: tablePermission  = undefined;
  @Output() addClick = new EventEmitter<void>();
  @Output() searchClick = new EventEmitter<void>();
  @Output() settingsClick = new EventEmitter<void>();
  @Input() isSearchVisible: boolean = false;
  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource!: MatTableDataSource<any>;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumns: string[] = [];
  constructor(private router: Router,  private crudservice: CrudService<any>,
    public dialog: MatDialog,
    private helperService:HelperService,
    private snackBar: MatSnackBar,
  ){

  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.columns.map((col) => col.key);
    if (!this.displayedColumns.includes('action')) {
      this.displayedColumns.push('action');
    }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

    announceSortChange(sortState: Sort) {

      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isSearchVisible']) {
    }

    if (changes['columns']) {
      this.updateDisplayedColumns();
    }

    if (changes['data']) {
      this.dataSource.data = this.data;
    }
  }


  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.paginator.pageIndex = this.page;
  //   this.paginator.pageSize = this.pageSize;
  // }
  // onPageChange(event: PageEvent) {
  //   this.page = event.pageIndex;
  // }
  onDeleteAction = (element: any) => {
    this.DeleteAction(element);
    console.log('++++++++++', this.crudservice)
    // console.log('DeleteAction:', this.DeleteAction);

  }

  onEditAction(element: any) {
    this.EditAction(element);
  }

  onViewAction(element: any) {
    this.ViewAction(element);
  }
  onAssignRoleAction(element: any){
    this.AssignRoleAction(element);

  }
  onPageChangeAction(element:any){
    this.onPageChangeAction(element)
  }



  onAddClick() {
    this.addClick.emit();
  }

  onSearchClick() {
    this.searchClick.emit();
  }

  onSettingsClick() {
    this.settingsClick.emit();
  }

  private updateDisplayedColumns() {
    this.displayedColumns = this.columns.map((col) => col.key);
    if (!this.displayedColumns.includes('action')) {
      this.displayedColumns.push('action');
    }
  }

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
}
