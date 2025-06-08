function submitPayroll() {
            const empName = document.getElementById('empName').value;
            const empRole = document.getElementById('empRole').value;
            const empId = document.getElementById('empId').value;
            const date = document.getElementById('date').value;
            const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
            const additions = parseFloat(document.getElementById('additions').value) || 0;
            const deductions = parseFloat(document.getElementById('deductions').value) || 0;
            const totalSalary = basicSalary + additions;

            document.getElementById('totalSalary').value = totalSalary.toFixed(2);

            const data = {
                empName,
                empRole,
                empId,
                date,
                basicSalary,
                additions,
                deductions,
                totalSalary,
                workingDays: document.getElementById('workingDays').value,
                presentDays: document.getElementById('presentDays').value,
                leaveDays: document.getElementById('leaveDays').value,
            };


            let payrollList = JSON.parse(localStorage.getItem('payrollList')) || [];
            payrollList.push(data);
            localStorage.setItem('payrollList', JSON.stringify(payrollList));

            window.location.href = "payslip.html";
        }
        function updateTotalSalary() {
            const basic = parseFloat(document.getElementById('basicSalary').value) || 0;
            const adds = parseFloat(document.getElementById('additions').value) || 0;
            const total = basic + adds;
            document.getElementById('totalSalary').value = total.toFixed(2);
        }

        // Attach listeners to update totalSalary live
        document.getElementById('basicSalary').addEventListener('input', updateTotalSalary);
        document.getElementById('additions').addEventListener('input', updateTotalSalary);

        function clearForm() {
            document.getElementById('empName').value = '';
            document.getElementById('empRole').value = '';
            document.getElementById('empId').value = '';
            document.getElementById('date').value = '';
            document.getElementById('basicSalary').value = '';
            document.getElementById('additions').value = '';
            document.getElementById('deductions').value = '';
            document.getElementById('totalSalary').value = '';
            document.getElementById('workingDays').value = '';
            document.getElementById('presentDays').value = '';
            document.getElementById('leaveDays').value = '';
        }
        //   menu toggling

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