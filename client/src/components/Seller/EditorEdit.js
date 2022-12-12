import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import ".../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import HTMLtoDraft from "html-to-draftjs";
import "./Editor.css";
import { storeDescription } from "../../redux/actions";
import { connect } from "react-redux";

class EditorEdit extends Component {
  constructor(props) {
    super(props);
    const contentBlock = HTMLtoDraft(this.props.html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState
      };
    }
  }
  componentDidMount() {
    this.props.storeDescription(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });

    this.props.storeDescription(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: {
              className: "test",
              component: undefined,
              popupClassName: undefined,
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: undefined,
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: "500",
                width: "500"
              }
            }
          }}
        />
      </div>
    );
  }
}
export default connect(null, { storeDescription })(EditorEdit);
