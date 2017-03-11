import { combineReducers } from 'redux';
import contentReducer from './content';
import errorReducer from './error';
import useragentReducer from './useragent';
import paymentReducer from './payment';
import questionsReducer from './questions';
import boatsReducer from './boats';
import ticketsReducer from './tickets';
import postsReducer from './posts';
import blogPostReducer from './blog-posts';
import pagesReducer from './pages';
import interactiveMapReducer from './interactive-map';
import stopsReducer from './stops';
import routesReducer from './routes';
import schedulesReducer from './schedules';
import insiderSignUpReducer from './insider-signup';
import favouritePlacesReducer from './favourite-places';
import newsReducer from './news';

const reducers = combineReducers({
    content: contentReducer,
    userAgent: useragentReducer,
    error: errorReducer,
    payment :paymentReducer,
    questions: questionsReducer,
    boats: boatsReducer,
    tickets: ticketsReducer,
    posts: postsReducer,
    blogPosts: blogPostReducer,
    pages : pagesReducer,
    interactiveMap: interactiveMapReducer,
    stops : stopsReducer,
    routes : routesReducer,
    schedules : schedulesReducer,
    insiderSignUp: insiderSignUpReducer,
    favouritePlaces: favouritePlacesReducer,
    news: newsReducer
});

export default reducers;