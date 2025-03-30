/**
 * Utility functions for generating and downloading reports
 */

/**
 * Generate a CSV string from report data
 * @param {Object} reportData - The report data to convert to CSV
 * @param {string} reportType - The type of report
 * @returns {string} CSV content as a string
 */
export const generateCSV = (reportData, reportType) => {
  let csvContent = '';
  
  // Add report header
  csvContent += `${reportType.toUpperCase()} REPORT\r\n\r\n`;
  
  // Add summary if available
  if (reportData.summary) {
    csvContent += `Summary: ${reportData.summary}\r\n\r\n`;
  }
  
  // Add financial metrics based on report type
  if (reportType === 'income' && reportData.totalRevenue !== undefined) {
    csvContent += `Total Revenue: $${reportData.totalRevenue.toLocaleString()}\r\n\r\n`;
  }
  
  if (reportType === 'expense' && reportData.totalExpenses !== undefined) {
    csvContent += `Total Expenses: $${reportData.totalExpenses.toLocaleString()}\r\n\r\n`;
  }
  
  if (reportType === 'cashflow') {
    if (reportData.totalRevenue !== undefined) {
      csvContent += `Total Revenue: $${reportData.totalRevenue.toLocaleString()}\r\n`;
    }
    if (reportData.totalExpenses !== undefined) {
      csvContent += `Total Expenses: $${reportData.totalExpenses.toLocaleString()}\r\n`;
    }
    if (reportData.profit !== undefined) {
      csvContent += `Net Profit: $${reportData.profit.toLocaleString()}\r\n\r\n`;
    }
  }
  
  // Add transactions if available
  if (reportData.recentTransactions && reportData.recentTransactions.length > 0) {
    csvContent += 'TRANSACTIONS\r\n';
    csvContent += 'Description,Amount,Date,Category\r\n';
    
    reportData.recentTransactions.forEach(transaction => {
      csvContent += `"${transaction.description}",$${transaction.amount.toLocaleString()},"${transaction.date}","${transaction.category}"\r\n`;
    });
    
    csvContent += '\r\n';
  }
  
  // Add upcoming bills if available
  if (reportData.upcomingBills && reportData.upcomingBills.length > 0) {
    csvContent += 'UPCOMING BILLS\r\n';
    csvContent += 'Description,Amount,Due Date,Status\r\n';
    
    reportData.upcomingBills.forEach(bill => {
      csvContent += `"${bill.description}",$${bill.amount.toLocaleString()},"${bill.dueDate}","${bill.status}"\r\n`;
    });
  }
  
  return csvContent;
};

/**
 * Download report data as a file
 * @param {Object} report - The report object containing name, date, type, and data
 * @param {string} format - The file format (csv, json, pdf)
 */
export const downloadReport = (report, format = 'csv') => {
  let content = '';
  let mimeType = '';
  let fileExtension = '';
  
  // Format the filename
  const filename = report.name.replace(/\s+/g, '_').toLowerCase();
  
  switch (format) {
    case 'json':
      content = JSON.stringify(report.data, null, 2);
      mimeType = 'application/json';
      fileExtension = 'json';
      break;
    case 'csv':
      content = generateCSV(report.data, report.type);
      mimeType = 'text/csv';
      fileExtension = 'csv';
      break;
    case 'pdf':
      // For PDF, we'll use a different approach - print to PDF
      printToPDF(report);
      return; // Exit early as we're handling this differently
    default:
      content = generateCSV(report.data, report.type);
      mimeType = 'text/csv';
      fileExtension = 'csv';
  }
  
  // Create a blob and download link
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set up the download
  link.href = url;
  link.download = `${filename}_${report.date.replace(/\s+/g, '_').toLowerCase()}.${fileExtension}`;
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 100);
};

/**
 * Print report to PDF using browser print functionality
 * @param {Object} report - The report to print
 */
