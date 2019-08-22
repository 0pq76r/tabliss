import React, { FC } from 'react';

import { Props, defaultData } from './types';

const RedditSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="RedditSettings">
    <label>
      Show a new photo
      <select
        value={data.timeout}
        onChange={event =>
          setData({ ...data, timeout: Number(event.target.value) })
        }
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
        checked={data.by === 'official'}
        onChange={() => setData({ ...data, by: 'official' })}
      />
      {' '}
      Official collection
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === 'collections'}
        onChange={() => setData({ ...data, by: 'collections' })}
      />
      {' '}
      Custom Feed
    </label>

    {data.by === 'collections' && (
    <label>
      Tags
      <input
        placeholder="r/MinimalWallpaper"
        type="text"
        value={data.collections}
        onChange={event => setData({ ...data, collections: event.target.value })}
      />
    </label>
    )}
  </div>
);

export default RedditSettings;
