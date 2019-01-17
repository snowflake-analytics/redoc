import * as React from 'react';
import { SecurityRequirements } from '../SecurityRequirement/SecurityRequirement';

import { observer } from 'mobx-react';

import { MiddlePanel, Row } from '../../common-elements';
import { OptionsContext } from '../OptionsProvider';
import { Parameters } from '../Parameters/Parameters';
import { ResponsesList } from '../Responses/ResponsesList';

import { OperationModel as OperationType } from '../../services/models';
import styled from '../../styled-components';
import { Extensions } from '../Fields/Extensions';

const OperationRow = styled(Row)`
  backface-visibility: hidden;
  contain: content;

  overflow: hidden;
`;

export interface OperationProps {
  operation: OperationType;
}

@observer
export class Operation extends React.Component<OperationProps> {
  render() {
    const { operation } = this.props;

    return (
      <OptionsContext.Consumer>
        {() => (
          <OperationRow>
            <MiddlePanel>
              <Extensions extensions={operation.extensions} />
              <SecurityRequirements securities={operation.security} />
              <Parameters parameters={operation.parameters} body={operation.requestBody} />
              <ResponsesList responses={operation.responses} />
            </MiddlePanel>
          </OperationRow>
        )}
      </OptionsContext.Consumer>
    );
  }
}
