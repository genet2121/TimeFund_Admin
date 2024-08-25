
export var sideBarMenus = [
  {
    nodeId: '01',
    nodeText: 'Dashboard',
    iconCss: 'fa fa-tachometer',
    url: 'dashboard',
    tooltip: 'Dashboard',
  },
  {
    nodeId: '24',
    nodeText: 'Applicants',
    iconCss: 'fa fa-users',
    tooltip: 'Applicants',
    nodeChild: [
      {
        nodeId: '24-01',
        nodeText: 'applicant',
        iconCss: 'fa fa-user-circle',
        url: 'applicants/applicant/list',
        tooltip: 'applicant',
      },
      {
        nodeId: '24-02',
        nodeText: 'Oline Applicant',
        iconCss: 'fa fa-id-badge',
        url: 'applicants/onlineApplicant/list',
        tooltip: 'Online Applicant',
      },
      {
        nodeId: '24-03',
        nodeText: 'Requested',
        iconCss: 'fa fa-user-plus',
        url: 'applicants/requested/list',
        tooltip: 'Requested ',
      },
      {
        nodeId: '24-04',
        nodeText: 'Reserved',
        iconCss: 'fa fa-user-circle-o',
        url: 'applicants/reserved/list',
        tooltip: 'Reserved ',
      },
      {
        nodeId: '24-05',
        nodeText: 'Blocked',
        iconCss: 'fa fa-user-times',
        url: 'applicants/blockedApplicant/list',
        tooltip: 'Blocked ',
      },
      {
        nodeId: '24-06',
        nodeText: 'Deposit',
        iconCss: 'fa fa-sort-amount-asc',
        url: 'applicants/deposit/list',
        tooltip: 'deposit ',
      },
      {
        nodeId: '24-07',
        nodeText: 'followUp',
        iconCss: 'fa fa-arrow-circle-o-right',
        url: 'applicants/followUp/list',
        tooltip: 'followUp ',
      },
      {
        nodeId: '24-08',
        nodeText: 'search',
        iconCss: 'fa fa-search',
        url: 'applicants/search',
        tooltip: 'search ',
      },
    ],
  },
  {
    nodeId: '25',
    nodeText: 'Settings',
    iconCss: 'fa fa-cog',
    tooltip: 'Settings',
    nodeChild: [
      {
        nodeId: '25-01',
        nodeText: 'lookup',
        iconCss: 'fa fa-search-plus',
        url: 'settings/lookup/list',
        tooltip: 'lookup',
      },
      {
        nodeId: '25-02',
        nodeText: 'attachment',
        iconCss: 'fa fa-paperclip',
        url: 'settings/attachment/list',
        tooltip: 'attachment',
      },
      {
        nodeId: '25-03',
        nodeText: 'partner',
        iconCss: 'fa fa-users',
        url: 'settings/partner/list',
        tooltip: 'partner',
      },
      {
        nodeId: '25-04',
        nodeText: 'User',
        iconCss: 'fa fa-user-o',
        url: 'settings/users/list',
        tooltip: 'user',
      },
      {
        nodeId: '25-05',
        nodeText: 'Configration',
        iconCss: 'fa fa-assistive-listening-systems',
        url: 'settings/companyInformation',
        tooltip: 'companyInformation',
      },
    ]
  },
  {
    nodeId: '09',
    nodeText: 'User and Group',
    iconCss: 'fa fa-users',
    tooltip: 'CertifUser and Groupicate',
    nodeChild: [
      {
        nodeId: '09-01',
        nodeText: 'Group',
        iconCss: 'fa fa-minus',
        url: 'group/list',
        tooltip: 'Group',
      },
      {
        nodeId: '09-02',
        nodeText: 'User',
        iconCss: 'fa fa-minus',
        url: 'user/list',
        tooltip: 'User',
      },
    ],
  },
  {
    nodeId: '26',
    nodeText: 'Manage orders',
    iconCss: 'fa fa-podcast',
    tooltip: 'Orders',
    nodeChild: [
      {
        nodeId: '26-01',
        nodeText: 'Order lists',
        iconCss: 'fa fa-search-plus',
        url: 'manageorder/order/list',
        tooltip: 'order',
      },
      {
        nodeId: '26-02',
        nodeText: 'Order status',
        iconCss: 'fa fa-paperclip',
        url: 'manageorder/orderstatus/list',
        tooltip: 'order status',
      },
      {
        nodeId: '26-04',
        nodeText: 'Order Statuss',
        iconCss: 'fa fa-paperclip',
        url: 'manageorder/orderstatus',
        tooltip: 'order status',
      },
      {
        nodeId: '26-03',
        nodeText: 'Travelled',
        iconCss: 'fa fa-fighter-jet',
        url: 'manageorder/travelled/list',
        tooltip: 'Travelled',
      },
    ]
  },
  {
    nodeId: '27',
    nodeText: 'Process',
    iconCss: 'fa fa-ravelry',
    tooltip: 'Process',
    nodeChild: [
      {
        nodeId: '27-01',
        nodeText: 'Process list',
        iconCss: 'fa fa-minus',
        url: 'process/processlist/list',
        tooltip: 'process list',
      },
      {
        nodeId: '27-02',
        nodeText: 'Order assignment',
        iconCss: 'fa fa-minus',
        url: 'process/orderassignment',
        tooltip: 'Order assignment',
      },
      {
        nodeId: '27-03',
        nodeText: 'Ticket',
        iconCss: 'fa fa-minus',
        url: 'process/ticket',
        tooltip: 'Ticket',
      }, 
      {
        nodeId: '27-04',
        nodeText: 'Enjaz',
        iconCss: 'fa fa-minus',
        url: 'process/enjaz/list',
        tooltip: 'enjaz',
      }, 
    ]
  },
  {
    nodeId: '29',
    nodeText: 'Web',
    iconCss: 'fa fa-crosshairs',
    tooltip: 'Web content',
    nodeChild: [
      {
        nodeId: '29-01',
        nodeText: 'Web content',
        iconCss: 'fa fa-th',
        url: 'web/webcontent/list',
        tooltip: 'web contents',
      },
      {
        nodeId: '29-02',
        nodeText: 'Post Image',
        iconCss: 'fa fa-picture-o',
        url: 'web/post-image/create',
        tooltip: 'web contents',
      },
    ]
  },
  {  
    nodeId: '28',
    nodeText: 'Deleted Info',
    iconCss: 'fa fa-trash',
    tooltip: 'deleted info',
    nodeChild: [
      {
        nodeId: '28-01',
        nodeText: 'Deleted Order',
        iconCss: 'fa fa-minus-circle',
        url: 'deletedinfo/deletedOrder/list',
        tooltip: 'deleted Order',
      },
      {
        nodeId: '28-02',
        nodeText: 'Deleted Applicant',
        iconCss: 'fa fa-minus-circle',
        url: 'deletedinfo/deletedApplicant/list',
        tooltip: 'deleted Applicant',
      },
      {
        nodeId: '28-03',
        nodeText: 'StepBack Approval',
        iconCss: 'fa fa-thumbs-o-up',
        url: 'deletedinfo/stepbackApproval/list',
        tooltip: 'StepBack Approval',
      },
    ]
  },
  {  
    nodeId: '30',
    nodeText: 'Report',
    iconCss: 'fa fa-book',
    tooltip: 'report',
    nodeChild: [
      { nodeId: '30-01',
      nodeText: ' Applicant',
      iconCss: 'fa fa-minus',
      url: 'report/applicantReprot',
      tooltip: 'Applicant Reprot ',
    },
  ],
},

 ];

