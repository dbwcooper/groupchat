import React from 'react';
import { Modal, Input } from 'antd';

const { TextArea } = Input;

class MarkDownModal extends React.Component {
  state = {
    content: '',
  }
  onChangeHandle = (e) => {
    this.setState({ content: e.target.value })
  }
  handleOk = () => {
    if (!this.state.content) return;
    let converse = {
      moment: new Date().getTime(),
      content: this.state.content,
      md: true,
    }
    this.setState({ content: '' });
    this.props.onEnter(converse);
  }
  render() {
    return (
      <Modal
        title="Markdown Contents"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.onMarkDown.bind(this, false)}
      >
        <TextArea value={this.state.content} rows={14} onChange={this.onChangeHandle} />
      </Modal>
    );
  }
}
export default MarkDownModal;
