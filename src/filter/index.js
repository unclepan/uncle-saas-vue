import Vue from 'vue';

Vue.filter('substr', (value, num, start = 0) => {
  if (!value) return '';
  let v = value.substr(start, num);
  if (value.length > num) {
    v = `${v}...`;
  }
  return v;
});

Vue.filter('reNull', (value) => {
  if (!value && value !== 0) {
    return '--';
  }
  return value;
});
