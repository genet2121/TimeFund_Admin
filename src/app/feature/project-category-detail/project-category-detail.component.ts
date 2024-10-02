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
import projectBusinessSubcategory from '../../core/model/projectSubCategory.model';
import { HelperService } from '../../core/services/helper.service';
import { DynamicDialogFormComponent } from '../../shared/dialog/dynamic-dialog-form/dynamic-dialog-form.component';

@Component({
  selector: 'app-project-category-detail',
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
  templateUrl: './project-category-detail.component.html',
  styleUrl: './project-category-detail.component.css'
})
export class ProjectCategoryDetailComponent {
  val:any[] = [];
  tableColumns = [
    { key: 'business_sub_category_type', label: 'Sub Category Name' },
    { key: 'business_sub_category_type_description', label: 'Description' },
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
      business_category_type:[],
      business_category_type_description:[],
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
    this.crudservice.getById('businesscategory/getbusinesscategory', this.id).subscribe((res)=>{
     this.dataForm.patchValue({
      business_category_type:res.business_category_type,
      business_category_type_description: res.business_category_type_description,
      is_active: res.is_active
     })


    })
    this.crudservice.getById('businesssubcategory/getallbusinesssubcategory', this.id)
    .subscribe((data:any) => {
      this.tableData = this.transformDataForTable(data);
      console.log('thus', this.tableData)
    });
   }
  }

  transformDataForTable(fundraiseCategories: projectBusinessSubcategory[]): any[] {
    return fundraiseCategories.map((fundraiseCategoryTableData) => ({
      id: fundraiseCategoryTableData.business_sub_category_id,
      business_sub_category_type: fundraiseCategoryTableData.business_sub_category_type,
      business_sub_category_type_description :fundraiseCategoryTableData.business_sub_category_type_description.length> 30? fundraiseCategoryTableData.business_sub_category_type_description.slice(0, 30) + '...'
      :fundraiseCategoryTableData.business_sub_category_type_description,
      is_active: fundraiseCategoryTableData.is_active ? 'Active' : 'inActive',
    }));
  }
  handleViewAction(element: any) {
    const dialogRef = this.dialog.open(DynamicDialogFormComponent, {
      width: '700px',
      data: {
        endpoint: 'businesssubcategory/updatebussinesssubcategorystatus',
        id: element.id,
        business_category_id:this.id,
        view: true,
        title: ' Project Sub Category',
        buttonText: 'Suspend Sub-category',
        categoryTypeKey: 'business_sub_category_type',
        categoryDescriptionKey: 'business_sub_category_type_description',
        patchEndpoint:'businesssubcategory/getbusinesssubcategorybyid'

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
        endpoint: 'businesssubcategory/editbusinesssubcategory',
        id: element.id,
        business_category_id:this.id,
        view: false,
        title: ' Project Sub Category',
        buttonText: 'Edit Sub-category',
        categoryTypeKey: 'business_sub_category_type',
        categoryDescriptionKey: 'business_sub_category_type_description',
        patchEndpoint:'businesssubcategory/getbusinesssubcategorybyid'

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
   this.crudservice.deleteItem('businesssubcategory/removebusinesssubcategory', element.id).subscribe(res =>{
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
        endpoint: `businesssubcategory/createbusinesssubcategory/${this.helperService.getLogInUser.admin_id}`,
        id: null,
        business_category_id:this.id,
        view: false,
        title: 'Add Project Sub Category',
        buttonText: 'Add SubCategory',
        categoryTypeKey: 'business_sub_category_type',
        categoryDescriptionKey: 'business_sub_category_type_description',
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
  this.router.navigate(['/project-category'])
}

onToggle(isChecked: boolean) {
  const status = isChecked ? 'active' : 'inactive';

  this.crudservice.update('businesscategory/togglebussinesscategorystatus', this.id, { status }).subscribe(
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


