//Connecting to Deepgram API


navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  console.log({ stream })

  if (!MediaRecorder.isTypeSupported('audio/webm'))
    return alert('Browser not supported')

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm',
  })

  const socket = new WebSocket('wss://api.deepgram.com/v1/listen?keywords=Systrom:2&keywords=cryptopunk:2&keyword_boost=legacy', [
    'token',
    'afb070dcdf74971b5a7734225d244ddf310571fc',
  ])

  document.addEventListener('mousedown', event => {
    mediaRecorder.start(250)
  })

  document.addEventListener('mouseup', event => {
    mediaRecorder.stop()
  })

  socket.onopen = () => {
    document.querySelector('#status').textContent = 'Connected'

    console.log({ event: 'onopen' })

    mediaRecorder.addEventListener('dataavailable', async (event) => {
      if (event.data.size > 0 && socket.readyState == 1) {
        socket.send(event.data)
      }
    })

  }

  socket.onmessage = (message) => {
    const received = JSON.parse(message.data)
    const transcript = received.channel.alternatives[0].transcript
    if (transcript && received.is_final) {
      console.log(transcript)
      document.querySelector('#transcript').textContent =
        transcript + ' '
      const myArray = transcript.split(" ");
      document.querySelector('#demo').textContent =
        myArray + ' '
      console.log("These" + myArray);
      if (transcript.includes('hello')) {
        console.log('The word "' + '" exists in given string.');
      }
    }
  }


  socket.onclose = () => {
    console.log({ event: 'onclose' })
  }

  socket.onerror = (error) => {
    console.log({ event: 'onerror', error })
  }

})
