import { put, takeLatest, actionChannel } from 'redux-saga/effects';
import axios from 'axios';

//DONT NEED ACTION AFTER FETCHITEMS SINCE ITS A GET
function* fetchItems() {
    try{
        //GET THE ITEMS FROM OUR SERVER
        const itemDetailsResponse = yield axios.get(`/api/shelf`);
        // THEN, SEND TO REDUX
        console.log('saga response!', itemDetailsResponse.data)
        // PUT IS DISPATCH
        yield put({
            type: 'SET_ITEMS',
            payload: itemDetailsResponse.data
        });
    } catch (err) {
        console.log(err)
    }
}

function* putItems(action) {
    try{
        // POST THE ITEMS FROM OUR SERV{ER 
        yield axios.post(`/api/shelf`, {description: action.payload.description, image_url: action.payload.image_url});
        yield put({
            type: 'FETCH_ITEMS', // POST WILL AUTOMATICALLY TRIGGER THE GET 
        })
    }catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
}

function* removeItems(action) {
    try{
        let id = action.payload.id
        yield axios.delete(`/api/shelf/` +id, action.payload.userId)
        yield put({
            type: 'FETCH_ITEMS',
            payload: action.response.data
        })
    }catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

function* itemSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
    yield takeLatest('POST_ITEMS', putItems);
    yield takeLatest('DELETE_ITEMS', removeItems);
}

export default itemSaga;