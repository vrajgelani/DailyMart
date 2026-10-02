document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       COMMON HELPERS
    ========================================================= */

    function getLocalStorageArray(key) {
        let data = [];

        try {
            data = JSON.parse(localStorage.getItem(key) || "[]");
        } catch (error) {
            data = [];
        }

        return Array.isArray(data) ? data : [];
    }


    function saveLocalStorageArray(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }


    function getCurrentUser() {
        try {
            return JSON.parse(
                localStorage.getItem("dailymartUser") || "null"
            );
        } catch (error) {
            return null;
        }
    }


    /* =========================================================
       SEARCH
    ========================================================= */

    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    if (searchForm && searchInput) {

        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const query = searchInput.value.trim();

            if (query === "") {
                return;
            }

            window.location.href =
                "search.html?q=" + encodeURIComponent(query);
        });
    }


    /* =========================================================
       SEARCH PAGE
    ========================================================= */

    const searchQueryText =
        document.getElementById("searchQueryText");

    if (searchQueryText) {

        const urlParams = new URLSearchParams(
            window.location.search
        );

        const query = urlParams.get("q");

        if (query) {
            searchQueryText.textContent =
                'Showing results for "' + query + '".';
        } else {
            searchQueryText.textContent =
                "Search for grocery items.";
        }
    }


    /* =========================================================
       AUTH HEADER
    ========================================================= */

    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");
    const profileLink = document.getElementById("profileLink");

    const currentUser = getCurrentUser();

    if (currentUser) {

        if (loginLink) {
            loginLink.classList.add("hidden");
        }

        if (registerLink) {
            registerLink.classList.add("hidden");
        }

        if (profileLink) {
            profileLink.classList.remove("hidden");
        }

    } else {

        if (loginLink) {
            loginLink.classList.remove("hidden");
        }

        if (registerLink) {
            registerLink.classList.remove("hidden");
        }

        if (profileLink) {
            profileLink.classList.add("hidden");
        }
    }


    /* =========================================================
       PROTECTED PAGES
    ========================================================= */

    const protectedPages = [
        "orders.html",
        "profile.html",
        "addresses.html",
        "payment-methods.html",
        "wishlist.html",
        "recently-viewed.html"
    ];

    const currentPage =
        window.location.pathname.split("/").pop();

    if (
        protectedPages.includes(currentPage) &&
        !currentUser
    ) {
        window.location.href = "login.html";
        return;
    }


    /* =========================================================
       REGISTER
    ========================================================= */

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameInput =
                document.getElementById("registerName");

            const emailInput =
                document.getElementById("registerEmail");

            const passwordInput =
                document.getElementById("registerPassword");

            if (
                !nameInput ||
                !emailInput ||
                !passwordInput
            ) {
                return;
            }

            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            if (
                name === "" ||
                email === "" ||
                password === ""
            ) {
                alert("Please fill all fields.");
                return;
            }

            const registeredUser = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem(
                "dailymartRegisteredUser",
                JSON.stringify(registeredUser)
            );

            alert(
                "Registration successful. Please login."
            );

            window.location.href = "login.html";
        });
    }


    /* =========================================================
       LOGIN
    ========================================================= */

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const emailInput =
                document.getElementById("loginEmail");

            const passwordInput =
                document.getElementById("loginPassword");

            if (
                !emailInput ||
                !passwordInput
            ) {
                return;
            }

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            let registeredUser = null;

            try {
                registeredUser = JSON.parse(
                    localStorage.getItem(
                        "dailymartRegisteredUser"
                    ) || "null"
                );
            } catch (error) {
                registeredUser = null;
            }

            if (!registeredUser) {
                alert(
                    "No registered account found. Please register first."
                );
                return;
            }

            if (
                email !== registeredUser.email ||
                password !== registeredUser.password
            ) {
                alert(
                    "Invalid email or password."
                );
                return;
            }

            const sessionUser = {
                name: registeredUser.name,
                email: registeredUser.email
            };

            localStorage.setItem(
                "dailymartUser",
                JSON.stringify(sessionUser)
            );

            alert("Login successful.");

            window.location.href = "profile.html";
        });
    }


    /* =========================================================
       PROFILE
    ========================================================= */

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const welcomeName =
        document.getElementById("welcomeName");

    if (currentUser) {

        if (profileName) {
            profileName.textContent =
                currentUser.name || "User";
        }

        if (profileEmail) {
            profileEmail.textContent =
                currentUser.email || "";
        }

        if (welcomeName) {
            welcomeName.textContent =
                currentUser.name || "User";
        }
    }


    /* =========================================================
       ADDRESS MANAGEMENT
    ========================================================= */

    const addressStorageKey =
        "dailymartAddresses";


    function getSavedAddresses() {
        return getLocalStorageArray(
            addressStorageKey
        );
    }


    function displayAddresses() {

        const addressList =
            document.getElementById("addressList");

        if (!addressList) {
            return;
        }

        const addresses =
            getSavedAddresses();

        addressList.innerHTML = "";

        if (addresses.length === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.textContent =
                "No addresses saved yet.";

            addressList.appendChild(
                emptyMessage
            );

            return;
        }

        addresses.forEach(function (address) {

            const card =
                document.createElement("div");

            card.className =
                "saved-address-card";


            const title =
                document.createElement("h3");

            title.textContent =
                address.name;


            const addressText =
                document.createElement("p");

            addressText.textContent =
                address.address;


            const cityText =
                document.createElement("p");

            cityText.textContent =
                address.city +
                " - " +
                address.pincode;


            const deleteButton =
                document.createElement("button");

            deleteButton.type = "button";

            deleteButton.textContent =
                "Delete";

            deleteButton.addEventListener(
                "click",
                function () {
                    deleteAddress(address.id);
                }
            );


            card.appendChild(title);
            card.appendChild(addressText);
            card.appendChild(cityText);
            card.appendChild(deleteButton);

            addressList.appendChild(card);
        });
    }


    function deleteAddress(id) {

        const addresses =
            getSavedAddresses();

        const updatedAddresses =
            addresses.filter(function (address) {
                return address.id !== id;
            });

        saveLocalStorageArray(
            addressStorageKey,
            updatedAddresses
        );

        displayAddresses();
        updateProfileStatuses();
    }


    const addressForm =
        document.getElementById("addressForm");

    if (addressForm) {

        addressForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const nameInput =
                    document.getElementById("addressName");

                const addressInput =
                    document.getElementById("addressText");

                const cityInput =
                    document.getElementById("addressCity");

                const pincodeInput =
                    document.getElementById("addressPincode");


                if (
                    !nameInput ||
                    !addressInput ||
                    !cityInput ||
                    !pincodeInput
                ) {
                    return;
                }


                const name =
                    nameInput.value.trim();

                const address =
                    addressInput.value.trim();

                const city =
                    cityInput.value.trim();

                const pincode =
                    pincodeInput.value.trim();


                if (
                    name === "" ||
                    address === "" ||
                    city === ""
                ) {
                    alert(
                        "Please fill all address fields."
                    );
                    return;
                }


                if (!/^\d{6}$/.test(pincode)) {
                    alert(
                        "Please enter a valid 6-digit pincode."
                    );
                    return;
                }


                const addresses =
                    getSavedAddresses();


                const newAddress = {
                    id: Date.now(),
                    name: name,
                    address: address,
                    city: city,
                    pincode: pincode
                };


                addresses.push(newAddress);


                saveLocalStorageArray(
                    addressStorageKey,
                    addresses
                );


                addressForm.reset();

                displayAddresses();
                updateProfileStatuses();


                alert(
                    "Address saved successfully."
                );
            }
        );
    }


    displayAddresses();


    /* =========================================================
       PAYMENT METHODS
    ========================================================= */

    const paymentStorageKey =
        "dailymartPaymentMethods";


    function getSavedPaymentMethods() {
        return getLocalStorageArray(
            paymentStorageKey
        );
    }


    function displayPaymentMethods() {

        const paymentList =
            document.getElementById("paymentList");

        if (!paymentList) {
            return;
        }

        const paymentMethods =
            getSavedPaymentMethods();

        paymentList.innerHTML = "";


        if (paymentMethods.length === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.textContent =
                "No payment methods saved yet.";

            paymentList.appendChild(
                emptyMessage
            );

            return;
        }


        paymentMethods.forEach(function (method) {

            const card =
                document.createElement("div");

            card.className =
                "saved-payment-card";


            const title =
                document.createElement("h3");

            title.textContent =
                method.type;


            const details =
                document.createElement("p");


            if (
                method.type === "UPI" &&
                method.upiId
            ) {
                details.textContent =
                    "UPI ID: " + method.upiId;
            } else {
                details.textContent =
                    "Cash payment on delivery";
            }


            const deleteButton =
                document.createElement("button");

            deleteButton.type = "button";

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


            card.appendChild(title);
            card.appendChild(details);
            card.appendChild(deleteButton);

            paymentList.appendChild(card);
        });
    }


    function deletePaymentMethod(id) {

        const methods =
            getSavedPaymentMethods();

        const updatedMethods =
            methods.filter(function (method) {
                return method.id !== id;
            });


        saveLocalStorageArray(
            paymentStorageKey,
            updatedMethods
        );


        displayPaymentMethods();
        updateProfileStatuses();
    }


    const paymentType =
        document.getElementById("paymentType");

    const upiField =
        document.getElementById("upiField");


    if (paymentType && upiField) {

        paymentType.addEventListener(
            "change",
            function () {

                if (paymentType.value === "UPI") {
                    upiField.classList.remove(
                        "hidden"
                    );
                } else {
                    upiField.classList.add(
                        "hidden"
                    );
                }
            }
        );
    }


    const paymentForm =
        document.getElementById("paymentForm");


    if (paymentForm) {

        paymentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const selectedType =
                    paymentType
                        ? paymentType.value
                        : "";


                const upiInput =
                    document.getElementById("upiId");


                if (selectedType === "") {
                    alert(
                        "Please select a payment method."
                    );
                    return;
                }


                let upiId = "";


                if (selectedType === "UPI") {

                    if (!upiInput) {
                        return;
                    }

                    upiId =
                        upiInput.value.trim();


                    if (upiId === "") {
                        alert(
                            "Please enter your UPI ID."
                        );
                        return;
                    }
                }


                const methods =
                    getSavedPaymentMethods();


                const newMethod = {
                    id: Date.now(),
                    type: selectedType,
                    upiId: upiId
                };


                methods.push(newMethod);


                saveLocalStorageArray(
                    paymentStorageKey,
                    methods
                );


                paymentForm.reset();


                if (upiField) {
                    upiField.classList.add(
                        "hidden"
                    );
                }


                displayPaymentMethods();
                updateProfileStatuses();


                alert(
                    "Payment method saved successfully."
                );
            }
        );
    }


    displayPaymentMethods();


    /* =========================================================
       PROFILE STATUS
    ========================================================= */

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

        const recentlyViewedStatus =
            document.getElementById(
                "recentlyViewedStatus"
            );


        /* Address */

        if (addressStatus) {

            const addresses =
                getSavedAddresses();

            if (addresses.length === 0) {

                addressStatus.textContent =
                    "No Addresses Saved";

            } else if (addresses.length === 1) {

                addressStatus.textContent =
                    "1 Address Saved";

            } else {

                addressStatus.textContent =
                    addresses.length +
                    " Addresses Saved";
            }
        }


        /* Payment */

        if (paymentStatus) {

            const methods =
                getSavedPaymentMethods();

            if (methods.length === 0) {

                paymentStatus.textContent =
                    "No Payment Methods";

            } else if (methods.length === 1) {

                paymentStatus.textContent =
                    "1 Method Saved";

            } else {

                paymentStatus.textContent =
                    methods.length +
                    " Methods Saved";
            }
        }


        /* Orders */

        if (orderStatus) {

            orderStatus.textContent =
                "No Orders Yet";
        }


        /* Cart */

        if (cartStatus) {

            const cartItems =
                getLocalStorageArray(
                    "dailymartCart"
                );


            if (cartItems.length === 0) {

                cartStatus.textContent =
                    "Cart is Empty";

            } else if (cartItems.length === 1) {

                cartStatus.textContent =
                    "1 Item in Cart";

            } else {

                cartStatus.textContent =
                    cartItems.length +
                    " Items in Cart";
            }
        }


        /* Wishlist */

        if (wishlistStatus) {

            const wishlistItems =
                getLocalStorageArray(
                    "dailymartWishlist"
                );


            if (wishlistItems.length === 0) {

                wishlistStatus.textContent =
                    "Wishlist is Empty";

            } else {

                wishlistStatus.textContent =
                    wishlistItems.length +
                    " Items in Wishlist";
            }
        }


        /* Recently Viewed */

        if (recentlyViewedStatus) {

            const recentlyViewedItems =
                getLocalStorageArray(
                    "dailymartRecentlyViewed"
                );


            if (
                recentlyViewedItems.length === 0
            ) {

                recentlyViewedStatus.textContent =
                    "No Recently Viewed Items";

            } else {

                recentlyViewedStatus.textContent =
                    recentlyViewedItems.length +
                    " Recently Viewed";
            }
        }
    }


    updateProfileStatuses();


    /* =========================================================
       CART
    ========================================================= */

    const cartItemsContainer =
        document.getElementById(
            "cartItemsContainer"
        );

    const cartEmptyState =
        document.getElementById(
            "cartEmptyState"
        );

    const cartSubtotal =
        document.getElementById(
            "cartSubtotal"
        );

    const cartDelivery =
        document.getElementById(
            "cartDelivery"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );


    function getCartItems() {

        return getLocalStorageArray(
            "dailymartCart"
        );
    }


    function saveCartItems(items) {

        saveLocalStorageArray(
            "dailymartCart",
            items
        );
    }


    function getItemPrice(item) {

        const price =
            Number(item.price);

        if (
            Number.isFinite(price) &&
            price >= 0
        ) {
            return price;
        }

        return 0;
    }


    function getItemQuantity(item) {

        const quantity =
            Number(item.quantity);

        if (
            Number.isInteger(quantity) &&
            quantity > 0
        ) {
            return quantity;
        }

        return 1;
    }


    function getItemName(item) {

        if (
            typeof item.name === "string" &&
            item.name.trim() !== ""
        ) {
            return item.name;
        }

        return "Grocery Item";
    }


    function getItemId(item, index) {

        if (
            item.id !== undefined &&
            item.id !== null
        ) {
            return String(item.id);
        }

        if (
            item.productId !== undefined &&
            item.productId !== null
        ) {
            return String(item.productId);
        }

        return "cart-item-" + index;
    }


    function renderCart() {

        if (
            !cartItemsContainer &&
            !cartEmptyState
        ) {
            return;
        }


        const cartItems =
            getCartItems();


        if (cartItems.length === 0) {

            if (cartEmptyState) {
                cartEmptyState.classList.remove(
                    "hidden"
                );
            }

            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = "";
            }

            if (cartSubtotal) {
                cartSubtotal.textContent = "₹0";
            }

            if (cartDelivery) {
                cartDelivery.textContent = "₹0";
            }

            if (cartTotal) {
                cartTotal.textContent = "₹0";
            }

            if (checkoutButton) {
                checkoutButton.disabled = true;
            }

            return;
        }


        if (cartEmptyState) {
            cartEmptyState.classList.add(
                "hidden"
            );
        }


        if (!cartItemsContainer) {
            return;
        }


        cartItemsContainer.innerHTML = "";


        let subtotal = 0;


        cartItems.forEach(function (item, index) {

            const price =
                getItemPrice(item);

            const quantity =
                getItemQuantity(item);

            const itemTotal =
                price * quantity;

            subtotal += itemTotal;


            const itemCard =
                document.createElement("div");

            itemCard.className =
                "cart-item";


            const itemInfo =
                document.createElement("div");

            itemInfo.className =
                "cart-item-info";


            const itemName =
                document.createElement("h3");

            itemName.textContent =
                getItemName(item);


            const priceText =
                document.createElement("p");

            priceText.textContent =
                "₹" +
                price.toFixed(2) +
                " each";


            itemInfo.appendChild(itemName);
            itemInfo.appendChild(priceText);


            const quantityControls =
                document.createElement("div");

            quantityControls.className =
                "cart-quantity-controls";


            const decreaseButton =
                document.createElement("button");

            decreaseButton.type = "button";

            decreaseButton.textContent = "−";


            const quantityText =
                document.createElement("span");

            quantityText.textContent =
                quantity;


            const increaseButton =
                document.createElement("button");

            increaseButton.type = "button";

            increaseButton.textContent = "+";


            const removeButton =
                document.createElement("button");

            removeButton.type = "button";

            removeButton.textContent =
                "Remove";


            decreaseButton.addEventListener(
                "click",
                function () {

                    updateCartQuantity(
                        index,
                        quantity - 1
                    );
                }
            );


            increaseButton.addEventListener(
                "click",
                function () {

                    updateCartQuantity(
                        index,
                        quantity + 1
                    );
                }
            );


            removeButton.addEventListener(
                "click",
                function () {

                    removeCartItem(index);
                }
            );


            quantityControls.appendChild(
                decreaseButton
            );

            quantityControls.appendChild(
                quantityText
            );

            quantityControls.appendChild(
                increaseButton
            );

            quantityControls.appendChild(
                removeButton
            );


            const itemTotalText =
                document.createElement("strong");

            itemTotalText.textContent =
                "₹" +
                itemTotal.toFixed(2);


            itemCard.appendChild(itemInfo);
            itemCard.appendChild(
                quantityControls
            );
            itemCard.appendChild(
                itemTotalText
            );


            cartItemsContainer.appendChild(
                itemCard
            );
        });


        /*
            Delivery calculation is intentionally simple
            for the frontend foundation.

            Real delivery rules can be connected
            to backend/admin settings later.
        */

        const delivery =
            subtotal > 0 ? 0 : 0;


        const total =
            subtotal + delivery;


        if (cartSubtotal) {
            cartSubtotal.textContent =
                "₹" + subtotal.toFixed(2);
        }


        if (cartDelivery) {
            cartDelivery.textContent =
                "₹" + delivery.toFixed(2);
        }


        if (cartTotal) {
            cartTotal.textContent =
                "₹" + total.toFixed(2);
        }


        if (checkoutButton) {
            checkoutButton.disabled =
                false;
        }
    }


    function updateCartQuantity(
        index,
        newQuantity
    ) {

        const cartItems =
            getCartItems();


        if (
            index < 0 ||
            index >= cartItems.length
        ) {
            return;
        }


        if (newQuantity <= 0) {

            cartItems.splice(index, 1);

        } else {

            cartItems[index].quantity =
                newQuantity;
        }


        saveCartItems(cartItems);

        renderCart();
        updateProfileStatuses();
    }


    function removeCartItem(index) {

        const cartItems =
            getCartItems();


        if (
            index < 0 ||
            index >= cartItems.length
        ) {
            return;
        }


        cartItems.splice(index, 1);


        saveCartItems(cartItems);

        renderCart();
        updateProfileStatuses();
    }


    renderCart();


    /* =========================================================
       CHECKOUT BUTTON
    ========================================================= */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                const cartItems =
                    getCartItems();


                if (cartItems.length === 0) {
                    return;
                }


                window.location.href =
                    "checkout.html";
            }
        );
    }


    /* =========================================================
       LOGOUT
    ========================================================= */

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

                alert(
                    "You have been logged out."
                );

                window.location.href =
                    "index.html";
            }
        );
    }

});