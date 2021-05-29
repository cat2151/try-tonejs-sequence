import * as Tone from 'tone'

var playCount1, playCount2, lastPlayTime, outputArea, textarea1, textarea2, textarea3, textarea4, textarea5, textarea6, textarea7, textarea8, textarea9, textarea10, textarea11, textarea12, textarea13, synth1, synth2, synth3, synth4, seq1, seq2, seq3, seq4, pingPong;

window.addEventListener("load", ()=>{
  outputArea = document.getElementById('output');
  outputArea.innerHTML = 'load start...';

  const button = document.querySelector('button');
  button.onclick = async ()=>{
    if (!playCount2) {
      await Tone.start();
      outputArea.innerHTML = 'audio is ready';
    }
    play();
  };

  textarea1 = document.querySelector('#textarea1');
  textarea1.addEventListener('input', play);
  textarea2 = document.querySelector('#textarea2');
  textarea2.addEventListener('input', play);
  textarea3 = document.querySelector('#textarea3');
  textarea3.addEventListener('input', play);
  textarea4 = document.querySelector('#textarea4');
  textarea4.addEventListener('input', play);
  textarea5 = document.querySelector('#textarea5');
  textarea5.addEventListener('input', play);
  textarea6 = document.querySelector('#textarea6');
  textarea6.addEventListener('input', play);
  textarea7 = document.querySelector('#textarea7');
  textarea7.addEventListener('input', play);
  textarea8 = document.querySelector('#textarea8');
  textarea8.addEventListener('input', play);
  textarea9 = document.querySelector('#textarea9');
  textarea9.addEventListener('input', play);
  textarea10 = document.querySelector('#textarea10');
  textarea10.addEventListener('input', play);
  textarea11 = document.querySelector('#textarea11');
  textarea11.addEventListener('input', play);
  textarea12 = document.querySelector('#textarea12');
  textarea12.addEventListener('input', play);
  textarea13 = document.querySelector('#textarea13');
  textarea13.addEventListener('input', play);

  playCount1 = 0;
  playCount2 = 0;
  outputArea.innerHTML = 'click to play';
});

function play() {
  try {
    playCount1++;
    const sTime = new Date();

    outputArea.innerHTML = 'at dispose';
    if (seq1) seq1.dispose();
    if (seq2) seq2.dispose();
    if (seq3) seq3.dispose();
    if (seq4) seq4.dispose();
    if (pingPong) pingPong.dispose();
    if (synth1) synth1.dispose();
    if (synth2) synth2.dispose();
    if (synth3) synth3.dispose();
    if (synth4) synth4.dispose();

    const toneParam     = parseJsonAndDispErrorMessage("{" + textarea3.value + "}", "toneParam");
    const duration      = textarea4.value;
    const notes1        = parseJsonAndDispErrorMessage("[" + textarea1.value + "]", "notes");
    const notes2        = parseJsonAndDispErrorMessage("[" + textarea2.value + "]", "notes");
    const notes3        = parseJsonAndDispErrorMessage("[" + textarea8.value + "]", "notes");
    const notes4        = parseJsonAndDispErrorMessage("[" + textarea9.value + "]", "notes");
    const volume1       = textarea10.value;
    const volume2       = textarea11.value;
    const volume3       = textarea12.value;
    const volume4       = textarea13.value;
    const delayTime     = textarea5.value;
    const delayFeedback = textarea6.value;
    const delayWet      = textarea7.value;
    if (toneParam == -1 || notes1 == -1 || notes2 == -1 || notes3 == -1 || notes4 == -1) return;

    outputArea.innerHTML = 'at synth';
    synth1 = newFMSynthAndDispErrorMessage(toneParam);
    synth2 = newFMSynthAndDispErrorMessage(toneParam);
    synth3 = newFMSynthAndDispErrorMessage(toneParam);
    synth4 = newFMSynthAndDispErrorMessage(toneParam);
    if (!synth1 || !synth2 || !synth3 || !synth4) return;
    synth1.volume.value = volume1;
    synth2.volume.value = volume2;
    synth3.volume.value = volume3;
    synth4.volume.value = volume4;

    outputArea.innerHTML = 'at seq';
    seq1 = new Tone.Sequence((time, note) => {
      synth1.triggerAttackRelease(note, duration, time);
    }, notes1).start(0);
    seq2 = new Tone.Sequence((time, note) => {
      synth2.triggerAttackRelease(note, duration, time);
    }, notes2).start(0);
    seq3 = new Tone.Sequence((time, note) => {
      synth3.triggerAttackRelease(note, duration, time);
    }, notes3).start(0);
    seq4 = new Tone.Sequence((time, note) => {
      synth4.triggerAttackRelease(note, duration, time);
    }, notes4).start(0);

    outputArea.innerHTML = 'at pingPong';
    pingPong = newPingPongDelayAndDispErrorMessage(delayTime, delayFeedback);
    if (!pingPong) return;
    if (!isOkDelayWetAndDispErrorMessage(delayWet)) return;
    synth1.connect(pingPong);
    synth2.connect(pingPong);
    pingPong.toDestination();
    synth3.toDestination();
    synth4.toDestination();

    outputArea.innerHTML = 'at start';
    Tone.Transport.start();

    playCount2++;
    const eTime = new Date();
    lastPlayTime = eTime;
    outputArea.innerHTML = getPlayCountStr() + (eTime.getTime() - sTime.getTime()) + "msec";
  } catch (error) {
    outputArea.innerHTML = getPlayCountStr() + outputArea.innerHTML + ' : play : error : ' + error;
  }
}

function parseJsonAndDispErrorMessage(str, strName) {
  try {
    return JSON.parse(str);
  } catch (error) {
    outputArea.innerHTML = getPlayCountStr() + strName + ' : JSON error : ' + error + "Strings : [" + str + "]";
    return -1;
  }
}

function newFMSynthAndDispErrorMessage(toneParam) {
  try {
    return new Tone.FMSynth(toneParam);
  } catch (error) {
    outputArea.innerHTML = getPlayCountStr() + 'FMSynth : error : ' + error + "Strings : [" + toneParam + "]";
    return null;
  }
}

function newPingPongDelayAndDispErrorMessage(delayTime, delayFeedback) {
  try {
    return new Tone.PingPongDelay(delayTime, delayFeedback);
  } catch (error) {
    outputArea.innerHTML = getPlayCountStr() + 'PingPongDelay : error : ' + error;
    return null;
  }
}

function isOkDelayWetAndDispErrorMessage(delayWet) {
  try {
    pingPong.wet.value = delayWet;
    return true;
  } catch (error) {
    outputArea.innerHTML = getPlayCountStr() + 'delayWet : error : ' + error;
    return false;
  }
}

function getPlayCountStr() {
//  return playCount1 + " " + playCount2 + " ";
  return "";
}
