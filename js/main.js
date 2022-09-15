import {slider} from  './form.js';
import {editForm} from  './form-edit.js';
import {createMarkers} from  './map.js';
import {getData} from  './api.js';
import {showAlert} from  './util.js';            //плашка с ошибкой
import {selectFilter, onChangeFilter} from  './filtering.js';

getData((offers) => {
  editForm();
  slider();
  selectFilter(offers);
  createMarkers(onChangeFilter(offers));
},showAlert);
