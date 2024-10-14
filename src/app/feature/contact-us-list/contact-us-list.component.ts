import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { Column } from '../../core/model/tablecolumn.model';
import { CrudService } from '../../core/services/crud.service';
import { Fundraising } from '../../core/model/fundraiser.model';
import tablePermission from '../../core/model/tablepermissions.mode';
import { RouterModule } from '@angular/router';
import { RoleService } from '../../core/services/role.service';
import ContactUs from '../../core/model/contactUs.model';
import { DynamicDialogFormComponent } from '../../shared/dialog/dynamic-dialog-form/dynamic-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ContactMessageResponseComponent } from '../../shared/dialog/contact-message-response/contact-message-response.component';
import { HelperService } from '../../core/services/helper.service';

@Component({
  selector: 'app-contact-us-list',
  standalone: true,
  imports: [TableComponent, RouterModule],
  templateUrl: './contact-us-list.component.html',
  styleUrl: './contact-us-list.component.css',
})
export class ContactUsListComponent {
  _tableName = 'Contacts';
  tabledata: any[] = [];
  isSearchVisible = false;
  tableColumns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'created_at', label: 'Date - Time' },
    // { key: 'subject', label: 'Subject' },
    { key: 'message', label: 'Message' },
    { key: 'has_answered', label: 'Status' },
  ];
  allowedActions: tablePermission = {
    add: false,
    edit: false,
    view: true,
    delete: false,
    assign_role: true,
  };

  constructor(
    private crudService: CrudService<any>,
    public router: RouterModule,
    private roleService: RoleService,
    public dialog: MatDialog,
    private helperService:HelperService,
  ) {}

  ngOnInit(): void {
    this.fetchContacts();
    const allowedActions = this.roleService.getPermissionForTable(
      this._tableName
    );
    this.allowedActions.add = allowedActions.can_add;
    this.allowedActions.edit = allowedActions.can_edit;
    this.allowedActions.view = allowedActions.can_view_detail;
    this.allowedActions.delete = false;
  }

  fetchContacts(): void {
    this.crudService.getAll('contact/messages').subscribe(
      (result: ContactUs[]) => {
        this.tabledata = this.transformData(result);
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  transformData(contacts: ContactUs[]): any[] {
    return contacts.map((contact) => ({
      id: contact.contact_id,
      name: contact.name,
      email: contact.email,
      created_at: new Date(contact.created_at).toLocaleDateString(),
      subject: contact.subject,
      message: contact.message.length > 0 ? contact.message.slice(0, 10) + '...' : contact.message,
      has_answered: contact.has_answered ? 'Read' : 'Unread',
    }));
  }
  viewAction(element: any) {
    window.location.href = `contacts/${element.id}`;
  }


  handleSearchClick() {
    this.isSearchVisible = !this.isSearchVisible;
  }
  AssignRoleAction(element: any){
    const dialogRef = this.dialog.open(ContactMessageResponseComponent, {
      width: '700px',
      height:'350px',
      data: {
        endpoint: `contact/respond/${element.id}/${this.helperService.getLogInUser.admin_id}`,
        id: null,
        // patchEndpoint:'contact/messages',
        view: false,
        title: 'Add Response Message',
        buttonText: 'Add Response',
        categoryTypeKey: 'subject',
        categoryDescriptionKey: 'response',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed, perform action with result:', result);
      }
    });
  }
}
