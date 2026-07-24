/*
===============================================================
PUSHING/RUNNING A CUSTOM SINGLE TRIAL (*singleTrial)
===============================================================
*/
function runSingleTrial(
    trialNumber,
    rotation,
    dispTime,
    group,
    timelineTrialsToPush,
    trialType,
) {

    /*--------------------------- General Utility ---------------------------*/
    var checkScreen = {
        type: jsPsychFullscreen,
        message:
            '<p>Unfortunately, it appears you are no longer in fullscreen mode. Please make sure to remain in fullscreen mode. <br>Click on the button to fullscreen the experiment again and proceed.</p>',
        fullscreen_mode: true,
        button_label: 'Resume',
    };

    var if_notFull = {
        timeline: [checkScreen],
        conditional_function: function () {
            if (full_check == false) {
                return true;
            } else {
                return false;
            }
        },
    };

    var cursor_off = {
        type: jsPsychCallFunction,
        func: function () {
            document.body.style.cursor = 'none';
        },
    };

    var cursor_on = {
        type: jsPsychCallFunction,
        func: function () {
            document.body.style.cursor = 'auto';
        },
    };

    /*--------------------------- Experiment specific variables ---------------------------*/
    //var personLeft = `${stimFolder}person_${stripe_angle_top}.png`
    // if (identical == true){
    //     var personRight = personLeft
    // } else {
    //     var personRight = `${stimFolder}person_${stripe_angle_top-difficulty}.png`
    // }
    
    var persistent_prompt = `<div style="position: fixed; top: 90%; left: 50%; transform: translateX(-50%); text-align: center;"></div>`;

    /* testing a slider */
    // tarSize = 40;
    // var dispCircleSlider = {
    //     type: jsPsychHtmlSliderResponseResizing,
    //     stimulus: `<img src="${thisStim}" />`,
    //     slider_start: 70,
    //     min: 20,
    //     max: 120,
    //     slider_width: 500,
    //     labels: ["smaller","larger"],
    //     trial_duration: null,
    //     response_ends_trial: true,
    //     prompt: `${persistent_prompt}`,
    //     data: {
    //         trial_category: 'answer'+trialType,
    //         trial_stimulus: thisStim,
    //         correct_response: tarSize,
    //     }, // data end
    //     on_finish: function(data){
    //         data.thisDifference = data.response - tarSize
    //     } // on finish end
    // }; // dispCircle end

    //  var disp = {
    //     type: jsPsychHtmlKeyboardResponse,
    //     stimulus: `<div style="position: absolute; top: ${h/2-imgBackHeight/2}px; left: ${w/2-imgBackWidth/2}px; transform: rotate(0deg);">
    //                 <div style="position: absolute; top: 0px; left: 0px;"><img src="${stimFolder}sN_35_blank.png" style="width: ${imgBackWidth}px;"> </img></div>
    //                 </div>`,
    //     choices: ['f', 'j'],
    //     trial_duration: BACKGROUND_DISP_TIME,
    //     response_ends_trial: true,
    //     prompt: `${persistent_prompt}`,
    //     data: {
    //         trial_category: 'prestimBackground'+trialType,
    //     }, // data end
    // }; // dispCircle end



    /* Rotation and Reflection Logic */
    var poss_trialRotations = [0, 90, 180]; // this one is in degrees!

    var trialRotation = randomChoice(poss_trialRotations, 1)[0];

    var poss_scaling = [1, -1]; //as in transform: scaleX(-1)

    var trialReflection = randomChoice(poss_scaling, 1)[0];


    /* Placement Variables -> See placement.js for calculation of the x,y coordinates */

    /* COLORS FOR REFERENCE: "red", "orange1", "orange2" "green1", "green3", "blue2", "blue3", "blue4", "blue5", "purple", "magenta", "pink" */
    
    
    var allPeople = shuffle(allPeopleColors);

    
    all_points = calcPlacements(CENTROIDS, rotation);


    var htmloutput = `<div style= "width: 600px; height: 600px; position: absolute; top: 50%; left: 50%; z-index: -999; transform: translate(-50%, -50%) rotate(${trialRotation}deg) scaleX(${trialReflection});"><img src="${stimFolder}background_border.png" style="width: ${imgBorderWidth}px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></img>`;
        for(var i = 0; i < all_points.length; i++) {
            if(group === "H_H") { //note the triple equals is on purpose (apparently it's the js version of .equals?)
                htmloutput += `<img src="${stimFolder}${allPeople[i]}.png" style = "position: absolute; top: ${all_points[i].y}px; left: ${all_points[i].x}px; width: ${imgPeopleWidth}px; transform: translate(-50%, -50%) rotate(${all_points[i].r}deg);"></img>`;
            };
            if(group === "H_L") {
                if(i <= 2) {
                    htmloutput += `<img src="${stimFolder}${allPeople[i]}.png" style = "position: absolute; top: ${all_points[i].y}px; left: ${all_points[i].x}px; width: ${imgPeopleWidth}px; transform: translate(-50%, -50%) rotate(${all_points[i].r}deg);"></img>`;
                } else {
                    htmloutput += `<img src="${stimFolder}/sitting/${allPeople[i]}.png" style = "position: absolute; top: ${all_points[i].y}px; left: ${all_points[i].x}px; width: ${imgPeopleWidth}px; transform: translate(-50%, -50%) rotate(${all_points[i].r}deg);"></img>`;
                }
            };
            if(group === "L_H") {
                if(i <= 2) {
                    htmloutput += `<img src="${stimFolder}/sitting/${allPeople[i]}.png" style = "position: absolute; top: ${all_points[i].y}px; left: ${all_points[i].x}px; width: ${imgPeopleWidth}px; transform: translate(-50%, -50%) rotate(${all_points[i].r}deg);"></img>`;
                } else {
                    htmloutput += `<img src="${stimFolder}${allPeople[i]}.png" style = "position: absolute; top: ${all_points[i].y}px; left: ${all_points[i].x}px; width: ${imgPeopleWidth}px; transform: translate(-50%, -50%) rotate(${all_points[i].r}deg);"></img>`;
                }
            };
            if(group === "L_L") {
                htmloutput += `<img src="${stimFolder}/sitting/${allPeople[i]}.png" style = "position: absolute; top: ${all_points[i].y}px; left: ${all_points[i].x}px; width: ${imgPeopleWidth}px; transform: translate(-50%, -50%) rotate(${all_points[i].r}deg);"></img>`;
            };
        }; // end for loop!
        htmloutput += `</div>`;


    /* Function to test attention */

    // var afcChoices = [`<img id="correct" src="${stimFolder}/colors/${allPeople[randomIntFromRange(0, 5)]}.png" style="width: ${imgWidth}px;">`,
    //  `<img id="incorrect" src="${stimFolder}/colors/${allPeople[randomIntFromRange(6, 11)]}.png" style=:"width: ${imgWidth}px;">`] //Note that our array of people is 12 people, so the first shuffled 6 will be guarenteed on screen!

    // afcChoices = shuffle(afcChoices);
    

    var [firstHalf, secondHalf] = cutArray(allPeople);

    var attentionCheckAFC = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<h1>In the image you just saw, was there a person wearing red?</h1>`,
        choices: ['Yes', 'No'],
        button_html: `<button style="background-color: #afafaf; border-width: 5px; border-radius: 14px; margin-bottom: 10px;" class="jspsych-btn image-choice">%choice%</button>`,
        data: {
            trial_category: "afc" + trialType
        },
        trial_duration: null, 
        on_finish: function(data){
            if (data.response == null) {
                data.thisAcc = 99;
            } else {
                if(data.response == 1 && firstHalf.includes("red")) { 
                    data.thisAcc = 1;
                } else {
                    data.thisAcc = 0;
                }
            }
        }//end on finish
    };



    /* Displaying the scene/ trial fxns */

    var dispOneThirdScene = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: htmloutput,
        choices: 'NO_KEYS',
        trial_duration: PERSON_ONE_DISP_TIME,
        response_ends_trial: false,
        prompt: `${persistent_prompt}`,
        data: {
            trial_category: 'dispThird' + trialType,
        }
    }; // dispOneThirdScene
    


    var dispHalfScene = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            htmloutput = htmloutput.replace(`</div>`, ``);
            htmloutput += `<img src="${personLeft}" style="width: ${imgStripePeopleWidth}px; position: absolute; top: ${imgBackHeight*.18-(imgPeopleHeight/2)}px; left: ${imgBackWidth*.25-(imgPeopleWidth/2)}px; z-index: 999; transform: rotate(180deg);"></img></div>`;
            return htmloutput;
        },
        choices: 'NO_KEYS',
        trial_duration: PERSON_ONE_DISP_TIME,
        response_ends_trial: false,
        prompt: `${persistent_prompt}`,
        data: {
            trial_category: 'dispHalf' + trialType,
        }
    }; // dispHalfScene


    

    var dispFullScene = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: htmloutput,
        choices: 'NO_KEYS',
        trial_duration: dispTime,
        response_ends_trial: false,
        prompt: `${persistent_prompt}`,
        data: {
            trial_category: 'answer'+trialType,
        } // data end
    }; // dispScene


    var holdResponse = {
        type: jsPsychHtmlButtonSpaceHoldResponse,
        // stimulus: `Now please try to <b>reproduce how long</b> the image stayed on screen. Click and hold down the button below for the same amount of time that you saw the image. <p>Releasing the button will <b>automatically submit</b> your response!</p><p>You have <b>only ONE try!</b></p>`,
        stimulus: `Now try to replicate how long the image was on screen (Use the <u>Spacebar</u>):`,
        choices: ["Click, hold, and release the Spacebar for the right amount of time!"],
        show_hold_duration_feedback: false,
        retries_allowed: null, // change to a number of allowed retries. Default is null.
        data: {
            trial_category: 'answer'+trialType,
            trial_dispTime: dispTime,
            trial_rotation: trialRotation,
            shapes_rotation: rotation,
            trial_reflection: trialReflection,
            background_group: group,
            screen_width: w,
            screen_height: h,
        }, // data end
        on_finish: function(data){
            data.thisDifference = data.hold_duration - (PERSON_ONE_DISP_TIME + PERSON_ONE_DISP_TIME + FULL_SCENE_DISP_TIME)
        } // on finish end
    }; // holdResponse end

    var prestim = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size:60px; z-index:2">+</div>`,
        prompt: `${persistent_prompt}`,
        choices: "NO_KEYS",
        trial_duration: PRESTIM_DISP_TIME,
        data: {
            trial_category: 'prestim_ISI' + trialType,
        }
    };

    var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<div style="position: absolute; top: ${h/2-imgBorderHeight/2}px; left: ${w/2-imgBorderWidth/2}px; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(${trialRotation}deg) scaleX(${trialReflection});">        
                <img src="${stimFolder}background_border.png" style="width: ${imgBorderWidth}px; display:block;"></img> 
        </div>`,
        prompt: `${persistent_prompt}`,
        choices: "NO_KEYS",
        trial_duration: FIXATION_DISP_TIME,
        data: {
            trial_category: 'fixation' + trialType,
        }
    };

    // var fixation = {
    //     type: jsPsychHtmlKeyboardResponse,
    //     stimulus: `<div style="position: absolute; top: ${h/2-imgBorderHeight/2}px; left: ${w/2-imgBorderWidth/2}px;"><img src="${stimFolder}background_border.png" style="width: ${imgBackWidth*(13/12)}px; z-index:1;"></img></div><div style="position: absolute; top: ${h/2}px; left: ${w/2}px; transform: translate(-50%, -50%); font-size:60px; z-index:2;">+</div>`,
    //     prompt: `${persistent_prompt}`,
    //     choices: "NO_KEYS",
    //     trial_duration: FIXATION_DISP_TIME,
    //     data: {
    //         trial_category: 'fixation' + trialType,
    //     }
    // };


    /*--------------------------- push single trial sequence ---------------------------*/
    
    timelineTrialsToPush.push(if_notFull);
    timelineTrialsToPush.push(cursor_off);
    timelineTrialsToPush.push(prestim);
    timelineTrialsToPush.push(fixation); 
    timelineTrialsToPush.push(dispOneThirdScene); 
    //timelineTrialsToPush.push(dispHalfScene); 
    timelineTrialsToPush.push(dispFullScene); 
    timelineTrialsToPush.push(holdResponse);
    if((elem != 0) && (elem % 6 == 0)) { //attention check every 6 trials! (note: not inclusive of first trial?)
        timelineTrialsToPush.push(cursor_on);
        timelineTrialsToPush.push(attentionCheckAFC); 
    };
    // timelineTrialsToPush.push(dispCircleSlider); // if you wanted to use the slider reproduction measurement tool
    timelineTrialsToPush.push(cursor_on);

}