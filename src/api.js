import axios from 'axios';

export const getDataFromSend = roleId => axios.get(`/api/get_data_from_send/${roleId}`)
                .then(res => res.data);

export const getDataFromReceive = roleId => axios.get(`/api/get_data_from_receive/${roleId}`)
                .then(res => res.data);

export const getDataServer = () => axios.get('/api/server')
                .then(res => res.data);

export const getDataRole = () => axios.get('/api/role')
                .then(res => res.data);

export const getUnseenMap = () => axios.get('/api/get_unseen_map')
                .then(res => res.data);
