import isEqual from 'lodash/isEqual';
import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IJobHistoryMySuffix, defaultValue } from 'app/shared/model/job-history-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_JOBHISTORY_LIST: 'jobHistory/FETCH_JOBHISTORY_LIST',
  FETCH_JOBHISTORY: 'jobHistory/FETCH_JOBHISTORY',
  CREATE_JOBHISTORY: 'jobHistory/CREATE_JOBHISTORY',
  UPDATE_JOBHISTORY: 'jobHistory/UPDATE_JOBHISTORY',
  DELETE_JOBHISTORY: 'jobHistory/DELETE_JOBHISTORY',
  RESET: 'jobHistory/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJobHistoryMySuffix>,
  entity: defaultValue,
  links: {
    last: 0
  },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type JobHistoryMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: JobHistoryMySuffixState = initialState, action): JobHistoryMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JOBHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JOBHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JOBHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_JOBHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_JOBHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JOBHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JOBHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_JOBHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_JOBHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_JOBHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBHISTORY_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links: { last: links.last },
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JOBHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_JOBHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JOBHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/job-histories';

// Actions

export const getEntities: ICrudGetAllAction<IJobHistoryMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_JOBHISTORY_LIST,
    payload: axios.get<IJobHistoryMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IJobHistoryMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JOBHISTORY,
    payload: axios.get<IJobHistoryMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IJobHistoryMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JOBHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJobHistoryMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JOBHISTORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJobHistoryMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JOBHISTORY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});