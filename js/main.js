document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SEARCH
    ========================= */

    const searchForm = document.getElementById("searchForm");

    if (searchForm) {

        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const searchInput = document.getElementById("searchInput");

            if (!searchInput) {
                return;
            }

            const searchValue = searchInput.value.trim();

            if (searchValue === "") {
                searchInput.focus();
                return;
            }

            alert("No Items Available");
        });
    }


    /* =========================
       AUTH NAVIGATION
    ========================= */

    const loginNavLink = document.getElementById("loginNavLink");
    const registerNavLink = document.getElementById("registerNavLink");
    const profileNavLink = document.getElementById("profileNavLink");

    const loggedInUser = localStorage.getItem("dailymartUser");

    if (loggedInUser) {

        if (loginNavLink) {
            loginNavLink.classList.add("hidden");
        }

        if (registerNavLink) {
            registerNavLink.classList.add("hidden");
        }

        if (profileNavLink) {
            profileNavLink.classList.remove("hidden");
        }

    } else {

        if (loginNavLink) {
            loginNavLink.classList.remove("hidden");
        }

        if (registerNavLink) {
            registerNavLink.classList.remove("hidden");
        }

        if (profileNavLink) {
            profileNavLink.classList.add("hidden");
        }
    }


    /* =========================
       ORDERS LOGIN PROTECTION
    ========================= */

    const ordersEmptyState = document.getElementById("ordersEmptyState");

    if (ordersEmptyState) {

        const currentUser = localStorage.getItem("dailymartUser");

        if (!currentUser) {
            window.location.href = "login.html";
            return;
        }
    }


    /* =========================
       REGISTER
    ========================= */

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value;
            const confirmPassword = document.getElementById("registerConfirmPassword").value;
            const message = document.getElementById("registerMessage");

            if (password !== confirmPassword) {

                message.textContent = "Passwords do not match.";
                message.style.color = "#dc2626";

                return;
            }

            if (password.length < 6) {

                message.textContent =
                    "Password must contain at least 6 characters.";

                message.style.color = "#dc2626";

                return;
            }

            const user = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem(
                "dailymartRegisteredUser",
                JSON.stringify(user)
            );

            message.textContent =
                "Registration successful. Please login.";

            message.style.color = "#16a34a";

            registerForm.reset();

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1000);
        });
    }


    /* =========================
       LOGIN
    ========================= */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                document.getElementById("loginEmail").value.trim();

            const password =
                document.getElementById("loginPassword").value;

            const message =
                document.getElementById("loginMessage");

            const registeredUser =
                localStorage.getItem("dailymartRegisteredUser");

            if (!registeredUser) {

                message.textContent =
                    "Account not found. Please register first.";

                message.style.color = "#dc2626";

                return;
            }

            const user = JSON.parse(registeredUser);

            if (
                email === user.email &&
                password === user.password
            ) {

                localStorage.setItem(
                    "dailymartUser",
                    JSON.stringify({
                        name: user.name,
                        email: user.email
                    })
                );

                message.textContent =
                    "Login successful. Redirecting...";

                message.style.color = "#16a34a";

                setTimeout(function () {
                    window.location.href = "profile.html";
                }, 800);

            } else {

                message.textContent =
                    "Invalid email or password.";

                message.style.color = "#dc2626";
            }
        });
    }


    /* =========================
       PROFILE
    ========================= */

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");

    if (profileName || profileEmail) {

        const currentUser =
            localStorage.getItem("dailymartUser");

        if (!currentUser) {

            window.location.href = "login.html";

            return;
        }

        const user = JSON.parse(currentUser);

        if (profileName) {
            profileName.textContent = user.name;
        }

        if (profileEmail) {
            profileEmail.textContent = user.email;
        }
    }


    /* =========================
       LOGOUT
    ========================= */

    const logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            localStorage.removeItem("dailymartUser");

            window.location.href = "index.html";
        });
    }

});