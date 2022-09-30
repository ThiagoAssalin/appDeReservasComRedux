import {select, call, put, all, takeLatest} from 'redux-saga/effects'
import api from '../../../services/api'
import history from '../../../services/history'
import {addReserveSuccess, updateAmountReserveSuccess} from './actions'

function* addToReserve({id}){

    const tripExist = yield select(
        state => state.reserve.find(trip => trip.id === id)
    );

    const myStock = yield call(api.get, `/stock/${id}`);

    const stockAmount = myStock.data.amount;

    const currentStock = tripExist ? tripExist.amount : 0;

    const amount = currentStock + 1;

    if(amount > stockAmount){
        alert('Quantidade maxima atingida')
        return;
    }

    if(tripExist){

        yield put(updateAmountReserveSuccess(id,amount))

    }else{
        const response = yield call(api.get, `trips/${id}`);
        const data = {
            ...response.data,
            amount: 1,
        }

        yield put(addReserveSuccess(data))
        
        history.push('/Reservas');
    }
}
function* updateAmount({id,amount}){
    if(amount <= 0 ) return;

    const myStock = yield call(api.get, `stock/${id}`);

    const stockAmount = myStock.data.amount;

    if(amount > stockAmount){
        alert('Quantidade maxima atingida')
        return;
    }

    yield put(updateAmountReserveSuccess(id, amount));
    
}
export default all([
    takeLatest('ADD_RESERVE_REQUEST', addToReserve),
    takeLatest('UPDATE_RESERVE_REQUEST', updateAmount),
])
