 window.onload = () => {
      const payrollList = JSON.parse(localStorage.getItem("payrollList")) || [];

      if (payrollList.length === 0) {
        alert("No payroll data found.");
        return;
      }

      const latest = payrollList[payrollList.length - 1];

      document.getElementById("empName").textContent = latest.empName;
      document.getElementById("empId").textContent = latest.empId;
      document.getElementById("empRole").textContent = latest.empRole;
      document.getElementById("date").textContent = latest.date;

      const dateObj = new Date(latest.date);
      const monthName = dateObj.toLocaleString("default", { month: "long" });
      document.getElementById("month").textContent = monthName;

      document.getElementById("payslipTableBody").innerHTML = `
        <tr>
          <td>${latest.empId}</td>
          <td>${latest.empName}</td>
          <td>${latest.basicSalary}</td>
          <td>${latest.totalSalary}</td>
          <td>${latest.additions}</td>
          <td>${latest.deductions}</td>
        </tr>
      `;

      const total = latest.basicSalary + latest.additions - latest.deductions;
      document.getElementById("totalEarnings").textContent = total.toLocaleString();
    };


    // menu toggle
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const closeBtn = document.getElementById("closeBtn");

    function openSidebar() {
      sidebar.style.display = "flex";
      menuToggle.style.display = "none";
    }

    function closeSidebar() {
      sidebar.style.display = "none";
      menuToggle.style.display = "block";
    }

    // Event listeners
    menuToggle.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);

    // Responsive reset on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 480) {
        sidebar.style.display = "block";
        menuToggle.style.display = "none";
      } else {
        sidebar.style.display = "none";
        menuToggle.style.display = "block";
      }
    });

    // Initial check
    window.dispatchEvent(new Event("resize"));

    document.querySelector('.download-btn').addEventListener('click', function () {
      const payslip = document.getElementById('payslipContent');
      const wrapper = payslip.querySelector('.table-wrapper');

      // Temporarily remove scroll for PDF
      wrapper.dataset.originalOverflow = wrapper.style.overflowX;
      wrapper.style.overflowX = 'visible';

      const opt = {
        margin: 0.5,
        filename: 'payslip.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(payslip).save().then(() => {
        // Restore scroll after download
        wrapper.style.overflowX = wrapper.dataset.originalOverflow;
      });
    });