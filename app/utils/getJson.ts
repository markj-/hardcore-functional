import Task from 'data.task';

export default (url) => {
  return new Task((reject, resolve) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(resolve);
  });
};
