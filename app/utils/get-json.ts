import Task from 'data.task';

export default (url: string) => {
  return new Task((reject, resolve) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(resolve);
  });
};
