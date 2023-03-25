export interface HomeProps {
  tag: string;
  title: string;
  desc: string;
  imgPath: string;
  order: string;
}

export interface AboutProps {
  name: string;
  desc: string;
  working: IWorking;
  transform: boolean;
}

interface IWorking {
  features: string;
  markup?: string;
  design?: string;
  router?: string;
  api?: string;
}

export interface ProfileProps {
  setIsOpen: any;
}

export interface HeaderNavProps {
  isOpen: boolean;
  setIsOpen: any;
}
