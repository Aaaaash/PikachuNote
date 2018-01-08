import { PureComponent } from 'react';

interface StateFulIconProps {
  enable: boolean;
  enableElement: any;
  disableElement: any;
}

class StateFulIcon extends PureComponent<StateFulIconProps> {
  render() {
    const { enableElement, disableElement, enable } = this.props;
    return enable ? enableElement : disableElement;
  }
}

export default StateFulIcon;
