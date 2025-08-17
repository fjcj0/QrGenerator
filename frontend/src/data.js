import appstore from './assets/logos/appstore.png';
import facebook from './assets/logos/facebook.png';
import linkedin from './assets/logos/linkedin.png';
import schedule from './assets/logos/schedule.png';
import whatsapp from './assets/logos/whatsapp.png';
import bitcoin from './assets/logos/bitcoin.png';
import gmail from './assets/logos/gmail.png';
import playstore from './assets/logos/playstore.png';
import twitter from './assets/logos/twitter.png';
import youtube from './assets/logos/youtube.png';
import circleShape from './assets/bodyShapes/circle.svg';
import kiteShape from './assets/bodyShapes/kite.svg';
import smoothRoundShape from './assets/bodyShapes/smooth-round.svg';
import smoothSharpShape from './assets/bodyShapes/smooth-sharp.svg';
import circleFrame from './assets/eyeFrames/circle.svg';
import leftLeafFrame from './assets/eyeFrames/left-leaf.svg';
import roundedFrame from './assets/eyeFrames/rounded.svg';
import squareFrame from './assets/eyeFrames/square.svg';
import circleBall from './assets/eyeBalls/circle.svg';
import rightLeafBall from './assets/eyeBalls/right-leaf.svg';
import squareBall from './assets/eyeBalls/square.svg';
import leftDiamondBall from './assets/eyeBalls/left-diamond.svg';
import roundedBall from './assets/eyeBalls/rounded.svg';
export const logos = [
    { id: 1, src: appstore, alt: 'App Store' },
    { id: 2, src: facebook, alt: 'Facebook' },
    { id: 3, src: linkedin, alt: 'LinkedIn' },
    { id: 4, src: schedule, alt: 'Schedule' },
    { id: 5, src: whatsapp, alt: 'WhatsApp' },
    { id: 6, src: bitcoin, alt: 'Bitcoin' },
    { id: 7, src: gmail, alt: 'Gmail' },
    { id: 8, src: playstore, alt: 'Play Store' },
    { id: 9, src: twitter, alt: 'Twitter' },
    { id: 10, src: youtube, alt: 'YouTube' },
];
export const bodyShapes = [
    { id: 1, src: circleShape, alt: 'Circle', name: 'Circle', qrType: 'dots' },
    { id: 2, src: kiteShape, alt: 'Kite', name: 'Kite', qrType: 'classy' },
    { id: 3, src: smoothRoundShape, alt: 'Smooth Round', name: 'Smooth Round', qrType: 'extra-rounded' },
    { id: 4, src: smoothSharpShape, alt: 'Smooth Sharp', name: 'Smooth Sharp', qrType: 'square' },

];
export const eyeFrames = [
    { id: 1, src: circleFrame, alt: 'Circle', name: 'Circle', qrType: 'dots' },
    { id: 2, src: leftLeafFrame, alt: 'Left Leaf', name: 'Leaf Left', qrType: 'classy' },
    { id: 3, src: roundedFrame, alt: 'Rounded', name: 'Rounded', qrType: 'extra-rounded' },
    { id: 4, src: squareFrame, alt: 'Square', name: 'Square', qrType: 'square' },
];
export const eyeBalls = [
    { id: 1, src: circleBall, alt: 'Circle', name: 'Circle', qrType: 'dot' },
    { id: 2, src: rightLeafBall, alt: 'Right Leaf', name: 'Leaf Right', qrType: 'classy' },
    { id: 3, src: squareBall, alt: 'Square', name: 'Square', qrType: 'square' },
    { id: 4, src: leftDiamondBall, alt: 'Left Diamond', name: 'Diamond Left', qrType: 'classy-rounded' },
    { id: 5, src: roundedBall, alt: 'Rounded', name: 'Rounded', qrType: 'extra-rounded' },
];

export const levels = [
    { id: 1, level: 'L' },
    { id: 2, level: 'M' },
    { id: 3,level: 'Q' },
    { id: 4,level: 'H' },
];