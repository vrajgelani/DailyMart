document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SEARCH
    ========================= */

    const searchForm = document.getElementById("searchForm");

    if (searchForm) {

        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const searchInput =
                document.getElementById("searchInput");

            if (!searchInput) {
                return;
            }

            const searchValue =
                searchInput.value.trim();

            if (searchValue === "") {
                searchInput.focus();
                return;
            }

            const encodedQuery =
                encodeURIComponent(searchValue);

            window.location.href =
                "search.html?q=" + encodedQuery;
        });
    }


    /* =========================
       SEARCH QUERY DISPLAY
    ========================= */

    const searchQueryText =
        document.getElementById("searchQueryText");

    if (searchQueryText) {

        const urlParams =
            new URLSearchParams(window.location.search);

        const searchQuery =
            urlParams.get("q");

        if (searchQuery) {

            searchQueryText.textContent =
                'Showing results for "' +
                searchQuery +
                '".';

        } else {

            searchQueryText.textContent =
                "Search for products and daily essentials.";
        }
    }


    /* =========================
       AUTH NAVIGATION
    ========================= */

    const loginNavLink =
        document.getElementById("loginNavLink");

    const registerNavLink =
        document.getElementById("registerNavLink");

    const profileNavLink =
        document.getElementById("profileNavLink");

    const loggedInUser =
        localStorage.getItem("dailymartUser");


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

    const ordersEmptyState =
        document.getElementById("ordersEmptyState");

    if (ordersEmptyState) {

        const currentUser =
            localStorage.getItem("dailymartUser");

        if (!currentUser) {

            window.location.href =
                "login.html";

            return;
        }
    }


    /* =========================
       ADDRESS LOGIN PROTECTION
    ========================= */

    const addressForm =
        document.getElementById("addressForm");

    const savedAddresses =
        document.getElementById("savedAddresses");


    if (addressForm || savedAddresses) {

        const currentUser =
            localStorage.getItem("dailymartUser");

        if (!currentUser) {

            window.location.href =
                "login.html";

            return;
        }
    }


    /* =========================
       PAYMENT LOGIN PROTECTION
    ========================= */

    const paymentMethodForm =
        document.getElementById("paymentMethodForm");

    const savedPaymentMethods =
        document.getElementById(
            "savedPaymentMethods"
        );


    if (
        paymentMethodForm ||
        savedPaymentMethods
    ) {

        const currentUser =
            localStorage.getItem("dailymartUser");

        if (!currentUser) {

            window.location.href =
                "login.html";

            return;
        }
    }


    /* =========================
       REGISTER
    ========================= */

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    document
                        .getElementById("registerName")
                        .value
                        .trim();

                const email =
                    document
                        .getElementById("registerEmail")
                        .value
                        .trim();

                const password =
                    document
                        .getElementById("registerPassword")
                        .value;

                const confirmPassword =
                    document
                        .getElementById(
                            "registerConfirmPassword"
                        )
                        .value;

                const message =
                    document.getElementById(
                        "registerMessage"
                    );


                if (password !== confirmPassword) {

                    message.textContent =
                        "Passwords do not match.";

                    message.style.color =
                        "#dc2626";

                    return;
                }


                if (password.length < 6) {

                    message.textContent =
                        "Password must contain at least 6 characters.";

                    message.style.color =
                        "#dc2626";

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

                message.style.color =
                    "#16a34a";


                registerForm.reset();


                setTimeout(function () {

                    window.location.href =
                        "login.html";

                }, 1000);

            }
        );
    }


    /* =========================
       LOGIN
    ========================= */

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const email =
                    document
                        .getElementById("loginEmail")
                        .value
                        .trim();

                const password =
                    document
                        .getElementById("loginPassword")
                        .value;

                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                const registeredUser =
                    localStorage.getItem(
                        "dailymartRegisteredUser"
                    );


                if (!registeredUser) {

                    message.textContent =
                        "Account not found. Please register first.";

                    message.style.color =
                        "#dc2626";

                    return;
                }


                const user =
                    JSON.parse(registeredUser);


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

                    message.style.color =
                        "#16a34a";


                    setTimeout(function () {

                        window.location.href =
                            "profile.html";

                    }, 800);

                } else {

                    message.textContent =
                        "Invalid email or password.";

                    message.style.color =
                        "#dc2626";
                }

            }
        );
    }


    /* =========================
       PROFILE
    ========================= */

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");


    if (profileName || profileEmail) {

        const currentUser =
            localStorage.getItem("dailymartUser");


        if (!currentUser) {

            window.location.href =
                "login.html";

            return;
        }


        const user =
            JSON.parse(currentUser);


        if (profileName) {
            profileName.textContent =
                user.name;
        }


        if (profileEmail) {
            profileEmail.textContent =
                user.email;
        }
    }


    /* =========================
       ADDRESS STORAGE
    ========================= */

    const addressStorageKey =
        "dailymartAddresses";


    function displayAddresses() {

        const addressList =
            document.getElementById(
                "savedAddresses"
            );

        if (!addressList) {
            return;
        }


        const addresses =
            JSON.parse(
                localStorage.getItem(
                    addressStorageKey
                ) || "[]"
            );


        addressList.innerHTML = "";


        if (addresses.length === 0) {

            const emptyState =
                document.createElement("div");

            emptyState.className =
                "saved-address-empty";


            const heading =
                document.createElement("h3");

            heading.textContent =
                "No Addresses Saved";


            const paragraph =
                document.createElement("p");

            paragraph.textContent =
                "Add an address above for delivery.";


            emptyState.appendChild(heading);
            emptyState.appendChild(paragraph);

            addressList.appendChild(emptyState);

            return;
        }


        addresses.forEach(function (address) {

            const card =
                document.createElement("div");

            card.className =
                "saved-address-card";


            const heading =
                document.createElement("h3");

            heading.textContent =
                address.name;


            const addressText =
                document.createElement("p");

            addressText.textContent =
                address.address;


            const cityPincode =
                document.createElement("p");

            cityPincode.className =
                "address-city-pincode";

            cityPincode.textContent =
                address.city +
                " - " +
                address.pincode;


            const deleteButton =
                document.createElement("button");

            deleteButton.type =
                "button";

            deleteButton.className =
                "delete-address-button";

            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteAddress(address.id);

                }
            );


            card.appendChild(heading);
            card.appendChild(addressText);
            card.appendChild(cityPincode);
            card.appendChild(deleteButton);

            addressList.appendChild(card);
        });
    }


    function deleteAddress(addressId) {

        const addresses =
            JSON.parse(
                localStorage.getItem(
                    addressStorageKey
                ) || "[]"
            );


        const updatedAddresses =
            addresses.filter(function (address) {

                return address.id !== addressId;

            });


        localStorage.setItem(
            addressStorageKey,
            JSON.stringify(updatedAddresses)
        );


        displayAddresses();
    }


    if (addressForm) {

        displayAddresses();


        addressForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const addressName =
                    document
                        .getElementById("addressName")
                        .value
                        .trim();

                const addressLine =
                    document
                        .getElementById("addressLine")
                        .value
                        .trim();

                const city =
                    document
                        .getElementById("addressCity")
                        .value
                        .trim();

                const pincode =
                    document
                        .getElementById("addressPincode")
                        .value
                        .trim();

                const message =
                    document.getElementById(
                        "addressMessage"
                    );


                if (!/^[0-9]{6}$/.test(pincode)) {

                    message.textContent =
                        "Please enter a valid 6-digit pincode.";

                    message.style.color =
                        "#dc2626";

                    return;
                }


                const addresses =
                    JSON.parse(
                        localStorage.getItem(
                            addressStorageKey
                        ) || "[]"
                    );


                addresses.push({

                    id:
                        Date.now().toString(),

                    name:
                        addressName,

                    address:
                        addressLine,

                    city:
                        city,

                    pincode:
                        pincode
                });


                localStorage.setItem(
                    addressStorageKey,
                    JSON.stringify(addresses)
                );


                message.textContent =
                    "Address saved successfully.";

                message.style.color =
                    "#16a34a";


                addressForm.reset();

                displayAddresses();
            }
        );
    }


    /* =========================
       PAYMENT METHODS
    ========================= */

    const paymentStorageKey =
        "dailymartPaymentMethods";


    const paymentType =
        document.getElementById("paymentType");

    const upiField =
        document.getElementById("upiField");

    const upiId =
        document.getElementById("upiId");


    function displayPaymentMethods() {

        const paymentList =
            document.getElementById(
                "savedPaymentMethods"
            );

        if (!paymentList) {
            return;
        }


        const methods =
            JSON.parse(
                localStorage.getItem(
                    paymentStorageKey
                ) || "[]"
            );


        paymentList.innerHTML = "";


        if (methods.length === 0) {

            const emptyState =
                document.createElement("div");

            emptyState.className =
                "saved-payment-empty";


            const heading =
                document.createElement("h3");

            heading.textContent =
                "No Payment Methods Saved";


            const paragraph =
                document.createElement("p");

            paragraph.textContent =
                "Add a payment method above to save it.";


            emptyState.appendChild(heading);
            emptyState.appendChild(paragraph);

            paymentList.appendChild(emptyState);

            return;
        }


        methods.forEach(function (method) {

            const card =
                document.createElement("div");

            card.className =
                "saved-payment-card";


            const heading =
                document.createElement("h3");

            heading.textContent =
                method.type;


            const details =
                document.createElement("p");


            if (method.type === "UPI") {

                details.textContent =
                    method.upi;

            } else {

                details.textContent =
                    "Pay when your order is delivered.";
            }


            const deleteButton =
                document.createElement("button");

            deleteButton.type =
                "button";

            deleteButton.className =
                "delete-payment-button";

            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function () {

                    deletePaymentMethod(method.id);

                }
            );


            card.appendChild(heading);
            card.appendChild(details);
            card.appendChild(deleteButton);

            paymentList.appendChild(card);
        });
    }


    function deletePaymentMethod(paymentId) {

        const methods =
            JSON.parse(
                localStorage.getItem(
                    paymentStorageKey
                ) || "[]"
            );


        const updatedMethods =
            methods.filter(function (method) {

                return method.id !== paymentId;

            });


        localStorage.setItem(
            paymentStorageKey,
            JSON.stringify(updatedMethods)
        );


        displayPaymentMethods();
    }


    if (paymentType) {

        paymentType.addEventListener(
            "change",
            function () {

                if (paymentType.value === "UPI") {

                    upiField.classList.remove("hidden");

                    upiId.required = true;

                } else {

                    upiField.classList.add("hidden");

                    upiId.required = false;

                    upiId.value = "";
                }
            }
        );
    }


    if (paymentMethodForm) {

        displayPaymentMethods();


        paymentMethodForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const message =
                    document.getElementById(
                        "paymentMessage"
                    );


                const selectedType =
                    paymentType.value;


                if (!selectedType) {

                    message.textContent =
                        "Please select a payment type.";

                    message.style.color =
                        "#dc2626";

                    return;
                }


                if (
                    selectedType === "UPI" &&
                    upiId.value.trim() === ""
                ) {

                    message.textContent =
                        "Please enter your UPI ID.";

                    message.style.color =
                        "#dc2626";

                    return;
                }


                const methods =
                    JSON.parse(
                        localStorage.getItem(
                            paymentStorageKey
                        ) || "[]"
                    );


                const newMethod = {

                    id:
                        Date.now().toString(),

                    type:
                        selectedType,

                    upi:
                        selectedType === "UPI"
                            ? upiId.value.trim()
                            : ""
                };


                methods.push(newMethod);


                localStorage.setItem(
                    paymentStorageKey,
                    JSON.stringify(methods)
                );


                message.textContent =
                    "Payment method saved successfully.";

                message.style.color =
                    "#16a34a";


                paymentMethodForm.reset();


                upiField.classList.add("hidden");

                upiId.required = false;


                displayPaymentMethods();
            }
        );
    }


    /* =========================
       LOGOUT
    ========================= */

    const logoutButton =
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "dailymartUser"
                );

                window.location.href =
                    "index.html";
            }
        );
    }

});