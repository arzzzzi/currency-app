export const getDates = (startDate: Date, endDate: Date) => {
    const dates = [];
    const interval = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    let currentDate = new Date(startDate);
    if (interval > 21) {
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 3);
      }
    } else {
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    return dates;
  };
  
  export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  