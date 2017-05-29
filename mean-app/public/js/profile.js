///<reference path="C:\Users\Youssef Yacoub\Desktop\Sara&Ghada(Home+courses)\js\y_tabs\jquery-1.12.4.min.js" />

$(function () {
    var itemWords, email = "", bio = "";
    var itemNo = 4;

    $(document).on("mouseover", ".items, .glyphicon", function (element) {
        if ($(element.target).children().attr("class") === "badge badge-default badge-pill") {
            $(element.target).children().css("opacity", "1");
            $(element.target).css("background-color", "#f5f5f5");
        }
    });

    $(document).on("mouseleave", ".items, .glyphicon", function (element) {
        if ($(element.target).children().attr("class") === "badge badge-default badge-pill") {
            $(element.target).children().css("opacity", "0.7");
            $(element.target).css("background-color", "white");
        }
    });

    $(document).on("click", ".removeItem", function (element) {
        $("." + $(element.target).attr("class").split("glyphicon glyphicon-remove removeItem ")[1]).remove();
    });

    $(document).on("click", ".editItem", function (element) {
        var selector = $(element.target).attr("class").split("glyphicon glyphicon-edit editItem ")[1];
        var item = $("." + selector).text().trim();
        itemWords = item.split(" ");
        $("." + selector).empty();

        $('<div id="numDiv" class="col-xs-2"></div>').appendTo("." + selector);
        $("<input />").attr({ id: "number", type: "number", name: "quantity", class: "form-control input-sm", value: itemWords[0] }).appendTo("#numDiv");

        var options = [
           { val: "", text: "" },
           { val: "kg", text: 'KG' },
           { val: "gm", text: 'GM' }
        ];

        $('<div id="quantDiv" class="col-xs-2"></div>').appendTo("." + selector);
        var quantList = $("<select />").attr({ id: "quantity", class: "form-control input-sm" }).appendTo("#quantDiv");
        $(options).each(function () {
            if (this.val === itemWords[1].toLowerCase())
                quantList.append($("<option selected>").attr('value', this.val).text(this.text));
            else
                quantList.append($("<option>").attr('value', this.val).text(this.text));
        });

        var components = [
       { val: "", text: "" },
       { val: "tomato", text: 'Tomato' },
       { val: "carrot", text: 'Carrot' },
       { val: "chocolate", text: 'Chocolate' }
        ];

        $('<div id="compDiv" class="col-xs-4"></div>').appendTo("." + selector);
        var compList = $("<select />").attr({ id: "component", class: "form-control input-sm" }).appendTo("#compDiv");
        $(components).each(function () {
            if (this.val === itemWords[2].toLowerCase())
                compList.append($("<option selected>").attr('value', this.val).text(this.text));
            else
                compList.append($("<option>").attr('value', this.val).text(this.text));
        });

        $('<span class="badge badge-default badge-pill" style="background-color: white; cursor: pointer;">\
       <a id="btn_change" data-id="'+ selector + '">Save</a> | <a id="btn_cancel" data-id="' + selector + '">Cancel</a></span>').appendTo("." + selector);
    });

    $(document).on("click", "#btn_cancel", function () {
        var selector = $("#btn_cancel").attr("data-id");
        $("." + selector).empty();
        $("." + selector).text(itemWords.join(" ").trim(",", " "));
        $('<span class="badge badge-default badge-pill">\
             <i class="glyphicon glyphicon-remove removeItem ' + selector + '"></i>\
           </span>\
           <span class="badge badge-default badge-pill">\
             <i class="glyphicon glyphicon-edit editItem ' + selector + '"></i>\
           </span>').appendTo($("." + selector));
    });

    $(document).on("click", "#btn_change", function () {
        var selector = $("#btn_change").attr("data-id");
        var number = $("#number").val();
        var quantity = $("#quantity option:selected").text();
        var component = $("#component option:selected").text();

        $("." + selector).text(number + " " + quantity + " " + component);

        $('<span class="badge badge-default badge-pill">\
             <i class="glyphicon glyphicon-remove removeItem ' + selector + '"></i>\
           </span>\
           <span class="badge badge-default badge-pill">\
             <i class="glyphicon glyphicon-edit editItem ' + selector + '"></i>\
           </span>').appendTo($("." + selector));
    });

    $("#btn_AddComp").click(function () {
        var selector = "item" + itemNo;
        $('<div class="row list-group-item items ' + selector + '"></div>').appendTo("#shopList");


        $('<div id="numDiv" class="col-xs-3"></div>').appendTo("." + selector);
        $("<input />").attr({ id: "number", type: "number", name: "quantity", class: "form-control input-sm", placeholder: "Number" }).appendTo("#numDiv");

        var options = [
           { val: "kg", text: 'KG' },
           { val: "gm", text: 'GM' }
        ];

        $('<div id="quantDiv" class="col-xs-3"></div>').appendTo("." + selector);
        var quantList = $("<select />").attr({ id: "quantity", class: "form-control input-sm" }).appendTo("#quantDiv");
        quantList.append($("<option disabled selected>").text("Unit"));
        $(options).each(function () {
            quantList.append($("<option>").attr('value', this.val).text(this.text));
        });

        var components = [
       { val: "tomato", text: 'Tomato' },
       { val: "carrot", text: 'Carrot' },
       { val: "chocolate", text: 'Chocolate' }
        ];

        $('<div id="compDiv" class="col-xs-4"></div>').appendTo("." + selector);
        var compList = $("<select />").attr({ id: "component", class: "form-control input-sm", placeholder: "Component" }).appendTo("#compDiv");
        compList.append($("<option disabled selected>").text("Component"));
        $(components).each(function () {
            compList.append($("<option>").attr('value', this.val).text(this.text));
        });

        $('<span class="badge badge-default badge-pill" style="background-color: white; cursor: pointer;">\
       <a id="btn_change" data-id="' + selector + '">Save</a> | <a id="btn_cancel" data-id="' + selector + '">Cancel</a></span>').appendTo("." + selector);
        itemNo++;
    });

    $(document).on("mouseover", ".recipes", function (element) {
        if ($(element.target).attr("class") === "row list-group-item recipes") {
            $(element.target).css("background-color", "#f5f5f5");
            var editBtn = $(element.target).children()[3];
            $(editBtn).css("opacity", "1");
            var delBtn = $(element.target).children()[2];
            $(delBtn).css("opacity", "1");
        }
    });

    $(document).on("mouseleave", ".recipes", function (element) {
        if ($(element.target).attr("class") === "row list-group-item recipes") {
            $(element.target).css("background-color", "white");
            var editBtn = $(element.target).children()[3];
            $(editBtn).css("opacity", "0.7");
            var delBtn = $(element.target).children()[2];
            $(delBtn).css("opacity", "0.7");
        }
    });

    $(document).on("click", ".like", function (element) {
        if ($(element.target).attr("class") === "glyphicon glyphicon-heart-empty recipesPadges like")
            $(element.target).attr("class", "glyphicon glyphicon-heart recipesPadges like");
        else if ($(element.target).attr("class") === "glyphicon glyphicon-heart recipesPadges like")
            $(element.target).attr("class", "glyphicon glyphicon-heart-empty recipesPadges like");
        else if ($(element.target).attr("class") === "glyphicon glyphicon-heart favoritePadges like")
            $(element.target).attr("class", "glyphicon glyphicon-heart-empty favoritePadges like");
        else
            $(element.target).attr("class", "glyphicon glyphicon-heart favoritePadges like");
    });

    $("#passwordDialog").dialog({
        width: 490,
        height: 552,
        autoOpen: false,
        resizable: true,
        modal: true,
        open: function (event, ui) {
            $('#passwordDialog').css('overflow', 'hidden'); //this line does the actual hiding
        },
        buttons: [
            {
                text: "Save",
                click: function () {
                    $(this).dialog("close");
                },
                class: "btn btn-primary"
            },
            {
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                },
                class: "btn btn-default"
            }
        ]
    });

    $("#btn_ChangePassword").click(function (event) {
        $("#passwordDialog").dialog("open");
        event.preventDefault();
    });

    $(".ui-dialog-titlebar").hide();

    $(document).on("click", ".editInfo", function () {
        email = $("#emailData").text();
        bio = $("#bioData").text().trim();
        
        $(".editInfo").hide();

        $("#emailData").empty();
        $("<input />").attr({ id: "email", type: "email", name: "email", class: "form-control", value: email }).appendTo("#emailData");
        $("#bioData").empty();
        $("<textarea />").attr({ id: "bio", name: "bio", class: "form-control", rows: "5" }).text(bio).appendTo("#bioData");

        $("#btn_ChangePassword").hide();
        $("#btn_Changes").attr("class", "row text-right");
        $("#btn_Changes").append('<div class="col-xs-8" id="changeInfoDiv">\
                                  <button class="btn btn-primary" id="btn_SaveChangeInfo">Save</button></div>\
                                  <div class="col-xs-1" id="cancelInfoDiv">\
                                  <button class="btn btn-default" id="btn_CancelChangeInfo" style="margin-left: -50%;">Cancel</button></div>');
    });

    $(document).on("click", "#btn_CancelChangeInfo", function () {
        $("#emailData").empty();
        $("#emailData").text(email);

        $("#bioData").empty();
        $("#bioData").text(bio);

        $("#changeInfoDiv").remove();
        $("#cancelInfoDiv").remove();

        $("#btn_ChangePassword").show();
        $(".editInfo").show();
    });

    $(document).on("click", "#btn_SaveChangeInfo", function () {


        if ($("#email").val() !== "" && $("#bio").val() !== "") {

            email = $("#email").val();
            bio = $("#bio").val();

            $("#emailData").empty();
            $("#emailData").text(email);

            $("#bioData").empty();
            $("#bioData").text(bio);

            $("#changeInfoDiv").remove();
            $("#cancelInfoDiv").remove();

            $("#btn_ChangePassword").show();
            $(".editInfo").show();
        }
        else if ($("#email").val() === "")
            $("#email").css("border-color", "red");
        else if ($("#bio").val() === "")
            $("#bio").css("border-color", "red");

    });


});