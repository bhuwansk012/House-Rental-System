 export const generatePDFReport = (dashboardData) => {
    if (!dashboardData) return toast.error("No data to export");

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Indigo 600
    doc.text("System Analytics Report", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${date}`, 14, 28);
    doc.text("Confidential - Internal Use Only", 14, 33);

    // Table
    const tableRows = [
      ["Total Tenants", dashboardData.totalTenants || 0],
      ["Total Owners", dashboardData.totalOwners || 0],
      ["Total Properties", dashboardData.totalProperties || 0],
      ["Total Bookings", dashboardData.totalBookings || 0],
      ["Occupied Units", dashboardData.bookedProperties || 0],
      ["Available Units", dashboardData.availableProperties || 0],
    ];

    doc.autoTable({
      head: [["Metric Category", "Current Value"]],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] },
      styles: { cellPadding: 5 }
    });

    doc.save(`Analytics_Report_${date.replace(/\//g, '-')}.pdf`);
    toast.success("PDF Report Downloaded");
  };
