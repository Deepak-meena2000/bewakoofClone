import {MediaFile} from '@shopify/hydrogen/client';
import {Image} from '@shopify/hydrogen';
import type {MediaEdge} from '@shopify/hydrogen/storefront-api-types';
import {ATTR_LOADING_EAGER} from '~/lib/const';

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

  console.log('Deepak console className', media);


  return (
    <div
      className={`swimlane md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 ${className}`}
    >
       {/* {media.map((med,i) =>  {
        return <div><Image src={med.image.url} width={80} height={70}/></div>
       })} */}
        <div>
        {media.map((med, i) => {
        

        // const style = [
        //   isFullWidth ? 'md:col-span-2' : 'md:col-span-2',
        //   isFirst || isFourth ? '' : 'md:aspect-[4/5]',
        //   'aspect-square ',
        // ].join(' ');

        return (
          <div
             className=' pl-56'
              // style={{width: '70px', height: '86.5px'}}
          >
            <Image src={med.image.url} width={80} height={70} alt="productImage" className='border border-2  mb-4' />
           
            
          </div>
        );
      })}</div>
     
      <div style={{width: '450px' , height:'700px'}}>
      <Image src={media[0].image.url} alt="newImg" width={700} height={450} />
      </div>
    </div>
  );
}
