import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useGrammarStore } from '@/store/useGrammarStore'

export function SoundToggle() {
  const soundEnabled = useGrammarStore((s) => s.soundEnabled)
  const setSoundEnabled = useGrammarStore((s) => s.setSoundEnabled)
  const label = soundEnabled ? 'Mute sounds' : 'Unmute sounds'

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-pressed={soundEnabled}
          aria-label={label}
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 aria-hidden /> : <VolumeX aria-hidden />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
