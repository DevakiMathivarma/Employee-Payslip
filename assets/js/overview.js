 const DateTime = luxon.DateTime;
        let currentDate = DateTime.now();
        const storageKey = "addedMeetings";

        function renderCalendar() {
            const monthYear = document.getElementById("month-year");
            const calendar = document.getElementById("calendar");

            const startOfMonth = currentDate.startOf("month");
            const firstDay = startOfMonth.weekday % 7;
            const daysInMonth = currentDate.daysInMonth;

            monthYear.textContent = `${currentDate.monthLong} ${currentDate.year}`;

            let html = "<tr>";
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            for (let d of days) html += `<th>${d}</th>`;
            html += "</tr><tr>";

            for (let i = 0; i < firstDay; i++) html += "<td></td>";

            for (let d = 1; d <= daysInMonth; d++) {
                const isToday = d === DateTime.now().day &&
                    currentDate.month === DateTime.now().month &&
                    currentDate.year === DateTime.now().year;

                const fullDate = currentDate.set({ day: d });
                const dateStr = fullDate.toISODate();

                html += `<td class="${isToday ? "active" : ""}" onclick="addMeeting('${dateStr}')">${d}</td>`;

                if ((d + firstDay) % 7 === 0) html += "</tr><tr>";
            }

            html += "</tr>";
            calendar.innerHTML = html;
        }

        function nextMonth() {
            currentDate = currentDate.plus({ months: 1 });
            renderCalendar();
        }

        function prevMonth() {
            currentDate = currentDate.minus({ months: 1 });
            renderCalendar();
        }

        function addMeeting(dateStr) {
            const title = prompt("Enter meeting title:");
            const time = prompt("Enter meeting time (e.g., 10.00 AM):");

            if (title && time) {
                const dt = DateTime.fromISO(dateStr);
                const weekday = dt.toFormat("ccc");
                const shortDate = dt.toFormat("MMM dd");

                const meeting = {
                    title: title,
                    time: time,
                    weekday: weekday,
                    shortDate: shortDate
                };

                // Save to localStorage
                const existing = JSON.parse(localStorage.getItem(storageKey)) || [];
                existing.push(meeting);
                localStorage.setItem(storageKey, JSON.stringify(existing));

                appendMeetingToUI(meeting);
            }
        }

        function appendMeetingToUI(meeting) {
            const list = document.getElementById("meeting-list");
            const li = document.createElement("li");
            li.innerHTML = `
      <div class="meeting-left">${meeting.title} - ${meeting.time}</div>
      <div class="meeting-right"><strong>${meeting.weekday}</strong><br><small>${meeting.shortDate}</small></div>
    `;
            list.appendChild(li);
        }

        function loadStoredMeetings() {
            const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
            stored.forEach(meeting => appendMeetingToUI(meeting));
        }

        document.addEventListener("DOMContentLoaded", () => {
            renderCalendar();
            loadStoredMeetings();
        });



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
         document.getElementById("searchInput").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const meetingItems = document.querySelectorAll("#meeting-list li");

    meetingItems.forEach(item => {
      const text = item.innerText.toLowerCase();
      if (text.includes(searchValue)) {
        item.style.display = "flex"; 
      } else {
        item.style.display = "none";
      }
    });
  });
