var CheckForSemiColon = /^[^:]+$/;
var CheckForZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
var CheckForEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
var CheckForPnumber = /^\([1-9]\d{2}\)\s?\d{3}\-\d{4}$/;
var CheckForCsvExt = /[.][c|C][s|S][v|V]$/;
var CheckForGifExt = /[.][g|G][i|I][f|F]$/;
var CheckForHTML = /(<[\S]*)$/;
var CheckForSpecialChars = /^[^)\]\[%#&|=('":]+$/;
var CheckForAlphabets = /^[a-zA-Z\s]+$/;
var CheckForAlphaNumeric = /^[a-zA-Z0-9]+$/;
var CheckForNumeric = /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
var CheckForUsername = /^\w{5,12}$/;
var CheckForPassword = /^[a-zA-Z0-9!@#$%^&+*_]{6,12}$/;
var CheckForDate = /^.*(?=.{7,})(?=.*[a-zA-Z])(?=.*[!@#$%^&+*_=-]).*$/;
var CheckForText = /^[a-zA-Z0-9!@#$%^&+'*-_=\s]+$/;
var CheckForPhone = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

var formJSMessages;
var formMode;
var fieldProperties;
var formProperties;

function ChkBoxListIsSelected(chkBoxListId) {
    chkBoxList = document.getElementById(chkBoxListId);

    if (chkBoxList && chkBoxList.nodeName == "TABLE") {
        for (i = 0; i < chkBoxList.rows.length; i++) {
            for (j = 0; j < chkBoxList.rows[i].cells.length; j++) {
                tCol = chkBoxList.rows[i].cells[j];
                chkBox = tCol.childNodes[0];
                if (chkBox != null && chkBox.nodeName == "INPUT" && chkBox.checked) {
                    return true;
                }
            }
        }
    }
    return false;
}

function ValidateTextField(txtFld, displayName, isRequired, regEx, defaultText) {
    if ((txtFld.value == "" || txtFld.value == defaultText) && isRequired) {
        displayName = displayName.replace("$", "");
        alert(stringformat(formJSMessages["_IsRequired"], displayName));
        txtFld.focus();
        return false;
    }

    if (txtFld.value != "" && regEx != "" && !regEx.test(txtFld.value)) {
        alert(stringformat(formJSMessages["_IsNotValid"], displayName));
        txtFld.focus();
        return false;
    }

    return true;
}
function ValidateComboField(comboFld, displayName) {
    if (comboFld.selectedIndex == 0) {
        alert(stringformat(formJSMessages["_IsRequiredSelect"], displayName));
        comboFld.focus();
        return false;
    }

    return true;
}

function ValidateListField(listFld, displayName) {
    var checked = false;
    var listItems = control.getElementsByTagName("INPUT");
    for (var j = 0; j < listItems.length; j++) {
        if (listItems[j].checked) {
            checked = true;
            break;
        }
    }

    if (!checked) {
        alert(stringformat(formJSMessages["_IsRequiredChoose"], displayName));
        listFld.focus();
        return false;
    }


    return true;
}

function GetAttribute(control, attributeName) {
    var attributeValue = "";

    if (formMode == "1") {
        try {
            if (typeof (eval("fieldProperties.F_" + control.id + "." + attributeName)) != "undefined")
                attributeValue = eval("fieldProperties.F_" + control.id + "." + attributeName);
        }
        catch (e) {
            attributeValue = "";
        }
    }
    else {
        if (control.getAttribute(attributeName))
            attributeValue = control.getAttribute(attributeName);
    }
    return attributeValue;
}

function Validate_Form(controlIds, id) {
    var controls = controlIds.split(',');

    for (i = 0; i < controls.length; i++) {
        control = document.getElementById(controls[i]);
        if (control) {
            switch (GetAttribute(control, "objectType").toLowerCase()) {
                case "textbox":
                case "password":
                    switch (GetAttribute(control, "customType").toLowerCase()) {
                        case "numeric":
                            regEx = CheckForNumeric;
                            break;
                        case "alphabetic":
                            regEx = CheckForAlphabets;
                            break;
                        case "alphanumeric":
                            regEx = CheckForAlphaNumeric;
                            break;
                        case "email":
                            regEx = CheckForEmail;
                            break;
                        case "zip":
                            regEx = CheckForZip;
                            break;
                        case "phone":
                            regEx = CheckForPhone;
                            break;
                        default:
                            regEx = GetAttribute(control, "regEx");
                            if (regEx != "") {
                                if (regEx.charAt(0) != "/")
                                    regEx = "/" + regEx;
                                if (regEx.charAt(regEx.length - 1) != "/")
                                    regEx = regEx + "/";
                                regEx = eval(regEx);
                            }
                            break;
                    }

                    isRequired = false;
                    if (GetAttribute(control, "objectRequired").toLowerCase() == "true")
                        isRequired = true;

                    if (!ValidateTextField(control, GetAttribute(control, "displayName"), isRequired, regEx, GetAttribute(control, "defaultText")))
                        return false;

                    if (IsInteger(GetAttribute(control, "length"))) {
                        var length = parseInt(GetAttribute(control, "length"));
                        if (control.value.length > length) {
                            alert(stringformat(formJSMessages["_ShouldBeLessThan1CharactersInLength"], GetAttribute(control, "displayName"), GetAttribute(control, "length")));
                            return false;
                        }
                    }
                    break;
                case "fileupload":
                case "datepicker":
                    dateControl = document.getElementById(controls[i] + "_txt");
                    isRequired = false;
                    if (GetAttribute(control, "objectRequired").toLowerCase() == "true")
                        isRequired = true;

                    regEx = "";
                    if (!ValidateTextField(dateControl, GetAttribute(control, "displayName"), isRequired, regEx, GetAttribute(control, "defaultText")))
                        return false;

                    break;
                case "dropdown":
                    if (GetAttribute(control, "objectRequired").toLowerCase() == "true") {
                        if (!ValidateComboField(control, GetAttribute(control, "displayName")))
                            return false;
                    }
                    break;
                case "textarea":
                    if (GetAttribute(control, "objectRequired").toLowerCase() == "true") {
                        displayName = GetAttribute(control, "displayName");
                        if (control.value == null || control.value == '' || control.value == GetAttribute(control, "defaultText")) {
                            alert(stringformat(formJSMessages["_IsRequired"], displayName));
                            control.focus();
                            return false;
                        }
                        if (CheckForHTML.test(control.value)) {
                            alert(stringformat(formJSMessages["_IsNotValid"], displayName));
                            control.focus();
                            return false;
                        }
                    }
                    break;
                case "radiobutton":
                case "checkbox":
                    if (GetAttribute(control, "objectRequired").toLowerCase() == "true") {
                        if (!ValidateListField(control, GetAttribute(control, "displayName")))
                            return false;
                    }
                    break;
                case "captcha":
                    var captchaTxt = document.getElementById(controls[i] + "_txt");
                    var captchaHdn = document.getElementById(controls[i] + "_hdn");
                    if (captchaTxt && captchaHdn && captchaTxt.value != captchaHdn.value) {
                        alert(formJSMessages["PleaseEnterTheExactTextFromTheField"]);
                        captchaTxt.focus();
                        return false;
                    }
                    break;
            }
        }
    }

    return true;
}

function IsInteger(s) {
    return (s.toString().search(/^-?[0-9]+$/) == 0);
}