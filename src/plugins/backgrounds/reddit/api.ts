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
      let f = feed.replace(`/?`, `/.json?`);
      url += f;
      break;
    default:
      url += `r/wallpapers`;
  }

  if( ! url.includes( `/.json`) )
    url += `/.json`;

  // Fetch from API
  pushCallback();
  const res = await (await fetch(url)).json();
  let images = res.data.children
        .filter( ( o: any ) => {
            try {
                return (o.data.preview.images[0].source.width >= 1024 &&
                        o.data.preview.images[0].source.width > o.data.preview.images[0].source.height) ||
                    o.data.media_embed.content.includes( `gfycat.com` );
            } catch ( e ) {
                return false;
            }
        })
        .map( ( o: any ) => { return o.data; } );
  let img = images[Math.floor(Math.random() * images.length)];
  let data;
  if ( img.url.includes( `https://gfycat.com/` ) ) {
    img.url = decodeURIComponent(img.media_embed.content
                                 .replace(/.*thumbs.([^&]*)-size_restricted.gif.*/, 'https://giant.$1.gif'));
    data = img.url;
  } else {
    try {
        data = await (await fetch(img.url)).blob();
    } catch ( e ) {
        data = img.url;
    }
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
