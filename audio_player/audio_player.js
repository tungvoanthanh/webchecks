export class AudioPlayer {
    // UI Controls
    file1;
    file2;
    btnPlay;
    btnStop;
    player;
    player2;
    btnStop2;
    // Web Audio
    audioCtx;
    audioBuffer;
    audioSourceNode;
    mediaRecorder;

    init() {
        this.file1 = document.getElementById("file1");
        this.file2 = document.getElementById("file2");
        this.btnPlay = document.getElementById("btnPlay");
        this.btnStop = document.getElementById("btnStop");
        this.player = document.getElementById("player");
        this.btnRecord = document.getElementById("btnRecord");
        this.btnStop2 = document.getElementById("btnStop2");
        this.player2 = document.getElementById("player2");

        this.file1.addEventListener("change", this.readFile1.bind(this));
        this.file2.addEventListener("change", this.readFile2.bind(this));
        this.btnPlay.addEventListener("click", this.play.bind(this));
        this.btnStop.addEventListener("click", this.stop.bind(this));
        // this.player.addEventListener("play", this.handlePlayerEvent.bind(this));
        this.btnRecord.addEventListener("click", this.record.bind(this));
        this.btnStop2.addEventListener("click", this.stop2.bind(this));
    }

    record() {
        let chunks = [];
        const constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            this.mediaRecorder.onstart = (e) => {
                this.btnRecord.disabled = true;
                this.btnStop2.disabled = false;
            };
            this.mediaRecorder.onstop = (e) => {
                const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus"});
                chunks = [];
                const audioURL = URL.createObjectURL(blob);
                this.player2.src = audioURL;
            };
            this.mediaRecorder.start();
        });
    }

    stop2() {
        this.mediaRecorder.stop();
        this.btnRecord.disabled = false;
        this.btnStop2.disabled = true;
    }

    readFile1(event) {
        const file = event.target.files[0];

        // Validate file existence and type
        if (!file) {
            alert("No file selected. Please choose a file.", "error");
            return;
        }

        // Read the file
        const reader = new FileReader();
        reader.onload = async () => {
            const arrayBuffer = reader.result;
            this.audioCtx = new AudioContext();
            this.audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
            this.btnPlay.disabled = false;
            // console.log(`duration: ${this.audioBuffer.duration}; length: ${this.audioBuffer.length}; # of channels: ${this.audioBuffer.numberOfChannels}; sampleRate: ${this.audioBuffer.sampleRate}`);
        };
        reader.onerror = () => {
            showMessage("Error reading the file. Please try again.", "error");
        };
        reader.readAsArrayBuffer(file);
    }

    play() {
        this.audioSourceNode = new AudioBufferSourceNode(this.audioCtx, {buffer: this.audioBuffer});
        this.audioSourceNode.connect(this.audioCtx.destination);
        this.audioSourceNode.start(0, 30, 60);
        this.btnPlay.disabled = true;
        this.btnStop.disabled = false;
    }

    stop() {
        this.audioSourceNode.stop();
        this.btnPlay.disabled = false;
        this.btnStop.disabled = true;
    }

    readFile2(event) {
        const file = event.target.files[0];

        // Validate file existence and type
        if (!file) {
            alert("No file selected. Please choose a file.", "error");
            return;
        }

        // Read the file
        this.player.src = URL.createObjectURL(file);

    }

    // handlePlayerEvent(event) {
    //     console.log(event);
    // }
}
document.body.onload = new AudioPlayer().init();
