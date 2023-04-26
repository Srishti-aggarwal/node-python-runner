const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.post('/run', (req, res) => {
	const pythonProcess = spawn('python', ['script.py']);
	let output = '';
	pythonProcess.stdout.on('data', (data) => {
		output += data.toString();
	});
	pythonProcess.stderr.on('data', (data) => {
		output += data.toString();
	});
	pythonProcess.on('close', (code) => {
		if (code === 0) {
			res.send(output);
		} else {
			res.status(500).send(output);
		}
	});
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
