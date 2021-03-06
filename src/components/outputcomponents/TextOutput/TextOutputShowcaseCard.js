import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import CustomCard from '../../stateless/cards';
import TextOutputShowcaseModifyDialog from './TextOutputShowcaseModifyDialog';
import TextOutputPreview from './TextOutputPreview';
import toastr from 'toastr';

class TextOutputShowcaseCard extends React.Component {
  constructor(props) {
    super(props);
    let initHeaders = [];
    if (props.demoProps.outputComponentDemoModel.baseComponentId == '1') {
      initHeaders = props.demoProps.outputComponentDemoModel.props;
    }
    this.state = {
      headers: initHeaders,
      modifyDialogDisplay: false,
      previewDialogDisplay: false
    };
    this.demoModel = props.demoProps.demoModel;
    this.outputComponentDemoModel = props.demoProps.outputComponentDemoModel;
    this.outputComponentDemoModelActions = props.demoProps.outputComponentDemoModelActions;
    this.forwardAddress = props.demoProps.forwardAddress;
    this.forwardAddressAlternate = props.demoProps.forwardAddressAlternate;
    this.showModifyDialog = this.showModifyDialog.bind(this);
    this.showPreviewDialog = this.showPreviewDialog.bind(this);
    this.updateOutputComponentModel = this.updateOutputComponentModel.bind(this);
    this.updateHeaders = this.updateHeaders.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
    this.hideModifyDialog = this.hideModifyDialog.bind(this);
    this.hidePreviewDialog = this.hidePreviewDialog.bind(this);
  }

  showModifyDialog() {
    this.setState({modifyDialogDisplay: true});
  }

  hideModifyDialog() {
    this.setState({modifyDialogDisplay: false});
  }

  showPreviewDialog() {
    this.setState({previewDialogDisplay: true});
  }

  hidePreviewDialog() {
    this.setState({previewDialogDisplay: false});
  }

  updateOutputComponentModel() {
    if(Object.keys(this.demoModel).length == 0) {
      toastr.error('Registration info not found! Register again');
      browserHistory.push('/');
    } else {
      this.outputComponentDemoModelActions.updateOutputComponentModel({
        id: this.demoModel.id,
        baseComponentId: 1,
        props: this.state.headers
      }).then(() => {
        if (this.forwardAddressAlternate) {
          if (this.demoModel.status === 'input') {
            browserHistory.push(this.forwardAddress);
          } else if (this.demoModel.status === 'demo') {
            browserHistory.push(this.forwardAddressAlternate);
          }
        } else {
          browserHistory.push(this.forwardAddress);
        }
      });
    }
  }

  updateHeaders(data) {
    this.setState({headers: data});
  }

  getHeaders() {
    return this.state.headers;
  }

  render() {
    return (
      <div>
        <CustomCard
          header="Text Output"
          width="five"
          centeredParent
          centeredSegment
          displayData = {[
          'Number of Outputs: ' + this.state.headers.length
        ]}
          buttonData = {[
          {
            label: "Modify",
            onDeployClick: () => this.showModifyDialog()
          },
          {
            label: "Preview",
            onDeployClick: () => this.showPreviewDialog()
          },
          {
            label: "Use",
            onDeployClick: () => this.updateOutputComponentModel()
          }
        ]}
        />
        {this.state.modifyDialogDisplay && <TextOutputShowcaseModifyDialog
          functions={{
            updateHeaders: this.updateHeaders,
            hideModifyDialog: this.hideModifyDialog,
            getHeaders: this.getHeaders
          }}
        />}

        {this.state.previewDialogDisplay && <TextOutputPreview
          functions={{
            getHeaders: this.getHeaders,
            hidePreviewDialog: this.hidePreviewDialog
          }}
        />}
      </div>

    );
  }
}

TextOutputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired
};

export default TextOutputShowcaseCard;

