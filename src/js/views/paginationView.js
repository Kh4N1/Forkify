import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateNextMarkup(curPage) {
    return `
      <button data-goto='${
        curPage + 1
      }' class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `;
  }
  _generatePervMarkup(curPage) {
    return `
      <button data-goto='${
        curPage - 1
      }' class="btn--inline pagination__btn--prev">
        <svg className="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextMarkup(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePervMarkup(curPage);
    }

    // Other page
    if (curPage < numPages) {
      const pervBotoom = this._generatePervMarkup(curPage);
      const nextBotoom = this._generateNextMarkup(curPage);
      return pervBotoom + nextBotoom;
    }
    // Page 1 and there are NO pages
    return '';
  }
}

export default new paginationView();
