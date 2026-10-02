document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SEARCH
    ========================= */

    const searchForm =
        document.getElementById("searchForm");

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
            new URLSearchParams(
                window.location.search
            );

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


    if (
        addressForm ||
        savedAddresses
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
       PAYMENT LOGIN PROTECTION
    ========================= */

    const paymentMethodForm =
        document.getElementById(
            "paymentMethodForm"
        );

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
       WISHLIST LOGIN PROTECTION
    ========================= */

    const wishlistEmptyState =
        document.getElementById(
            "wishlistEmptyState"
        );

    if (wishlistEmptyState) {

        const currentUser =
            localStorage.getItem(
                "dailymartUser"
            );

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
        document.getElementById(
            "registerForm"
        );


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById(
                            "registerName"
                        )
                        .value
                        .trim();


                const email =
                    document
                        .getElementById(
                            "registerEmail"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "registerPassword"
                        )
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


                if (
                    password !==
                    confirmPassword
                ) {

                    message.textContent =
                        "Passwords do not match.";

                    message.style.color =
                        "#dc2626";

                    return;

                }


                if (
                    password.length < 6
                ) {

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


                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1000
                );

            }
        );

    }


    /* =========================
       LOGIN
    ========================= */

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    document
                        .getElementById(
                            "loginEmail"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "loginPassword"
                        )
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


                let user;


                try {

                    user =
                        JSON.parse(
                            registeredUser
                        );

                } catch (error) {

                    message.textContent =
                        "Account data is invalid. Please register again.";

                    message.style.color =
                        "#dc2626";

                    return;

                }


                if (
                    email === user.email &&
                    password === user.password
                ) {

                    localStorage.setItem(
                        "dailymartUser",
                        JSON.stringify({

                            name:
                                user.name,

                            email:
                                user.email

                        })
                    );


                    message.textContent =
                        "Login successful. Redirecting...";

                    message.style.color =
                        "#16a34a";


                    setTimeout(
                        function () {

                            window.location.href =
                                "profile.html";

                        },
                        800
                    );

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
        document.getElementById(
            "profileName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profileWelcomeName =
        document.getElementById(
            "profileWelcomeName"
        );


    if (
        profileName ||
        profileEmail ||
        profileWelcomeName
    ) {

        const currentUser =
            localStorage.getItem(
                "dailymartUser"
            );


        if (!currentUser) {

            window.location.href =
                "login.html";

            return;

        }


        let user;


        try {

            user =
                JSON.parse(
                    currentUser
                );

        } catch (error) {

            localStorage.removeItem(
                "dailymartUser"
            );

            window.location.href =
                "login.html";

            return;

        }


        if (profileName) {

            profileName.textContent =
                user.name || "User";

        }


        if (profileEmail) {

            profileEmail.textContent =
                user.email ||
                "user@example.com";

        }


        if (profileWelcomeName) {

            profileWelcomeName.textContent =
                user.name || "User";

        }

    }


    /* =========================
       ADDRESS STORAGE
    ========================= */

    const addressStorageKey =
        "dailymartAddresses";


    function getSavedAddresses() {

        try {

            const addresses =
                JSON.parse(
                    localStorage.getItem(
                        addressStorageKey
                    ) || "[]"
                );


            if (
                Array.isArray(
                    addresses
                )
            ) {

                return addresses;

            }


            return [];

        } catch (error) {

            return [];

        }

    }


    function displayAddresses() {

        const addressList =
            document.getElementById(
                "savedAddresses"
            );


        if (!addressList) {

            return;

        }


        const addresses =
            getSavedAddresses();


        addressList.innerHTML = "";


        if (
            addresses.length === 0
        ) {

            const emptyState =
                document.createElement(
                    "div"
                );


            emptyState.className =
                "saved-address-empty";


            const heading =
                document.createElement(
                    "h3"
                );


            heading.textContent =
                "No Addresses Saved";


            const paragraph =
                document.createElement(
                    "p"
                );


            paragraph.textContent =
                "Add an address above for delivery.";


            emptyState.appendChild(
                heading
            );

            emptyState.appendChild(
                paragraph
            );


            addressList.appendChild(
                emptyState
            );


            return;

        }


        addresses.forEach(
            function (address) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "saved-address-card";


                const heading =
                    document.createElement(
                        "h3"
                    );


                heading.textContent =
                    address.name;


                const addressText =
                    document.createElement(
                        "p"
                    );


                addressText.textContent =
                    address.address;


                const cityPincode =
                    document.createElement(
                        "p"
                    );


                cityPincode.className =
                    "address-city-pincode";


                cityPincode.textContent =
                    address.city +
                    " - " +
                    address.pincode;


                const deleteButton =
                    document.createElement(
                        "button"
                    );


                deleteButton.type =
                    "button";


                deleteButton.className =
                    "delete-address-button";


                deleteButton.textContent =
                    "Delete";


                deleteButton.addEventListener(
                    "click",
                    function () {

                        deleteAddress(
                            address.id
                        );

                    }
                );


                card.appendChild(
                    heading
                );

                card.appendChild(
                    addressText
                );

                card.appendChild(
                    cityPincode
                );

                card.appendChild(
                    deleteButton
                );


                addressList.appendChild(
                    card
                );

            }
        );

    }


    function deleteAddress(
        addressId
    ) {

        const addresses =
            getSavedAddresses();


        const updatedAddresses =
            addresses.filter(
                function (address) {

                    return (
                        address.id !==
                        addressId
                    );

                }
            );


        localStorage.setItem(
            addressStorageKey,
            JSON.stringify(
                updatedAddresses
            )
        );


        displayAddresses();

        updateProfileStatuses();

    }


    if (addressForm) {

        displayAddresses();


        addressForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const addressName =
                    document
                        .getElementById(
                            "addressName"
                        )
                        .value
                        .trim();


                const addressLine =
                    document
                        .getElementById(
                            "addressLine"
                        )
                        .value
                        .trim();


                const city =
                    document
                        .getElementById(
                            "addressCity"
                        )
                        .value
                        .trim();


                const pincode =
                    document
                        .getElementById(
                            "addressPincode"
                        )
                        .value
                        .trim();


                const message =
                    document.getElementById(
                        "addressMessage"
                    );


                if (
                    !/^[0-9]{6}$/.test(
                        pincode
                    )
                ) {

                    message.textContent =
                        "Please enter a valid 6-digit pincode.";

                    message.style.color =
                        "#dc2626";

                    return;

                }


                const addresses =
                    getSavedAddresses();


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
                    JSON.stringify(
                        addresses
                    )
                );


                message.textContent =
                    "Address saved successfully.";

                message.style.color =
                    "#16a34a";


                addressForm.reset();


                displayAddresses();

                updateProfileStatuses();

            }
        );

    }


    /* =========================
       PAYMENT METHODS
    ========================= */

    const paymentStorageKey =
        "dailymartPaymentMethods";


    const paymentType =
        document.getElementById(
            "paymentType"
        );


    const upiField =
        document.getElementById(
            "upiField"
        );


    const upiId =
        document.getElementById(
            "upiId"
        );


    function getSavedPaymentMethods() {

        try {

            const methods =
                JSON.parse(
                    localStorage.getItem(
                        paymentStorageKey
                    ) || "[]"
                );


            if (
                Array.isArray(
                    methods
                )
            ) {

                return methods;

            }


            return [];

        } catch (error) {

            return [];

        }

    }


    function displayPaymentMethods() {

        const paymentList =
            document.getElementById(
                "savedPaymentMethods"
            );


        if (!paymentList) {

            return;

        }


        const methods =
            getSavedPaymentMethods();


        paymentList.innerHTML = "";


        if (
            methods.length === 0
        ) {

            const emptyState =
                document.createElement(
                    "div"
                );


            emptyState.className =
                "saved-payment-empty";


            const heading =
                document.createElement(
                    "h3"
                );


            heading.textContent =
                "No Payment Methods Saved";


            const paragraph =
                document.createElement(
                    "p"
                );


            paragraph.textContent =
                "Add a payment method above to save it.";


            emptyState.appendChild(
                heading
            );

            emptyState.appendChild(
                paragraph
            );


            paymentList.appendChild(
                emptyState
            );


            return;

        }


        methods.forEach(
            function (method) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "saved-payment-card";


                const heading =
                    document.createElement(
                        "h3"
                    );


                heading.textContent =
                    method.type;


                const details =
                    document.createElement(
                        "p"
                    );


                if (
                    method.type === "UPI"
                ) {

                    details.textContent =
                        method.upi;

                } else {

                    details.textContent =
                        "Pay when your order is delivered.";

                }


                const deleteButton =
                    document.createElement(
                        "button"
                    );


                deleteButton.type =
                    "button";


                deleteButton.className =
                    "delete-payment-button";


                deleteButton.textContent =
                    "Delete";


                deleteButton.addEventListener(
                    "click",
                    function () {

                        deletePaymentMethod(
                            method.id
                        );

                    }
                );


                card.appendChild(
                    heading
                );

                card.appendChild(
                    details
                );

                card.appendChild(
                    deleteButton
                );


                paymentList.appendChild(
                    card
                );

            }
        );

    }


    function deletePaymentMethod(
        paymentId
    ) {

        const methods =
            getSavedPaymentMethods();


        const updatedMethods =
            methods.filter(
                function (method) {

                    return (
                        method.id !==
                        paymentId
                    );

                }
            );


        localStorage.setItem(
            paymentStorageKey,
            JSON.stringify(
                updatedMethods
            )
        );


        displayPaymentMethods();

        updateProfileStatuses();

    }


    if (paymentType) {

        paymentType.addEventListener(
            "change",
            function () {

                if (
                    paymentType.value ===
                    "UPI"
                ) {

                    if (upiField) {

                        upiField.classList.remove(
                            "hidden"
                        );

                    }


                    if (upiId) {

                        upiId.required =
                            true;

                    }

                } else {

                    if (upiField) {

                        upiField.classList.add(
                            "hidden"
                        );

                    }


                    if (upiId) {

                        upiId.required =
                            false;

                        upiId.value =
                            "";

                    }

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
                    getSavedPaymentMethods();


                methods.push({

                    id:
                        Date.now().toString(),

                    type:
                        selectedType,

                    upi:
                        selectedType === "UPI"
                            ? upiId.value.trim()
                            : ""

                });


                localStorage.setItem(
                    paymentStorageKey,
                    JSON.stringify(
                        methods
                    )
                );


                message.textContent =
                    "Payment method saved successfully.";

                message.style.color =
                    "#16a34a";


                paymentMethodForm.reset();


                if (upiField) {

                    upiField.classList.add(
                        "hidden"
                    );

                }


                if (upiId) {

                    upiId.required =
                        false;

                }


                displayPaymentMethods();

                updateProfileStatuses();

            }
        );

    }


    /* =========================
       PROFILE STATUS
    ========================= */

    function updateProfileStatuses() {

        const addressStatus =
            document.getElementById(
                "addressStatus"
            );


        const paymentStatus =
            document.getElementById(
                "paymentStatus"
            );


        const orderStatus =
            document.getElementById(
                "orderStatus"
            );


        const cartStatus =
            document.getElementById(
                "cartStatus"
            );


        const wishlistStatus =
            document.getElementById(
                "wishlistStatus"
            );


        /* =========================
           ADDRESS COUNT
        ========================= */

        if (addressStatus) {

            const addresses =
                getSavedAddresses();


            if (
                addresses.length ===
                0
            ) {

                addressStatus.textContent =
                    "No Addresses Saved";

            } else if (
                addresses.length ===
                1
            ) {

                addressStatus.textContent =
                    "1 Address Saved";

            } else {

                addressStatus.textContent =
                    addresses.length +
                    " Addresses Saved";

            }

        }


        /* =========================
           PAYMENT COUNT
        ========================= */

        if (paymentStatus) {

            const methods =
                getSavedPaymentMethods();


            if (
                methods.length ===
                0
            ) {

                paymentStatus.textContent =
                    "No Payment Methods Saved";

            } else if (
                methods.length ===
                1
            ) {

                paymentStatus.textContent =
                    "1 Method Saved";

            } else {

                paymentStatus.textContent =
                    methods.length +
                    " Methods Saved";

            }

        }


        /* =========================
           ORDER STATUS
        ========================= */

        if (orderStatus) {

            orderStatus.textContent =
                "No Orders Yet";

        }


        /* =========================
           CART STATUS
        ========================= */

        if (cartStatus) {

            cartStatus.textContent =
                "Cart is Empty";

        }


        /* =========================
           WISHLIST STATUS
        ========================= */

        if (wishlistStatus) {

            wishlistStatus.textContent =
                "Wishlist is Empty";

        }

    }


    /* =========================
       PROFILE STATUS ON PAGE LOAD
    ========================= */

    if (
        document.getElementById(
            "addressStatus"
        ) ||
        document.getElementById(
            "paymentStatus"
        ) ||
        document.getElementById(
            "wishlistStatus"
        )
    ) {

        updateProfileStatuses();

    }


    /* =========================
       LOGOUT
    ========================= */

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


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