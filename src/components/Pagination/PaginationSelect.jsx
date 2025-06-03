import "./PaginationSelect.css";
import Pagination from 'react-bootstrap/Pagination';
import Form from "react-bootstrap/Form";
import { useMemo } from "react";
// import { useTranslation } from "react-i18next";

function PaginationSelect({
    currentPage,
    totalItems,
    itemsPerPage, //Кількість відображення елементів на сторінку
    onPageChange, //Функція вибору сторінки
    onItemsPerPageChange, //Функція вибору кількості на сторінку
    perPageOptions, //Масив чисел для селекту
  }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const paginationItems = useMemo(() => {
      const items = [];
  
      if (totalPages <= 7) {
        for (let page = 1; page <= totalPages; page++) {
          items.push(
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Pagination.Item>
          );
        }
      } else {
        items.push(
          <Pagination.Item
            key={1}
            active={1 === currentPage}
            onClick={() => onPageChange(1)}
          >
            1
          </Pagination.Item>
        );
  
        if (currentPage > 4) {
          items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
        }
  
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
  
        for (let page = start; page <= end; page++) {
          items.push(
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Pagination.Item>
          );
        }
  
        if (currentPage < totalPages - 3) {
          items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
        }
  
        items.push(
          <Pagination.Item
            key={totalPages}
            active={totalPages === currentPage}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
  
      return items;
    }, [currentPage, totalPages, onPageChange]);
  
    return (
      <div className="pagination-wrapper">
        <Pagination>
          <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
          {paginationItems}
          <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
  
        <Form.Select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="per-page-select"
        >
          {perPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt} / page
            </option>
          ))}
        </Form.Select>
      </div>
    );
  }
  
  export default PaginationSelect;


//EXAMPLE

// const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const allRows = mockData; // або props, або запит до бекенду
//   const totalItems = allRows.length;

//   const tableHeaders = Object.keys(allRows[0] || {}); // динамічні заголовки

//   const currentRows = useMemo(() => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     return allRows.slice(indexOfFirstItem, indexOfLastItem);
//   }, [allRows, currentPage, itemsPerPage]);


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