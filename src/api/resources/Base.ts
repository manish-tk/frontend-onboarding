import Constants from '../../constants/main';
import axios, { AxiosInstance } from 'axios';

export default class BaseResource {
    protected axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: Constants.API_URL,
        });
    }
}
