/*
    DailyMart
    Customer Frontend

    Day 1 - Part 3

    No fake products.
    No fake categories.
*/

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "DailyMart Customer Frontend Loaded Successfully."
        );


        const shopButton =
            document.querySelector(
                ".primary-button"
            );


        if (shopButton) {

            shopButton.addEventListener(
                "click",
                function () {

                    const productsSection =
                        document.querySelector(
                            "#products"
                        );


                    if (productsSection) {

                        productsSection.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        }

    }
);