import React, { Component } from "react";
import web3 from "../ethereum/web3";
import { Table, Button, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {

  state = {
    loading: false,
    errorMessage: ""
  }

  onApprove = async () => {

    this.setState({loading: false});

    // this.setState({loading: false, errorMessage: ""});

    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();

    try {
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0]
      });

    } catch(err) {
      // this.setState({errorMessage: err.message});
    }

    this.setState({loading: false});

  }

  onFinalize = async () => {

    this.setState({loading: false});

    // this.setState({loading: false, errorMessage: ""});

    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();

    try {
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      });

    } catch(err) {
      // this.setState({errorMessage: err.message});
    }

    this.setState({loading: false});

  }

  render() {
    const { Row, Cell } = Table;

    const { id, request, approversCount } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount} / {approversCount}</Cell>
        <Cell>
          <Button color="green" onClick={this.onApprove} loading={this.state.loading}>Approve</Button>
        </Cell>

        <Cell>
          <Button color="teal" onClick={this.onFinalize} loading={this.state.loading}>Finalize</Button>
        </Cell>
      </Row>
    )
  }
}

export default RequestRow;