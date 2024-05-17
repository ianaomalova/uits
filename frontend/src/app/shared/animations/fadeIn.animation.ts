import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';

export const fadeIn: AnimationTriggerMetadata = trigger(
  'fadeIn', [
    transition(':enter', [style({ opacity: 0 }), animate(`0.2s`, style({ opacity: 1 }))]),
  ]
);
