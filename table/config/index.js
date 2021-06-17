import { projectPersonnelManagement } from '@/api/ajax';
import fields,{ executor as executorFields } from './fields';
import search,{ executor as executorSearch } from './search';
import TableRenderClass from '@/components/tableRender/tableRenderClass';

let tableCreator = new TableRenderClass({
  fields: {
    ...fields,
    ...executorFields
  },
  search: [
    ...search,
    ...executorSearch
  ]
});

let table1 = tableCreator.createPart({
  name: '表格1',
  list: projectPersonnelManagement.projectStaffList,
  requestNow: true,
  search: [

  ],
  fields: [
    
  ],
  moreBtnArr: [
    {
      name: '更多操作',
      render: h => {
        return (
          
        )
      }
    }
  ]
});

export default [{ name: '表格1',childMenu: [table1] }];
