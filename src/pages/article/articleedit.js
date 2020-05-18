import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Input, message, Select, Tag, Tooltip, Button } from 'antd';
import  './style.css';
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import storageHelper from '../../utils/storage';
import PicturesWall from '@/components/PicturesWall';
import style from '@/pages/article/article.less';

const labelSpan = 2;
const contentSpan = 16;
const { TextArea } = Input;
const { Option } = Select;

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

function ArticleEdit({match}) {
  const user = storageHelper.get('web_user');
  const { params: { id } } = match;
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [cateList, setCateList] = useState([]);
  const [labels, setLabels] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const dispatch = useDispatch();

  const [value, setValue] = useState("**请开始你的创作**");
  const [selectedTab, setSelectedTab] = useState("write");

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
    if (id && parseInt(id) > 0) {
      dispatch({
        type: 'article/getUserArticleDetail',
        payload: {
          user_id: user ? user.user_id: 0,
          article_id: parseInt(id),
        },
        callback: (articleDetail) => {
          setIntro(articleDetail.intro);
          setTitle(articleDetail.title);
          setCategoryId(articleDetail.category_id);
          setValue(converter.makeMarkdown(articleDetail.content_html));
        },
      });
    }
  }, []);
  function saveArticle(e) {
    if (user && user.user_id) {
      if (id && parseInt(id) > 0) {
        dispatch({
          type: 'article/updateArticleDetail',
          payload: {
            user_id: user.user_id,
            article_id: parseInt(id),
            title: title,
            category_id: categoryId,
            content_html: converter.makeHtml(value),
            intro: intro,
            labels: labels.filter((item) => {
              return !item.select;
            }).map((item) => {
              return item.label_id;
            }),
          },
          callback: (success) => {
            message.success('修改提交成功，等待管理员审核!! 创作很费脑，请稍作休息');
          },
        });
      } else {
      dispatch({
        type: 'article/addArticleContent',
        payload: {
          user_id: user.user_id,
          title: title,
          category_id: categoryId,
          content_html: converter.makeHtml(value),
          intro: intro,
          labels: labels.filter((item) => {
            return !item.select;
          }).map((item) => {
            return item.label_id;
          }),
        },
        callback: (success) => {
          message.success('提交成功，等待管理员审核!! 创作很费脑，请稍作休息');
        },
      });
      }
    } else {
      message.success('请先登录');
    }
  }
  return (
    <div className="articleEditPage">
      <div>
        <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
          <Col span={labelSpan}>文章标题</Col>
          <Col span={contentSpan}><Input value= {title} onChange={(e) => {
            setTitle(e.target.value);
          }}/></Col>
        </Row>
        <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
          <Col span={labelSpan}>文章摘要</Col>
          <Col span={contentSpan}>
            <TextArea autosize={{ minRows: 2, maxRows: 3 }} value = {intro} onChange={(e) => {
              setIntro(e.target.value);
            }}/>
          </Col>
        </Row>
        <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
          <Col span={labelSpan}>选择分类</Col>
          <Col span={6}>
            <Select style={{ width: 200 }} value = {categoryId} onChange={(e) => {
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
                    afterClose={() => {
                      label.select = false;
                    }}>
                    {isLongTag ? `${label.name.slice(0, 6)}...` : label.name}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={label.name} key={label.name}>{tagElem}</Tooltip> : tagElem;
              })}
            </div>
          </Col>
        </Row>
      </div>
      <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
        <Col span={labelSpan}>我的图片</Col>
      </Row>
      <PicturesWall />
      <div className={style.editorFooter}>
        <Button className={style.submitBtn} onClick={saveArticle} style={{ margin: '16px 24px 0 0' }}>发表文章</Button>
      </div>
      <div className="container">
        <ReactMde
          value={value}
          onChange={setValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          childProps={{
            writeButton: {
              tabIndex: -1
            }
          }}
        />
      </div>
    </div>
  );
}

export default ArticleEdit;
