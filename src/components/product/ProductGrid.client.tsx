import {
  useState,
  useRef,
  useEffect,
  useCallback,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import {Link, flattenConnection} from '@shopify/hydrogen';

import {Button, Grid, IconArrow, IconCaret, ProductCard} from '~/components';
import {getImageLoadingPriority} from '~/lib/const';
import type {Collection, Product} from '@shopify/hydrogen/storefront-api-types';
import ProductFilter from './ProductFilter.client';

export function ProductGrid({
  url,
  collection,
}: {
  url: string;
  collection: Collection;
}) {
  const nextButtonRef = useRef(null);
  const initialProducts = collection?.products?.nodes || [];
  const {hasNextPage, endCursor} = collection?.products?.pageInfo ?? {};
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cursor, setCursor] = useState(endCursor ?? '');
  const [nextPage, setNextPage] = useState(hasNextPage);
  const [pending, setPending] = useState(false);
  const haveProducts = initialProducts.length > 0;

  const fetchProducts = useCallback(async () => {
    setPending(true);
    const postUrl = new URL(window.location.origin + url);
    postUrl.searchParams.set('cursor', cursor);

    const response = await fetch(postUrl, {
      method: 'POST',
    });
    const {data} = await response.json();

    // ProductGrid can paginate collection, products and search routes
    // @ts-ignore TODO: Fix types
    const newProducts: Product[] = flattenConnection<Product>(
      data?.collection?.products || data?.products || [],
    );
    const {endCursor, hasNextPage} = data?.collection?.products?.pageInfo ||
      data?.products?.pageInfo || {endCursor: '', hasNextPage: false};

    setProducts([...products, ...newProducts]);
    setCursor(endCursor);
    setNextPage(hasNextPage);
    setPending(false);
  }, [cursor, url, products]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchProducts();
        }
      });
    },
    [fetchProducts],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '100%',
    });

    const nextButton = nextButtonRef.current;

    if (nextButton) observer.observe(nextButton);

    return () => {
      if (nextButton) observer.unobserve(nextButton);
    };
  }, [nextButtonRef, cursor, handleIntersect]);

  if (!haveProducts) {
    return (
      <>
        <p>No products found on this collection</p>
        <Link to="/products">
          <p className="underline">Browse catalog</p>
        </Link>
      </>
    );
  }

  return (
    <div className="flex sticky z-50 justify-center ml-60 mr-60 ">
      <div style={{width: '300px'}} className="sticky z-50">
        <div className="w-full px-4 py-0">
          <div className="py-3 px-0 border-none">
            <span className="font-monstreat text-base font-bold text-greyColor/50 ">
              FILTERS
            </span>
          </div>
          <div>
            <ProductFilter type="Category" />
            <ProductFilter type="Sizes" />
            <ProductFilter type="Brand" />
            <ProductFilter type="Color" />
            <ProductFilter type="Design" />
            <ProductFilter type="Fit" />
            <ProductFilter type="Sleeve" />
            <ProductFilter type="Neck" />
            <ProductFilter type="Type" />
            <ProductFilter type="Ratings" />
            <ProductFilter type="Discount" />
            <ProductFilter type="Sort By" />
          </div>
        </div>
      </div>
      <div className="w-full">
        {/* <div className="float-right px-0 py-3 ">
          <span className="uppercase font-monstreat text-base font-bold text-greyColor/50 px-3">
            Sort BY
          </span>
          <span>
            Popular <IconCaret />
          </span>
        </div> */}
        <Grid layout="products">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              loading={getImageLoadingPriority(i)}
            />
          ))}
          {nextPage && (
            <div
              className="flex items-center justify-center mt-6"
              ref={nextButtonRef}
            >
              <Button
                variant="secondary"
                disabled={pending}
                onClick={fetchProducts}
                width="full"
              >
                {pending ? 'Loading...' : 'Load more products'}
              </Button>
            </div>
          )}
        </Grid>
      </div>
    </div>
  );
}
