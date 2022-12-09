const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
stop.hidden = true
const listen = document.querySelector('.listen');

const success_a = document.querySelector('.success');

success_a.disabled = true;

var flag = true;


let audioCtx;
const listen_canvas = document.querySelector('.micro__record-wrap');
const first_state = document.querySelector('.first_state');
const second_state = document.querySelector('.second_state');
second_state.hidden = true;
listen_canvas.style.visibility = 'hidden';


if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];

  let onSuccess = function(stream) {
    const mediaRecorder = new MediaRecorder(stream);


    record.onclick = function() {
      stop.hidden = false;
      record.hidden = true;
      first_state.hidden = true;
      second_state.hidden = false;
      listen_canvas.style.visibility = 'hidden';
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
    }
    stop.onclick = function(){
      stop.hidden = true;
      record.hidden = false;
      first_state.hidden = false;
      second_state.hidden = true;
      listen_canvas.style.visibility = 'visible';
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      listen.hidden = false;
    }

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      const audio = document.createElement('audio');
      const success = document.getElementById('success');
      const save_audio = document.createElement('a');
      const fail = document.getElementById('fail');

      audio.controls = true;
      const blob = new Blob(chunks, { 'type' : 'audio/wav' });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");


      listen.onclick = function(){
        audio.play();
      }

      success.onclick = function(){
        save_audio.setAttribute('href', audioURL);
        save_audio.setAttribute('download', 'test');
        save_audio.click();
        save_audio.removeAttribute('download');
      }

      fail.onclick = function(){
        listen.disabled = true;

      }

    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  let onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

} else {
   console.log('getUserMedia not supported on your browser!');
}