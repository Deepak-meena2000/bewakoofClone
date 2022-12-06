import {Fragment} from 'react';
import {IconCaret} from '../index';

const ProductFilter = (props: any) => {
  const {type} = props;
  return (
    <Fragment>
      <div className=" cursor-pointe border-b border-greyColorr">
        <div className="flex justify-between  py-4">
          <span className="">{type}</span>
          <IconCaret />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductFilter;
