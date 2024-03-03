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
		console.log(JSON.parse(event.target.result));
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

	console.log(json);
})