
var challenges = ["kite", "pillow", "atlantic", "bundle", "reverse" , "family", "quebec", "cough", "subject", "mugg", "spike", "fishing", "jumper", "knob", "chord"];

// var SPECIAL = "B7!";
var practice1_length = 14;
var practice2_length = 14;
var practice3_length = 14;
var practice4_length = 14;
var practice5_length = 18;
var practice6_length = 8;  // How should this number change?
var practice7_length = 8;  // How should this number change?
var webCounterVar    = 1;
var letterCodeFlag = +1;
var instFlag = +1;
var specialChars = "~`!#$%\^&*+=\-\[\]\\';,/{}|\\:<>\?\"";
var extraLetters = "uvwxyz"



var timer;

var done_can_submit = false;

var words_ = new Array(40);
var lmap = new Array(40);


letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q','r' ,'s' ,'t'];
consonants = ['b','c','d','f','g','h','j', 'k','l','m','n','p','q','r','s','t', 'v', 'w','x', 'y','z'];

permutation = [14, 1, 15, 3, 18, 10, 6, 7, 12, 19, 5, 11, 8, 13, 0, 2, 16, 17, 4, 9]

var letterCodeHintCountVar = Array.apply(null, Array(challenges.length)).map(Number.prototype.valueOf,0);
var instHintCountVar = Array.apply(null, Array(challenges.length)).map(Number.prototype.valueOf,0);

function gid(id) {
    return document.getElementById(id);
}

function hint(el, text) {
    el.innerText = text;
}

function gname(name) {
    return document.getElementsByName(name)[0];
}


function answer_letter(challenge) {

    var result = "";
    challenge.toLowerCase().split("").forEach(function (ch) {

        result += lmap[ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1];

    });

    if (!arguments.callee.caller || !arguments.callee.caller.toString().match(/check_answerLetter/)) {
        gname("counter").value = parseInt(gname("counter").value) + 1;
    }
    return result;
}

function check_answerLetter(challenge, guess) {
    guess = guess.toLowerCase();
    var a = answer_letter(challenge);
    return (a == guess) ? undefined : a;
}

function answer_password(challenge) {

    var result = "";
    challenge.toLowerCase().split("").forEach(function (ch) {
        if(extraLetters.indexOf(ch) == -1 ){
            result += lmap[ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1];
        }
    });
    // inja
    SPECIAL = gname("specialStringInput").value;
    //SPECIAL = "B7!"
    result = result + SPECIAL;
    return result;
}

function check_answerPassword(challenge, guess) {

    var a = answer_password(challenge);

    if (a == guess ){
        return 1;
    }
    else{
        return 0;
    }
}

function check_answerWord(challenge, guess) {
    var a = guess.toLowerCase();
    return (a == challenge) ? undefined : a;
}

function input_enter(id, callback) {
    challenge = gid(id + "_challenge").value;
    guess = gid(id + "_guess").value;
    check_answer(challenge, guess, callback);
}

function tick() {
    timer = new Date();
}

function tock() {
    return (new Date() - timer);
}



function saveFeedback(){


    for (var i = 1; i< 4; i++){

        var emptyAnswer = true;

        for (var j = 1; j< 8; j++){

            var radio = gid('q'+i+j);

            if(radio.checked){
                emptyAnswer = false;
            }
        }

        if(emptyAnswer === true){

            alert("Please answer all the questions and press the save button again.");
            return;
        }
    }

    for (var i = 4; i< 6; i++){

        var emptyAnswer = true;

        for (var j = 1; j< 3; j++){

            var radio = gid('q'+i+j);

            if(radio.checked){
                emptyAnswer = false;
            }
        }

        if(emptyAnswer === true){

            alert("Please answer all the questions and press the save button again.");
            return;
        }
    }


    for (var i = 1; i < 8; i++){
        var radio = gid('q1'+i)
        if (radio.checked){
            gname("funValue").value = radio.value;
        }
    }

    for (var i = 1; i < 8; i++){
        var radio = gid('q2'+i)
        if (radio.checked){
            gname("easinessValue").value = radio.value;
        }
    }

    for (var i = 1; i < 8; i++){
        var radio = gid('q3'+i)
        if (radio.checked){
            gname("easinessIncreaseValue").value = radio.value;
        }
    }

    for (var i = 1; i < 3; i++){
        var radio = gid('q4'+i)
        if (radio.checked){
            gname("wroteDown").value = radio.value;
        }
    }

    for (var i = 1; i < 3; i++){
        var radio = gid('q5'+i)
        if (radio.checked){
            gname("followUpSurveys").value = radio.value;
        }
    }

    gid("saveFeedbackDiv").style.display = "block";
    gid("saveFeedbackButton").style.display = "none";
    gname("feedback_time").value = tock();
    console.log("feedback tock!")
    done_can_submit = true;

}


