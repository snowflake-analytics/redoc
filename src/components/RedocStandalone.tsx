import * as PropTypes from 'prop-types';
import * as React from 'react';

import { RedocNormalizedOptions, RedocRawOptions } from '../services/RedocNormalizedOptions';
import { ErrorBoundary } from './ErrorBoundary';
import { Loading } from './Loading/Loading';
import { Redoc } from './Redoc/Redoc';
import { StoreBuilder } from './StoreBuilder';

export interface RedocStandaloneProps {
  spec?: object;
  specNode?: object;
  specUrl?: string;
  options?: RedocRawOptions;
  onLoaded?: (e?: Error) => any;
}

const checkParams = (props, _, componentName) => {
  if (!props.spec && !props.specNode && !props.specUrl) {
    return new Error(
      `One of props 'spec' or 'specNode' or 'specUrl' was not specified in '${componentName}'.`,
    );
  }
  return null;
};

const wrapNode = (node: object) => ({
  "components": {
    "requestBodies": {
      "Object": {
        "content": {
          "application/json": {
            "schema": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/Object"
                }
              ]
            }
          }
        }
      }
    },
    "schemas": {
      "Object": { ...node }
    }
  },
  "info": {},
  "openapi": "3.0.0",
  "paths": {
    "/object": {
      "get": {
        "requestBody": {
          "$ref": "#/components/requestBodies/Object"
        }
      }
    }
  }
});

export class RedocStandalone extends React.PureComponent<RedocStandaloneProps> {
  static propTypes = {
    spec: checkParams,
    specNode: checkParams,
    specUrl: checkParams,
    options: PropTypes.any,
    onLoaded: PropTypes.any,
  };

  render() {
    const { spec, specNode, specUrl, options = {}, onLoaded } = this.props;
    const hideLoading = options.hideLoading !== undefined;

    const normalizedOpts = new RedocNormalizedOptions(options);

    const specJson = specNode ? wrapNode(specNode) : spec;

    return (
      <ErrorBoundary>
        <StoreBuilder spec={specJson} specUrl={specUrl} options={options} onLoaded={onLoaded}>
          {({ loading, store }) =>
            !loading ? (
              <Redoc store={store!} />
            ) : hideLoading ? null : (
              <Loading color={normalizedOpts.theme.colors.primary.main} />
            )
          }
        </StoreBuilder>
      </ErrorBoundary>
    );
  }
}
