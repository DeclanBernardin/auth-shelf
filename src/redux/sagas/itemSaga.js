import { put, takeLatest } from 'redux-saga/effects';
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

function* itemSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
}

export default itemSaga;