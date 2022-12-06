import {MediaFile} from '@shopify/hydrogen/client';
import {Image} from '@shopify/hydrogen';
import type {MediaEdge} from '@shopify/hydrogen/storefront-api-types';
import {ATTR_LOADING_EAGER} from '~/lib/const';
import {IconCaret} from '../index';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({
  media,
  className,
}: {
  media: MediaEdge['node'][];
  className?: string;
}) {
  if (!media.length) {
    return null;
  }

  return (
    <div className="flex">
      <div style={{width: '90px'}}>
        <div className="flex text-center ml-6 mb-2.5">
          <span className="cursor-pointer">
            <IconCaret direction="up" className=" text-2xl" />
          </span>
        </div>

        {media.map((med, i) => {
          return (
            <div className="w-fit" key={i}>
              <Image
                src={med.image.url}
                width={70}
                height={90}
                alt="productImage"
                className="border-2  mb-4"
              />
            </div>
          );
        })}
        <div className="flex text-center ml-6 mb-2.5">
          <span className="cursor-pointer">
            <IconCaret direction="down" className="cursor-pointer text-2xl" />
          </span>
        </div>
      </div>

      <div className="card-image w-full h-fit ml-6">
        <Image src={media[0].image.url} alt="newImg" width={700} height={450} />
      </div>
    </div>
  );
}
