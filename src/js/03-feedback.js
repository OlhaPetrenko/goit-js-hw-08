import localStorageApi from './storage';
import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const FORM_LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

// відстежує на формі подію input і збурігає в LOCALSTORAGE об'єкт з даними

formEl.addEventListener('input', throttle(onInputChange, 500));

function onInputChange(event) {
  const formValue = event.target.value;
  const formName = event.target.name;

  formData[formName] = formValue;

  localStorageApi.save(FORM_LOCALSTORAGE_KEY, formData);
}

//при перезавантажені заповниє поля форми даними з LOCALSTORAGE

function lsGetData() {
  const lsData = localStorageApi.get(FORM_LOCALSTORAGE_KEY);

  if (lsData === undefined) {
    return;
  }

  const formElements = formEl.elements;

  for (const key in lsData) {
    if (!lsData.hasOwnProperty(key)) {
      return;
    }
    formElements[key].value = lsData[key];
  }
}
lsGetData();

// відстежує на формі подію submit і очищує поля форми та  дані з LOCALSTORAGE
formEl.addEventListener('submit', onformSubmit);

function onformSubmit(event) {
  event.preventDefault();
  console.log('formData', formData);
  localStorageApi.remove(FORM_LOCALSTORAGE_KEY);
  event.currentTarget.reset();
}
