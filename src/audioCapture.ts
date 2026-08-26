// IMPORTANT: this file must be imported BEFORE '@snap/camera-kit' anywhere in the app.
// Camera Kit plays lens sound effects/music through the Web Audio API straight to the
// speakers (AudioContext.destination) and does not expose that audio as a MediaStream.
// This patches AudioNode.connect so that any audio routed to speakers is *also* routed
// into a MediaStreamAudioDestinationNode we can hand to MediaRecorder.

const streamDestinations = new WeakMap<BaseAudioContext, MediaStreamAudioDestinationNode>();
const capturedStreams: MediaStream[] = [];

function getOrCreateStreamDestination(context: BaseAudioContext) {
  let destination = streamDestinations.get(context);
  if (!destination) {
    destination = (context as AudioContext).createMediaStreamDestination();
    streamDestinations.set(context, destination);
    capturedStreams.push(destination.stream);
  }
  return destination;
}

const originalConnect : any= AudioNode.prototype.connect;
// AudioNode.connect is overloaded (AudioNode | AudioParam); we widen the type here on purpose.
AudioNode.prototype.connect = function patchedConnect(this: AudioNode, target: any, ...rest: any[]) {
  if (target instanceof AudioDestinationNode) {
    const tap = getOrCreateStreamDestination(target.context);
    originalConnect.call(this, tap);
  }
  return originalConnect.call(this, target, ...rest);
} as typeof AudioNode.prototype.connect;

/** Returns the most recently created lens-audio stream, if any lens audio has played yet. */
export function getLensAudioStream(): MediaStream | null {
  return capturedStreams[capturedStreams.length - 1] ?? null;
}
