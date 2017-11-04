'use strict'
import React, {Component} from 'react'
import styles from './style.module.css'
import Link from 'gatsby-link'
import marked from 'marked'
import {Box, Thread} from 'react-disqussion'
import {timestampToSeconds} from '../../utils/time'
import PodcastPlayer from '../podcast-player/index';

const PLAYBACK_RATES = [
  1.0,
  1.2,
  1.4,
  1.6,
  1.8,
  2.0,
]

class PodcastPage extends Component {
  constructor(props) {
    super(props)
  }

  currentTime = 0;
  player = null;

  handleTimeClick(e) {
    const {target} = e

    if (target.classList.contains('podcast_time')) {
      e.preventDefault()

      this.player.setState({
        time: timestampToSeconds(target.innerText)
      });
    }
  }

  render() {
    const {data, id} = this.props.pathContext
    const {node: {title, date, link, notes}} = data

    return (
      <div>
        <div className={styles.back_link}>
          <Link to='/podcast/'>
            {'<'} назад
          </Link>
        </div>

        <header className={styles.header}>
          <h3 className={styles.header_title}>
            {title}
          </h3>
          <date className={styles.header_date}>
            {date}
          </date>
        </header>

        <PodcastPlayer
          src={link}
          ref={el => (this.player = el)} />

        <footer
          onClick={e => this.handleTimeClick(e)}
          className={styles.footer}
          dangerouslySetInnerHTML={{__html: marked(notes.notes)}} />

        <Box shortname='http-spb-frontend-ru'>
          <Thread
            url={`http://spb-frontend.ru/podcast/${id + 1}`}
            title={title}
            identifier={`podcast-${id + 1}`} />
        </Box>
      </div>
    )
  }
}

export default PodcastPage
