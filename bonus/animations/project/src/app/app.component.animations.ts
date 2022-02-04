import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';

export const appComponentAnimations: any[] = [
    trigger('divState', [
        state(
            'normal',
            style({
                backgroundColor: 'red',
                transform: 'translateX(0)'
            })
        ),
        state(
            'highlighted',
            style({
                backgroundColor: 'blue',
                transform: 'translateX(100px)'
            })
        ),
        transition('normal <=> highlighted', animate(300)), // <=> back and forth
    ]),
    trigger('wildState', [
        state(
            'normal',
            style({
                backgroundColor: 'red',
                transform: 'translateX(0) scale(1)'
            })
        ),
        state(
            'highlighted',
            style({
                backgroundColor: 'blue',
                transform: 'translateX(100px) scale(1)'
            })
        ),
        state(
            'shrunken',
            style({
                backgroundColor: 'green',
                transform: 'translateX(0px) scale(0.5)'
            })
        ),
        transition('normal => highlighted', animate(300)),
        transition('highlighted => normal', animate(800)),
        transition(
            'shrunken <=> *', // * wild card to any state
            [ // Animation during transition
                style({ // Starting phase, if no animate method is used
                    backgroundColor: 'orange',
                }),
                animate(1000, style({ // Second phase, if we animate with style
                    borderRadius: '50px'
                })),
                animate(500) // End phase, if we animate without style
                // and so on...
            ]
        ),
    ]),
    trigger('list1', [
        state(
            'in',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        // void, reserved state name
        // the element is not in the dom yet
        transition('void => *', [
            style({ // initial style right at the beginning
                opacity: 0,
                transform: 'translateX(-100px)'
            }),
            animate(300)
        ]), // void to any state
        transition('* => void', [
            // Start with the default state style
            animate(300, style({
                opacity: 0,
                transform: 'translateX(100px)'
            }))
        ])
    ]),
    trigger('list2', [
        state(
            'in',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition('void => *', [
            // keyframes to control which state we want to have in determined time during the transition
            animate(1000, keyframes([
                style({
                    offset: 0, // time based on the 1000 ms on the animation parent
                    opacity: 0,
                    transform: 'translateX(-100px)',
                }),
                style({
                    offset: 0.3,
                    opacity: 0.5,
                    transform: 'translateX(-50px)',
                }),
                style({
                    offset: 0.8,
                    opacity: 0.8,
                    transform: 'translateX(-20px)',
                }),
                style({
                    offset: 1,
                    opacity: 1,
                    transform: 'translateX(0px)',
                })
            ]))
        ]),
        transition('* => void', [
            // group animations with different timing
            // to make them happen at the same time
            // even with distinct duration
            group([
                animate(300, style({
                    color: 'red'
                })),
                animate(500, style({
                    opacity: 0,
                    transform: 'translateX(100px)'
                }))
            ]),
        ])
    ])
];