var activatedImageOverlay = false;

// Easy way to remove element using its id
function removeElement(id) {
    return (elem = document.getElementById(id)).parentNode.removeChild(elem);
}

// Take string such as 20px and return number 20
function returnNum(string) {
    return parseInt(string, 10);
}

// Turn off chrome extension DOM manipulation when it is cancelled
function resetScript() {
    // Remove created elements and reset modified DOM styles
    removeElement("fullPageDarkenOverlayExtension");
    removeElement("chromeExtensionUploadDetailsContainer");
    document.body.style.cursor = "initial";

    // Turn off jquery events
    $(document.body).off('mouseenter', 'img', hoverImage);
    $(document.body).off('mouseenter', 'a > img', hoverImage);
    $(document.body).off('mouseenter', 'div > img', hoverImage);
    $(document.body).off('mouseenter', 'video', hoverVideo);
    $(document.body).off('mouseenter', 'a > video', hoverVideo);
    $(document.body).off('mouseenter', 'div > video', hoverVideo);
    $(document.body).off('click', stopPropagation)
}

// Stop propagation of DOM click event
function stopPropagation(event) {
    event.stopPropagation();
    event.preventDefault();
}

function hoverImage(event) {
    if (!activatedImageOverlay) {
        var img = $(this);
        // Create element
        var elem = document.getElementById("overlayImageUploadExtension");
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
        // Stop default click propagation
        $(document.body).on('click', stopPropagation)

        // Insert this overlay on top of the image
        $('<div id="overlayImageUploadExtension" />').text('').css({
            'height': img.height(),
            'width': img.width(),
            'background-color': 'orange',
            'position': 'absolute',
            'top': img.offset().top + returnNum(img.css("paddingTop")),
            'left': img.offset().left + returnNum(img.css("paddingLeft")),
            'opacity': 0.5,
            'z-index': 100000000000000000000,
            'cursor': 'pointer'
        }).bind('click', function(event) {
            event.stopPropagation();
            event.preventDefault();

            document.getElementById("fullPageDarkenOverlayExtension").style.pointerEvents = "auto";
            document.getElementById("fullPageDarkenOverlayExtension").style.zIndex = "1000000000"
                // Set dialogue box check to true
            activatedImageOverlay = true;
            $('<div id="chromeExtensionUploadDetailsContainer" />').html(`
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
                    <div style="font-family: 'Roboto', sans-serif;">
                    <div style="position: absolute; height: 73px; width: 100%; z-index: -1; top: 0px; left: 0px; background: #4DB6AB; border-radius: 10px 10px 0px 0px;"> </div>
                <div style="font-size: 2em; text-align: center; padding-bottom: 14px; height: 50px; color: #fff; padding: 20px; padding-top: 0px;"> Zokos File Upload </div>
                <img style="display: block; margin-left: auto; padding: 8px; margin-right: auto; max-width: 600px; max-height: 400px; border-radius: 5px" src=` + img[0].currentSrc + `>
                <div style="padding: 20px;">
                <div style="text-align: center; display: none;" id="loadingStartUploadExtension">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="color: #54cdc0"></i>
                <div style="margin-top: 10px;">Uploading file...</div>
                 </div>


                <div id="imageUploadOptionsContainer">
                <div style="text-align: center">
                <span> Image Name: </span> <input id="imageNameUploadInput" value="Example Image" placeholder="Image name" style="margin-left: 5px; border: solid 1px #b3b3b3; background: white; color: black; border-radius: 8px; width: 200px; outline: none; padding: 8px;" type="text" />
                </div>
                <div style="text-align: center; margin-top: 10px;">
                <div id="uploadClickSubmitButton" class="primaryButton">Upload</div>
                <div id="dangerClickCancelButton" class="dangerButton" style="margin-left: 20px;">Cancel</div>
                </div>
                </div>

                <div id="uploadedSuccessfullyOptionsContainer" style="text-align: center; display: none;">
                <div> Uploaded succesfully! </div>
                <div id="dangerClickCloseButton" class="dangerButton" style="margin-top: 10px;">Close</div>
                </div> 
                </div>
                </div>
                `).css({
                'max-height': '1000px',
                'max-width': '600px',
                'background-color': 'white',
                'position': 'fixed',
                'top': 'Calc(50% - 300px)',
                'left': 'Calc(50% - 300px)',
                'z-index': 10000000000000000,
                'cursor': 'initial',
                'border-radius': '15px',
                'padding': '20px'
            }).insertBefore($(document.body));

            document.getElementById('uploadClickSubmitButton').onclick = function() {
                uploadFile(img[0].currentSrc);
            };

            document.getElementById('dangerClickCancelButton').onclick = function() {
                resetScript();
            };

        }).bind('mouseleave', function() {
            $(this).fadeOut('fast', function() {
                $(this).remove();
            });
        }).insertBefore($(document.body))
    }
}

