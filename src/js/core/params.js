/*
===============================================================
Defining Parameter Variables
===============================================================
*/

var stimFolder = 'src/assets/stimuli/people/'

var runIntro = true;
var runInstr = true;
var runExpt = true;
var runClose = true;
var runPreload = true;

// Defining Core Variables that remain constant
var BACKGROUND_DISP_TIME = 0;
var CROSS_DISP_TIME = 800; 
// var BACKGROUND_DISP_TIME = 300; //NOT USED
var PERSON_ONE_DISP_TIME = 0; 
var FULL_SCENE_DISP_TIME = 2000; //ms
var LEFT_CENTROID = [165, 230];
var RIGHT_CENTROID = [435, 380];
var CENTROIDS = [LEFT_CENTROID, RIGHT_CENTROID];
var RADIUS = 70; 
var allPeopleColors = ["red", "orange1", "orange2", "green1", "green3", "blue2", "blue3", "blue4", "blue5", "purple", "magenta", "pink"];

// Variables for Participant Information
var estTotalRunTime = 5;
var estDollars = 0.75;
var participantType = 'prolific';
var completionCode = 'CZJ72LJV';
var prolific_url = 'https://app.prolific.co/submissions/complete?cc='+completionCode;

// WAVE Backend Configuration
var waveBackendUrl = 'https://wave-backend-production-8781.up.railway.app';
// var waveBackendUrl = 'http://localhost:8000';  // For local development

// initializing variables
var timelinebase = [];
var timelineintro = [];
var timelineinstr = [];
var timelineexpt = [];
var timelineclose = [];
var forPreload = [];
var full_check = false;
var w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
var h =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

console.log(w,h)

// setting display image width
var imgWidth = 250; // for our AFC color images
var origBackWidth = 600;
var origBackHeight = 600;
var origPeopleWidth = 612;
var origPeopleHeight = 612;
var origBorderWidth = 650;
var origBorderHeight = 650;
var origStripeWidth = 1577;
var origStripeHeight = 931;

if (h < 400) {
    var imgBackWidth = 400; // your desired display img width
    var imgPeopleWidth = 55; // your desired display img width
} else {
    var imgBackWidth = 500; // your desired display img width
    var imgPeopleWidth = 68; // your desired display img width
}
    var scalingBackRatio = (imgBackWidth / origBackWidth);
    var scalingPeopleRatio = (imgPeopleWidth / origPeopleWidth);
    var scalingStripeRatio = (imgPeopleWidth / origStripeWidth);

    var imgBackHeight = scalingBackRatio * origBackHeight;
    var imgBorderWidth = scalingBackRatio  * origBorderWidth //uses the same scaling factor as imgBack
    var imgBorderHeight = scalingBackRatio  * origBorderHeight
    var imgPeopleHeight = scalingPeopleRatio * origPeopleHeight;
    var imgPeopleWidth = scalingPeopleRatio * origPeopleWidth;

    var imgStripePeopleWidth = scalingStripeRatio * origStripeWidth;
    var imgStripePeopleHeight = scalingStripeRatio * origStripeHeight;