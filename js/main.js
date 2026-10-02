document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       COMMON HELPERS
    ========================================================= */

    function getLocalStorageArray(key) {

        let data = [];

        try {

            data = JSON.parse(
                localStorage.getItem(key) || "[]"
            );

        } catch (error) {

            data = [];
        }

        return Array.isArray(data) ? data : [];
    }


    function saveLocalStorageArray(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );
    }


    function getCurrentUser() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "dailymartUser"
                ) || "null"
            );

        } catch (error) {

            return null;
        }
    }


    function formatPrice(amount) {

        const value = Number(amount);

        if (
            !Number.isFinite(value) ||
            value < 0
        ) {

            return "₹0.00";
        }

        return "₹" + value.toFixed(2);
    }


    /* =========================================================
       SEARCH
    ========================================================= */

    const searchForm =
        document.getElementById(
            "searchForm"
        );

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (
        searchForm &&
        searchInput
    ) {

        searchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const query =
                    searchInput.value.trim();


                if (query === "") {

                    return;
                }


                window.location.href =
                    "search.html?q=" +
                    encodeURIComponent(
                        query
                    );
            }
        );
    }


    /* =========================================================
       SEARCH RESULTS PAGE
    ========================================================= */

    const searchQueryText =
        document.getElementById(
            "searchQueryText"
        );

    const searchEmptyState =
        document.getElementById(
            "searchEmptyState"
        );

    const searchResults =
        document.getElementById(
            "searchResults"
        );


    if (
        searchQueryText ||
        searchEmptyState ||
        searchResults
    ) {

        const urlParams =
            new URLSearchParams(
                window.location.search
            );


        const query =
            urlParams.get("q");


        if (
            searchQueryText
        ) {

            if (query) {

                searchQueryText.textContent =
                    'Showing results for "' +
                    query +
                    '".';

            } else {

                searchQueryText.textContent =
                    "Search for grocery items.";
            }
        }


        /*
            Product data will come from Admin/Backend later.

            No fake products are created here.
        */

        if (
            searchEmptyState
        ) {

            searchEmptyState.classList.remove(
                "hidden"
            );
        }


        if (
            searchResults
        ) {

            searchResults.innerHTML =
                "";
        }
    }


    /* =========================================================
       AUTH HEADER
    ========================================================= */

    const loginLink =
        document.getElementById(
            "loginLink"
        );

    const registerLink =
        document.getElementById(
            "registerLink"
        );

    const profileLink =
        document.getElementById(
            "profileLink"
        );


    const currentUser =
        getCurrentUser();


    if (currentUser) {

        if (loginLink) {

            loginLink.classList.add(
                "hidden"
            );
        }


        if (registerLink) {

            registerLink.classList.add(
                "hidden"
            );
        }


        if (profileLink) {

            profileLink.classList.remove(
                "hidden"
            );
        }

    } else {

        if (loginLink) {

            loginLink.classList.remove(
                "hidden"
            );
        }


        if (registerLink) {

            registerLink.classList.remove(
                "hidden"
            );
        }


        if (profileLink) {

            profileLink.classList.add(
                "hidden"
            );
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
        "recently-viewed.html",
        "checkout.html"

    ];


    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (
        protectedPages.includes(
            currentPage
        ) &&
        !currentUser
    ) {

        window.location.href =
            "login.html";

        return;
    }


    /* =========================================================
       REGISTER
    ========================================================= */

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "registerName"
                    );

                const emailInput =
                    document.getElementById(
                        "registerEmail"
                    );

                const passwordInput =
                    document.getElementById(
                        "registerPassword"
                    );


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

                    alert(
                        "Please fill all fields."
                    );

                    return;
                }


                const registeredUser = {

                    name: name,

                    email: email,

                    password: password
                };


                localStorage.setItem(
                    "dailymartRegisteredUser",
                    JSON.stringify(
                        registeredUser
                    )
                );


                alert(
                    "Registration successful. Please login."
                );


                window.location.href =
                    "login.html";
            }
        );
    }


    /* =========================================================
       LOGIN
    ========================================================= */

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const emailInput =
                    document.getElementById(
                        "loginEmail"
                    );

                const passwordInput =
                    document.getElementById(
                        "loginPassword"
                    );


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


                let registeredUser =
                    null;


                try {

                    registeredUser =
                        JSON.parse(
                            localStorage.getItem(
                                "dailymartRegisteredUser"
                            ) || "null"
                        );

                } catch (error) {

                    registeredUser =
                        null;
                }


                if (!registeredUser) {

                    alert(
                        "No registered account found. Please register first."
                    );

                    return;
                }


                if (
                    email !==
                        registeredUser.email ||
                    password !==
                        registeredUser.password
                ) {

                    alert(
                        "Invalid email or password."
                    );

                    return;
                }


                const sessionUser = {

                    name:
                        registeredUser.name,

                    email:
                        registeredUser.email
                };


                localStorage.setItem(
                    "dailymartUser",
                    JSON.stringify(
                        sessionUser
                    )
                );


                alert(
                    "Login successful."
                );


                window.location.href =
                    "profile.html";
            }
        );
    }


    /* =========================================================
       PROFILE
    ========================================================= */

    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const welcomeName =
        document.getElementById(
            "welcomeName"
        );


    if (currentUser) {

        if (profileName) {

            profileName.textContent =
                currentUser.name ||
                "User";
        }


        if (profileEmail) {

            profileEmail.textContent =
                currentUser.email ||
                "";
        }


        if (welcomeName) {

            welcomeName.textContent =
                currentUser.name ||
                "User";
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
            document.getElementById(
                "addressList"
            );


        if (!addressList) {

            return;
        }


        const addresses =
            getSavedAddresses();


        addressList.innerHTML =
            "";


        if (
            addresses.length === 0
        ) {

            const emptyMessage =
                document.createElement(
                    "p"
                );


            emptyMessage.textContent =
                "No addresses saved yet.";


            addressList.appendChild(
                emptyMessage
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


                const title =
                    document.createElement(
                        "h3"
                    );


                title.textContent =
                    address.name;


                const addressText =
                    document.createElement(
                        "p"
                    );


                addressText.textContent =
                    address.address;


                const cityText =
                    document.createElement(
                        "p"
                    );


                cityText.textContent =
                    address.city +
                    " - " +
                    address.pincode;


                const deleteButton =
                    document.createElement(
                        "button"
                    );


                deleteButton.type =
                    "button";


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
                    title
                );


                card.appendChild(
                    addressText
                );


                card.appendChild(
                    cityText
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


    function deleteAddress(id) {

        const addresses =
            getSavedAddresses();


        const updatedAddresses =
            addresses.filter(
                function (address) {

                    return (
                        address.id !== id
                    );
                }
            );


        saveLocalStorageArray(
            addressStorageKey,
            updatedAddresses
        );


        displayAddresses();

        displayCheckoutData();

        updateProfileStatuses();
    }


    const addressForm =
        document.getElementById(
            "addressForm"
        );


    if (addressForm) {

        addressForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "addressName"
                    );

                const addressInput =
                    document.getElementById(
                        "addressText"
                    );

                const cityInput =
                    document.getElementById(
                        "addressCity"
                    );

                const pincodeInput =
                    document.getElementById(
                        "addressPincode"
                    );


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


                if (
                    !/^\d{6}$/.test(
                        pincode
                    )
                ) {

                    alert(
                        "Please enter a valid 6-digit pincode."
                    );

                    return;
                }


                const addresses =
                    getSavedAddresses();


                const newAddress = {

                    id: Date.now(),

                    name:
                        name,

                    address:
                        address,

                    city:
                        city,

                    pincode:
                        pincode
                };


                addresses.push(
                    newAddress
                );


                saveLocalStorageArray(
                    addressStorageKey,
                    addresses
                );


                addressForm.reset();


                displayAddresses();

                displayCheckoutData();

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
            document.getElementById(
                "paymentList"
            );


        if (!paymentList) {

            return;
        }


        const paymentMethods =
            getSavedPaymentMethods();


        paymentList.innerHTML =
            "";


        if (
            paymentMethods.length === 0
        ) {

            const emptyMessage =
                document.createElement(
                    "p"
                );


            emptyMessage.textContent =
                "No payment methods saved yet.";


            paymentList.appendChild(
                emptyMessage
            );


            return;
        }


        paymentMethods.forEach(
            function (method) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "saved-payment-card";


                const title =
                    document.createElement(
                        "h3"
                    );


                title.textContent =
                    method.type;


                const details =
                    document.createElement(
                        "p"
                    );


                if (
                    method.type === "UPI" &&
                    method.upiId
                ) {

                    details.textContent =
                        "UPI ID: " +
                        method.upiId;

                } else {

                    details.textContent =
                        "Cash payment on delivery";
                }


                const deleteButton =
                    document.createElement(
                        "button"
                    );


                deleteButton.type =
                    "button";


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
                    title
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


    function deletePaymentMethod(id) {

        const methods =
            getSavedPaymentMethods();


        const updatedMethods =
            methods.filter(
                function (method) {

                    return (
                        method.id !== id
                    );
                }
            );


        saveLocalStorageArray(
            paymentStorageKey,
            updatedMethods
        );


        displayPaymentMethods();

        displayCheckoutData();

        updateProfileStatuses();
    }


    const paymentType =
        document.getElementById(
            "paymentType"
        );


    const upiField =
        document.getElementById(
            "upiField"
        );


    if (
        paymentType &&
        upiField
    ) {

        paymentType.addEventListener(
            "change",
            function () {

                if (
                    paymentType.value ===
                    "UPI"
                ) {

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
        document.getElementById(
            "paymentForm"
        );


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
                    document.getElementById(
                        "upiId"
                    );


                if (
                    selectedType === ""
                ) {

                    alert(
                        "Please select a payment method."
                    );

                    return;
                }


                let upiId = "";


                if (
                    selectedType ===
                    "UPI"
                ) {

                    if (!upiInput) {

                        return;
                    }


                    upiId =
                        upiInput.value.trim();


                    if (
                        upiId === ""
                    ) {

                        alert(
                            "Please enter your UPI ID."
                        );

                        return;
                    }
                }


                const methods =
                    getSavedPaymentMethods();


                const newMethod = {

                    id:
                        Date.now(),

                    type:
                        selectedType,

                    upiId:
                        upiId
                };


                methods.push(
                    newMethod
                );


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

                displayCheckoutData();

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


        if (addressStatus) {

            const addresses =
                getSavedAddresses();


            if (
                addresses.length === 0
            ) {

                addressStatus.textContent =
                    "No Addresses Saved";

            } else if (
                addresses.length === 1
            ) {

                addressStatus.textContent =
                    "1 Address Saved";

            } else {

                addressStatus.textContent =
                    addresses.length +
                    " Addresses Saved";
            }
        }


        if (paymentStatus) {

            const methods =
                getSavedPaymentMethods();


            if (
                methods.length === 0
            ) {

                paymentStatus.textContent =
                    "No Payment Methods";

            } else if (
                methods.length === 1
            ) {

                paymentStatus.textContent =
                    "1 Method Saved";

            } else {

                paymentStatus.textContent =
                    methods.length +
                    " Methods Saved";
            }
        }


        if (orderStatus) {

            const orders =
                getLocalStorageArray(
                    "dailymartOrders"
                );


            if (
                orders.length === 0
            ) {

                orderStatus.textContent =
                    "No Orders Yet";

            } else if (
                orders.length === 1
            ) {

                orderStatus.textContent =
                    "1 Order";

            } else {

                orderStatus.textContent =
                    orders.length +
                    " Orders";
            }
        }


        if (cartStatus) {

            const cartItems =
                getLocalStorageArray(
                    "dailymartCart"
                );


            if (
                cartItems.length === 0
            ) {

                cartStatus.textContent =
                    "Cart is Empty";

            } else if (
                cartItems.length === 1
            ) {

                cartStatus.textContent =
                    "1 Item in Cart";

            } else {

                cartStatus.textContent =
                    cartItems.length +
                    " Items in Cart";
            }
        }


        if (wishlistStatus) {

            const wishlistItems =
                getLocalStorageArray(
                    "dailymartWishlist"
                );


            if (
                wishlistItems.length === 0
            ) {

                wishlistStatus.textContent =
                    "Wishlist is Empty";

            } else {

                wishlistStatus.textContent =
                    wishlistItems.length +
                    " Items in Wishlist";
            }
        }


        if (
            recentlyViewedStatus
        ) {

            const recentlyViewedItems =
                getLocalStorageArray(
                    "dailymartRecentlyViewed"
                );


            if (
                recentlyViewedItems.length ===
                0
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
            typeof item.name ===
                "string" &&
            item.name.trim() !== ""
        ) {

            return item.name;
        }


        return "Grocery Item";
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


        if (
            cartItems.length === 0
        ) {

            if (cartEmptyState) {

                cartEmptyState.classList.remove(
                    "hidden"
                );
            }


            if (cartItemsContainer) {

                cartItemsContainer.innerHTML =
                    "";
            }


            if (cartSubtotal) {

                cartSubtotal.textContent =
                    "₹0";
            }


            if (cartDelivery) {

                cartDelivery.textContent =
                    "₹0";
            }


            if (cartTotal) {

                cartTotal.textContent =
                    "₹0";
            }


            if (checkoutButton) {

                checkoutButton.disabled =
                    true;
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


        cartItemsContainer.innerHTML =
            "";


        let subtotal = 0;


        cartItems.forEach(
            function (item, index) {

                const price =
                    getItemPrice(item);


                const quantity =
                    getItemQuantity(item);


                const itemTotal =
                    price * quantity;


                subtotal +=
                    itemTotal;


                const itemCard =
                    document.createElement(
                        "div"
                    );


                itemCard.className =
                    "cart-item";


                const itemInfo =
                    document.createElement(
                        "div"
                    );


                itemInfo.className =
                    "cart-item-info";


                const itemName =
                    document.createElement(
                        "h3"
                    );


                itemName.textContent =
                    getItemName(item);


                const priceText =
                    document.createElement(
                        "p"
                    );


                priceText.textContent =
                    formatPrice(price) +
                    " each";


                itemInfo.appendChild(
                    itemName
                );


                itemInfo.appendChild(
                    priceText
                );


                const quantityControls =
                    document.createElement(
                        "div"
                    );


                quantityControls.className =
                    "cart-quantity-controls";


                const decreaseButton =
                    document.createElement(
                        "button"
                    );


                decreaseButton.type =
                    "button";


                decreaseButton.textContent =
                    "−";


                const quantityText =
                    document.createElement(
                        "span"
                    );


                quantityText.textContent =
                    quantity;


                const increaseButton =
                    document.createElement(
                        "button"
                    );


                increaseButton.type =
                    "button";


                increaseButton.textContent =
                    "+";


                const removeButton =
                    document.createElement(
                        "button"
                    );


                removeButton.type =
                    "button";


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

                        removeCartItem(
                            index
                        );
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
                    document.createElement(
                        "strong"
                    );


                itemTotalText.textContent =
                    formatPrice(
                        itemTotal
                    );


                itemCard.appendChild(
                    itemInfo
                );


                itemCard.appendChild(
                    quantityControls
                );


                itemCard.appendChild(
                    itemTotalText
                );


                cartItemsContainer.appendChild(
                    itemCard
                );
            }
        );


        const delivery = 0;

        const total =
            subtotal + delivery;


        if (cartSubtotal) {

            cartSubtotal.textContent =
                formatPrice(
                    subtotal
                );
        }


        if (cartDelivery) {

            cartDelivery.textContent =
                formatPrice(
                    delivery
                );
        }


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(
                    total
                );
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


        if (
            newQuantity <= 0
        ) {

            cartItems.splice(
                index,
                1
            );

        } else {

            cartItems[index].quantity =
                newQuantity;
        }


        saveCartItems(
            cartItems
        );


        renderCart();

        updateProfileStatuses();

        displayCheckoutData();
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


        cartItems.splice(
            index,
            1
        );


        saveCartItems(
            cartItems
        );


        renderCart();

        updateProfileStatuses();

        displayCheckoutData();
    }


    renderCart();


    /* =========================================================
       CART → CHECKOUT
    ========================================================= */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                const cartItems =
                    getCartItems();


                if (
                    cartItems.length === 0
                ) {

                    return;
                }


                window.location.href =
                    "checkout.html";
            }
        );
    }


    /* =========================================================
       CHECKOUT
    ========================================================= */

    const checkoutItemsContainer =
        document.getElementById(
            "checkoutItemsContainer"
        );

    const checkoutSubtotal =
        document.getElementById(
            "checkoutSubtotal"
        );

    const checkoutDelivery =
        document.getElementById(
            "checkoutDelivery"
        );

    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );

    const checkoutAddressEmpty =
        document.getElementById(
            "checkoutAddressEmpty"
        );

    const checkoutAddressList =
        document.getElementById(
            "checkoutAddressList"
        );

    const checkoutPaymentEmpty =
        document.getElementById(
            "checkoutPaymentEmpty"
        );

    const checkoutPaymentList =
        document.getElementById(
            "checkoutPaymentList"
        );

    const placeOrderButton =
        document.getElementById(
            "placeOrderButton"
        );


    const selectedAddressStorageKey =
        "dailymartSelectedAddress";


    const selectedPaymentStorageKey =
        "dailymartSelectedPayment";


    function getSelectedAddressId() {

        return localStorage.getItem(
            selectedAddressStorageKey
        );
    }


    function getSelectedPaymentId() {

        return localStorage.getItem(
            selectedPaymentStorageKey
        );
    }


    function setSelectedAddressId(id) {

        localStorage.setItem(
            selectedAddressStorageKey,
            String(id)
        );
    }


    function setSelectedPaymentId(id) {

        localStorage.setItem(
            selectedPaymentStorageKey,
            String(id)
        );
    }


    function updatePlaceOrderButton() {

        if (!placeOrderButton) {

            return;
        }


        const cartItems =
            getCartItems();


        const addresses =
            getSavedAddresses();


        const paymentMethods =
            getSavedPaymentMethods();


        const selectedAddressId =
            getSelectedAddressId();


        const selectedPaymentId =
            getSelectedPaymentId();


        const addressSelected =
            addresses.some(
                function (address) {

                    return (
                        String(address.id) ===
                        String(
                            selectedAddressId
                        )
                    );
                }
            );


        const paymentSelected =
            paymentMethods.some(
                function (method) {

                    return (
                        String(method.id) ===
                        String(
                            selectedPaymentId
                        )
                    );
                }
            );


        placeOrderButton.disabled = !(
            cartItems.length > 0 &&
            addressSelected &&
            paymentSelected
        );
    }


    function displayCheckoutData() {

        if (
            !checkoutItemsContainer &&
            !checkoutSubtotal &&
            !checkoutAddressList &&
            !checkoutPaymentList
        ) {

            return;
        }


        const cartItems =
            getCartItems();


        const addresses =
            getSavedAddresses();


        const paymentMethods =
            getSavedPaymentMethods();


        /* -----------------------------------------------------
           CART ITEMS
        ----------------------------------------------------- */

        if (checkoutItemsContainer) {

            checkoutItemsContainer.innerHTML =
                "";


            if (
                cartItems.length === 0
            ) {

                const emptyMessage =
                    document.createElement(
                        "p"
                    );


                emptyMessage.textContent =
                    "Your Cart is Empty.";


                checkoutItemsContainer.appendChild(
                    emptyMessage
                );

            } else {

                cartItems.forEach(
                    function (item) {

                        const row =
                            document.createElement(
                                "div"
                            );


                        row.className =
                            "checkout-item";


                        const name =
                            document.createElement(
                                "span"
                            );


                        name.textContent =
                            getItemName(
                                item
                            );


                        const quantity =
                            getItemQuantity(
                                item
                            );


                        const price =
                            getItemPrice(
                                item
                            );


                        const details =
                            document.createElement(
                                "span"
                            );


                        details.textContent =
                            "Qty: " +
                            quantity +
                            " × " +
                            formatPrice(
                                price
                            );


                        const total =
                            document.createElement(
                                "strong"
                            );


                        total.textContent =
                            formatPrice(
                                price *
                                quantity
                            );


                        row.appendChild(
                            name
                        );


                        row.appendChild(
                            details
                        );


                        row.appendChild(
                            total
                        );


                        checkoutItemsContainer.appendChild(
                            row
                        );
                    }
                );
            }
        }


        /* -----------------------------------------------------
           ADDRESS
        ----------------------------------------------------- */

        if (
            checkoutAddressList
        ) {

            checkoutAddressList.innerHTML =
                "";


            if (
                addresses.length === 0
            ) {

                if (
                    checkoutAddressEmpty
                ) {

                    checkoutAddressEmpty.classList.remove(
                        "hidden"
                    );
                }

            } else {

                if (
                    checkoutAddressEmpty
                ) {

                    checkoutAddressEmpty.classList.add(
                        "hidden"
                    );
                }


                let selectedAddressId =
                    getSelectedAddressId();


                const selectedAddressExists =
                    addresses.some(
                        function (address) {

                            return (
                                String(address.id) ===
                                String(
                                    selectedAddressId
                                )
                            );
                        }
                    );


                if (
                    !selectedAddressExists
                ) {

                    selectedAddressId =
                        null;


                    localStorage.removeItem(
                        selectedAddressStorageKey
                    );
                }


                addresses.forEach(
                    function (address) {

                        const card =
                            document.createElement(
                                "div"
                            );


                        card.className =
                            "checkout-address-card";


                        if (
                            String(address.id) ===
                            String(
                                selectedAddressId
                            )
                        ) {

                            card.classList.add(
                                "selected"
                            );
                        }


                        const title =
                            document.createElement(
                                "h3"
                            );


                        title.textContent =
                            address.name;


                        const addressText =
                            document.createElement(
                                "p"
                            );


                        addressText.textContent =
                            address.address;


                        const locationText =
                            document.createElement(
                                "p"
                            );


                        locationText.textContent =
                            address.city +
                            " - " +
                            address.pincode;


                        card.appendChild(
                            title
                        );


                        card.appendChild(
                            addressText
                        );


                        card.appendChild(
                            locationText
                        );


                        if (
                            String(address.id) ===
                            String(
                                selectedAddressId
                            )
                        ) {

                            const badge =
                                document.createElement(
                                    "span"
                                );


                            badge.className =
                                "checkout-selected-badge";


                            badge.textContent =
                                "Selected";


                            card.appendChild(
                                badge
                            );
                        }


                        card.addEventListener(
                            "click",
                            function () {

                                setSelectedAddressId(
                                    address.id
                                );


                                displayCheckoutData();
                            }
                        );


                        checkoutAddressList.appendChild(
                            card
                        );
                    }
                );
            }
        }


        /* -----------------------------------------------------
           PAYMENT
        ----------------------------------------------------- */

        if (
            checkoutPaymentList
        ) {

            checkoutPaymentList.innerHTML =
                "";


            if (
                paymentMethods.length === 0
            ) {

                if (
                    checkoutPaymentEmpty
                ) {

                    checkoutPaymentEmpty.classList.remove(
                        "hidden"
                    );
                }

            } else {

                if (
                    checkoutPaymentEmpty
                ) {

                    checkoutPaymentEmpty.classList.add(
                        "hidden"
                    );
                }


                let selectedPaymentId =
                    getSelectedPaymentId();


                const selectedPaymentExists =
                    paymentMethods.some(
                        function (method) {

                            return (
                                String(method.id) ===
                                String(
                                    selectedPaymentId
                                )
                            );
                        }
                    );


                if (
                    !selectedPaymentExists
                ) {

                    selectedPaymentId =
                        null;


                    localStorage.removeItem(
                        selectedPaymentStorageKey
                    );
                }


                paymentMethods.forEach(
                    function (method) {

                        const card =
                            document.createElement(
                                "div"
                            );


                        card.className =
                            "checkout-payment-card";


                        if (
                            String(method.id) ===
                            String(
                                selectedPaymentId
                            )
                        ) {

                            card.classList.add(
                                "selected"
                            );
                        }


                        const title =
                            document.createElement(
                                "h3"
                            );


                        title.textContent =
                            method.type;


                        const details =
                            document.createElement(
                                "p"
                            );


                        if (
                            method.type ===
                                "UPI" &&
                            method.upiId
                        ) {

                            details.textContent =
                                "UPI ID: " +
                                method.upiId;

                        } else {

                            details.textContent =
                                "Cash payment on delivery";
                        }


                        card.appendChild(
                            title
                        );


                        card.appendChild(
                            details
                        );


                        if (
                            String(method.id) ===
                            String(
                                selectedPaymentId
                            )
                        ) {

                            const badge =
                                document.createElement(
                                    "span"
                                );


                            badge.className =
                                "checkout-selected-badge";


                            badge.textContent =
                                "Selected";


                            card.appendChild(
                                badge
                            );
                        }


                        card.addEventListener(
                            "click",
                            function () {

                                setSelectedPaymentId(
                                    method.id
                                );


                                displayCheckoutData();
                            }
                        );


                        checkoutPaymentList.appendChild(
                            card
                        );
                    }
                );
            }
        }


        /* -----------------------------------------------------
           SUMMARY
        ----------------------------------------------------- */

        let subtotal = 0;


        cartItems.forEach(
            function (item) {

                subtotal +=
                    getItemPrice(item) *
                    getItemQuantity(item);
            }
        );


        const delivery = 0;

        const total =
            subtotal + delivery;


        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                formatPrice(
                    subtotal
                );
        }


        if (checkoutDelivery) {

            checkoutDelivery.textContent =
                formatPrice(
                    delivery
                );
        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatPrice(
                    total
                );
        }


        updatePlaceOrderButton();
    }


    displayCheckoutData();


    /* =========================================================
       PLACE ORDER
    ========================================================= */

    if (placeOrderButton) {

        placeOrderButton.addEventListener(
            "click",
            function () {

                const cartItems =
                    getCartItems();


                const addresses =
                    getSavedAddresses();


                const paymentMethods =
                    getSavedPaymentMethods();


                const selectedAddressId =
                    getSelectedAddressId();


                const selectedPaymentId =
                    getSelectedPaymentId();


                const selectedAddress =
                    addresses.find(
                        function (address) {

                            return (
                                String(address.id) ===
                                String(
                                    selectedAddressId
                                )
                            );
                        }
                    );


                const selectedPayment =
                    paymentMethods.find(
                        function (method) {

                            return (
                                String(method.id) ===
                                String(
                                    selectedPaymentId
                                )
                            );
                        }
                    );


                if (
                    cartItems.length === 0 ||
                    !selectedAddress ||
                    !selectedPayment
                ) {

                    alert(
                        "Please select cart items, address and payment method."
                    );

                    return;
                }


                let subtotal = 0;


                cartItems.forEach(
                    function (item) {

                        subtotal +=
                            getItemPrice(item) *
                            getItemQuantity(item);
                    }
                );


                const delivery = 0;

                const total =
                    subtotal + delivery;


                const orders =
                    getLocalStorageArray(
                        "dailymartOrders"
                    );


                const orderId =
                    "DM" +
                    Date.now();


                const newOrder = {

                    id:
                        orderId,

                    date:
                        new Date().toISOString(),

                    status:
                        "Order Placed",

                    items:
                        cartItems.map(
                            function (item) {

                                return {
                                    ...item
                                };
                            }
                        ),

                    address: {

                        name:
                            selectedAddress.name,

                        address:
                            selectedAddress.address,

                        city:
                            selectedAddress.city,

                        pincode:
                            selectedAddress.pincode
                    },

                    payment: {

                        type:
                            selectedPayment.type,

                        upiId:
                            selectedPayment.upiId ||
                            ""
                    },

                    subtotal:
                        subtotal,

                    delivery:
                        delivery,

                    total:
                        total
                };


                orders.unshift(
                    newOrder
                );


                saveLocalStorageArray(
                    "dailymartOrders",
                    orders
                );


                saveCartItems(
                    []
                );


                localStorage.removeItem(
                    "dailymartSelectedAddress"
                );


                localStorage.removeItem(
                    "dailymartSelectedPayment"
                );


                alert(
                    "Order placed successfully!"
                );


                window.location.href =
                    "orders.html";
            }
        );
    }


    /* =========================================================
       ORDERS PAGE
    ========================================================= */

    const ordersEmptyState =
        document.getElementById(
            "ordersEmptyState"
        );


    const ordersList =
        document.getElementById(
            "ordersList"
        );


    function displayOrders() {

        if (
            !ordersEmptyState &&
            !ordersList
        ) {

            return;
        }


        const orders =
            getLocalStorageArray(
                "dailymartOrders"
            );


        if (
            orders.length === 0
        ) {

            if (ordersEmptyState) {

                ordersEmptyState.classList.remove(
                    "hidden"
                );
            }


            if (ordersList) {

                ordersList.innerHTML =
                    "";
            }


            return;
        }


        if (ordersEmptyState) {

            ordersEmptyState.classList.add(
                "hidden"
            );
        }


        if (!ordersList) {

            return;
        }


        ordersList.innerHTML =
            "";


        orders.forEach(
            function (order) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "order-card";


                const header =
                    document.createElement(
                        "div"
                    );


                header.className =
                    "order-header";


                const headerInfo =
                    document.createElement(
                        "div"
                    );


                const orderTitle =
                    document.createElement(
                        "h2"
                    );


                orderTitle.textContent =
                    "Order #" +
                    order.id;


                const date =
                    document.createElement(
                        "p"
                    );


                const orderDate =
                    new Date(
                        order.date
                    );


                date.textContent =
                    "Placed on " +
                    orderDate.toLocaleString(
                        "en-IN"
                    );


                date.className =
                    "order-date";


                headerInfo.appendChild(
                    orderTitle
                );


                headerInfo.appendChild(
                    date
                );


                const status =
                    document.createElement(
                        "span"
                    );


                status.className =
                    "order-status";


                status.textContent =
                    order.status ||
                    "Order Placed";


                header.appendChild(
                    headerInfo
                );


                header.appendChild(
                    status
                );


                card.appendChild(
                    header
                );


                const itemsContainer =
                    document.createElement(
                        "div"
                    );


                itemsContainer.className =
                    "order-items";


                const items =
                    Array.isArray(
                        order.items
                    )
                        ? order.items
                        : [];


                items.forEach(
                    function (item) {

                        const row =
                            document.createElement(
                                "div"
                            );


                        row.className =
                            "order-item";


                        const itemName =
                            document.createElement(
                                "span"
                            );


                        itemName.className =
                            "order-item-name";


                        itemName.textContent =
                            getItemName(
                                item
                            );


                        const itemDetails =
                            document.createElement(
                                "span"
                            );


                        itemDetails.className =
                            "order-item-details";


                        itemDetails.textContent =
                            "Qty: " +
                            getItemQuantity(
                                item
                            );


                        const itemPrice =
                            document.createElement(
                                "span"
                            );


                        itemPrice.className =
                            "order-item-price";


                        itemPrice.textContent =
                            formatPrice(
                                getItemPrice(
                                    item
                                ) *
                                getItemQuantity(
                                    item
                                )
                            );


                        row.appendChild(
                            itemName
                        );


                        row.appendChild(
                            itemDetails
                        );


                        row.appendChild(
                            itemPrice
                        );


                        itemsContainer.appendChild(
                            row
                        );
                    }
                );


                card.appendChild(
                    itemsContainer
                );


                const details =
                    document.createElement(
                        "div"
                    );


                details.className =
                    "order-details";


                const addressText =
                    document.createElement(
                        "p"
                    );


                addressText.textContent =
                    "Delivery Address: " +
                    order.address.name +
                    ", " +
                    order.address.address +
                    ", " +
                    order.address.city +
                    " - " +
                    order.address.pincode;


                const paymentText =
                    document.createElement(
                        "p"
                    );


                paymentText.textContent =
                    "Payment: " +
                    order.payment.type;


                const totalText =
                    document.createElement(
                        "p"
                    );


                totalText.className =
                    "order-total";


                totalText.textContent =
                    "Total: " +
                    formatPrice(
                        order.total
                    );


                details.appendChild(
                    addressText
                );


                details.appendChild(
                    paymentText
                );


                details.appendChild(
                    totalText
                );


                card.appendChild(
                    details
                );


                ordersList.appendChild(
                    card
                );
            }
        );
    }


    displayOrders();


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