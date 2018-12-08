function view(imageUrl){
    let viewBlock = document.getElementById('view');
    let wrap = document.getElementById('wrap');

    window.scroll(0,0);
    viewBlock.innerHTML = '';

    wrap.style.display = 'flex';
    viewBlock.style.display = 'flex';

    //отключаем скролл
    document.onmousewheel = document.onwheel = () => {
        return false;
    }
    document.addEventListener('MozMousePixelScroll', () => {
        return false;
    }, false);
    document.onkeydown = (e) => {
        if (e.keyCode >= 33 && e.keyCode <= 40) return false;
    }

    let newImage = document.createElement('img');
    newImage.src = imageUrl;
    viewBlock.appendChild(newImage);
    closeButton(viewBlock, wrap);
}

//функция загрузки кнопки
function closeButton(view, wrap){
    let button = document.createElement('button');
    button.id = 'close';
    button.onclick = () => {
        view.style.display = 'none';
        wrap.style.display = 'none';

        //выключаем скролл
        document.onmousewheel = document.onwheel = () => {
            return true;
        }
        document.addEventListener('MozMousePixelScroll', () => {
            return true;
        }, true);
        document.onkeydown = (e) => {
            if (e.keyCode >= 33 && e.keyCode <= 40) return true;
        }
    }
    button.innerHTML = '<svg height="20px" width="20px"><defs><filter filterUnits="userSpaceOnUse" height="20px" id="Filter_0" width="20px" x="0px" y="0px"><feOffset dx="0" dy="1" in="SourceAlpha"></feOffset><feGaussianBlur result="blurOut" stdDeviation="1"></feGaussianBlur><feFlood flood-color="rgb(0, 0, 0)" result="floodOut"></feFlood><feComposite in="floodOut" in2="blurOut" operator="atop"></feComposite><feComponentTransfer><feFuncA slope="1" type="linear"></feFuncA></feComponentTransfer><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><g filter="url(#Filter_0)"><path d="M17.390,13.133 C17.390,12.798 17.256,12.463 17.014,12.222 L13.076,8.283 L17.014,4.344 C17.256,4.103 17.390,3.768 17.390,3.433 C17.390,3.098 17.256,2.763 17.014,2.522 L15.192,0.700 C14.951,0.459 14.616,0.325 14.281,0.325 C13.946,0.325 13.612,0.459 13.370,0.700 L9.432,4.639 L5.493,0.700 C5.252,0.459 4.917,0.325 4.582,0.325 C4.247,0.325 3.912,0.459 3.671,0.700 L1.849,2.522 C1.608,2.763 1.474,3.098 1.474,3.433 C1.474,3.768 1.608,4.103 1.849,4.344 L5.788,8.283 L1.849,12.222 C1.608,12.463 1.474,12.798 1.474,13.133 C1.474,13.468 1.608,13.803 1.849,14.044 L3.671,15.866 C3.912,16.107 4.247,16.241 4.582,16.241 C4.917,16.241 5.252,16.107 5.493,15.866 L9.432,11.927 L13.370,15.866 C13.612,16.107 13.946,16.241 14.281,16.241 C14.616,16.241 14.951,16.107 15.192,15.866 L17.014,14.044 C17.256,13.803 17.390,13.468 17.390,13.133 Z"></path></g></svg>';
  view.appendChild(button);
}
export default view;