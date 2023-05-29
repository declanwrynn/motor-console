const { PythonShell } = require('python-shell');

const runPy = async (data) => {
    const options = {
        mode: 'json',
        scriptPath: path.join(__dirname, '/src/py/')
      };
    let pyshell = new PythonShell('run_motor.py');
    pyshell.send(data);
    const result = await new Promise((resolve, reject) => {
        pyshell.on('message', (msg) => {
            return resolve(JSON.parse(msg));
        });
        pyshell.end((err, code, signal) => {
            if (err) return reject(err);
        });
    });
    return result;
};

export default runPy;