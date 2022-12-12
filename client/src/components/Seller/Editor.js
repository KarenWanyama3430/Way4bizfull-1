import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import ".../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.css";
import { storeDescription } from "../../redux/actions";
import { connect } from "react-redux";

class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
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
              previewImage: false,
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
export default connect(null, { storeDescription })(ControlledEditor);
