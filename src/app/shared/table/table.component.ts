import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Column } from '../../core/model/tablecolumn.model';
import { CommonModule } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import tablePermission from '../../core/model/tablepermissions.mode';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
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
  @Input() PageChangeAction: (element: any) => void = () => {};
  @Input() page: number = 0;
  @Input() allowedActions?: tablePermission = undefined;
  @Input() pageSize: number = 0;
  @Output() addClick = new EventEmitter<void>();
  @Output() searchClick = new EventEmitter<void>();
  @Output() settingsClick = new EventEmitter<void>();

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.columns.map((col) => col.key);
    if (!this.displayedColumns.includes('action')) {
      this.displayedColumns.push('action');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageIndex = this.page;
    this.paginator.pageSize = this.pageSize;
  }
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
  }
  onDeleteAction(element: any) {
    this.DeleteAction(element);
  }
  onEditAction(element: any) {
    this.EditAction(element);
  }
  onViewAction(element: any) {
    this.ViewAction(element);
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
}
