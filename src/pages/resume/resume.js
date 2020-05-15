
import React from 'react';
import { Col, Row, Card } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import rust from 'highlight.js/lib/languages/rust';
import json from 'highlight.js/lib/languages/json';
import sql from 'highlight.js/lib/languages/sql';
import nginx from 'highlight.js/lib/languages/nginx';

import '../article/article.less';
import './markdown-github.css';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-dark.css';
import replaceWithKatex from '../../utils/katextext';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('json', json);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('nginx', nginx);

const  detail = '';
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  headerPrefix: 'pan',
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});

const createMarkup = (body) => {
  return { __html: body };
};

function Resume() {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <Row type="flex" justify="center">
        <Col md={16} sm={20} xs={23}>
          <Row type="flex" justify="space-around">
            <Col lg={17} sm={22} xs={24}>
              <Card
                bordered={false}
                style={{ padding: '1rem' }}>
                <div className="article-content-main">
                  <div className="py-3">
                    <div className="mmb-1"
                         style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    </div>
                    <h2 className="my-4" style={{ fontWeight: 700 }}>潘振兴的简历</h2>
                    <div
                      className="markdown-body"
                      dangerouslySetInnerHTML={createMarkup(detail || '')}/>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>);
}
export default Resume;
