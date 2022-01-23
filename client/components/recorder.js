AFRAME.registerComponent('recorder', {
  
    transcript: "",
  
    init: function() {
      console.log("start recorder");
      this.record();
    },
  
    record: function() {
      var recorder = this;
      var elem = this.el;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
                  .getUserMedia({audio:true, video:false})
                  .then(function(stream) {
          const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm',
          });
          elem.setAttribute('color', '#00FF00');
          
          document.addEventListener('ybuttondown', event => {
            elem.setAttribute('color', '#FF5722');
            recorder.transcript = "";
            mediaRecorder.start(250);
            console.log('onopen');
          })

          document.addEventListener('ybuttonup', event => {
            mediaRecorder.stop();
            console.log("finished");
            elem.setAttribute('color', '#607D8B');
            console.log(recorder.transcript);
            fetch("https://nft-vr.herokuapp.com/transcript", {
              body: JSON.stringify({ "text": recorder.transcript }),
              headers: {
                "Content-Type": "application/json"
              },
              method: "POST"
            }).then((response) => {
              text_el.setAttribute('value', response);
              recorder.elem.emit("new-nfts", response.json(), true);
            });
          })
          
          var text_el = document.createElement('a-text');
          elem.appendChild(text_el);
          
          recorder.setup_socket(recorder, elem, mediaRecorder, text_el);
        }).catch(function(error) {
          elem.setAttribute('color', '#FFFF00');
          console.log(error);
        });
      } else {
        elem.setAttribute('color', '#FF00FF');
      }
    },
  
    setup_socket: function(recorder, elem, mediaRecorder, text_el) {
      var socket = new WebSocket('wss://api.deepgram.com/v1/listen?keywords=Systrom:2&keywords=cryptopunk:2&keyword_boost=legacy', [
        'token',
        'afb070dcdf74971b5a7734225d244ddf310571fc',
      ]);

      socket.onopen = () => {
        elem.setAttribute('color', '#9C27B0');

        mediaRecorder.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && socket.readyState == 1) {
            socket.send(event.data)
          }
        })

      }

      socket.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const t = received.channel.alternatives[0].transcript;
        console.log(t);

        text_el.setAttribute('value', "place " + t);
        text_el.setAttribute('position', "1.2 0 0");
        text_el.setAttribute('scale', "4 2 2");
        text_el.setAttribute('color', "#FF00FF");
        if (t && received.is_final) {
          console.log(t);
          recorder.transcript += t;
        }
      }

      socket.onclose = () => {
        elem.setAttribute('color', '#795548');
        console.log({ event: 'onclose' });
        recorder.setup_socket(recorder, elem, mediaRecorder, text_el);
      };

      socket.onerror = (error) => {
        console.log({ event: 'onerror', error });
      };

      elem.setAttribute('color', '#00FFFF');
    }
});