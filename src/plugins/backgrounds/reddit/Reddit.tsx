import React, { FC } from 'react';

import { useObjectUrl, useRotatingCache } from '../../../hooks';
import Backdrop from '../../../views/shared/Backdrop';
import { getImage } from './api';
import { Props, defaultData } from './types';
import RedditCredit from './RedditCredit';
import './Reddit.sass';

const Reddit: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
}) => {
  const cacheArea = { cache, setCache };
  const image = useRotatingCache(
    () => getImage(data, loader),
    cacheArea,
    data.timeout * 1000,
    [data.by, data.collections, data.featured, data.search],
  );
  let url_str = "";
  if (image && !(image.data instanceof Blob))
    url_str = image.data;
  const url = image && (image.data instanceof Blob) ?
        useObjectUrl(image && image.data) : url_str;

  return (
    <div className="Reddit fullscreen">
      <Backdrop
        className="image fullscreen"
        style={{ backgroundImage: url && `url(${url})` }}
      />

      {cache && <RedditCredit image={cache.now} />}
    </div>
  );
};

export default Reddit;
