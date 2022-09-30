import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import api from "../../services/api";
import {addReserveRequest} from '../../store/modules/reserve/actions'

import './style.css'

export default function Home() {
  const dispatch = useDispatch()
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function loadApi() {
      const response = await api.get("trips");
      setTrips(response.data);

    }

    loadApi()
  }, []);

  function handleAdd(id){
    dispatch(addReserveRequest(id))
  }

  return (
    <div className="box">
      {trips.map(trip => (
        <li key={trip.id}>
          <img src={trip.image} alt={trip.title}/>
          <strong>{trip.title}</strong>
          <span>status: {trip.status ? 'Disponivel' : 'Indisponivel'}</span>

          <button type="button" onClick={()=> handleAdd(trip.id)}>
            <span>SOLICITAR RESERVA</span>
          </button>
        </li>
      ))}
    </div>
  );
}
