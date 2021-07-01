<!DOCTYPE html>





<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Welcome to chat</title>

    <!-- BEGINNING OF vars.jsp -->

    <script type="text/javascript">
        /**
* This include defines a set of commonly used server-related variables in the global ccp.vars object.
*/



        var ccp = (typeof ccp == "undefined") ? {} : ccp;
        ccp.vars = ccp.vars || {};
        ccp.constants = ccp.constants || {};
        ccp.paths = ccp.paths || {};

        (function () {
            var prefs = (typeof gadgets !== "undefined" && typeof gadgets.Prefs === "function") ? new gadgets.Prefs() : null;
            var userPref = "CCPUser";
            var tokenPref = "CCPToken";
            var tokenCookie = "JSESSIONIDSSO";
            var getCookie = function (name) {
                startIndex = document.cookie.indexOf(name + "=");
                if (startIndex >= 0) {
                    searchStr = document.cookie.substring(startIndex);
                    endIndex = searchStr.indexOf(';') >= 0 ? searchStr.indexOf(';') : searchStr.length;
                    val = document.cookie.substring(startIndex + name.length + 1, endIndex + startIndex);
                    return val;
                }
            };
            var setCookie = function (name, value, sessionOnly) {
                var cookieStr = key + '=' + value + '; path=/';
                if (!sessionOnly) {
                    d = new Date();
                    d.setYear(d.getYear() + 1901);
                    cookieStr = cookieStr + '; expires=' + d.toUTCString();
                }
                document.cookie = cookieStr;
            }
            var getUsername = function () {
                var userName = prefs != null ? prefs.getString(userPref) : null;
                if (!userName) {
                    userName = getCookie(userPref);
                }
                return userName;
            };
            var getToken = function () {
                var token = prefs != null ? prefs.getString(tokenPref) : null;
                if (!token) {
                    token = getCookie(tokenCookie);
                }
                return token;
            };
            ccp.vars.setUsername = function (username) {
                setCookie(userPref, username);
            };
            /** 
            * Determine the address of the CCP server
            * "imgbase" is created as self contained variable so that changes in "serverBase" will not impact it
            **/
            ccp.vars.webappbase = "http://173.38.222.164/ccp-webapp/";
            ccp.vars.webappbasehttps = "https://173.38.222.164/ccp-webapp/";
            ccp.vars.serverName = "173.38.222.164";
            ccp.vars.serverBase = "https://" + ccp.vars.serverName;
            ccp.vars.apibase = ccp.vars.webappbase + "ccp/";
            ccp.vars.imgbase = "https://" + ccp.vars.serverName + "/img/";
            ccp.vars.helpbase = prefs != null ? ccp.vars.serverBase + "/help/" + prefs.getLang() + "_" + prefs.getCountry() + "/" : ccp.vars.serverBase + "/help/en_US/";
            ccp.vars.helpbase = ccp.vars.helpbase.replace("en_US", "en_ALL"); // Gadget prefs may return en_US instead of en_ALL
            ccp.vars.buildNumber = "12.5.1.2470";
            ccp.vars.chatapibase = ccp.vars.serverBase + "/ccp/chat/";
            ccp.vars.username = getUsername();
            ccp.vars.token = getToken();

            ccp.constants.extensionFieldURLPrefix = "ef_";
            ccp.constants.extensionFieldPrefKey = "extensionFields";
            ccp.constants.extensionFieldMaskPrefix = "h_";

            ccp.paths.AUTHENTICATION_PING_PATH = ccp.vars.apibase + "authentication/ping";

            ccp.constants.timeFormats = { ro_RO: "HH:mm", fr_FR: "HH:mm", ca_ES: "HH:mm", bg_BG: "H:mm", nb_NO: "HH:mm", tr_TR: "HH:mm", zh_CN: "ah:mm", pt_BR: "HH:mm", it_IT: "H.mm", es_ES: "H:mm", sk_SK: "H:mm", ko_KR: "a h:mm", sl_SI: "H:mm", de_DE: "HH:mm", en: "h:mm a", nl_NL: "H:mm", cs_CZ: "H:mm", hr_HR: "HH:mm", hu_HU: "H:mm", zh_TW: "a h:mm", ja_JP: "H:mm", pl_PL: "HH:mm", sr_RS: "HH.mm", ru_RU: "H:mm", da_DK: "HH:mm", sv_SE: "HH:mm", fi_FI: "H:mm" };
            ccp.constants.dateFormats = { ro_RO: "dd.MM.yyyy", fr_FR: "dd/MM/yy", ca_ES: "dd/MM/yy", bg_BG: "yy-M-d", nb_NO: "dd.MM.yy", tr_TR: "dd.MM.yyyy", zh_CN: "yy-M-d", pt_BR: "dd/MM/yy", it_IT: "dd/MM/yy", es_ES: "d/MM/yy", sk_SK: "d.M.yyyy", ko_KR: "yy. M. d", sl_SI: "d.M.y", de_DE: "dd.MM.yy", en: "M/d/yy", nl_NL: "d-M-yy", cs_CZ: "d.M.yy", hr_HR: "dd.MM.yy.", hu_HU: "yyyy.MM.dd.", zh_TW: "yyyy/M/d", ja_JP: "yy/MM/dd", pl_PL: "dd.MM.yy", sr_RS: "d.M.yy.", ru_RU: "dd.MM.yy", da_DK: "dd-MM-yy", sv_SE: "yyyy-MM-dd", fi_FI: "d.M.yyyy" };

        })();


    </script>

    <!-- END OF vars.jsp -->



    <script type="text/javascript" src="js/3rdparty/require.js"></script>

    <script>
        require.onError = function (error) {
            window._loadErrors = window._loadErrors || [];
            window._loadErrors.push(error);
            var log = typeof gadgets !== "undefined" ? function (msg) { gadgets.log(new Date().getTime() + ": " + msg); } : (typeof console !== "undefined" ? function (msg) { console.log(new Date().getTime() + ": " + msg); } : function () { });

            var msg;
            var scripts = document.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
                if ((msg = scripts[i].getAttribute("timeout-msg")))
                    break;
            }

            log(error);
            var m = document.getElementById("messages");
            if (m && msg) {
                // Replace the messages element entirely to prevent any other messages from being shown
                m.outerHTML = "<table class='error'><tr><td>" + msg + "</td></tr></table>";
            }
        };

        require.config({
            baseUrl: "js",
            shim: {

                // Misc.
                "backbone": { deps: ["jquery", "underscore"], exports: "Backbone" },
                "underscore": { exports: "_" },
                "handlebars": { exports: "handlebars" },
            },

            paths: {
                // Misc.
                "backbone": "3rdparty/backbone",
                "underscore": "3rdparty/underscore",
                "handlebars": "3rdparty/handlebars",
                "jquery": "3rdparty/jquery",
            },
            waitSeconds: 15,
            enforceDefine: true,
            urlArgs: "bust=" + ccp.vars.buildNumber // Comment out if using urlArgs below
            //	urlArgs: "bust=" +  (new Date()).getTime() // Optional but useful to force JS reloading during development
        });

    </script>

    <script>
        var CHAT_MESSAGE_MAXLENGTH = 10240;
        var localizedStringHash = new StringHash(
            'product.full.name', 'Cisco CCP ',
            'chat.connecting', 'Connecting...',
            'chat.alone', 'The conversation has ended. You are alone in the chat room.',
            'chat.warning', 'Warning - The connection was lost due to an inactivity timeout or connection failure.',
            'chat.error', 'The connection was lost. Please try again later.',
            'chat.leave', 'Are you sure you want to leave the chat room?',
            'chat.discarded', 'Sorry, all customer care representatives are busy. Please try again later.',
            'chat.agent.joined', 'You are connected.',
            'chat.invitedagent.joined', 'has joined the chat.',
            'chat.agent.left', 'has left the chat.',
            'chat.agent.end', 'ended the chat.',
            'chat.welcome', 'Welcome to chat',
            'chat.chat', 'Chat',
            'chat.unavailable', 'Chat unavailable',
            'chat.user.me', 'me',
            'chat.accessibility', 'To enable or disable accessibility, press CTRL+Shift+S.  ',
            'chat.input.title', 'Write a message',
            'chat.typing.message', 'is typing...',

            'chat.waiting', 'Welcome, please wait while we connect you with a customer care representative.',


            'chat.sorry', 'Sorry, the chat service is not available. Please try again later.',


            'chat.timeout', 'All customer care representatives are busy assisting other clients. Please continue to wait or try again later.'

        );

        var transcriptURL;

        function StringHash() {
            //Store the localized Strings so that the .js files can get to them
            this.length = 0;
            this.items = new Array();
            for (var i = 0; i < arguments.length; i += 2) {
                if (typeof (arguments[i + 1]) != 'undefined') {
                    this.items[arguments[i]] = arguments[i + 1];
                    this.length++;
                }
            }

            this.getItem = function (myKey) {
                return this.items[myKey];
            }
        }

        function onFontSizeUpClick() {
            resizeFont("#chat", 1);
            resizeFont("#chat-input textarea", 1);
        }

        function onFontSizeDownClick() {
            resizeFont("#chat", -1);
            resizeFont("#chat-input textarea", -1);
        }

        function resizeFont(jQueryElement, step) {
            var fontSizeNow = parseFloat($(jQueryElement).css("font-size"), 10);
            var fontSizeNew = (fontSizeNow + step) + "px";
            $(jQueryElement).css("font-size", fontSizeNew);
        }


        require(['jquery', 'ccp/chat', 'domReady!'], function ($, chat) {

            // Make sure the chat text area doesn't accept more than maxlength number of characters (for IE only)
            $('#new-message').on('paste', function () {
                if (window.clipboardData) {
                    var val;
                    val = window.clipboardData.getData('Text');
                    var chatBoxContent = $(this).val();
                    if ((val.length + chatBoxContent.length) > CHAT_MESSAGE_MAXLENGTH) {
                        var newString = chatBoxContent + val.slice(0, CHAT_MESSAGE_MAXLENGTH - chatBoxContent.length);
                        $(this).val(newString);
                        alert('Your message has exceeded the maximum allowed length.');
                        return false;
                    }
                }
            });
            // Make sure the chat text area doesn't accept more than maxlength number of characters
            $('#new-message').live('keyup blur', function () {
                var maxLength = 10240;
                var val = $(this).val();
                if (val.length > maxLength) {
                    $(this).val(val.slice(0, maxLength));
                    alert('Your message has exceeded the maximum allowed length.');
                }
            });

            if (!window._loadErrors) {
                chat.init(getLocale());
                transcriptURL = chat.getTranscriptDownloadURL();
            }
        });

        function getLocale() {
            return 'en_ALL';
        }

        /**
         * For use in UI automation.
         */

        function getTranscriptURL() {
            return transcriptURL;
        }

    </script>

    <link rel="icon" href="data:;base64,=">
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/ccp.css" />
</head>