function hoverVideo(event) {
    if (!activatedImageOverlay) {
        var img = $(this);
        // Create element
        var elem = document.getElementById("overlayImageUploadExtension");
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
        // Stop default click propagation
        $(document.body).on('click', stopPropagation)

        // Insert this overlay on top of the image
        $('<div id="overlayImageUploadExtension" />').text('').css({
            'height': img.height(),
            'width': img.width(),
            'background-color': 'orange',
            'position': 'absolute',
            'top': img.offset().top + returnNum(img.css("paddingTop")),
            'left': img.offset().left + returnNum(img.css("paddingLeft")),
            'opacity': 0.5,
            'z-index': 10000000000000000,
            'cursor': 'pointer'
        }).bind('click', function(event) {
            event.stopPropagation();
            event.preventDefault();

            document.getElementById("fullPageDarkenOverlayExtension").style.pointerEvents = "auto";
            document.getElementById("fullPageDarkenOverlayExtension").style.zIndex = "1000000000"

            var videoHtml, videoSource;

            if (img[0].currentSrc.indexOf('youtube.com') > -1) {
                videoSource = img[0].baseURI + "#youtube";
                videoHtml = `<iframe style="text-align: center; width: 100%; height: 100%;" src="https://www.youtube.com/embed/` + img[0].baseURI.slice(-11) + `"> </iframe>`
            } else if (img[0].currentSrc.indexOf('vimeo.com') > -1) {
                videoSource = img[0].baseURI + "#vimeo";
                videoHtml = `<iframe style="text-align: center; width: 100%; height: 100%;" src="https://player.vimeo.com/video/` + img[0].baseURI.slice(-9) + `"> </iframe>`
            } else if (img[0].currentSrc.slice(0, 4) == 'blob') {
                videoSource = null
                setTimeout(function() {
                    document.getElementById("imageNameInputContainerExtension").style.display = "none";
                    document.getElementById("uploadClickSubmitButton").style.display = "none";
                    document.getElementById("dangerClickCancelButton").style.marginTop = "-10px";
                }, 20);
                videoHtml = `<div style="margin-top: 25px; text-align: center; font-weight: bold;"> Video type is not currently supported</div>
                         <div style="margin-top: 5px; text-align: center;">Type will be supported soon</div>`
            } else {
                videoSource = img[0].currentSrc + '#video';
                videoHtml = `<video style="display: block; margin-left: auto; margin-right: auto; margin-top: 15px; max-width: 540px; max-height: 300px; border-radius: 5px" controls>
                        <source src="` + img[0].currentSrc + `" type="video/mp4">
                        Your browser does not support the video tag.
                        </video>`
            }
            // Set dialogue box check to true
            activatedImageOverlay = true;
            $('<div id="chromeExtensionUploadDetailsContainer" />').html(`
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
                    <div style="font-family: 'Roboto', sans-serif;">
                    <div style="position: absolute; height: 73px; width: 100%; z-index: -1; top: 0px; left: 0px; background: #4DB6AB; border-radius: 10px 10px 0px 0px;"> </div>
                <div style="font-size: 2em; text-align: center; padding-bottom: 14px; height: 50px; color: #fff; padding: 20px; padding-top: 0px;"> Zokos File Upload </div> 
                ` + videoHtml + `
                <div style="padding: 20px;">
                <div style="text-align: center; display: none;" id="loadingStartUploadExtension">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="color: #54cdc0"></i>
                <div style="margin-top: 10px;">Uploading file...</div>
                 </div>


                <div id="imageUploadOptionsContainer">
                <div style="text-align: center" id="imageNameInputContainerExtension">
                <span> Image Name: </span> <input id="imageNameUploadInput" value="Example Video" placeholder="Image name" style="margin-left: 5px; padding: 8px; border: solid 1px #b3b3b3; background: white; color: black; border-radius: 8px; width: 200px; outline: none;" type="text" />
                </div>
                <div style="text-align: center; margin-top: 10px;">
                <div id="uploadClickSubmitButton" class="primaryButton">Upload</div>
                <div id="dangerClickCancelButton" class="dangerButton" style="margin-left: 20px;">Cancel</div>
                </div>
                </div>

                <div id="uploadedSuccessfullyOptionsContainer" style="text-align: center; display: none;">
                <div> Uploaded succesfully! </div>
                <div id="dangerClickCloseButton" class="dangerButton" style="margin-top: 10px;">Close</div>
                </div> 
                </div>
                </div>
                `).css({
                'max-height': '1000px',
                'max-width': '600px',
                'background-color': 'white',
                'position': 'fixed',
                'top': 'Calc(50% - 300px)',
                'left': 'Calc(50% - 300px)',
                'z-index': 100000000000000000,
                'cursor': 'initial',
                'border-radius': '15px',
                'padding': '20px'
            }).insertBefore($(document.body));

            document.getElementById('uploadClickSubmitButton').onclick = function() {
                uploadFile(videoSource);
            };

            document.getElementById('dangerClickCancelButton').onclick = function() {
                resetScript();
            };

        }).bind('mouseleave', function() {
            $(this).fadeOut('fast', function() {
                $(this).remove();
            });
        }).insertBefore($(document.body))
    }
}