setInterval(function () {
    var button = gid("submitButton");
    if (!button) return;
    button.style.display = done_can_submit ? "block" : "none";
    button.disabled = !done_can_submit;
}, 100)

var tries = 1;
var verify = false;
var qnum = 0;

function eval_click_password(){

    // When the user presses Begin or Next
    if ( (gid("eval_button").innerHTML == "Begin") || (gid("eval_button").innerHTML == "Next")){

        gid("introMessage").style.display = "none";
        gid("lastTable").style.display = "block";
        nextWeb();
        return;
    }

    hideLetterCodeHint();
    hideInstHint();
    flag2 = 1;

    var guess = gname("q" + qnum ).value.trim();
    var gold = check_answerPassword(challenges[qnum], guess);
    var correctPass = answer_password(challenges[qnum]);
    var html;

    //logging
    console.log("guess: " + guess);
    console.log("correctPass: " + correctPass);

    // user typed an empty password
    if (guess == "" && (gid("eval_button").innerHTML == "Submit password")){
        gid("verify_div").innerHTML = "<span class='wrong'>Please enter a password.</span>"
        return;
    }

    if ((tries <= 3) && (!verify)){

        gname("q"+qnum+"_"+tries).value = gold;
        console.log("q" + qnum + "_" +tries + ": " + gname("q"+qnum+"_"+tries).value)

        // last try and password is wrong
        if ((tries == 3)  && (gold == 0)){

            html = "<span class='wrong'>The correct answer would be <span class='pw'>" + correctPass + "</span>";
            gname("q" + qnum + "_correct").value = "0";
            gid("eval_button").innerHTML = "Next";
            gname("q" + (qnum)).readOnly = true;
            gname("q" + qnum + "_time").value = tock();
            console.log("q" + qnum + "_time : " + gname("q" + qnum + "_time").value );
            verify = true;
        }

        else{
            // Less than three tries and the password is wrong
            if (gold == 0){
                html = "<span class='wrong'>Try again!</span>";
                gname("q" + qnum).value = "";
                tries = tries + 1

            }
            // less than or equal to three tries and the password is correct
            else{
                html = "<span class='correct'>CORRECT!</span>";
                gname("q" + qnum + "_correct").value = "1";
                gid("eval_button").innerHTML = "Next";
                gname("q" + qnum).readOnly = true;
                gname("q" + qnum + "_time").value = tock();
                console.log("q" + qnum + "_time : " + gname("q" + qnum + "_time").value );
                verify = true;
            }
        }
        gid("verify_div").innerHTML = html;
        console.log("q"+ qnum + "_correct"+ ": " + gname("q" + qnum + "_correct").value );
    }
}

function increaseInstHintCount(){
    instHintCountVar[qnum]++;
    console.log("instHintCountVar[" + qnum + "]: " + instHintCountVar[qnum])
}

function hideInstHint(){
    gid("InsHintF").style.display = "none";
}


function increaseLetterCodeHintCount(){
    letterCodeHintCountVar[qnum]++;
    console.log("letterCodeHintCountVar[" + qnum + "]: " + letterCodeHintCountVar[qnum]);
}

function hideLetterCodeHint(){
    gid("letterCodeHint").style.display = "none";
}



function nextWeb() {

    if (gid("eval_button").innerHTML != "Begin"){
        gname("q" + qnum).style.display = "none"
        qnum ++;
    }

    if (qnum < challenges.length) {
        gname("q" + qnum).style.display = "block";
        gid("website_name").innerHTML = challenges[qnum];
        gid("website_name").style.font.weight = "300";
    } else {
        tick();
        gid("feedback").style.display = "block";
        gid("fun_div").style.display = "none";

        gname("letterCodeHintCount").value = letterCodeHintCountVar ;
        gname("instHintCount").value = instHintCountVar;
        console.log("letterCodeHintCount: ", gname("letterCodeHintCount").value);
        console.log("instHintCount: ", gname("instHintCount").value);
    }

    verify = false;
    tries = 1;

    increaseWebCounter();
    hideLetterCodeHint();
    hideInstHint();
    flag2 = 1;

    gid("verify_div").innerHTML = "";
    gid("eval_button").innerHTML = "Submit password";

    tick();
    console.log("tick!")
}

