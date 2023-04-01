import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';

const AccordionDemo = () => (
  <Accordion.Root
    className="bg-dark mt-4 w-[400px]"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>
        Is it accessible?
      </AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design
        pattern.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>
        Is it unstyled?
      </AccordionTrigger>
      <AccordionContent>
        Yes. It's unstyled by default, giving you
        freedom over the look and feel.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>
        Can it be animated?
      </AccordionTrigger>
      <AccordionContent>
        Yes! You can animate the Accordion with
        CSS or JavaScript.
      </AccordionContent>
    </AccordionItem>
  </Accordion.Root>
);

const AccordionItem = React.forwardRef(
  (
    {
      children,
      value,
    }: {
      children: React.ReactNode;
      value: string;
    },
    forwardedRef
  ) => (
    <Accordion.Item
      className="mt-px overflow-hidden bg-dark4 "
      value={value}
      ref={
        forwardedRef as React.RefObject<HTMLDivElement>
      }
    >
      {children}
    </Accordion.Item>
  )
);

const AccordionTrigger = React.forwardRef(
  (
    { children }: { children: React.ReactNode },
    forwardedRef
  ) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className=" text-gray5 font-normal text-base bg-dark9 group flex h-[45px] flex-1 cursor-default items-center justify-between px-5 leading-none outline-none"
        ref={
          forwardedRef as React.Ref<HTMLButtonElement>
        }
      >
        {children}
        <ChevronDownIcon
          className="text-white ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  (
    { children }: { children: React.ReactNode },
    forwardedRef
  ) => (
    <Accordion.Content
      className="text-white bg-dark6 font-semibold data-[state=open]:animate-slideDown data-[state=open]:animate-slideUp text-base"
      ref={
        forwardedRef as React.RefObject<HTMLDivElement>
      }
    >
      <div className="py-[10px] px-5">
        {children}
      </div>
    </Accordion.Content>
  )
);

export default AccordionDemo;
