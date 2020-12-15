import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Home, LectureList, LectureDetail, SearchLectures} from "./index.js";

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home}/>
            <Route exact path="/lectures" component={LectureList}/>
            <Route path="/detail/:code" component={LectureDetail}/>
            <Route exact path="/search" component={SearchLectures}/>
        </BrowserRouter>
    );
}

export default App; 