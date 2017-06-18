///<reference path="C:\Users\Youssef Yacoub\Desktop\Sara&Ghada(Home+courses)\js\y_tabs\jquery-1.12.4.min.js" />

$(function () {
    var itemWords = [], email = "", name = "";
    var itemNo = 4;
    var currentRecipe = false;
    var ingredients = [];

    $(document).on("click", ".removeItem", function (element) {
        var itemWords = [];
        var userId = "59175dff871f492068d93127";

        var selector = $(element.target).attr("data-index");
        var item = $("#" + selector).text().trim();
        itemWords = item.split(" ");

        $.get("/api/user/" + userId, function (user) {
            var newList = user.shoppingList.filter(function (list) {
                if (list.ingredient.name.toLowerCase() !== itemWords[2].toLowerCase())
                    return true;
                else if (list.unitType.name.toLowerCase() !== itemWords[1].toLowerCase())
                    return true;
            });
            user.shoppingList = newList;

            $.ajax({
                method: "PUT",
                url: "/api/user/" + userId,
                data: JSON.stringify({ _id: userId, shoppingList: user.shoppingList }),
                contentType: "application/json",
                success: function (data) {
                    $("#" + selector).parent().remove();
                    itemWords = [];
                    $("#btn_AddComp").attr("index", user.shoppingList.length);

                    for (var i = parseInt(selector); i < user.shoppingList.length; i++) {
                        $("#" + (i + 1)).next('span').children().attr("data-index", i);
                        $("#" + (i + 1)).next('span').next('span').children().attr("data-index", i);
                        $("#" + (i + 1)).attr("id", i);
                    }
                }
            });
        });

    });

    $(document).on("click", ".editItem", function (element) {
        var selector = $(element.target).attr("data-index");
        var item = $("#" + selector).text().trim();
        itemWords = item.split(" ");
        $("#" + selector).empty();

        $('<div id="numDiv" class="col-md-4"></div>').appendTo("#" + selector);
        $("<input />").attr({
            id: "number", type: "number", name: "quantity",
            placeholder: "Number", class: "form-control input-sm",
            value: itemWords[0]
        }).appendTo("#numDiv");

        $.get("/api/unitTypes", function (data) {
            var options = [];
            for (var i = 0; i < data.length; i++)
                options[i] = { "val": data[i]._id, "text": data[i].name };

            $('<div id="quantDiv" class="col-md-4"></div>').appendTo("#" + selector);
            var quantList = $("<select />").attr({ id: "quantity", class: "form-control input-sm" }).appendTo("#quantDiv");
            $(options).each(function () {
                if (this.text.toLowerCase() === itemWords[1].toLowerCase())
                    quantList.append($("<option selected>").attr('value', this.val).text(this.text));
                else
                    quantList.append($("<option>").attr('value', this.val).text(this.text));
            });
        });

        $.get('/api/ingredient', function (data) {
            $('<div id="compDiv" class="col-md-4"></div>').appendTo("#" + selector);

            $("<input />").attr({
                id: "component", type: "text", name: "component", placeholder: "Ingredient",
                class: "form-control input-sm", value: itemWords[2]
            }).appendTo("#compDiv");

            ingredients = data;

            var ingredientsName = [];
            for (var i = 0; i < data.length; i++)
                ingredientsName[i] = data[i].name.toLowerCase();

            $("#component").autocomplete({
                source: ingredientsName,
                autoFocus: true
            });
        });


        $("#" + selector).next('span').hide();
        $("#" + selector).next('span').next('span').hide();

        $(".glyphicon-edit").prop("disabled", true);
        $("#btn_AddComp").prop("disabled", true);

        $('<span class="badge badge-default badge-pill" style="background-color: white; cursor: pointer;">\
           <a id="btn_change" data-index="'+ selector + '">Save</a> | <a id="btn_cancel" data-index="' + selector + '">Cancel</a></span>').insertAfter("#" + selector);
    });

    $(document).on("click", "#btn_cancel", function (btn) {
        var selector = $(btn.target).attr("data-index");

        $(".glyphicon-edit").prop("disabled", false);
        $("#btn_AddComp").prop("disabled", false);

        if (parseInt(selector) < parseInt($("#btn_AddComp").attr("index"))) {
            $("#" + selector).next('span').remove();

            $("#" + selector).empty();
            $("#" + selector).text(itemWords.join(" ").toString());

            itemWords.length = 0;

            $("#" + selector).next('span').show();
            $("#" + selector).next('span').next('span').show();
        }
        else
            $("#" + selector).parent().remove();
    });

    $(document).on("click", "#btn_change", function (btn) {
        var userId = "5916c6bec413771934e1cd8e";
        var selector = $(btn.target).attr("data-index");

        var number = amountCheck();
        var quantityId = $("#quantity").val();
        var quantityName = $("#quantity option:selected").text();
        var component = componentCheck();

        if (number && quantity && component) {
            $("#" + selector).next('span').remove();
            $("#" + selector).empty();

            $.get("/api/user/" + userId, function (user) {
                var duplicateFlag = false;
                var elementIndex = parseInt(selector);

                if (elementIndex < user.shoppingList.length) {
                    user.shoppingList[elementIndex] = {
                        "ingredient": { "_id": component._id },
                        "unitType": { "_id": quantityId },
                        "amount": number
                    };

                    var result = checkDuplicateList(user, elementIndex, selector);
                    duplicateFlag = result.dupFlag;

                    if (duplicateFlag === true) user = result.user;
                }
                else {
                    user.shoppingList.push({
                        "ingredient": { "_id": component._id },
                        "unitType": { "_id": quantityId },
                        "amount": number
                    });

                    var result = checkDuplicateList(user, user.shoppingList.length - 1, selector);
                    duplicateFlag = result.dupFlag;

                    if (duplicateFlag === true) user = result.user;
                }
                $.ajax({
                    method: "PUT",
                    url: "/api/user/" + userId,
                    data: JSON.stringify({ _id: userId, shoppingList: user.shoppingList }),
                    contentType: "application/json",
                    success: function (data) {
                        $(".glyphicon-edit").prop("disabled", false);
                        $("#btn_AddComp").prop("disabled", false);
                        if (elementIndex < parseInt($("#btn_AddComp").attr("index"))
                            && duplicateFlag === false) {
                            $("#" + selector).empty();
                            $("#" + selector).text(number + " " + quantityName + " " + component.name);
                            $("#" + selector).next('span').show();
                            $("#" + selector).next('span').next('span').show();
                        }
                        else if (elementIndex < parseInt($("#btn_AddComp").attr("index"))
                            && duplicateFlag === true) {
                            $("#" + result.delElementIndex).parent().remove();
                            $("#" + selector).empty();
                            $("#" + selector).text(result.newAmount
                                + " " + quantityName + " " + component.name);
                            $("#" + selector).next('span').show();
                            $("#" + selector).next('span').next('span').show();

                            for (var i = result.delElementIndex; i < user.shoppingList.length; i++) {
                                $("#" + (i + 1)).next('span').children().attr("data-index", i);
                                $("#" + (i + 1)).next('span').next('span').children().attr("data-index", i);
                                $("#" + (i + 1)).attr("id", i);
                            }
                        }
                        if (elementIndex === parseInt($("#btn_AddComp").attr("index"))
                            && duplicateFlag === true) {
                            $("#" + result.delElementIndex).parent().remove();
                            $("#" + selector).empty();
                            $("#" + selector).text(result.newAmount
                                + " " + quantityName + " " + component.name);

                            $('<span class="badge badge-default badge-pill">\
                               <i class="glyphicon glyphicon-remove removeItem" data-index="'+ selector + '"></i>\
                               </span><span class="badge badge-default badge-pill">\
                               <i class="glyphicon glyphicon-edit editItem" data-index="'+ selector + '"></i>\
                               </span>').insertAfter("#" + selector);

                            for (var i = result.delElementIndex; i < user.shoppingList.length; i++) {
                                $("#" + (i + 1)).next('span').children().attr("data-index", i);
                                $("#" + (i + 1)).next('span').next('span').children().attr("data-index", i);
                                $("#" + (i + 1)).attr("id", i);
                            }
                        }
                        else if (elementIndex === parseInt($("#btn_AddComp").attr("index"))
                            && duplicateFlag === false) {
                            $("#" + selector).empty();
                            $("#" + selector).text(number + " " + quantityName + " " + component.name);
                            $('<span class="badge badge-default badge-pill">\
                               <i class="glyphicon glyphicon-remove removeItem" data-index="'+ selector + '"></i>\
                               </span><span class="badge badge-default badge-pill">\
                               <i class="glyphicon glyphicon-edit editItem" data-index="'+ selector + '"></i>\
                               </span>').insertAfter("#" + selector);
                        }

                        $("#btn_AddComp").attr("index", user.shoppingList.length);
                    }
                });
            });
        }
    });

    function checkDuplicateList(user, elementIndex, selector) {
        var elements = $.grep(user.shoppingList, function (list) {
            return list.ingredient._id === user.shoppingList[elementIndex].ingredient._id &&
                list.unitType._id === user.shoppingList[elementIndex].unitType._id;
        });

        if (elements.length == 1) return { "dupFlag": false };
        else {
            var newAmount = elements[0].amount + elements[1].amount;
            var upElementIndex = user.shoppingList.findIndex(function (list) {
                return list.ingredient._id === user.shoppingList[elementIndex].ingredient._id &&
                    list.unitType._id === user.shoppingList[elementIndex].unitType._id;
            });
            if (upElementIndex === elementIndex) {
                user.shoppingList[upElementIndex] = {
                    "ingredient": { "_id": elements[0].ingredient._id },
                    "unitType": { "_id": elements[0].unitType._id },
                    "amount": newAmount
                };
                var delElementIndex = user.shoppingList.findIndex(function (list) {
                    return list.ingredient._id === user.shoppingList[elementIndex].ingredient._id &&
                        list.unitType._id === user.shoppingList[elementIndex].unitType._id &&
                        list.amount === elements[1].amount;
                });

                user.shoppingList.splice(delElementIndex, 1);
                return {
                    "delElementIndex": delElementIndex,
                    "user": user,
                    "dupFlag": true,
                    "newAmount": newAmount
                };
            }
            else {
                user.shoppingList.splice(upElementIndex, 1);

                var delElementIndex = user.shoppingList.findIndex(function (list) {
                    return list.ingredient._id === elements[1].ingredient._id &&
                        list.unitType._id === elements[1].unitType._id &&
                        list.amount === elements[1].amount;
                });

                user.shoppingList[delElementIndex] = {
                    "ingredient": { "_id": elements[1].ingredient._id },
                    "unitType": { "_id": elements[1].unitType._id },
                    "amount": newAmount
                };
                return {
                    "delElementIndex": upElementIndex,
                    "user": user,
                    "dupFlag": true,
                    "newAmount": newAmount
                };
            }
        }
    }

    function amountCheck() {
        var number = parseInt($("#number").val());

        if ($.isNumeric(number) === true) {
            $("#number").css("border", "1px solid #ccc");
            return number;
        }
        else
            $("#number").css("border", "1px solid red");
    }

    function componentCheck() {
        var component = $("#component").val();

        var chosenIngredient = ingredients.find(function (ingredient) {
            return ingredient.name.toLowerCase() === component.toLowerCase();
        });

        if (chosenIngredient)
            $("#component").css("border", "1px solid #ccc");
        else
            $("#component").css("border", "1px solid red");

        return chosenIngredient;
    }

    $(document).on("click", "#btn_AddComp", function () {
        $(".glyphicon-edit").prop("disabled", true);
        var containerId = $("#btn_AddComp").attr("index");

        $('<div class="list-group-item">\
        <div id=\"'+ containerId + '\" style=\"display: inline-block;\"></div>\
        </div>').appendTo(".list-group");

        $('<div id="numDiv" class="col-md-4"></div>').appendTo("#" + containerId);
        $("<input />").attr({
            id: "number", type: "number", name: "quantity",
            placeholder: "Number", class: "form-control input-sm"
        }).appendTo("#numDiv");

        $.get("/api/unitTypes", function (data) {
            var options = [];
            for (var i = 0; i < data.length; i++)
                options[i] = { "val": data[i]._id, "text": data[i].name };

            $('<div id="quantDiv" class="col-md-4"></div>').appendTo("#" + containerId);
            var quantList = $("<select />").attr({ id: "quantity", class: "form-control input-sm" }).appendTo("#quantDiv");
            $(options).each(function () {
                quantList.append($("<option>").attr('value', this.val).text(this.text));
            });
        });

        $.get('/api/ingredient', function (data) {
            $('<div id="compDiv" class="col-md-4"></div>').appendTo("#" + containerId);

            $("<input />").attr({
                id: "component", type: "text", name: "component", placeholder: "Ingredient",
                class: "form-control input-sm"
            }).appendTo("#compDiv");

            ingredients = data;

            var ingredientsName = [];
            for (var i = 0; i < data.length; i++)
                ingredientsName[i] = data[i].name.toLowerCase();

            $("#component").autocomplete({
                source: ingredientsName,
                autoFocus: true
            });
        });

        $("#btn_AddComp").prop("disabled", true);
        $(".glyphicon-edit").prop("disabled", true);

        $('<span class="badge badge-default badge-pill" style="background-color: white; cursor: pointer;">\
           <a id="btn_change" data-index="'+ containerId + '">Save</a> | <a id="btn_cancel" data-index="' + containerId + '">Cancel</a></span>').insertAfter("#" + containerId);
    });

    $(document).on("click", ".editInfo", function () {
        email = $("#emailData").text();
        name = $("#nameData").text();
        $(".editInfo").hide();

        $("#nameData").empty();
        $("<input />").attr({ id: "name", type: "text", name: "name", class: "form-control", value: name }).appendTo("#nameData");

        $("#emailData").empty();
        $("<input />").attr({ id: "email", type: "email", name: "email", class: "form-control", value: email }).appendTo("#emailData");

        $("#nameData").children("small").remove();
        $("#emailData").children("small").remove();

        $("#btn_ChangePassword").hide();
        $("#btn_Changes").attr("class", "row text-left");
        $("#btn_Changes").append('<div class="col-xs-1 col-xs-offset-2" id="cancelInfoDiv">\
                                  <button class="btn btn-default" style="margin-left: 49%;" id="btn_CancelChangeInfo">Cancel</button></div>\
                                  <div class="col-xs-1" id="changeInfoDiv">\
                                  <button class="btn btn-primary" style="margin-left: 19%;" id="btn_SaveChangeInfo">Save</button></div>');
    });

    $(document).on("click", "#btn_CancelChangeInfo", function () {
        $("#nameData").empty();
        $("#nameData").text(name);
        $("#username").text(name);

        $("#emailData").empty();
        $("#emailData").text(email);

        $("#changeInfoDiv").remove();
        $("#cancelInfoDiv").remove();

        $("#btn_ChangePassword").show();
        $(".editInfo").show();
    });

    $(document).on("click", "#btn_SaveChangeInfo", function () {

        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        var userId = "5916c6bec413771934e1cd8e";

        $("#nameData").children("small").remove();
        $("#emailData").children("small").remove();

        if ($("#name").val() !== "" && $("#email").val() !== "" && pattern.test($("#email").val()) === true) {

            var email = $("#email").val();
            var name = $("#name").val();

            $("#emailData").empty();
            $("#emailData").text(email);

            $("#nameData").empty();
            $("#nameData").text(name);
            $("#username").text(name);

            $.ajax({
                method: "PUT",
                url: "/api/user/" + userId,
                data: JSON.stringify({ _id: userId, name: name, email: email }),
                contentType: "application/json",
                success: function (data) {
                    name = email = "";

                    $("#changeInfoDiv").remove();
                    $("#cancelInfoDiv").remove();

                    $("#btn_ChangePassword").show();
                    $(".editInfo").show();
                }
            });
        }
        else if ($("#name").val() === "" && $("#email").val() === "") {
            $("#name").css("border-color", "red");
            $("#nameData").append("<small style=\"color:red;\">Name field is required</small>");
            $("#email").css("border-color", "red");
            $("#emailData").append("<small style=\"color:red;\">Email field is required</small>");
        }
        else if ($("#email").val() === "") {
            $("#email").css("border-color", "red");
            $("#emailData").append("<small style=\"color:red;\">Email field is required</small>");
        }
        else if (pattern.test($("#email").val()) === false) {
            $("#email").css("border-color", "red");
            $("#emailData").append("<small style=\"color:red;\">Please enter right email</small>");
        }
        else {
            $("#name").css("border-color", "red");
            $("#nameData").append("<small style=\"color:red;\">Name field is required</small>");
        }
    });

    $(document).on("click", "#btn_DownPDF", function () {
        var userId = "59175dff871f492068d93127";
        var doc = new jsPDF('p', 'pt', 'a4');;

        var header = function (data) {
            console.log(data);
            doc.setFontSize(16);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            doc.text("Aesh_Mal7", data.settings.margin.left + 210, 40);
            doc.addImage(imgData, 'JPEG', data.settings.margin.left, 40, 30, 30);
            doc.text("Shopping List", data.settings.margin.left + 42, 60);
        }

        var columns = ["Amount", "Unit", "Ingredient"];


        $.ajax({
            method: "GET",
            url: "/api/user/" + userId,
            contentType: "application/json",
            success: function (user) {
                var data = [];
                for (var i = 0; i < user.shoppingList.length; i++)
                    data.push([
                        user.shoppingList[i].amount,
                        user.shoppingList[i].unitType.name,
                        user.shoppingList[i].ingredient.name
                    ]);
                doc.autoTable(columns, data, {
                    beforePageContent: header,
                    startY: 80,
                    headerStyles: {
                        fillColor: [250, 152, 95]
                    }
                });
                doc.save("my Shopping List.pdf");
            }
        });
    });
});