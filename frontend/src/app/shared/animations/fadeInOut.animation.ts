import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations'

export const fadeInOut: AnimationTriggerMetadata = trigger(
    'fadeInOut', [
        transition(':enter', [style({ opacity: 0 }), animate(`0.2s`, style({ opacity: 1 }))]),
        transition(':leave', [style({ opacity: 1 }), animate(`0.2s`, style({ opacity: 0 }))])
    ]
)