function increaseWebCounter(){
    gid("webCounter").innerHTML = webCounterVar + "/" + challenges.length;
    webCounterVar = webCounterVar + 1;
}


function I_eval_0() {
    var guess2 = gname("I001").value.trim();

    if(guess2 == "GmailSam"){

        gid("I0_checkButton1").style.display='none';
        gid("I0_nextButton1").style.display='block';
        gname("I_hint001").style.color='black'
        gname("I0_try").style.display='none'
        gname("I0_correct").style.display = 'block'

    }else{
        gname("I_hint001").style.color='red'
        gname("I0_try").style.display='block'
        gname("I_hint001").style.display='block'
    }
    return;
}


function I_eval_1(){

    var guess1 = gname("I100").value.trim();
    var guess2 = gname("I101").value.trim();


    if(guess1 == "qjqdrB7!" && guess2 == "lnltgclqB7!"){
        gid("I1_checkButton").style.display = 'none';
        gid("I1_nextButton").style.display = 'block';
        gname("I1_try").style.display = 'none';
        // gname("I1_correct").style.display = 'block';


        gid("I_hint100").style.display = 'inline-block';
        gid("I_hint100").innerHTML = "Correct!";
        gid("I_hint100").style.color = "green";

        gid("I_hint101").style.display = 'inline-block';
        gid("I_hint101").innerHTML = "Correct!";
        gid("I_hint101").style.color = "green";

        gid("ending").style.display = 'block';
        gid("amazonhint").style.display = 'none'

    }else{
        gid("I_hint100").style.display = 'inline-block';
        gid("I_hint101").style.display = 'inline-block';
        gname("I1_try").style.display = 'block';
        gid("amazonhint").style.display = 'block'

        if(guess1 != "qjqdrB7!" && guess2 == "lnltgclqB7!"){
            gid("I_hint100").innerHTML = "Wrong!";
            gid("I_hint100").style.color = "red";

            gid("I_hint101").innerHTML = "Correct!";
            gid("I_hint101").style.color = "green";
        }
        if(guess1 == "qjqdrB7!" && guess2 != "lnltgclqB7!"){
            gid("I_hint100").innerHTML = "Correct!";
            gid("I_hint100").style.color = "green";

            gid("I_hint101").innerHTML = "Wrong!";
            gid("I_hint101").style.color = "red";

        }
        if (guess1 != "qjqdrB7!" && guess2 != "lnltgclqB7!") {
            gid("I_hint100").innerHTML = "Wrong!";
            gid("I_hint100").style.color = "red";

            gid("I_hint101").innerHTML = "Wrong!";
            gid("I_hint101").style.color = "red";
        }
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// lmap is being set indise assing_rand_letter
function assign_rand_letter(index){
    console.log("inside assing random letter")
    lmap[Number(index)]=consonants[getRandomInt(0,21)];
    gname("map"+index).value=lmap[index];
    console.log("lmap["+ Number(index) +"]:"+lmap[Number(index)])

    return;
}

function is_map_full(){
    t=1;

    //set_letters_tmp();

    for (i = 1; i < 21; i++) {
        if(lmap[i]==null){
            t=0;
        }
    }

    if(t==1){
        gid("MapNextButton").style.display = 'inline-block';
        gid("MapCheckButton").style.display = 'none';
        setLetterMap();
        saveLetterMap();
        gname("map_not_full").style.display='none';
        // gid("mapEnding").style.display = 'block';
    }else{
        gname("map_not_full").style.display='block';
    }
}

function setLetterMap(){

    for(i=1;i<21;i++){
        gname("0_lmap"+i).value=lmap[i];
    }

}

function saveLetterMap(){
    for (i=1; i<21; i++){
        gname("letterMapString").value = gname("letterMapString").value + "-" + lmap[i];
    }

}

// saves the words that the user chose as a string in the wmapString
function saveWordMap(){
    for (i=1; i<21; i++){
        gname("wordMapString").value = gname("wordMapString").value + "-" + words[i];
    }
    console.log("wordMapString: ", gname("wordMapString").value ) ;
}


function set_letters_tmp(){
    console.log("saved a tmp mapping")
    for(i=1;i<21;i++){
        var rand = getRandomInt(0,21);

        lmap[i]=consonants[getRandomInt(0,21)];

    }
}

function is_words_full(){
    t=1;

    // inja
    // this sets the predefined word sequence for the words.
    //set_words_tmp();

    for ( i=1;i<21;i++){
        if(gname("word"+i).value.trim()==""){
            t=0;
        }else{
            words[i]=gname("word"+i).value.trim();
        }
    }

    if(t==1){
        saveWords();
        gname("words_not_full").style.display='none';
    }else{
        gname("words_not_full").style.display='block';
    }
}


function saveWords (){

    set_memorization1();
    set_memorization2();
    saveWordMap();

    // close the words page, go to the first memorization practice page
    gid('wordsNextButton').style.display='block';
    gid('wordsCheckButton').style.display = 'none';

}


function set_words_tmp(){

    for(i=1; i<21; i++){
        words[i] = tmpWords[i-1]
        gname("word"+i).value = words[i]
    }
}

function set_memorization1(){
    for(i=1;i<11;i++){
        gname("1_lmap"+i).value=lmap[i];
        gname("1_wmap"+i).value=words[i];
        gname("h_memorization"+i).textContent=letters[i-1]+" "+lmap[i]+" "+words[i];
    }
}


function set_memorization2(){
    for(i=11;i<21;i++){
        gname("1_lmap"+i).value=lmap[i];
        gname("1_wmap"+i).value=words[i];
        gname("h_memorization"+i).textContent=letters[i-1]+" "+lmap[i]+" "+words[i];
        // gname("1_lwmap"+i).value=letters[i-1]+" "+lmap[i]+" "+"gavenar";
    }
}


function set_practice(){
    for(i=1;i<21;i++){
        gname("2_lmap"+i).value = lmap[i];
        gname("h_practice"+i).textContent = words[i];
        gname("h_spractice"+i).textContent = lmap[i]+ "(" + words[i] + ")";
        gname("h_fpractice"+i).textContent = lmap[permutation[i-1]+1];
    }
}

function eval_memorization1(){
    t=1;
    for(i=1;i<11;i++){
        st1=gname("1_lwmap"+i).value.trim();
        st2=gname("h_memorization"+i).textContent;
        if(st1!=st2){
            t=0;
        }
    }

    if(t==1){
        gid("memcheckButton1").style.display='none';
        gid("memnextButton1").style.display='inline-block';
        gname("memorization_try1").style.display='none'

    }else{
        gname("memorization_try1").style.display='block'
    }
}

function eval_memorization2(){
    t=1;
    for(i=11;i<21;i++){
        st1=gname("1_lwmap"+i).value.trim();
        st2=gname("h_memorization"+i).textContent;
        if(st1!=st2){
            t=0;
        }
    }

    if(t==1){
        gid("memcheckButton2").style.display='none';
        gid("memnextButton2").style.display='inline-block';
        gname("memorization_try2").style.display='none';
    }else{
        gname("memorization_try2").style.display='block';
    }

}

function eval_practice_1(){
    t=1
    for( i=1;i<21;i++){
        st1=gname("2_wmap"+i).value.trim();
        st2=words[i];
        if(st1!=st2){
            t=0;
        }
    }

    if(t==1){
        gid("pracnextButton1").style.display='inline-block';
        gid("praccheckButton1").style.display='none';
        gname("prac_try1").style.display='none';
    }else{
        gname("prac_try1").style.display='block';
    }
}

function activatehint_memorization1(){
    for(i=1;i<11;i++){
        gname("h_memorization"+i).style.display='block';
        st1=gname("1_lwmap"+i).value.trim();
        st2=gname("h_memorization"+i).textContent;

        if(st1==st2){
            gname("h_memorization"+i).style.color='black';
        }else{
            gname("h_memorization"+i).style.color='red';
        }
    }
}

function activatehint_memorization2(){
    for(i=11;i<21;i++){
        gname("h_memorization"+i).style.display='block';
        st1=gname("1_lwmap"+i).value.trim();
        st2=gname("h_memorization"+i).textContent;
        if(st1==st2){
            gname("h_memorization"+i).style.color='black';
        }else{
            gname("h_memorization"+i).style.color='red';
        }
    }
}

function activateHints_prac1(){
    for(i=1;i<21;i++){
        gname("h_practice"+i).style.display='block';
        st1=gname("2_wmap"+i).value.trim();
        st2=words[i];
        if(st1==st2){
            gname("h_practice"+i).style.color='black';
        }else{
            gname("h_practice"+i).style.color='red';
        }
    }
}

function eval_practice_2(){
    t=1
    for( i=1;i<21;i++){
        st1=gname("3_lmap"+i).value.trim();
        st2=lmap[i];
        if(st1!=st2){
            t=0;
        }
    }
    if(t==1){
        gid("pracnextButton2").style.display='inline-block';
        gid("praccheckButton2").style.display='none';
        gname("prac_try2").style.display='none';
    }else{
        gname("prac_try2").style.display='block';
    }
}

function activateHints_prac2(){
    for(i=1;i<21;i++){
        gname("h_spractice"+i).style.display='block';
        st1=gname("3_lmap"+i).value.trim();
        st2=lmap[i];
        if(st1==st2){
            gname("h_spractice"+i).style.color='black';
        }else{
            gname("h_spractice"+i).style.color='red';
        }
    }
}

function eval_practice_3(){
    t=1
    for( i=1;i<21;i++){
        st1=gname("f_lmap"+i).value.trim();
        st2=lmap[permutation[i-1]+1];
        if(st1!=st2){
            t=0;
        }
    }

    if(t==1){
        gid("pracnextButton3").style.display='inline-block';
        gid("praccheckButton3").style.display='none';
        gname("prac_try3").style.display='none';
    }else{
        gname("prac_try3").style.display='block';
    }
}

function activateHints_prac3(){
    for(i=1;i<21;i++){
        gname("h_fpractice"+i).style.display='block';
        st1=gname("f_lmap"+i).value.trim();
        st2=lmap[permutation[i-1]+1];
        if(st1==st2){
            gname("h_fpractice"+i).style.color='black';
        }else{
            gname("h_fpractice"+i).style.color='red';
        }
    }
}

function showtext1(){
    gid("afterVideo1").style.display = "block";
    gid("videoConfirm1").style.display = "none";
}

function showtext2(){
    gid("afterVideo2").style.display = "block";
    gid("videoConfirm2").style.display = "none";
}

function showLetterCode(){
    for (i=1; i<21; i++){
        gid("fh_lmap"+i).innerHTML = lmap[i];
    }

    if(gid("letterCodeHint").style.display == "block"){
        gid("letterCodeHint").style.display="none";
    }else{
        gid("letterCodeHint").style.display = "block";
        increaseLetterCodeHintCount();
    }

    gname("specialStringHint").innerHTML = gname("specialStringInput").value;

}

function showInstructionsFinalPage(){
    if (instFlag == +1){
        gid("InsHintF").style.display = "block";
        // inja
        var sString = gname("specialStringInput").value;
        //var sString = "H8*"
        increaseInstHintCount();

    }
    if(instFlag == -1){
        gid("InsHintF").style.display = "none";
    }
    instFlag = instFlag * -1;

}

function containSpecialChar(str){
    for (var i = 0; i < specialChars.length ; i++){
        var char = specialChars[i];
        if (str.indexOf(char) != -1){
            return true;
        }
    }
    return false;
}

function containNumber(str){
    for (var i = 0; i < 10 ; i++){
        var char = i;
        if (str.indexOf(char) != -1){
            return true;
        }
    }
    return false;
}

function hasUpperCase(str) {
    if (str.toLowerCase() == str){
        return false;
    }
    return true;
}

function checkSpecialString(){

    var sString = gname("specialStringInput").value;

    if (sString == ""){
        alert("Please enter the special string")
        return;
    }

    if (!hasUpperCase(sString)){
        alert("Spceial string must contain a capital letter.")
        return;
    }

    if (!containNumber(sString)){
        alert("Special string must contain a number.")
        return;
    }

    if (!containSpecialChar(sString)){
        alert("The special string must contain one of the special characters " + specialChars)
        return;
    }

    gid("specialNextButton").style.display = "inline-block";
    gid("spcialCheckButton").style.display = "none";
    // Save the special string
    gname("savedSpecialString").value = sString;
}

function showaHintMemorization1(){

    gname("1_lwmap1").value =  letters[0] + " " + lmap[1] + " " + words[1];
}

function showaHintMemorization2(){

    gname("1_lwmap11").value = letters[10] + " " + lmap[11] + " " + words[11];
}

function showaHintFirstPractice(){
    gname("2_wmap1").value = words[1];
}

function showaHintSecondPractice(){
    gname("3_lmap1").value = lmap[1];
}

function showaHintThirdPractice(){
    // outputing letter map of "o"
    gname("f_lmap1").value = lmap[15];
}