const printToPDF = (report) => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow pop-ups to download the PDF report.');
    return;
  }
  
  // Generate HTML content for the report
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${report.name}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 30px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          margin-bottom: 5px;
        }
        .date {
          color: #666;
          font-style: italic;
        }
        .section {
          margin-bottom: 20px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
        .summary {
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .metrics {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .metric {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 15px;
          width: 30%;
        }
        .metric-title {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }
        .metric-value {
          font-size: 24px;
          font-weight: bold;
        }
        .positive {
          color: green;
        }
        .negative {
          color: red;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        @media print {
          body {
            margin: 0;
            padding: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${report.name}</h1>
        <div class="date">Generated on ${report.date}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Summary</div>
        <div class="summary">${report.data.summary || 'No summary available.'}</div>
      </div>
  `;
  
  // Add metrics based on report type
  let metricsHtml = '';
  
  if (report.type === 'income' && report.data.totalRevenue !== undefined) {
    metricsHtml += `
      <div class="section">
        <div class="section-title">Financial Metrics</div>
        <div class="metric">
          <div class="metric-title">Total Revenue</div>
          <div class="metric-value">$${report.data.totalRevenue.toLocaleString()}</div>
        </div>
      </div>
    `;
  } else if (report.type === 'expense' && report.data.totalExpenses !== undefined) {
    metricsHtml += `
      <div class="section">
        <div class="section-title">Financial Metrics</div>
        <div class="metric">
          <div class="metric-title">Total Expenses</div>
          <div class="metric-value">$${report.data.totalExpenses.toLocaleString()}</div>
        </div>
      </div>
    `;
  } else if (report.type === 'cashflow') {
    metricsHtml += `
      <div class="section">
        <div class="section-title">Financial Metrics</div>
        <div class="metrics">
    `;
    
    if (report.data.totalRevenue !== undefined) {
      metricsHtml += `
        <div class="metric">
          <div class="metric-title">Total Revenue</div>
          <div class="metric-value">$${report.data.totalRevenue.toLocaleString()}</div>
        </div>
      `;
    }
    
    if (report.data.totalExpenses !== undefined) {
      metricsHtml += `
        <div class="metric">
          <div class="metric-title">Total Expenses</div>
          <div class="metric-value">$${report.data.totalExpenses.toLocaleString()}</div>
        </div>
      `;
    }
    
    if (report.data.profit !== undefined) {
      const profitClass = report.data.profit >= 0 ? 'positive' : 'negative';
      const profitLabel = report.data.profit >= 0 ? '' : ' (Loss)';
      
      metricsHtml += `
        <div class="metric">
          <div class="metric-title">Net Profit</div>
          <div class="metric-value ${profitClass}">$${Math.abs(report.data.profit).toLocaleString()}${profitLabel}</div>
        </div>
      `;
    }
    
    metricsHtml += `
        </div>
      </div>
    `;
  }
  
  // Add transactions if available
  let transactionsHtml = '';
  if (report.data.recentTransactions && report.data.recentTransactions.length > 0) {
    transactionsHtml = `
      <div class="section">
        <div class="section-title">Recent Transactions</div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    report.data.recentTransactions.forEach(transaction => {
      transactionsHtml += `
        <tr>
          <td>${transaction.description}</td>
          <td>$${transaction.amount.toLocaleString()}</td>
          <td>${transaction.date}</td>
          <td>${transaction.category}</td>
        </tr>
      `;
    });
    
    transactionsHtml += `
          </tbody>
        </table>
      </div>
    `;
  }
  
  // Add upcoming bills if available
  let billsHtml = '';
  if (report.data.upcomingBills && report.data.upcomingBills.length > 0) {
    billsHtml = `
      <div class="section">
        <div class="section-title">Upcoming Bills</div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    report.data.upcomingBills.forEach(bill => {
      billsHtml += `
        <tr>
          <td>${bill.description}</td>
          <td>$${bill.amount.toLocaleString()}</td>
          <td>${bill.dueDate}</td>
          <td>${bill.status}</td>
        </tr>
      `;
    });
    
    billsHtml += `
          </tbody>
        </table>
      </div>
    `;
  }
  
  // Complete the HTML
  const finalHtml = `
    ${htmlContent}
    ${metricsHtml}
    ${transactionsHtml}
    ${billsHtml}
    <div class="footer">
      © ${new Date().getFullYear()} Finovah Financial Services. All rights reserved.
    </div>
    </body>
    </html>
  `;
  
  // Write to the new window and prepare for printing
  printWindow.document.open();
  printWindow.document.write(finalHtml);
  printWindow.document.close();
  
  // Wait for content to load then print
  printWindow.onload = function() {
    setTimeout(() => {
      printWindow.print();
      // Close the window after print dialog is closed (or after a timeout)
      setTimeout(() => {
        printWindow.close();
      }, 500);
    }, 500);
  };
};
