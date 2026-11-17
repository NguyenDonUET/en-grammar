import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGrammarStore } from '@/store/useGrammarStore'

export function SoundToggle() {
  const soundEnabled = useGrammarStore((s) => s.soundEnabled)
  const setSoundEnabled = useGrammarStore((s) => s.setSoundEnabled)

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
      onClick={() => setSoundEnabled(!soundEnabled)}
    >
      {soundEnabled ? <Volume2 aria-hidden /> : <VolumeX aria-hidden />}
    </Button>
  )
}
