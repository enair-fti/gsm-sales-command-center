
export const exportHeadlineData = (headlineData: any[]) => {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Client,Product,Access,Station,Market,Flight Schedule,Cost,Length,Programming,Days,Times\n"
    + headlineData.map(row => 
        `"${row.client_name || ''}","${row.product_name || ''}","${row.access_name || ''}","${row.station_name || ''}","${row.market || ''}","${row.flight_schedule || ''}","${row.cost || ''}","${row.len || ''}","${row.programming || ''}","${row.days || ''}","${row.times || ''}"`
      ).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "headline_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
