import { Config } from '../../types';
import Reddit from './Reddit';
import RedditSettings from './RedditSettings';

const config: Config = {
  key: 'background/reddit',
  name: 'Reddit',
  description: 'Who has time to add their own images.',
  dashboardComponent: Reddit,
  settingsComponent: RedditSettings,
  supportsBackdrop: true,
};

export default config;