function uploadFile(source) {
    var xhr = new XMLHttpRequest();

    document.getElementById('loadingStartUploadExtension').style.display = "block";
    document.getElementById('imageUploadOptionsContainer').style.display = "none";


    // Upload file details to the server
    xhr.open("POST", "https://zokos.com/api/uploadTest", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Function to track upload progress (used when downloading data and uploading directly to server for storage)
    // xhr.upload.addEventListener("progress", (evt) => this.progressFunction(evt), false);

    // Detects when XML request is completed
    xhr.upload.addEventListener('loadend', function(e) {
        var closeButton = document.getElementById("dangerClickCloseButton");

        // On clicking close reset script
        closeButton.onclick = function() {
            resetScript();
        }
        document.getElementById('loadingStartUploadExtension').style.display = "none";
        document.getElementById("uploadedSuccessfullyOptionsContainer").style.display = "block";
    });



    var xhrString = "name=" + imageNameUploadInput.value + "&src=" + source;

    xhr.send(xhrString);
}

function create() {
    if (!document.getElementById("fullPageDarkenOverlayExtension")) {
        var url, needle, substr;

        // Set screen darker so that you can see highlighted tags
        var divOverlay = document.createElement("div");

        divOverlay.onclick = function() {
            resetScript();
        };


        divOverlay.setAttribute("style", "width: 100%; height: 100%; background: black !important; position: fixed; top: 0px; opacity: .5; pointer-events: none; z-index: 10000000000;")
        divOverlay.setAttribute("id", "fullPageDarkenOverlayExtension")
        document.body.appendChild(divOverlay);

        // On mouseenter for img tags highlight img tag in question
        $(document.body).on('mouseenter', 'img', hoverImage);

        // On mouseenter for <a> tags with an img child highlight img tag in question, also prevent click events on a tags when extension is active 
        $(document.body).on('mouseenter', 'a > img', hoverImage);

        // On mouseenter for <> tags with an img child highlight img tag in question, also prevent click events on a tags when extension is active 
        $(document.body).on('mouseenter', 'div > img', hoverImage);



        // On mouseenter for img tags highlight img tag in question
        $(document.body).on('mouseenter', 'video', hoverVideo);

        // On mouseenter for <a> tags with an img child highlight img tag in question, also prevent click events on a tags when extension is active 
        $(document.body).on('mouseenter', 'a > video', hoverVideo);

        // On mouseenter for <> tags with an img child highlight img tag in question, also prevent click events on a tags when extension is active 
        $(document.body).on('mouseenter', 'div > video', hoverVideo);

        $('#iframe').load(function() {
            $(this).height($(this).contents().height());
            $(this).width($(this).contents().width());
        });

    } else {
        resetScript();
    }


}


create();

$(function() {

    var iFrames = $('iframe');

    function iResize() {

        for (var i = 0, j = iFrames.length; i < j; i++) {
            iFrames[i].style.height = iFrames[i].contentWindow.document.body.offsetHeight + 'px';
        }
    }

    if ($.browser.safari || $.browser.opera) {

        iFrames.load(function() {
            setTimeout(iResize, 0);
        });

        for (var i = 0, j = iFrames.length; i < j; i++) {
            var iSource = iFrames[i].src;
            iFrames[i].src = '';
            iFrames[i].src = iSource;
        }

    } else {
        iFrames.load(function() {
            this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
        });
    }

});
