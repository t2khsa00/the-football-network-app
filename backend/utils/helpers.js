
export const fetchAllPages = async (fetchFunction, params) => {
    let allData = [];
    let currentPage = 1;
    let totalPages = 1;
    
    do {
        const response = await fetchFunction({ ...params, page: currentPage });
        allData = [...allData, ...response.response];
        totalPages = response.paging.total;
        currentPage++;
    } while (currentPage <= totalPages);
    
    return allData;
};
  