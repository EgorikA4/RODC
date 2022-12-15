const time_audio = document.querySelector('.micro__text');

const audio_block = document.querySelector('.micro__record-wrap');

const success = document.querySelector('.success');

const fail = document.querySelector('.fail');

let audioCtx;

var flag_control_audio = false;


if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];

  let onSuccess = function(stream) {
    const mediaRecorder = new MediaRecorder(stream);

    let $record=$('button[type="record"]');
    $record.on('click', function() {
      var $this = $(this);
      if($this.hasClass('recording')) {
        $this.removeClass('recording');
        if(flag_control_audio){
          const get_audio = document.querySelector('.audio_eg');
          audio_block.removeChild(get_audio);
          flag_control_audio = false;
        }
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        $this.addClass('stopped');
        return;
      }
      if($this.hasClass('stopped')) {
        $this.removeClass('stopped');
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        $this.addClass('recording');
        return;
      }});
    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      const audio = document.createElement('audio');
      audio.setAttribute('class', 'audio_eg');
      const save_audio = document.createElement('a');

      audio.controls = true;
      const blob = new Blob(chunks, { 'type' : 'audio/wav' });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");

      audio_block.appendChild(audio);
      flag_control_audio = true;


      success.onclick = function(){
        save_audio.setAttribute('href', audioURL);
        save_audio.setAttribute('download', 'test');
        save_audio.click();
        save_audio.removeAttribute('download');
      }

      fail.onclick = function(){
        console.log('fail');
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