var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


var commands = ['resume', 'about', 'contact', 'projects'];
var grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;';

var recognition = new SpeechRecognition();
var speechRecognitionList  = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar);

// add the grammarlist to this instance
recognition.grammars = speechRecognitionList;

// stop at one result or keep detecting each time the recognition is started
recognition.continuous = false;

// good practice to set language
recognition.lang = 'en-US';

// interim or final results
recognition.interimResults = false;

// number of potential alternative matches to be returned
recognition.maxAlternatives = 1;

// grab relevant dom elements
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');
var textDiv = document.querySelector('.textDiv');

// show what commands to try
var commandHTML = '';
commands.forEach((value, index, arr) => {
    console.log(value, index);
    // fill span div with options for commands
    commandHTML += '<span>' + value + ' ' + '</span>';
});

hints.innerHTML = 'Tap/click then say what you want to see. Try ' + commandHTML + '.';


// Implementing the actual listener
// clicking on body triggers the speech recognition
document.body.onclick = () => recognition.start();

recognition.onresult = (event) => {
    // grabbing what was said, transcribing, and putting into command variable
    // results property returns array of results and their alternatives
    var command = event.results[0][0].transcript;
    // Changes html to display command just said
    diagnostic.textContent = 'Your command: ' + command + '.';
    if (command == 'resume') {
        textDiv.textContent = 'This is my employment history.';
    } else if (command == 'contact' || command == 'what up') {
        textDiv.textContent = 'Oh, you want to get in touch... how flattering!';
    } else if ( command == 'you suck') {
        textDiv.textContent = 'meh... true';
        textDiv.style.backgroundColor = "maroon";
    } else {
        // textDiv.textContent = command;
        textDiv.style.display = 'none';

    } 
};

// stop recognition once a word recognized
recognition.onspeechend = () => recognition.stop();

// Errors
recognition.onnomatch = (event) => diagnostic.textContent = 'I didn"t recognize that command.';

