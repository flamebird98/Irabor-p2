// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
//initialize global variables
var mJson;

var mImages = [];

// This function makes the GalleryImage objects
function GalleryImage(imgPath, imgLoc, imgDesc, imgDate) {
	this.imgPath = imgPath;
	this.location = imgLoc;
	this.description = imgDesc;
	this.imgDate = imgDate;
}

function getQueryParams(qs) {
	qs = qs.split("+").join(" ");
	var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}
	return params;
}

var $_GET = getQueryParams(document.location.search);

//XMLHTTP Request
var mUrl;
if($_GET["json"] == undefined){
	mUrl = "extra.json";
	console.log(mUrl);
}
else {
	mUrl = $_GET["json"];
	console.log(mUrl);
}

function XMLHttpListener() {
	console.log(mRequest.response);
}
var mRequest = new XMLHttpRequest();
mRequest.addEventListener('load', XMLHttpListener);
	// puts image.json files into JSON object if the file is successfully opened

mRequest.open("GET", mUrl, false);
mRequest.send();
mJson = JSON.parse(mRequest.responseText);
for (var i = 0; i < mJson.images.length; i++) {
	mImages.push(new GalleryImage(mJson.images[i].imgPath, mJson.images[i].imgLocation, mJson.images[i].description, mJson.images[i].date));
}
			



function setImages() {
	//sets the inmage that is going to be displayed
	let details = $(".details");
	$('.thumbnail').attr("src", mImages[mCurrentIndex].imgPath);
    $(".location").text('Location: ' + mImages[mCurrentIndex].location);
    $(".description").text('Description: ' + mImages[mCurrentIndex].description);
	$(".date").text('Date: ' + mImages[mCurrentIndex].imgDate);
}

var mCurrentIndex = 0;
function swapPhoto() {
    if (mCurrentIndex < mImages.length - 1){
    	setImages();
    	mCurrentIndex++;
    }
    else {
    	mCurrentIndex = 0;
    }
	console.log('swap photo'); 
}

//function



// Holds the retrived JSON information


// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}



$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	$('#nextPhoto').css("float", "right");

	$('#nextPhoto').click(function() {
		swapPhoto();
	});

	$('.moreIndicator').click(function() {
		if ($(".moreIndicator").hasClass("rot90")){
			$('.details').slideToggle();
			$(".moreIndicator").addClass("rot270");
			$(".moreIndicator").removeClass("rot90");

		}
		else {
			$('.details').slideToggle();
			$(".moreIndicator").addClass("rot90");
			$(".moreIndicator").removeClass("rot270");
		}
	});



	$('#prevPhoto').click(function(){
		swapPhoto();

		if (mCurrentIndex < 0){
			mCurrentIndex = mImages.length - 1;
		}
	}); 

});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);