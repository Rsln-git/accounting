import "./Table.css";
import { useTranslation } from "react-i18next";
import Table from 'react-bootstrap/Table';
// import { useState } from "react";

function CustomTable({ head, body, onRowClick }) {
  const { t } = useTranslation("table");

  return (
    <Table striped bordered hover size="sm" className="CustomTable">
      <thead>
        <tr>
        <th>№</th>
        {head.map(({ label }, index) => (
          <th key={index}>{label}</th>
        ))}
        </tr>
      </thead>
      <tbody>
      {body.map((row, rowIndex) => (
          <tr key={rowIndex} onClick={() => onRowClick && onRowClick(row)}>
            <td>{rowIndex + 1}</td>
            {head.map(({ key }, colIndex) => (
             <td key={colIndex}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CustomTable;

//EXAMPLE


{/* <Table
        head={tableHeaders}
        body={currentRows}
        onRowClick={handleRowClick}
      />

      <PaginationSelect
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        perPageOptions={[5, 10, 20, 50]}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1); // скидаємо сторінку при зміні кількості
        }}
      /> */}