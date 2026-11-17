
// Get JSON Data

$.getJSON("assets/js/products.json", function(data) {

    console.log("JSON Loaded Successfully");

    console.log(data);

    let products = data.products;

    // Display Products

    $.each(products, function(index, product) {

        $("#slider").append(`

            <div class="product">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p class="price">${product.price}</p>

            </div>

        `);

    });


    console.log("Total Products:", products.length);


    // Next Button

    $("#next").click(function() {

        let firstProduct = $(".product:first");

        let width = firstProduct.outerWidth(true);

        $("#slider").animate({

            "margin-left": -width

        }, 300, function() {

            $("#slider").append(firstProduct);

            $("#slider").css("margin-left", "0");

        });

    });


    // Previous Button

    $("#prev").click(function() {

        let lastProduct = $(".product:last");

        let width = lastProduct.outerWidth(true);

        $("#slider").prepend(lastProduct);

        $("#slider").css("margin-left", -width);

        $("#slider").animate({

            "margin-left": "0"

        }, 300);

    });


}).fail(function() {

    console.log("JSON File Not Found!");

    $("#slider").html("<h3>Unable to load products. Check JSON file path.</h3>");

});
