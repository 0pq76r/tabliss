import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Image } from './interfaces';

interface Props {
  image: Image;
}

const RedditCredit: React.StatelessComponent<Props> = (props) => (
  <div className="credit">
    <span style={{float: 'right'}}>
      {props.image.location_title}
    </span>

    <a
      href={props.image.image_link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <FormattedMessage
        id="plugins.reddit.photoLink"
        description="Photo link text"
        defaultMessage="Photo"
      />
    </a>
    {' / '}
    <a
      href={props.image.user_link}
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.image.user_name}
    </a>
    {' / '}
    <a
      href={'https://www.reddit.com/'}
      rel="noopener noreferrer"
      target="_blank"
    >
      reddit
    </a>
  </div>
);

export default RedditCredit;
