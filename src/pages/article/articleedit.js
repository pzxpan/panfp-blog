import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Input, Spin, message, Select, Tag, Icon, Tooltip, Switch, Modal, Button } from 'antd';
import style from './article.less';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import BraftEditor, { EditorState } from 'braft-editor';
import storageHelper from '../../utils/storage';

const labelSpan = 2;
const contentSpan = 16;
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;
const emptyRaw = `{ blocks: [{ key: '98r8g', text: '', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {} }], entityMap: {} }`;

function ArticleEdit() {
  const user = storageHelper.get('web_user');
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(emptyRaw));
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [cateList, setCateList] = useState([]);
  const [labels, setLabels] = useState([]);

  const [categoryId, setCategoryId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'article/allHeaderCategories',
      callback: (categories) => {
        setCateList(categories);
      },
    });
    dispatch({
      type: 'article/getAllLabels',
      callback: (labels) => {
        labels.map(item => {
          item.selected = true;
        });
        setLabels(labels);
      },
    });
  }, []);

  function saveArticle(e) {
    dispatch({
      type: 'article/addArticleContent',
      payload: {
        user_id:user.user_id,
        title: title,
        category_id: categoryId,
        content_html: editorState.toHTML(),
        intro: intro,
        labels: labels.filter((item) => {
          return !item.select;
        }).map((item)=> {
          return item.label_id;
        }),
      },
      callback: (success) => {
        message.success('提交成功，等待管理员审核!! 创作很费脑，请稍作休息');
      },
    });
  }

  function saveDraft(e) {
    dispatch({
      type: 'article/addDraftContent',
      payload: {
        title: title,
        category_id: categoryId,
        content_html: editorState.toHTML(),
        intro: intro,
        labels: labels.filter((item) => {
          return !item.select;
        }),
      },
      callback: (success) => {
        message.success('提交成功，等待管理员审核!! 创作很费脑，请稍作休息');
      },
    });
  }

  return (
    <div className={style.articleEditPage}>
      <div>
        <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
          <Col span={labelSpan}>文章标题</Col>
          <Col span={contentSpan}><Input onChange={(e) => {
            setTitle(e.target.value);
          }}/></Col>
        </Row>
        <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
          <Col span={labelSpan}>文章摘要</Col>
          <Col span={contentSpan}>
            <TextArea autosize={{ minRows: 2, maxRows: 3 }} onChange={(e) => {
              setIntro(e.target.value);
            }}/>
          </Col>
        </Row>
        <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
          <Col span={labelSpan}>选择分类</Col>
          <Col span={6}>
            <Select style={{ width: 200 }} onChange={(e) => {
              setCategoryId(e);
            }}>
              {cateList.map(item => (
                item.subcategory.map(
                  cate => (<Option value={cate.category_id} key={cate.category_id}>{cate.name}</Option>),
                )))}
            </Select>
          </Col>
          <Col span={1}>标签</Col>
          <Col span={11}>
            <div className={style.tagsContainer}>
              {labels.map(label => {
                const isLongTag = label.name.length > 6;
                const tagElem = (
                  <Tag
                    key={label.name}
                    closable
                    color="#00adb5"
                    afterClose={() =>{label.select = false}}>
                    {isLongTag ? `${label.name.slice(0, 6)}...` : label.name}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={label.name} key={label.name}>{tagElem}</Tooltip> : tagElem;
              })}
            </div>
          </Col>
        </Row>
      </div>
      <div className={style.articleEditer}>
        <div className={style.wrapper}>
          <BraftEditor
            id="editor-with-code-highlighter"
            onChange={setEditorState}
          />
          <div className={style.editorFooter}>
            <Button className={style.submitBtn} onClick={saveArticle} style={{ margin: '16px 24px 0 0' }}>发表</Button>
            <Button className={style.draftBtn} onClick={saveDraft} style={{ marginTop: 16 }}>保存为草稿</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleEdit;
