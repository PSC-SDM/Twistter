import React from "react";
import {ArrowUpDown} from '@tamagui/lucide-icons'
import dynamic from 'next/dynamic';

const DataTableComp = dynamic<any>(() =>
    import('react-data-table-component').then(module => module.default),
    { ssr: false }
);

const DataTableExtensions = dynamic<any>(() =>
    import('react-data-table-component-extensions').then(module => module.default),
    { ssr: false }
);

export function DataTable2({ columns, rows, onRowPress}) {
  const tableData = {
    columns,
    data: rows
  };

  return <DataTableExtensions print={false} export={false} filter={false} {...tableData}>
  <DataTableComp
    responsive
    striped
    pointerOnHover	
    columns={columns}
    data={rows}
    defaultSortField="created"
    defaultSortAsc={false}
    onRowClicked={onRowPress}
    // sortIcon={<ArrowUpDown />}
    // pagination
  />
</DataTableExtensions>
}