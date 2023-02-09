import BsTabPane from './bs-tab/pane';

import Component from '@glimmer/component';

interface BsTabSignature {
  Element: HTMLDivElement;
  Args: {
    activeId?: string;
    customTabs?: boolean;
    fade?: boolean;
    fadeDuration?: number;
    type?: 'pills' | 'tabs';
    onChange?: (e?: Event) => void;
  };
  Blocks: {
    default: [
      {
        pane: typeof BsTabPane;
        activeId: string;
        select: (id: string) => void;
      }
    ];
  };
}

export declare class BsTab extends Component<BsTabSignature> {}

export default BsTab;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsTab: typeof BsTab;
    'bs-tab': typeof BsTab;
  }
}
