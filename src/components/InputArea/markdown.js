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
    const { content } = this.state;
    if (!content) return;
    let converse = {
      moment: new Date().getTime(),
      content: content,
      md: true,
    }
    this.setState({ content: '' });
    this.props.onEnter(converse);
  }
  render() {
    const { onMarkDown, visible } = this.props;
    const { content } = this.state;
    return (
      <Modal
        title="Markdown Contents"
        visible={visible}
        onOk={this.handleOk}
        onCancel={onMarkDown.bind(this, false)}
      >
        <TextArea
          value={content}
          rows={14}
          onChange={this.onChangeHandle}
        />
      </Modal>
    );
  }
}
export default MarkDownModal;
