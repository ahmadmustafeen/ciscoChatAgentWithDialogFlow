// check if enter is pressed in input field

var inputField = document.getElementById("query");
inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        onQuerySubmit(inputField.value)
    }
});



// open chat button
const openChat = props => {
    let id = document.getElementById('chatbox');
    if(id.style.display==='none'){
        id.style.display='block';
        document.getElementById('btn-chat').innerHTML="Close"
        document.getElementById('query').focus()
        
        
    }
    else{
        document.getElementById('chat').innerHTML = ""
        document.getElementById('btn-chat').innerHTML="Chat"
        id.style.display ='none'
    }
}




// here dialogflow action will be preformed
const onQuerySubmit = query =>{
    if(!validateQuery(query)) return false
    console.log(dialogflowResponse(query))
}





const validateQuery = query => {
if(!query) {
    alert("Enter somthing first");
    return false
}
else{
    return true
}
}


let oldChat = ""

const dialogflowResponse = query => {
    
    // const token = "ya29.a0ARrdaM_89C_m0Eltu6irfn2c_-ForOn0KYmFyZB5WbKG9dzcZWwhEMkpRrDsUE6zx5-t-UPT83QnhJ22EYcKZztfi0AI0OZaWKzTZpdfNIdfrBEf8Ab4-CTtG8kHmmnvQc_uA0yXwYPmfcTrXh0N_vlVze5qWw"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://dialogflow.googleapis.com/v2/projects/cisco-bot-ufmj/agent/sessions/5435:detectIntent");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    var data = {
        query_input: {
            text: {
                text: query,
                language_code: "en-US"
            }
        }
    };
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        // if (!xhr.readyState) {
        //     responseField.innerHTML += `<h1>Token Expired, Generate a new token</h1>`
        // }
        if (xhr.readyState === 4) {
            let QueryResult = JSON.parse(xhr.responseText).queryResult
            
            if (QueryResult.action !== 'input.unknown') {
                if(QueryResult.fulfillmentText.includes('cisco')){
                    if (confirm('We will have to connect to our Human Agent in order to respond! Continue?')) {
                        // Save it!
                        ciscoBubbleChat.showChatWindow({
                                formData: {
                                    previousChat: oldChat,
                                    recentQuestion:query
                                }, validationErrorCallback: function () {
                                    console.log('business specific logic goes here');
                                }
                            })
                            document.getElementById('chat').innerHTML = ""
                        openChat();
                      } else {
                        // Do nothing!
                        createResponseVisual(query,"Thanks for using this chatbox,write something to ask again!")
                      }
                   
                }
                oldChat += `USER: ${query} \n BOT: ${QueryResult.fulfillmentText} \n\n`
                 createResponseVisual(query,QueryResult.fulfillmentText)
                // all_responses += `QUERY: ${query} \n RESPONSE: ${QueryResult.fulfillmentText} \n\n`
                // responseField.innerHTML += `<h1 style='color:rgb(100,205,100)'>Agent: ${QueryResult.fulfillmentText}</h1> <br><br>`
            }
            else {
                // alert("We will have to connect to our Human Agent in order to respond! Continue?")
                if (confirm('We will have to connect to our Human Agent in order to respond! Continue?')) {
                    // Save it!
                    ciscoBubbleChat.showChatWindow({
                            formData: {
                                previousChat: oldChat,
                                recentQuestion:query
                            }, validationErrorCallback: function () {
                                console.log('business specific logic goes here');
                            }
                        })
                        document.getElementById('chat').innerHTML = ""
                    openChat();
                  } else {
                    // Do nothing!
                    createResponseVisual(query,"Thanks for using this chatbox,write something to ask again!")
                  }
                // responseField.innerHTML += `<h1 style='color:rgb(100,205,100)'>Agent: We Need to Transfer this chat to our chat agent</h1>`
                // responseField.innerHTML += `<button style='background-color:rgb(100,205,100);width:100px;height:30px' onclick=" ciscoBubbleChat.showChatWindow({
                //     formData: {
                //         previousChat: all_responses,currentChat:userQuery,'csq_list':'Initialize chat'}});document.getElementById('response').style.display='none'">Continue</button> <br><br>`

                // ciscoBubbleChat.showChatWindow({
                //     formData: {
                //         previousChat: all_responses,
                //     }, validationErrorCallback: function () {
                //         console.log('business specific logic goes here');
                //     }
                // })
                // responseField.innerHTML += `<h1>Part where cisco is connected</h1>`

            }

        }
    };

}



