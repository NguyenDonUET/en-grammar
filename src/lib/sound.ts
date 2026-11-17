import { useGrammarStore } from '@/store/useGrammarStore'

export type SoundCue = 'correct' | 'incorrect' | 'complete'

const cache = new Map<SoundCue, HTMLAudioElement>()

function getAudio(cue: SoundCue): HTMLAudioElement {
  const existing = cache.get(cue)
  if (existing) return existing
  const audio = new Audio(`/sounds/${cue}.wav`)
  audio.preload = 'auto'
  cache.set(cue, audio)
  return audio
}

/** Play a cue after a user action. No-ops when muted. Fails silently if autoplay is blocked. */
export function playCue(cue: SoundCue) {
  try {
    if (!useGrammarStore.getState().soundEnabled) return
    const audio = getAudio(cue)
    audio.currentTime = 0
    void audio.play().catch(() => {})
  } catch {
    // Autoplay or missing file — fail silently.
  }
}
