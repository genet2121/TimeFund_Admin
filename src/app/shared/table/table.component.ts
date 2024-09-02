import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Column } from '../../core/model/tablecolumn.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    RouterModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnChanges {
  constructor(router: RouterModule) {}
  @Input() tableTitle: string = '';
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() DeleteAction: (element: any) => void = () => {};
  @Input() EditAction: (element: any) => void = () => {};
  @Input() ViewAction: (element: any) => void = () => {};
  @Input() PageChangeAction: (element: any) => void = () => {};
  @Input() allowedActions?: tablePermission = undefined;
  @Output() addClick = new EventEmitter<void>();
  @Output() searchClick = new EventEmitter<void>();
  @Output() settingsClick = new EventEmitter<void>();

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new MatTableDataSource(this.data);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }

    if (changes['columns']) {
      this.displayedColumns = this.columns.map((col) => col.key);
      if (!this.displayedColumns.includes('action')) {
        this.displayedColumns.push('action');
      }
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
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

  onPageChangeAction(event: PageEvent) {
    this.PageChangeAction(event);
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
