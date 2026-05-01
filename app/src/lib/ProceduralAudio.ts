export class ProceduralAudio {
  ctx: AudioContext;
  isPlaying: boolean;
  intervals: number[];

  constructor(ctx?: AudioContext) {
    this.ctx = ctx || new (window.AudioContext || (window as any).webkitAudioContext)();
    this.isPlaying = false;
    this.intervals = [];
  }

  getContext() {
    return this.ctx;
  }

  playAmbientTone() {
    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.value = 120 + (Math.random() * 40 - 20);
    gain1.gain.value = 0.03;

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.value = 178 + (Math.random() * 30 - 15);
    gain2.gain.value = 0.025;

    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);

    osc1.start(t);
    osc1.stop(t + 4);
    osc2.start(t);
    osc2.stop(t + 4);

    gain1.gain.setTargetAtTime(0, t, 4);
    gain2.gain.setTargetAtTime(0, t, 3.5);
  }

  playDeepDrone() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 55;
    gain.gain.value = 0.04;

    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 10;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    lfo.start(t);
    osc.start(t);
    osc.stop(t + 10);
    lfo.stop(t + 10);

    gain.gain.setTargetAtTime(0, t, 10);
  }

  start() {
    if (this.isPlaying) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.intervals.push(
      setInterval(() => this.playAmbientTone(), 5000)
    );
    this.intervals.push(
      setInterval(() => this.playDeepDrone(), 12000)
    );
    this.intervals.push(
      setInterval(() => this.playAmbientTone(), 8000)
    );
  }

  stop() {
    this.isPlaying = false;
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];
  }
}
