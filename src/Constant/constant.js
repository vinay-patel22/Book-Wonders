// Define a constant named 'defaultFilter'
export const defaultFilter = {
  pageIndex: 1,   // Represents the initial page index
  pageSize: 10,   // Represents the initial number of items per page
  keyword: "",    // Represents the initial search keyword
};

// Define a constant named 'RecordsPerPage'
export const RecordsPerPage = [2, 5, 10, 100];
// This array contains the available options for the number of records per page in a paginated view
// In this case, the options are 2, 5, 10, and 100
// Users can choose one of these values to set the number of records displayed per page
