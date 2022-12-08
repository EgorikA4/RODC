const record = document.querySelector('.record');

var flag = true;


let audioCtx;
const listen = document.getElementById('listen');
listen.disabled = true;


if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];

  let onSuccess = function(stream) {
    const mediaRecorder = new MediaRecorder(stream);


    record.onclick = function() {
      if(flag){
        record.innerHTML = "Стоп";
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        record.style.background = "red";
        flag = false;
      }
      else{
        record.innerHTML = "Запись"
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        record.style.background = "";
        record.style.color = "";
        flag = true;
        listen.disabled = false;
      }
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