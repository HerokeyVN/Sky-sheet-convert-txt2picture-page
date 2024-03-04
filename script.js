//Load editor
const flask = new CodeFlask('#text-editor', {
	language: 'js',
	lineNumbers: true
});

//Upload sheet btn
const btnUpload = document.getElementById('btn-upload');

btnUpload.addEventListener("change", (event) => {
	let reader = new FileReader();
	reader.onload = event => {
		//console.log(JSON.parse(event.target.result));
		flask.updateCode(JSON.stringify(JSON.parse(event.target.result), null, 2));
	}
	reader.onerror = error => {
		console.error('Error: ', error);
	}
	reader.readAsText(event.target.files[0]);
});

//Listen event editors
const sheetName = document.getElementById('sheet-name');
const author = document.getElementById('author');
const transcript = document.getElementById('transcript');

flask.onUpdate(code=>{
	try {
		var json = JSON.parse(code);
	} catch (_) {return;}
	if (!json[0]) return;
	json = json[0];

	sheetName.value = json.name ? json.name:"";
	author.value = json.author ? json.author:"";
	transcript.value = json.transcribedBy ? json.transcribedBy:"";

	//console.log(json);
})

//Listen event input

const inputEvent = event=>{
	if (!event.target || !event.target.value) return;
	try {
		var json = JSON.parse(flask.getCode());
	} catch (_) {
		return event.target.value = "";
	}
	let map = {
		"sheet-name": "name",
		"author": "author",
		"transcript": "transcribedBy"
	}
	if (!json[0] || !json[0][map[event.target.id]]) return event.target.value = "";;
	json[0][map[event.target.id]] = event.target.value;
	flask.updateCode(JSON.stringify(json, null, 2));
};
sheetName.addEventListener('change', inputEvent);
author.addEventListener('change', inputEvent);
transcript.addEventListener('change', inputEvent);

//Convert to txt
