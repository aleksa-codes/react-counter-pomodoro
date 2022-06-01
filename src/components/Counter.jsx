import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [auto, setAuto] = useState(false);
  const [autoDown, setAutoDown] = useState(false);
  const [pomodoro, setPomodoro] = useState(false);
  const [work, setWork] = useState('🍅 Start working');

  useEffect(() => {
    if (auto && !autoDown) {
      const interval = setInterval(() => {
        setCount(count + 1);
      }, 1000);

      if (count === '🏁') {
        setCount(0);
        setWork('🍅 Start working');
      }
      return () => clearInterval(interval);
    }
    if (auto && autoDown) {
      const interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);

      if (count === '🏁') {
        setCount(0);
        setWork('🍅 Start working');
      }

      if (count === 0 && pomodoro) {
        confetti({
          particleCount: 150,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.1
          }
        });
        setTimeout(() => {
          confetti({
            particleCount: 150,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: Math.random(),
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.1
            }
          });
        }, 500);
        setTimeout(() => {
          confetti({
            particleCount: 150,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: Math.random(),
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.1
            }
          });
        }, 1000);
        setPomodoro(false);
        setAuto(false);
        setCount('🏁');
        setWork('✔️ Work done, great job!');
        setTimeout(() => {
          confetti.reset();
        }, 4000);
      }
      return () => clearInterval(interval);
    }
  }, [auto, count, autoDown, pomodoro]);

  const upOne = () => {
    if (count === '🏁') {
      setCount(0);
      setWork('🍅 Start working');
    } else {
      setCount(count + 1);
    }
  };

  const downOne = () => {
    if (count === '🏁') {
      setCount(0);
      setWork('🍅 Start working');
    } else {
      setCount(count - 1);
    }
  };

  const autoCount = () => {
    if (auto) {
      setAuto(false);
    } else {
      setAuto(true);
    }
    console.log('autoCount', !auto);
  };

  const autoDownCount = () => {
    if (autoDown) {
      setAutoDown(false);
    } else {
      setAutoDown(true);
    }
    console.log('autoDownCount: ', !autoDown);
  };

  const controlPomodoro = () => {
    if (!pomodoro) {
      setCount(5); //for testing purposes use 3-5, 1800sec = 30min
      setPomodoro(true);
      setAutoDown(true);
      setAuto(true);
    } else {
      setCount(0);
      setPomodoro(false);
      setWork('🍅 Start working');
      setAuto(false);
    }
    console.log('pomodoro: ', !pomodoro);
  };

  const minutes = String(Math.floor(count / 60)).padStart(2, '0');
  const seconds = String(count - minutes * 60).padStart(2, '0');

  return (
    <>
      <div className='container'>
        <div className='card'>
          <h1>Pomodoro & Timer</h1>
          <p className='count'>{pomodoro ? minutes + ':' + seconds : count}</p>
          <span>
            <span className='status'>
              {!pomodoro ? work : '🍅 focusing...'}
            </span>
          </span>
          <hr />
          <p className='plus-minus'>
            <button onClick={downOne} className='minus' disabled={pomodoro}>
              -1
            </button>
            <button onClick={upOne} className='plus' disabled={pomodoro}>
              +1
            </button>
          </p>
          <p className='options'>
            <button onClick={autoDownCount} disabled={pomodoro}>
              ↕️ Auto Count Up/Down
            </button>
            <span>
              auto count direction:{' '}
              <span className='status'>{autoDown ? 'down' : 'up'}</span>
            </span>
            <button onClick={autoCount} disabled={pomodoro}>
              🔄 Auto Count On/Off
            </button>
            <span>
              auto count: <span className='status'>{auto ? 'on' : 'off'}</span>
            </span>
            <hr />
            <button className='pomo-btn' onClick={controlPomodoro}>
              🍅 Pomodoro Start/End
            </button>
            <em>30min focus, don't forget a 5-10min break!</em>
          </p>
        </div>
        <footer>
          <p>
            &copy; {new Date().getFullYear()} • Made with
            <span role='img' aria-label='computer-coffee'>
              {/* 💜☕ */}
              💻☕
            </span>
            by
            <a
              href='https://github.com/aleksa-stojsic'
              target='_blank'
              rel='noreferrer'
            >
              {' '}
              Aleksa Stojsic
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};
