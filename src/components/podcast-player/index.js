'use strict'
import React, {Component} from 'react'
import styles from './style.module.css'
import {Box, Thread} from 'react-disqussion'

const PLAYBACK_RATES = [
  1.0,
  1.2,
  1.4,
  1.6,
  1.8,
  2.0,
]

class PodcastPlayer extends Component {
  constructor(props) {
    super(props)

    this.seekBarMouseDown = false
    this.audioEl = null
    this.seekBar = null
    this.seekBarProgress = null
    this.updateInterval = null;
  }

  componentDidMount() {
    this.updateInterval = setInterval(() => {
      this.setTimeBarTime(this.audioEl.currentTime)
    }, 100)
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.audioEl && nextState.time) {
      this.audioEl.currentTime = nextState.time
      this.setTimeBarTime(this.audioEl.currentTime)
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval)
  }

  setTimeBarTime(time) {
    const percent = (time / this.audioEl.duration) * 100
    this.seekBarProgress.style.width = `${percent}%`
  }

  handleSpeedClick(speed) {
    this.audioEl.playbackRate = speed
  }

  handleSeekMouseDown(event) {
    const {clientX} = event
    const seekBarRect = this.seekBar.getBoundingClientRect();
    const left = clientX - seekBarRect.left
    const time = (left / seekBarRect.width) * this.audioEl.duration

    this.setState({time})
  }

  render() {
    const {src} = this.props;

    return (
      <div className={styles.player}>
        <div
          className={styles.timeBar}
          onMouseDown={e => this.handleSeekMouseDown(e)}
          onDragCapture={e => this.handleSeekMouseDown(e)}
          ref={el => (this.seekBar = el)} >
          <div
            className={styles.timeBar_progress}
            ref={el => (this.seekBarProgress = el)} />
        </div>
        <audio
          className={styles.player_audio}
          controls='controls'
          preload='metadata'
          src={src}
          ref={el => (this.audioEl = el)} />
        <div className={styles.controls}>
          {PLAYBACK_RATES.map(speed => (
            <button
              key={speed}
              className={styles.controls_item}
              onClick={() => this.handleSpeedClick(speed)}>{speed}</button>
          ))}
        </div>
      </div>
    )
  }
}

export default PodcastPlayer
