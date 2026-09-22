import { getImage } from 'astro:assets';
import avatar from '../assets/avatar.jpg';
import { assetUrl } from '../i18n/utils';

/** Absolute URL of a 460×460 JPEG rendition of the avatar, for Person JSON-LD. */
export async function personImageUrl(): Promise<string> {
  const img = await getImage({ src: avatar, width: 460, height: 460, format: 'jpeg' });
  return assetUrl(img.src);
}
