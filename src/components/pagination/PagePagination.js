import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

const PagePagination = (props) => {
  const FIRST_PAGE = 1;

  const {
    content,
    cardComponent,
    itemsPerPage,
    lastPage
  } = props;

  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [pageViews, setPageViews] = useState([FIRST_PAGE, FIRST_PAGE + 1, FIRST_PAGE + 2]);

  const modifyPageViews = (pageNum) => {
    setCurrentPage(pageNum);
    moveBounds(pageNum);
  }

  const moveBounds = (pageNum) => {
    if (pageNum < FIRST_PAGE) {
      pageNum = FIRST_PAGE;
    } else if (pageNum > lastPage) {
      pageNum = lastPage;
    }

    if (pageNum == FIRST_PAGE) {
      setPageViews([FIRST_PAGE, FIRST_PAGE + 1, FIRST_PAGE + 2]);
    } else if (pageNum == lastPage) {
      setPageViews([lastPage - 2, lastPage - 1, lastPage]);
    } else {
      setPageViews([pageNum - 1, pageNum, pageNum + 1]);
    }
  };

  const goTo = (pageNum) => {
    modifyPageViews(pageNum);
    setCurrentPage(pageNum);
  };

  const generatePaginations = () => {
    let pageNumbers = pageViews;
    let isOff = false;

    if (currentPage > lastPage) {
      pageNumbers = [FIRST_PAGE, FIRST_PAGE + 1, FIRST_PAGE + 2];
      isOff = true;
    }

    if (lastPage - FIRST_PAGE == 1) {
      pageNumbers = [FIRST_PAGE, lastPage];
      isOff = true;
    }

    if (lastPage - FIRST_PAGE == 0) {
      pageNumbers = [FIRST_PAGE];
      isOff = true;
    }

    if (isOff) {
      return pageNumbers.map((num) => {
        if (num == 1) {
          return (<Pagination.Item active onClick={() => goTo(num)}>{num}</Pagination.Item>);
        } else {
          return (<Pagination.Item onClick={() => goTo(num)}>{num}</Pagination.Item>);
        }
      });
    }

    return pageNumbers.map((num) => {
      if (num == currentPage) {
        return (<Pagination.Item active onClick={() => goTo(num)}>{num}</Pagination.Item>);
      } else {
        return (<Pagination.Item onClick={() => goTo(num)}>{num}</Pagination.Item>);
      }
    });
  };

  const generateContent = () => {
    if (lastPage == 0) {
      return <p> No Results Found </p>
    } else {
      return (
        <>
          <Pagination.Item onClick={() => goTo(1)}>{1}</Pagination.Item>
          <Pagination.Ellipsis disabled />
          <Pagination.Prev onClick={() => moveBounds(pageViews[0] - 3)} />
          {generatePaginations()}
          <Pagination.Next onClick={() => moveBounds(pageViews[0] + 3)} />
          <Pagination.Ellipsis disabled />
          <Pagination.Item onClick={() => goTo(lastPage)}>{lastPage}</Pagination.Item>
        </>
      )
    }
  }

  return (
    <>
      {
        (currentPage > lastPage) ? (
          <ul class="list-unstyles" style={{ maxHeight: "45vh", overflowX: 'none', overflowY: 'scroll' }}>
            {content
              .slice((FIRST_PAGE - 1) * itemsPerPage, FIRST_PAGE * itemsPerPage)
              .map((data, index) => (
                <li key={index} style={{ listStyleType: "none" }}>
                  {React.cloneElement(cardComponent, { ...data })}
                </li>
              ))}
          </ul>
        ) : (
            <ul class="list-unstyles" style={{ maxHeight: "45vh", overflowX: 'none', overflowY: 'scroll' }}>
              {content
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((data, index) => (
                  <li key={index} style={{ listStyleType: "none" }}>
                    {React.cloneElement(cardComponent, { ...data })}
                  </li>
                ))}
            </ul>
          )
      }

      <Pagination className="justify-content-md-center">
        {generateContent()}
      </Pagination>
    </>
  );
};

export default PagePagination;