const createResponseVisual = (userQuery,botResponse) => {
let chat = document.getElementById('chat')
var currentdate = new Date(); 

chat.innerHTML += `<div class='response-area' id='${userQuery}${currentdate}'>
<div class='userQuery'><p>${userQuery}</p></div>
<div class='botResponse'><p id='${userQuery}${currentdate}response'>...</p></div>
</div>`

setTimeout(()=>{
    document.getElementById(`${userQuery}${currentdate}response`).innerHTML =
    `${botResponse}`
},1000)
document.getElementById(`${userQuery}${currentdate}`).scrollIntoView();
document.getElementById('query').value=""

}




// open cisco


    // To detect if the chat is being launched on mobile device
    function isMobile() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /(android|bb\d+|meego).+mobile|bada\/|blackberry|iemobile|ip(hone|od)|lge |mobile.+firefox|opera m(ob|in)i|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent);
    }

    var ciscoBubbleChat = (function () {
        // var smHost = 'SM2-UCCX.dcloud.cisco.com';
        // var smHost = '64.100.10.15';
        // var smHost = '173.38.218.235'
        var smHost ='173.38.219.40'
        var widgetId = '4';
        // Modify this flag to false, To disable the chat download transcript option
        var enableTranscriptDownload = false;

        //Please change below accesibility messages for your language if reqiured.
        var accesibilityMessageForCloseButton = 'close';
        var accesibilityMessageForMinimizeButton = 'minimize';
        var accesibilityMessageForRestoreButton = 'restore';
        var accesibilityMessageToIndicateAgentTyping = 'Agent is typing';
        var accesibilityMessageToIndicateMessageFromAgent = 'message from';
        var accesibilityMessageToIndicateCustomerSentMessage = 'Sent message from';
        var accesibilityMessageToSelectRating = 'Please press 1 to 5 key with 1 being lowest and 5 being highest';

        var msgWaitingForSecureConnectivity = 'Waiting for secure connectivity...';
        var msgCloseButtonLabel = 'Close';

        var appId = 'cisco_bubble_chat';
        var appClass = isMobile() ? 'mobile_bubble_chat' : 'desktop_bubble_chat';
        var appMargin = 15;
        var scheme = 'https://';
        var appUrl = scheme + smHost + '/ccp/ui/BubbleChat.html?host=' + smHost + '&wid=' + widgetId;
        var connectivityCheckUrlSecure = scheme + smHost + '/ccp/ui/ConnectivityCheck.html';
        var secureConnectivityCheckTimeout = 2000;
        var logPrefix = 'CISCO_BUBBLE_CHAT: ';
        var addNoCacheQueryParam;

        var injectedAccessibilityConfigMessages = {
            'minimizeButtonText': accesibilityMessageForMinimizeButton,
            'closeButtonText': accesibilityMessageForCloseButton,
            'restoreButtonText': accesibilityMessageForRestoreButton,
            'agentTypingText': accesibilityMessageToIndicateAgentTyping,
            'agentSentMessageText': accesibilityMessageToIndicateMessageFromAgent,
            'customerSentMessageText': accesibilityMessageToIndicateCustomerSentMessage,
            'feedbackRatingIndicationText': accesibilityMessageToSelectRating
        };

        document.addEventListener("DOMContentLoaded", function () {
            ciscoBubbleChat.checkChatInProgress();
        });
        return {
            checkChatInProgress: function () {
                if (typeof (Storage) !== 'undefined') {
                    if (sessionStorage.chatInProgress && JSON.parse(sessionStorage.chatInProgress)) {
                        // console.log(logPrefix + 'Chat conversation in progress detected. Trying to resume.');
                        ciscoBubbleChat.showChatWindow();
                    } else {
                        // console.log(logPrefix + 'There is no chat conversation in progress currently');
                    }
                }
            },
            showChatWindow: function (injectedData) {
                // console.log("injectedData", injectedData)
                var messageEventListener;
                if (document.getElementById(appId)) {
                    // console.log(logPrefix + 'Not loading BubbleChat as it is already loaded');
                    return;
                }

                var validateInjectedData = function (data, dataLength) {
                    console.log("INJECTED DATA", data, "DATA")
                    // browser compatible way to check whether it is an object with 10 fields and all the values are strings
                    var result = true;
                    if (data && typeof data === 'object' && data.constructor === Object) {
                        var counter = 0;
                        for (var key in data) {
                            if (!(typeof data[key] === 'string' || data[key] instanceof String)) {
                                result = false;
                                break;
                            }
                            counter++;
                            if (counter > dataLength) {
                                result = false;
                                break;
                            }
                        }
                    } else {
                        result = false;
                    }
                    return result;
                };

                if (injectedData) {
                    if (validateInjectedData(injectedData.formData, 10)) {
                        appUrl += '&injectedFormData=' + encodeURIComponent(JSON.stringify(injectedData.formData));
                    } else {
                        if (typeof injectedData.validationErrorCallback === 'function') {
                            injectedData.validationErrorCallback();
                        } else {
                            // console.log(logPrefix + 'Could not invoke validationErrorCallback as it is not a function');
                        }
                    }
                }
                appUrl += '&enableTranscriptDownload=' + enableTranscriptDownload;

                var iframe = document.createElement('iframe');
                // iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms');
                // iframe.setAttribute('sandbox', 'allow-scripts  allow-same-origin allow-forms allow-popups');
                iframe.setAttribute('id', appId);
                iframe.setAttribute('class', appClass);

                // iframe.setAttribute('onclick', "postMessage({messageType:'unmount'})");
                document.body.appendChild(iframe);
                var frameWindow = iframe.contentWindow ? iframe.contentWindow : iframe;
                var frameDoc = frameWindow.document;

                // Trigger a page load for iframe inline content loading to work in Firefox
                frameDoc.open();
                frameDoc.close();

                if (isMobile()) {
                    frameDoc.body.style = 'margin:0;padding:0;';
                } else {
                    frameDoc.body.style = 'margin:0;padding:4;box-sizing:border-box;';
                }

                frameDoc.body.innerHTML = '<div id="secure_connectivity_check_container" style="width: 100%; height: 100%;' +
                    'font-family: Helvetica; font-size: 14px; color: #4F5051;text-align:center;' +
                    'box-shadow: 0 0 3px #000; background: #fff; display: flex; flex-direction: column;justify-content:space-around;">' +
                    '<div style="height:100%;display:flex;flex-direction:column">' +
                    '<div style="height:50%;display:flex;align-items:center;">' +
                    '<div style="width:100%;text-align:center;">' + msgWaitingForSecureConnectivity + '</div>' +
                    '</div>' +
                    '<div style="height:50%;display:flex;align-items:center;">' +
                    '<a href="#" onclick="window.parent.postMessage({messageType: \'unmount\'}, \'*\'); return void(0);" style="width:100%;text-align:center;">' +
                    msgCloseButtonLabel +
                    '</a>' +
                    '</div>' +
                    '</div>';
                '</div>';

                if (!addNoCacheQueryParam) {
                    addNoCacheQueryParam = function (url) {
                        return url + (url.indexOf("?") === -1 ? '?' : '&') + 'nocache=' + new Date().getTime();
                    }
                }

                if (!messageEventListener) {
                    messageEventListener = function (event) {

                        // console.log(logPrefix + 'Received event from origin: ' + event.origin);
                        // console.log(logPrefix + 'Received event data: ' + JSON.stringify(event.data));
                        switch (event.data.messageType) {
                            case 'resize':
                                var styleData = event.data.styles;
                                if (typeof styleData === 'object' && Object.keys(styleData).length > 0) {
                                    var widgetStyles = '';
                                    for (var style in styleData) {
                                        widgetStyles = widgetStyles + style + ':' + styleData[style] + ';';
                                    }
                                    document.getElementById(appId).style = widgetStyles;
                                }
                                break;
                            case 'unmount':
                                // console.log(document.getElementById(appId))
                                document.body.removeChild(document.getElementById(appId));

                                document.getElementById('response').innerHTML += `<h1 style='color:rgb(255,100,0)'> CHAT ENDED </h1>`
                                // console.log(window.document.contentWindow)
                                // console.log(window.document)
                                window.removeEventListener('message', messageEventListener);
                                // console.log(logPrefix + 'Successfully unmounted BubbleChat and remasoved event listener for message');
                                break;
                            case 'bubblechat-cert-accepted':
                                iframe.contentWindow.location.replace(addNoCacheQueryParam(appUrl));
                                // console.log(logPrefix + 'Successfully validated certificate acceptance and loaded BubbleChat');
                                break;
                            case 'set-chat-in-progress':
                                if (typeof (Storage) !== 'undefined') {
                                    // console.log(("sessionStorage", sessionStorage))
                                    sessionStorage.chatInProgress = JSON.stringify(true);
                                    // console.log(logPrefix + 'chatInProgress flag set in parent window');
                                }
                                break;
                            case 'clear-chat-in-progress':
                                if (typeof (Storage) !== 'undefined') {
                                    sessionStorage.removeItem("chatInProgress");
                                    // console.log(logPrefix + 'chatInProgress flag cleared in parent window');
                                }
                                break;
                            case 'minimize':
                                document.getElementById(appId).classList.add('minimized_chat');
                                break;
                            case 'download-transcript':
                                const blob = new Blob([event.data.data], { type: 'text/html' });
                                const fileName = constructTranscriptFileName(event.data.customerName);
                                const blobUrl = window.URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = blobUrl;
                                link.download = fileName;
                                document.body.appendChild(link);
                                link.click();
                                // For Firefox it is necessary to delay revoking the ObjectURL
                                setTimeout(function () {
                                    document.body.removeChild(link);
                                    window.URL.revokeObjectURL(blobUrl);
                                }, 100);
                                break;
                            case 'restore':
                                // document.getElementById(appId).classList.remove('minimized_chat');
                                break;
                            case 'requestToSendAccessibilityMessage':
                                if (injectedAccessibilityConfigMessages && validateInjectedData(injectedAccessibilityConfigMessages, 7)) {
                                    // console.log("injectedAccessibilityConfigMessages", injectedAccessibilityConfigMessages)
                                    frameWindow.postMessage({ messageType: 'accessibilityMessages', injectedAccessibilityConfigMessages: injectedAccessibilityConfigMessages }, '*');
                                    // console.log(logPrefix + 'Successfully sent accessibility config messages to BubbleChat');
                                } else {
                                    // console.log(logPrefix + 'Error in validating accessibility config messages, will not be passed to BubbleChat');
                                }
                                break;
                            default:
                            // console.log(logPrefix + 'Unknown message type');
                        }
                    };
                }

                window.addEventListener('message', messageEventListener);
                // console.log(messageEventListener, "messageEventListener")
                // console.log(logPrefix + 'Event listener for message added');

                function constructTranscriptFileName(customerName) {
                    const dateTime = new Date().toLocaleString();
                    const dtTransformed = dateTime.replace(/ +/g, '').replace(/\W+/g, '').replace(/^/g, '');
                    const userName = customerName.replace(/ +/g, '_');
                    const fileName = 'ChatTranscript_' + userName + '-' + dtTransformed + '.html';
                    return fileName;
                }

                var obtainSecureConnectivity = function () {
                    window.open(addNoCacheQueryParam(connectivityCheckUrlSecure), 'SM_CERT_PAGE');
                };

                var xhrSecureConnectivityCheck = new XMLHttpRequest();
                xhrSecureConnectivityCheck.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        // console.log(logPrefix + 'Secure connectivity check status: ' + this.status);
                        switch (this.status) {
                            case 200:
                                iframe.contentWindow.location.replace(addNoCacheQueryParam(appUrl));
                                break;
                            default:
                                obtainSecureConnectivity();
                        }
                    }
                }
                // var iframe = document.getElementById(appId);
                // console.log("first", iframe, "iframe")
                // console.log("iframe", dataOfIframe, "iframe")
                // console.log(logPrefix + 'Checking secure connectivity to: ' + connectivityCheckUrlSecure);
                xhrSecureConnectivityCheck.open('HEAD', addNoCacheQueryParam(connectivityCheckUrlSecure), true);
                xhrSecureConnectivityCheck.timeout = secureConnectivityCheckTimeout;
                // xhrSecureConnectivityCheck.ontimeout = function () { console.log(logPrefix + 'Secure Connectivity check timed out'); }
                xhrSecureConnectivityCheck.send();
            }
        };
    })();







    // for o auth
// let GoogleAuth; // Google Auth object.

// function initClient() {
//   gapi.client.init({
//       'apiKey': 'AIzaSyCHrpQBF4OjmN4nurbuQVCVvhaDXsDtrRA',
//       'clientId': '149808242826-5ed7fspcd4djt5lsa12g28gdgi557v3p.apps.googleusercontent.com',
//       'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
//       'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
//   }).then(function () {
//       GoogleAuth = gapi.auth2.getAuthInstance();

//       // Listen for sign-in state changes.
//       GoogleAuth.isSignedIn.listen(updateSigninStatus);
//   });
// }
// initClient()