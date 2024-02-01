import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.DASHBOARD',
    type: 'item',
    icon: 'pie-chart',
    url: 'dashboard'
  },
  {
    id: 'calendar',
    title: 'calendar ',
    translate: 'calendar',
    type: 'item',
    icon: 'list',
    url: 'calendar'
  },

  {
    id: 'Companies',
    type: 'section',
    title: 'Companies',
    icon: 'file',
    children: [
     
      {
        id: 'customer',
        title: 'Customer',
        translate: 'Customers',
        type: 'item',
        icon: 'list',
        url: 'customer'
      }, 
      {
        id: 'companylist',
        title: 'Company List',
        translate: 'Vendors',
        type: 'item',
        icon: 'list',
        url: 'companylist'
      }

    ]
  },
  {
    id: 'Sales',
    type: 'section',
    title: 'Sales',
    icon: 'file',
    children: [
      {
        id: 'appointments',
        title: 'Appointments',
        translate: 'Appointments',
        type: 'item',
        icon: 'list',
        url: 'appointments'
      },
      {
        id: 'my-sales-quote',
        title: 'Leads',
        translate: 'Leads',
        type: 'item',
        icon: 'list',
        url: 'my-sales-quote'
      },
      {
        id: 'sales-quotes',
        title: 'sales-quotes',
        translate: 'Sales Quotes',
        type: 'item',
        icon: 'list',
        url: 'sales-quotes'
      }

    ]
  },


  // {
  //   id: 'my-sales-quote',
  //   title: 'My-sales-quote',
  //   translate: 'my-sales-quotet',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'my-sales-quote'
  // },

  // {
  //   id: 'demo-comp-list',
  //   title: 'Demo Company List',
  //   translate: 'demo-comp-list',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'demo-comp-list'
  // },

  // {
  //   id: 'account',
  //   title: 'Account',
  //   translate: 'account',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'account'
  // },
 

 



  {
    id: 'ocean',
    type: 'section',
    title: 'OCEAN',
    // translate: 'MENU.CM.SECTION',
    icon: 'file',
    children: [
      {
        id: 'Oceanexport',
        title: 'Ocean Export',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'list',
        url: 'ocean-export'
      },
      {
        id: 'oceanimport',
        title: 'Ocean Import',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'list',
        url: 'ocean-import'
      },

    ]
  },
  {
    id: 'master',
    type: 'section',
    title: 'Master',
    // translate: 'MENU.CM.SECTION',
    icon: 'file',
    children: [
      {
        id: 'masters',
        title: 'Masters',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'list',
        url: 'master'
      },
     

    ]
  },
  {
    id: 'pricing',
    title: 'Pricing',

    type: 'section',
    icon: 'list',
    url: 'pricing',
    children: [
      {
        id: 'pricing',
        title: 'pricing',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'list',
        url: 'pricing'
      },
    ]
  },
  {
    id: 'air',
    type: 'section',
    title: 'AIR',
    // translate: 'MENU.CM.SECTION',
    icon: 'file',
    children: [
      {
        id: 'air-export',
        title: 'Air Export',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'list',
        url: 'air-export'
      },
      {
        id: 'air-import',
        title: 'Air Import',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'list',
        url: 'air-import'
      },


    ]
  },
  {
    id: 'accounts',
    type: 'section',
    title: 'ACCOUNTS',
    // translate: 'MENU.CM.SECTION',
    icon: 'file',
    children: [
      {
        id: 'invoices',
        title: 'Invoices',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'list',
        url: 'invoices'
      },
      {
        id: 'bills',
        title: 'Bills',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'list',
        url: 'home'
      },
      {
        id: 'exchange-rates',
        title: 'Exchange Rates',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'list',
        url: 'exchange-rates'
      },

  ]
   },



  // {
  //   id: 'home',
  //   title: 'Tasks',
  //   translate: 'MENU.TASKS',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'a'
  // },
  // {
  //   id: 'arkas',
  //   title: 'ARKAS MODULE',
  //   translate: 'ARKAS',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'arkas'
  // },
  // {
  //   id: 'select',
  //   title: 'Select',
  //   translate: 'Select',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'select'
  // },
  // {
  //   id: 'ocean',
  //   type: 'section',
  //   title: 'OCEAN',
  //   // translate: 'MENU.CM.SECTION',
  //   icon: 'file',
  //   children: [
  //     {
  //       id: 'oceanexport',
  //       title: 'Ocean Export',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-up',
  //       url: 'oe-cargolist'
  //     },
  //     {
  //       id: 'oceanimport',
  //       title: 'Ocean Import',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'oi-cargolist'
  //     },

  //   ]
  // },
  // {
  //   id: 'air',
  //   type: 'section',
  //   title: 'AIR',
  //   // translate: 'MENU.CM.SECTION',
  //   icon: 'file',
  //   children: [
  //     {
  //       id: 'airexport',
  //       title: 'Air Export',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-up',
  //       url: 'ae-cargolist'
  //     },
  //     {
  //       id: 'airimport',
  //       title: 'Air Import',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'ai-cargolist'
  //     },

  //   ]
  // },
  // {
  //   id: 'accounts',
  //   type: 'collapsible',
  //   title: 'ACCOUNTS',
  //   // translate: 'MENU.CM.SECTION',
  //   icon: 'file',
  //   children: [
  //     {
  //       id: 'invoices',
  //       title: 'Invoices',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-up',
  //       url: 'sample'
  //     },
  //     {
  //       id: 'bills',
  //       title: 'Bills',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'home'
  //     },

  //   ]
  // },
  // {
  //   id: 'reports',
  //   type: 'collapsible',
  //   title: 'REPORTS',
  //   // translate: 'MENU.CM.SECTION',
  //   icon: 'file',
  //   children: [
  //     {
  //       id: 'pnl',
  //       title: 'Profit and Loss',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-up',
  //       url: 'a'
  //     },
  //     {
  //       id: 'aging',
  //       title: 'Aging Sumamary',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'bb'
  //     },
  //     {
  //       id: 'outstanding',
  //       title: 'Outstanding Balance',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'bb'
  //     },


  //   ]
  // },


]