<body>
    <div id="chatCustomerInterface">
        <!--  Chat interface div: the page displayed once agent joins chat room -->
        <div id="chatLayer" style="display:none">
            <div id="chatLogoDiv" class="hdiv">
                <table id="chatBannerTbl">
                    <tr id="chatBannerTblRow">
                        <td id="chatLogoTblCell" class="centered-content">
                            <img id="logoChat" class="logoImg" src='./img/ciscoLogoColor.png' alt="Brand Logo"
                                tabindex="1" />
                        </td>
                        <td>

                            <span class="chatToolbar">
                                <button id="endButton" type="button"
                                    title="End this chat, Keyboard shortcut : CTRL+SHIFT+e" class="redButton"
                                    tabindex="1">
                                    <img id="endIcon" src="../ui/img/Chat_white_12.png"
                                        alt="End this chat, Keyboard shortcut : CTRL+SHIFT+e">
                                    End
                                </button>
                            </span>

                        </td>
                    </tr>
                </table>
            </div>
            <div id="chat" class="hdiv">
                <div id="messages" aria-live="polite">
                    <div id="presence-message" class="p-msg" aria-live="polite"></div>
                </div>
                <div id="system-message" tabindex="-1"></div>

                <div id="transcriptDownloadBar" tabindex="-1" aria-live="polite">
                    <img id="downloadIcon" src="../ui/img/Download.png" alt="DownloadButton" width="16px" height="16px">
                    <span id="downloadConfirmMsg" tabindex="-1" aria-live="polite">Do you want to download the
                        transcript for this chat?</span>
                    <button id="btnDownloadYes" type="button" class="transcriptDownloadYes" tabindex="-1"
                        title="Download chat transcript, Keyboard shortcut : CTRL+SHIFT+y">Yes</button>
                    <button id="btnDownloadNo" type="button" class="transcriptDownloadNo" tabindex="-1"
                        title="Cancel download chat transcript, Keyboard shortcut : CTRL+SHIFT+x">No</button>
                </div>

                <div id="icons" tabindex="-1">
                    <!-- Lock icon for secure connections; Default behaviour is hidden and also not affect layout -->
                    <img id="lock-icon" src="./img/secure_gray.png" class="t-msg" style="display: none">
                    <span id="typingStatusMsg" class="p-msg"></span>
                    <button id="fontSizeDown" type="button" onclick="onFontSizeDownClick()"
                        title="Decrease font size, Keyboard shortcut : CTRL+SHIFT+[" tabindex="4">
                        <img src="./img/font_decrease_24.png"
                            alt="Decrease font size, Keyboard shortcut : CTRL+SHIFT+[">
                    </button>
                    <button id="fontSizeUp" type="button" onclick="onFontSizeUpClick()"
                        title="Increase font size, Keyboard shortcut : CTRL+SHIFT+]" tabindex="3">
                        <img src="./img/font_increase_24.png"
                            alt="Increase font size, Keyboard shortcut : CTRL+SHIFT+]">
                    </button>
                </div>
                <div id="chat-input" class="disabled">
                    <textarea id="new-message" disabled="disabled" tabindex="5" spellcheck="true"></textarea>
                </div>
                <div id="chat-enabled-by-cisco">
                    <img src="./img/chat_enabled_by_Cisco_v2.png" title="Chat enabled by Cisco .:|:..:|:."
                        alt="Chat enabled by Cisco .:|:..:|:." tabindex="6">
                </div>
            </div>
        </div>

        <!--  Welcome message div: the page displayed to customer before agent joins -->
        <div id="welcome-messageLayer" style="display:none">
            <div id="welcomeLogoDiv" class="hdiv" aria-live="polite">
                <img id="logoWelcome" class="logoImg" src='./img/ciscoLogoColor.png' alt="Brand Logo" tabindex="1" />
                <span id="accessibility-hotkey-label" class="right"
                    style="float:right;color:white;font-size:xx-small;">To enable or disable accessibility, press
                    CTRL+Shift+S. </span>
            </div>
            <div id="loadingRooot" class="left">
                <div id="loadingIndicator" class="hidden" tabindex="2">
                    <img src="./img/loading.gif" alt="Loading" /><span id="loadingIndicatorMessage"></span>
                </div>
            </div>
            <div id="status_messages" class="right">
                <div id="welcome-message" tabindex="3" aria-live="polite"></div>
            </div>
        </div>

        <!--  Sorry message div: the page displayed to customer when chat can not be initiated (chat limit reached or no available agents) -->
        <div id="sorry-messageLayer" style="display:inline">
            <div id="sorryLogoDiv" class="hdiv">
                <img id="logoSorry" class="logoImg" src='./img/ciscoLogoColor.png' alt="Brand Logo" tabindex="1" />
            </div>
            <div id="infoRooot" class="left">
                <div id="infoIndicator" class="hidden" tabindex="2">
                    <img id="infoIndicatorImg" src="./img/info.png" alt="Information Icon" />
                </div>
            </div>
            <div id="error_status_messages" class="right" tabindex="3" aria-live="polite">
                <div id="system-error-message"> Sorry, the chat service is not available. Please try again
                    later. </div>
            </div>
        </div>

        <div name="clear" class="clearer"></div>
    </div>
</body>

</html>