import * as React from 'react';
import { defaultProps } from './constants';
import { By, Settings } from './interfaces';

interface Props extends Settings {
  onChange: (settings: Partial<Settings>) => void;
}

class RedditSettings extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  render() {
    return (
      <div className="RedditSettings">
        <label>
          Show a new photo
          <select
            value={this.props.timeout}
            onChange={event => this.props.onChange({ timeout: parseInt(event.target.value, 10) })}
          >
            <option value="0">Every new tab</option>
            <option value="900">Every 15 minutes</option>
            <option value="3600">Every hour</option>
            <option value="86400">Every day</option>
            <option value={Number.MAX_SAFE_INTEGER}>Pause</option>
          </select>
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.by === By.OFFICIAL}
            onChange={event => this.props.onChange({ by: By.OFFICIAL })}
          />
          {' '}
          Official collection
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.by === By.FEED}
            onChange={event => this.props.onChange({ by: By.FEED })}
          />
          {' '}
          Custom Feed
        </label>

        {this.props.by === By.FEED &&
          <div>
            <label>
              Tags
              <input
                placeholder="r/MinimalWallpaper"
                type="text"
                value={this.props.feed}
                onChange={event => this.props.onChange({ feed: event.target.value })}
              />
            </label>
          </div>
        }

        <label>
          Blur <br />
          <input
            type="range"
            min="0"
            max="50"
            step="5"
            value={typeof this.props.blur === 'boolean' ? 0 : this.props.blur}
            onChange={event => this.props.onChange({ blur: Number(event.target.value) })}
          />
        </label>

        <label>
          Darken <br />
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={typeof this.props.darken === 'boolean' ? 0 : this.props.darken}
            onChange={event => this.props.onChange({ darken: Number(event.target.value) })}
          />
        </label>
      </div>
    );
  }
}

export default RedditSettings;
