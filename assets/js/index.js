 // Toggle Password Visibility
        function togglePassword() {
            const passwordField = document.getElementById("password");
            if (passwordField.type === "password") {
                passwordField.type = "text";
            } else {
                passwordField.type = "password";
            }
        }

        // Handle Login Logic
        document.getElementById("loginForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Replace this with real authentication
            if (username === "admin" && password === "123456") {
               
                window.location.href = 'overview.html';
                // Redirect or take other action
            } else {
                alert("Invalid credentials. Try again!");
            }

        });