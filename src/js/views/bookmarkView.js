import View from './view.js';
import PreviewView from './previewView'
import previewView from './previewView';

class BookmarkView extends previewView {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMessage = '';

//   _generateMarkup() {
//     return this._data.map(this._generateMarkupPreview).join('');
//   }

//   _generateMarkupPreview(result) {
//     const id = window.location.hash.slice(1);

//     return `
//     <li class="preview">
//         <a class="preview__link ${
//           id === result.id ? 'preview__link--active' : ''
//         }" href="#${result.id}">
//             <figure class="preview__fig">
//             <img src="${result.image}" alt="${result.title}"/>
//             </figure>
//             <div class="preview__data">
//             <h4 class="preview__title">${result.title}</h4>
//             <p class="preview__publisher">${result.publisher}</p>
//             <div class="preview__user-generated">
                
//             </div>
//             </div>
//         </a>
//     </li>
//       `;
//   }
}

export default new BookmarkView();
