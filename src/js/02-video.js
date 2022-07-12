import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

player.on(
  'timeupdate',
  throttle(function ({ seconds } = {}) {
    localStorage.setItem(LOCALSTORAGE_KEY, seconds);
    console.log(seconds + '  секунд');
  }, 1000)
);

function savedTime() {
  const curentTime = localStorage.getItem(LOCALSTORAGE_KEY);
  if (curentTime) {
    console.log(curentTime + 'сек');
    return curentTime;
  }
}

const saveCurentTime = savedTime();
console.log(saveCurentTime);

player.setCurrentTime(saveCurentTime);
