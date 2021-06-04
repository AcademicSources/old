var dhtmlwindowCount = 0;
var iappsPopuptemp;
dhtmlmodal = {
    open: function (a, b, iframeUrl, title, options) {
        var popupId = dhtmlwindowCount++;

        var popupHtml = '';
        popupHtml += '<div id="iappsPopup_' + popupId + '" style="display: none;">';
        popupHtml += '<div class="iapps-modal loadingSpinner"><img src="' + jRotatingCube + '" alt="Please wait..." /></div>';
        popupHtml += '<iframe src="/blank.html" frameborder="0" style="display: none; border: none;" class="iapps-popup"></iframe>';
        popupHtml += '</div>';

        $("body").append(popupHtml);

        var iappsPopup = new iAPPS_Popup("div#iappsPopup_" + popupId);
        iappsPopup.BeforeOpen = function () {
            this.HtmlElement.find("iframe").attr("src", iframeUrl).attr("scrolling", "No");
        };


        iappsPopup.BeforeIframeUnload = function () {
            this.HtmlElement.find("div.loadingSpinner").show();
            this.HtmlElement.find("iframe").hide();
            this.FitToContents();
        };

        iappsPopup.AfterIframeLoad = function () {
            this.HtmlElement.find("div.loadingSpinner").hide();
            this.HtmlElement.find("iframe").show();

            this.HtmlElement.find("iframe").contents().find(".iAPPSPopupClose").bind("click.iAPPSPopup", { PopupInstance: iappsPopup }, function (event) {
                event.data.PopupInstance.Close();
            });
        };

        iappsPopup.BeforeClose = function () {
            this.HtmlElement.find("div.loadingSpinner").hide();

            this.HtmlElement.find("iframe").contents().find(".iAPPSPopupClose").unbind("click.iAPPSPopup");
        };

        iappsPopup.AfterClose = function () {
            $("div#iappsPopup_" + popupId).remove();
            if (typeof options.OnClose == 'function')
                options.OnClose.call();
        };

        if (typeof options.delay != "undefined" && !isNaN(options.delay)) {
            setTimeout(function () {
                iappsPopup.Open();
            }, parseInt(options.delay));
        }
        else {
            iappsPopup.Open();
        }

        return iappsPopup;
    }
};

