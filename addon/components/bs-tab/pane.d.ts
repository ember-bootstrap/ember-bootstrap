import Component from '@glimmer/component';

interface BsTabPaneSignature {
  Element: HTMLDivElement;
  Args: {
    groupTitle?: string;
    id?: string;
    title?: string;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsTabPane extends Component<BsTabPaneSignature> {}

export default BsTabPane;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsTab::Pane': typeof BsTabPane;
    'bs-tab/pane': typeof BsTabPane;
  }
}
