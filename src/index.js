import * as Tone from 'tone'

var playCount, lastPlayTime, outputArea, textarea1, textarea2, textarea3, textarea4, textarea5, textarea6, textarea7, textarea8, textarea9, textarea10, textarea11, textarea12, textarea13, synth1, synth2, synth3, synth4, seq1, seq2, seq3, seq4, pingPong;

window.addEventListener("load", ()=>{
  outputArea = document.getElementById('output');
  outputArea.innerHTML = 'load start...';

  const button = document.querySelector('button');
  button.onclick = async ()=>{
    if (outputArea.innerHTML != 'audio is ready') {
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

  playCount = 0;
  outputArea.innerHTML = 'click to play';
});

function play() {
  const sTime = new Date();

  if (seq1) seq1.dispose();
  if (seq2) seq2.dispose();
  if (seq3) seq3.dispose();
  if (seq4) seq4.dispose();
  if (synth1) synth1.disconnect(pingPong);
  if (synth2) synth2.disconnect(pingPong);
  if (pingPong) pingPong.dispose();
  if (synth1) synth1.dispose();
  if (synth2) synth2.dispose();
  if (synth2) synth3.dispose();
  if (synth2) synth4.dispose();

  const toneParam     = JSON.parse("{" + textarea3.value + "}");
  const duration      = textarea4.value;
  const notes1        = JSON.parse("[" + textarea1.value + "]");
  const notes2        = JSON.parse("[" + textarea2.value + "]");
  const notes3        = JSON.parse("[" + textarea8.value + "]");
  const notes4        = JSON.parse("[" + textarea9.value + "]");
  const volume1       = textarea10.value;
  const volume2       = textarea11.value;
  const volume3       = textarea12.value;
  const volume4       = textarea13.value;
  const delayTime     = textarea5.value;
  const delayFeedback = textarea6.value;
  const delayWet      = textarea7.value;

  synth1 = new Tone.FMSynth(toneParam);
  synth2 = new Tone.FMSynth(toneParam);
  synth3 = new Tone.FMSynth(toneParam);
  synth4 = new Tone.FMSynth(toneParam);
  synth1.volume.value = volume1;
  synth2.volume.value = volume2;
  synth3.volume.value = volume3;
  synth4.volume.value = volume4;

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

  pingPong = new Tone.PingPongDelay(delayTime, delayFeedback).toDestination();
  pingPong.wet.value = delayWet;
  synth1.connect(pingPong);
  synth2.connect(pingPong);
  synth3.toDestination();
  synth4.toDestination();

  Tone.Transport.start();

  playCount++;
  const eTime = new Date();
  lastPlayTime = eTime;
  outputArea.innerHTML = "a " + playCount + " " + (eTime.getTime() - sTime.getTime()) + "msec";
}