function iAPPS_Popup(elementSelector) {
    /***************
    Properties  
    ***************/
    this.HtmlElement;

    this.BeforeOpen = null;
    this.AfterOpen = null;
    this.BeforeClose = null;
    this.AfterClose = null;

    this.AutoResizeIframe = true;
    this.AfterIframeLoad = null;
    this.BeforeIframeUnload = null;

    /*************
    Methods
    *************/
    this.Open = function () {
        if (!this.HtmlElement.is(":visible")) {
            if ($("div.iAPPSPopupOverlay").size() == 0) {
                $("body").append("<div class=\"iAPPSPopupOverlay\" style=\"display: none;\"></div>");
            }

            var iAPPSPopupOverlay = $("div.iAPPSPopupOverlay");

            if (!iAPPSPopupOverlay.is(":visible")) {
                iAPPSPopupOverlay.css({ opacity: 0 });
                iAPPSPopupOverlay.show().animate({ opacity: 0.5 }, "fast");

                iAPPSPopupOverlay.bind("click.iAPPSPopup", { "PopupInstance": this }, function (event) {
                    //disable close of popup on click of overlay
                    //event.data.PopupInstance.Close();
                });
            }

            if (typeof this.BeforeOpen === "function")
                this.BeforeOpen();

            $(window).bind("resize.iAPPSPopup", { "PopupInstance": this }, function (event) {
                event.data.PopupInstance.Center();
            });

            this.HtmlElement.find(".iAPPSPopupClose").bind("click.iAPPSPopup", { PopupInstance: this }, function (event) {
                event.data.PopupInstance.Close();
            });

            this.HtmlElement.find("iframe").bind("load.iAPPSPopup", { "PopupInstance": this }, function (event) {
                var popup = event.data.PopupInstance;

                if (typeof (popup.AfterIframeLoad) == "function") {
                    popup.AfterIframeLoad();
                }

                popup.FitToContents();
            });

            this.Center();

            // Hack to reload the page in case grid is not loading fine
            var iframe = this.HtmlElement.find("iframe");
            var iframeUrl = iframe.attr("src");
            if (iframeUrl.indexOf("ReloadFrame=true&") > -1) {
                iframe.attr("src", iframeUrl.replace("ReloadFrame=true&", ""));
                this.HtmlElement.show();
            }
            else {
                this.HtmlElement.show();
            }

            if (typeof this.AfterOpen === "function")
                this.AfterOpen();
        }
    };

    this.FitToContents = function () {
        var popup = this;

        if (this.AutoResizeIframe) {
            var iframe = this.HtmlElement.find("iframe");
            var iframeUrl = iframe.attr("src");

            if (typeof (iframeUrl) == "string" && iframeUrl != "" && iframeUrl != "about:blank") {
                iframe.height("1px");
                iframe.width("1px");

                setTimeout(function () {
                    var iframeHeight = iframe.contents().height();
                    var iframeWidth = iframe.contents().width();

                    // Assume if width = 1 as error page
                    if (iframeWidth == 1) {
                        iframeWidth = 700;
                        iframeHeight = 600;

                        if (iframe.contents().find("body").html() == "")
                            iframe.contents().find("body").html("An unexpected error occurred. Please contact your system administrator.");

                        iframe.contents().find("body").wrapInner($("<div class='error-content' />").css({ "overflow-y": "auto", "overflow-x": "hidden" }).height(iframeHeight - 60));
                        var eHeader = $("<div />").css({ "background-color": "#005c9b", "padding": "10px" });
                        eHeader.append($("<h1 />").css({ "color": "#fff", "float": "left", "margin": "0" }).text("Error!"));
                        eHeader.append($("<img />").attr("src", "/admin/App_Themes/General/images/close.gif")
                            .css({ "float": "right", "margin-top": "10px", "cursor": "pointer" })
                            .bind("click", function () { CanceliAppsAdminPopup(); }));
                        eHeader.append($("<div />").css({ "clear": "both" }));

                        iframe.contents().find("body").prepend(eHeader);
                    }

                    iframe.height(iframeHeight).width(iframeWidth);
                    var wHeight = $(window).height();
                    if (iframeHeight > wHeight) {
                        var mHeight = iframe.contents().find(".modal-content.resizeable").height();
                        iframe.contents().find(".modal-content.resizeable").css({
                            "height": mHeight - (iframeHeight - wHeight) + 20,
                            "min-height": mHeight - (iframeHeight - wHeight) + 20,
                            "overflow-x": "hidden",
                            "overflow-y": "auto",
                            "padding-right": 2
                        });
                        iframe.height(wHeight + 20);
                    }

                    popup.Center();
                }, 200);
            }
        }
    };

    this.Center = function () {
        var $window = $(window);
        if (typeof GetQueryStringValue == "function" && GetQueryStringValue('renderingDeviceId') != '')
            $window = $(window.parent);

        var topPosition = (($window.height() - this.HtmlElement.height()) / 2);

        if (topPosition < 0)
            topPosition = 0;

        topPosition += $window.scrollTop();

        var leftPosition = (($(window).width() - this.HtmlElement.width()) / 2);

        if (leftPosition < 0)
            leftPosition = 0;

        leftPosition += $(window).scrollLeft();

        this.HtmlElement.css({
            top: topPosition + "px",
            left: leftPosition + "px"
        });
    };

    this.Close = function (hideOverlay) {
        if (this.HtmlElement.is(":visible")) {
            if (typeof this.BeforeClose === "function")
                this.BeforeClose();

            this.HtmlElement.hide();

            $(window).unbind("resize.iAPPSPopup");
            this.HtmlElement.find(".iAPPSPopupClose").unbind("click.iAPPSPopup");
            this.HtmlElement.find("iframe").unbind("load.iAPPSPopup");

            if (typeof this.AfterClose === "function") {
                var $this = this;
                setTimeout(function () {
                    $this.AfterClose();
                }, 10);
            }

            if (!(typeof hideOverlay === "boolean" && hideOverlay === false)) {
                var iAPPSPopupOverlay = $("div.iAPPSPopupOverlay");

                iAPPSPopupOverlay.show().animate({ opacity: 0 }, "fast", function () {
                    iAPPSPopupOverlay.unbind("click.iAPPSPopup");
                    iAPPSPopupOverlay.hide();
                });
            }
        }
    };

    this.hide = this.Close;

    /********************
    Initialization   
    ********************/
    if (typeof elementSelector !== "string")
        throw "elementSelector must be of type string";
    else if (elementSelector == null || jQuery.trim(elementSelector) === "")
        throw "elementSelector cannot be null or empty string";
    else if ($(jQuery.trim(elementSelector)).size() === 0)
        throw "The specified element does not exist on the page";
    else {
        this.HtmlElement = $(elementSelector);
        this.HtmlElement.css({
            position: "absolute",
            zIndex: 20001
        });
    }
}