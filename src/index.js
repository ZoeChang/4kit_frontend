import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Yahoo from './Form_y';
// import Sidebar from './sidebar'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));


// html 只有 id="root"
// 從App.js 傳入內容
// App.js 只設定 框架 最外層 div
// 最外層 div 包含 nav.wrapper (sidebar) and div.content (content)
//  nav.wrapper#sidebar if flex box and  CSS property align-items: stretch. 
//  

registerServiceWorker();
