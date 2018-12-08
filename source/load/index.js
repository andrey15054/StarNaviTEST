import {pagination, prevPage, nextPage} from '../pagination';
import {filterSize, filterAuthor} from '../filters';
import view from '../view';

const list = document.getElementById('list');
const authorList = document.getElementById('authors');
const paginationBlock = document.getElementById('pagination');

//функция загрузки сообщений
function loadImages(data, start) {
    //если по какой-то причине данных нету, то выдаем ошибку
    if (data.length === 0) {
        list.innerHTML = '<h3 class="error">Ошибка при загрузке содержимого...</h3>';
        return;
    }

    list.innerHTML = '';

    for (let i = start; i < start + 20; i++){
        // выходим из цикла когда обьекты закончились
        if (data[i] === undefined){
            return;
        }

        //поиск автора и добавление если еще не был добавлен
        let regexp = new RegExp(data[i].author);
        let str = authors.toString();

        if (!regexp.test(str)) {
            authors.push(data[i].author);

            let newAuthor = document.childElement('li');
            newAuthor.innerHTML = '<input type="checkbox" name="filterAuthor" value="' + data[i].author + '">' + data[i].author;
            newAuthor.firstChild.onclick = event =>{
                filterAuthor(data,start);
            }
            authorList.appendChild(newAuthor);
        }
    }
}

//загрузка страниц в переключатель
function loadPagination(data){
    let s = 1;
    paginationBlock.innerHTML = '';

    document.getElementById('prev').onclick = event => {
        prevPage();
    }
    document.getElementById('next').onclick = event => {
        nextPage();
    }

    for (let i = 0; i < data.length; i += 20){
        let newPage = document.createElement('li');
        if(s > 5){
            newPage.style.display = 'none';
        }
        newPage.id = i;
        newPage.innerText = s;
        s++;

        newPage.onclick = event => {
            pagination(event.target, data);
        };
        paginationBlock.appendChild(newPage);
    }
    paginationBlock.childNodes[0].className = 'active-page';
}

export {loadImages, loadAuthors, loadPagination};