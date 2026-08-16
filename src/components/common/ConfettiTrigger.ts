import confetti from 'canvas-confetti';

export function fireConfetti(): void {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) {
    console.error('Confetti error', e);
  }
}

export function fireLevelUpConfetti(): void {
  try {
    const end = Date.now() + 2 * 1000;
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  } catch (e) {
    console.error('Level up confetti error', e);
  }
}
