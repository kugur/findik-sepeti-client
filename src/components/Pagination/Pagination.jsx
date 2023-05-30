import Pagination from "react-bootstrap/Pagination";

function PaginationButtons({ currentPageNumber, maxPageNumber, onChange }) {
  currentPageNumber += 1; // Starting point 1
  const onClick = (value) => {
    onChange(value - 1);
  };

  let items = [];
  let wide = 3;
  let startPage = currentPageNumber - wide <= 1 ? 1 : currentPageNumber - wide;
  let endPage =
    currentPageNumber + wide > maxPageNumber
      ? maxPageNumber
      : currentPageNumber + wide;

  if (startPage > 1) {
    items.push(
      <Pagination.Item onClick={() => onClick(1)} key={1}>
        {1}
      </Pagination.Item>
    );
    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="minEllipsis" />);
    }
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPageNumber}
        onClick={() => onClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (endPage < maxPageNumber) {
    if (endPage < maxPageNumber - 1) {
      items.push(<Pagination.Ellipsis key="maxEllipsis" />);
    }
    items.push(
      <Pagination.Item
        key={maxPageNumber}
        onClick={() => onClick(maxPageNumber)}
      >
        {maxPageNumber}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="pagination">
      <Pagination.Prev
        disabled={currentPageNumber === 1}
        key="previous"
        onClick={() => onClick(currentPageNumber - 1)}
      />
      {items}
      <Pagination.Next
        disabled={currentPageNumber === maxPageNumber}
        key="next"
        onClick={() => onClick(currentPageNumber + 1)}
      />
    </Pagination>
  );
}

export { PaginationButtons };
