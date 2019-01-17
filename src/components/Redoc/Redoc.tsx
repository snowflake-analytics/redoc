import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ThemeProvider } from '../../styled-components';
import { OptionsProvider } from '../OptionsProvider';

import { AppStore } from '../../services';
import { ContentItems } from '../ContentItems/ContentItems';
import { ApiContentWrap, RedocWrap } from './styled.elements';

import { StoreProvider } from '../StoreBuilder';

export interface RedocProps {
  store: AppStore;
}

export class Redoc extends React.Component<RedocProps> {
  static propTypes = {
    store: PropTypes.instanceOf(AppStore).isRequired,
  };

  componentDidMount() {
    this.props.store.onDidMount();
  }

  componentWillUnmount() {
    this.props.store.dispose();
  }

  render() {
    const { store: { menu, options } } = this.props;

    return (
      <ThemeProvider theme={options.theme}>
        <StoreProvider value={this.props.store}>
          <OptionsProvider value={options}>
            <RedocWrap className="redoc-wrap">
              <ApiContentWrap className="api-content">
                <ContentItems items={menu.items as any} />
              </ApiContentWrap>
            </RedocWrap>
          </OptionsProvider>
        </StoreProvider>
      </ThemeProvider>
    );
  }
}
