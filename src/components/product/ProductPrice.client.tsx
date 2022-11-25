import {useProductOptions, Money} from '@shopify/hydrogen';
export function ProductPrice() {
  const {selectedVariant} = useProductOptions();
  const isOnSale =
    selectedVariant?.priceV2?.amount <
      selectedVariant?.compareAtPriceV2?.amount || false;

  const discountedPrice = +selectedVariant?.priceV2?.amount;
  const origingalPrice = +selectedVariant?.compareAtPriceV2?.amount;

  const discount = (origingalPrice - discountedPrice) / origingalPrice;
  const finaldiscount = Math.round(discount * 100);

  return (
    <div>
      <div>
        <Money
          withoutTrailingZeros
          data={selectedVariant.priceV2!}
          as="span"
          className="text-gray-900 font-monstreat text-2xl mr-1 font-semibold"
        />
        {isOnSale && (
          <div>
            <Money
              withoutTrailingZeros
              data={selectedVariant.compareAtPriceV2!}
              as="span"
              className="line-through font-monstreat mr-2 text-sm text-slate-400"
            />
            <span className="text-green-500 font-monstreat text-lg font-medium">
              {finaldiscount}% OFF
            </span>
          </div>
        )}
      </div>
      <span className="font-monstreat text-slate-400 text-base">
        inclusive of all taxes
      </span>
    </div>
  );
}
