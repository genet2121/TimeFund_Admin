import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  key: string = 'userRole';
  constructor() {}
  saveRoleList(roleList: any) {
    localStorage.setItem(this.key, roleList);
  }
  getUserRoles() {
    let listOfRoles = localStorage.getItem(this.key);
    if (typeof listOfRoles === 'string') {
      return JSON.parse(listOfRoles);
    } else {
      return null;
    }
  }
  getPermissionForTable(tableName: string) {
    const listOfRoles = this.getUserRoles() as any[];

    if (listOfRoles) {
      const matchingRole = listOfRoles.find(
        (role) => role.page_name === tableName
      );

      if (matchingRole) {
        return matchingRole;
      } else {
        return 'No matching role found';
      }
    } else {
      return 'List of roles is null';
    }
  }

  removeRoleList() {
    localStorage.removeItem(this.key);
  }
}
