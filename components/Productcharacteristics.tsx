import { Product } from '@/app/(client)/Types';
import React from 'react';
import { Accordion, AccordionTrigger } from './ui/accordion';
import { AccordionContent, AccordionItem } from '@radix-ui/react-accordion';
interface Props {
    product:Product
}
const Productcharacteristics = ({product}:Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {product?.name}:Characteristics
        </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-1'>
            <p className='flex items-center justify-between'>Brand: <span className='font-semibold tracking-wide'>Unknown</span></p>
            <p className='flex items-center justify-between'>Collection: <span className='font-semibold tracking-wide'>2025</span></p>
            <p className='flex items-center justify-between'>Type: <span className='font-semibold tracking-wide'>{product?.ProductType}</span></p>
            <p className='flex items-center justify-between'>Stock: <span className='font-semibold tracking-wide'>{product?.Stock?'Available':"Out of Stock"}</span></p>
            <p className='flex items-center justify-between'>Varient: <span className='font-semibold tracking-wide'>{product?.productInto}</span></p>
          </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Productcharacteristics;
