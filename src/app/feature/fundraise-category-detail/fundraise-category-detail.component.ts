import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FundraiseSubCategories } from '../../core/model/fundraiseSubCategory.Model';
import fundraiseCategory from '../../core/model/fundraiseCategory.model';
import { HelperService } from '../../core/services/helper.service';
import { DynamicDialogFormComponent } from '../../shared/dialog/dynamic-dialog-form/dynamic-dialog-form.component';
@Component({
  selector: 'app-fundraise-category-detail',
  standalone: true,
  imports: [
    CommonModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatButtonModule, MatDialogModule,
     MatIconModule,
     MatSlideToggleModule,
     TableComponent,
     DynamicDialogFormComponent
  ],
  templateUrl: './fundraise-category-detail.component.html',
  styleUrl: './fundraise-category-detail.component.css'
})
export class FundraiseCategoryDetailComponent {
  val:any[] = [];
  tableColumns = [
    { key: 'sub_category_type', label: 'Sub Category Name' },
    { key: 'sub_category_type_description', label: 'Description' },
    { key: 'is_active', label: 'Status' },
  ];
  id!:number;
  displayedColumns = this.tableColumns.map(c => c.key).concat('action');


  allowedActions: tablePermission = {
    add:true,
    edit: true,
    view: true,
    delete: true,
    assign_role: false
  };
  tableData: any[] = [];
  category!: fundraiseCategory;
  dataForm!:FormGroup;
  isSearchVisible = false;


  constructor(private router: Router, private crudservice: CrudService<any>,
    private snackBar: MatSnackBar,  public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private helperService:HelperService
   ) {
    this.dataForm = this.fb.group({
      category_type:[],
      category_type_description:[],
      is_active:[]


    })
   }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    this.fetchData(this.id);
  })
}

  fetchData(id:number) {
   if(id){
    this.crudservice.getById('categories/getcategorybyid', this.id).subscribe((res)=>{
     this.dataForm.patchValue({
      category_type:res.category_type,
      category_type_description: res.category_type_description,
      is_active: res.is_active
     })


    })
    // get sub category by category id
    this.crudservice.getById('subcategories/getallsubcategory', this.id)
    .subscribe((data:any) => {
      this.tableData = this.transformDataForTable(data);
      console.log('thus', this.tableData)
    });
   }
  }
  transformDataForTable(fundraiseCategories: FundraiseSubCategories[]): any[] {
    return fundraiseCategories.map((fundraiseCategoryTableData) => ({
      id: fundraiseCategoryTableData.sub_category_id,
      sub_category_type: fundraiseCategoryTableData.sub_category_type,
      sub_category_type_description :fundraiseCategoryTableData.sub_category_type_description.length> 30? fundraiseCategoryTableData.sub_category_type_description.slice(0, 30) + '...'
      :fundraiseCategoryTableData.sub_category_type_description,
      is_active: fundraiseCategoryTableData.is_active ? 'Active' : 'inActive',
    }));
  }
  handleViewAction(element: any) {
    const dialogRef = this.dialog.open(DynamicDialogFormComponent, {
      width: '700px',
      data: {
        endpoint: 'subcategories/updatesubcategorystatus',
        id: element.id,
        category_id:this.id,
        view: true,
        title: 'Fundraise Sub Category',
        buttonText: 'Suspend Sub-category',
        categoryTypeKey: 'sub_category_type',
        categoryDescriptionKey: 'sub_category_type_description',
        patchEndpoint:'subcategories/getsubcategorybyid'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed, perform action with result:', result);
      }
    });
  }

  handleEditAction(element: any) {
    const dialogRef = this.dialog.open(DynamicDialogFormComponent, {
      width: '700px',
      data: {
        endpoint: 'subcategories/updatesubcategory',
        id: element.id,
        category_id:this.id,
        view: false,
        title: 'Edit Fundraise Sub Category',
        buttonText: 'Edit SubCategory',
        categoryTypeKey: 'sub_category_type',
        categoryDescriptionKey: 'sub_category_type_description',
        patchEndpoint:'subcategories/getsubcategorybyid'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed, perform action with result:', result);
      }
    });
  }



  handleDeleteAction(element: any) {

   if(this.crudservice&&element.id){
    this.crudservice.deleteItem('subcategories/removesubcategory', element.id).subscribe(res =>{
      this.snackBar.open(`${res.message}!`, 'Close', {
        duration: 3000,
         verticalPosition: 'top'
      });
     window.location.reload();

    })
   }else{
    console.log('error')
   }
}

  changePage(event: any) {
    console.log('Page changed:', event);
  }

  currentPage = 2;

  handleAddClick() {
    const dialogRef = this.dialog.open(DynamicDialogFormComponent, {
      width: '700px',
      data: {
        endpoint: `subcategories/createsubcategory/${this.helperService.getLogInUser.admin_id}`,
        id: null,
        category_id:this.id,
        view: false,
        title: 'Add Fundraise Sub Category',
        buttonText: 'Add SubCategory',
        categoryTypeKey: 'sub_category_type',
        categoryDescriptionKey: 'sub_category_type_description',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed, perform action with result:', result);
      }
    });

  }

  handleSearchClick() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  handleSettingsClick() {
    console.log('Settings button clicked');
  }
onBack(){
  this.router.navigate(['/fundraiser-category'])
}
onToggle(isChecked: boolean) {
  const status = isChecked ? 'active' : 'inactive';

  this.crudservice.update('categories/togglecategorystatus', this.id, { status }).subscribe(
    (res) => {
      this.snackBar.open(`${res.message}!`, 'Close', {
        duration: 3000,
         verticalPosition: 'top'
      });

    },
    (error) => {
      console.error('Error updating status:', error);

    }
  );
}
}
