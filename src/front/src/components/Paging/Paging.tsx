import React, { FunctionComponent, useState, useLayoutEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';

interface Page{
    displayedValue: number
    value: number,
    current: boolean
}

const Paging: FunctionComponent<{totalCount: number, pageSize:number, currentPage:number, handleClick: any, scrollTo: string}> = ({totalCount, pageSize, currentPage, handleClick, scrollTo}) => {

    const [pages, setPages] = useState<Page[]>([]);
    
    useLayoutEffect(() => {
        var pagesCount = Math.ceil(totalCount / pageSize);
        var pagesBuilder : Page[]= [];
        for(var page=1;page <= pagesCount; page++){
            //page 1 is default current page
            pagesBuilder.push({displayedValue:page, value:page-1,current:(page-1)==currentPage});
        }
        setPages(pagesBuilder);
      }, [totalCount,currentPage])

    return (
        <Container className="pagination justify-content-end">
            <Pagination size="sm" >
           {pages.map((page) => {
            return (
                <>
                {page.current?<PaginationItem key={page.value} active>
                <PaginationLink > {page.displayedValue}</PaginationLink>
                </PaginationItem>
                :<PaginationItem key={page.value}>
                    <PaginationLink href={scrollTo} onClick={()=>handleClick(page.value)} > {page.displayedValue}</PaginationLink>
                </PaginationItem>}
            </>   
                    )
          })}
        </Pagination>
        </Container>     
    )
}
export default Paging;