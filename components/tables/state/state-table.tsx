import React, { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { columns } from "./components/columns";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { fetchTableData } from "@/service/datatable.service";
import { ColumnFiltersState, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Toolbar } from "./components/toolbar";
import { DataTable } from "@/components/data-table";

interface ITableProps {
  trans: any;
}

const StateTable: React.FC<ITableProps> = ({ trans }) => {
  const { isLoading, refresh, data, isFilterEnable, filters, pagination } = useAppSelector(
    (state: RootState) => state.datatable
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    manualFiltering: true,
    manualSorting: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    handleFetchState();
  }, [
    filters.searchText,
    filters.is_active,
    filters.sortColumn,
    filters.sortBy,
    pagination.currentPage,
    pagination.perPage,
  ]);

  // Function to fetch state data
  const handleFetchState = async () => {
    try {
      const datatablePayload = {
        url: "/city",
        page_size: pagination.perPage,
        page: pagination.currentPage,
        searchText: filters.searchText,
        is_active: filters.is_active,
        sortBy: filters.sortBy,
        sortColumn: filters.sortColumn,
      };
      const response = await fetchTableData(datatablePayload);
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Fragment>
      <div className="space-y-4">
        <Toolbar trans={trans} table={table} isFilterEnable={isFilterEnable}/>
        <DataTable  trans={trans} isLoading={isLoading} tableObj={table} />
      </div>
    </Fragment>
  );
};

export default StateTable;
