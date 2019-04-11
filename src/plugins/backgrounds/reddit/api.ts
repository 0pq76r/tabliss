import { By, Image, Settings } from './interfaces';

export const getImage = async function (
  settings: Settings,
  pushCallback: Function,
  popCallback: Function,
): Promise<Image> {
  // Setup
  const { by, feed } = settings;

  // Build search url
  let url = 'https://www.reddit.com/';
  switch (by) {
    case By.FEED:
      url += feed;
      break;
    default:
      url += `r/wallpapers`;
  }
  url += `/.json`;

  // Fetch from API
  pushCallback();
  const res = await (await fetch(url)).json();
  let images = res.data.children
        .filter( ( o: any ) => {
            try {
                return o.data.preview.images[0].source.width >= 1024 &&
                    o.data.preview.images[0].source.width > o.data.preview.images[0].source.height;
            } catch ( e ) {
                return false;
            }
        })
        .map( ( o: any ) => { return o.data; } );
  let img = images[Math.floor(Math.random() * images.length)];
  let data;
  try {
      data = await (await fetch(img.url)).blob();
  } catch ( e ) {
      data = img.url;
  }
  popCallback();

  return {
    data: data,
    image_link: img.permalink.includes( `:` ) ? img.permalink : `https://www.reddit.com` + img.permalink,
    location_title: img.title,
    user_name: img.author_fullname,
    user_link: `https://www.reddit.com/user/` + img.author,
  };
};
