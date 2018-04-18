import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Book from './Book';


const root = document.createElement('div');
root.setAttribute('id', 'smq-root');
document.body.appendChild(root);

const load = () => render(
  (
    <AppContainer>
      <Book />
    </AppContainer>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./Book', load);
}

load();
